import { BadRequestException, Injectable } from '@nestjs/common';
import { ClientProxySmartRanking } from 'src/proxyrmq/client-proxy';

@Injectable()
export class RankingsService {
    constructor(private clientProxySmartRanking: ClientProxySmartRanking){}

    private clientRankingBackend = this.clientProxySmartRanking.getClientProxyRankingsInstance()

    async consultarRankings(idCategoria: string, dataRef: string): Promise<any>{
        if(!idCategoria){
            throw new BadRequestException("O id da categoria é obrigatorio!")
        }

        return await this.clientRankingBackend
            .send('consultar-rankings', {
                idCategoria: idCategoria,
                dataRef: dataRef ? dataRef: ''
            })
            .toPromise()
    }
}
