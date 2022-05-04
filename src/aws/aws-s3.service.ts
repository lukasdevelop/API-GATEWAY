import { Injectable, Logger } from '@nestjs/common';
import * as AWS from 'aws-sdk'
import { AwsS3Config } from './aws-s3.config'

@Injectable()
export class AwsS3Service {

    private logger = new Logger(AwsS3Service.name)

    constructor(private awsS3Config: AwsS3Config) { }

    public async uploadArquivo(file: any, id: string) {

        try {

            const s3 = new AWS.S3({
                region: this.awsS3Config.AWS_REGION,
                accessKeyId: this.awsS3Config.AWS_ACCESS_KEY_ID,
                secretAccessKey: this.awsS3Config.AWS_SECRET_ACCESS_KEY
            })

            const fileExtesion = file.originalname.split('.')[1]

            const urlKey = `${id}.${fileExtesion}`

            this.logger.log(`urlKey: ${urlKey}`)

            const params = {
                Body: file.buffer,
                Bucket: this.awsS3Config.AWS_S3_BUCKET_NAME,
                Key: urlKey
            }
            /*
                    const data = s3 
                        .putObject(params)
                        .promise()
                        .then(
                            data => {
                                return {
                                    url: `https://${this.awsS3Config.AWS_S3_BUCKET_NAME}.s3-${this.awsS3Config.AWS_REGION}.amazonaws.com/${urlKey}`
                                }
                            },
                        err => {
                            this.logger.error(err)
                            return err
                        }
                        )
                        
                    return data
                    */

            const result = await s3.putObject(params).promise()

            this.logger.log(`result: ${JSON.stringify(result)}`)

            return {
                url: `https://${this.awsS3Config.AWS_S3_BUCKET_NAME}.s3-${this.awsS3Config.AWS_REGION}.amazonaws.com/${urlKey}`
            }

        } catch (error) {
            this.logger.log(`result: ${JSON.stringify(error.message)}`)

            throw error.message
        }
    }
}
