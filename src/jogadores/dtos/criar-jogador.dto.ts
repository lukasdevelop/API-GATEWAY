import { isNotEmpty, IsEmail, IsNotEmpty} from 'class-validator'

export class CriarJogadorDto {

    @IsNotEmpty()
    readonly telefoneCelular: string;

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly nome: string
    
    @IsNotEmpty()
    readonly categoria: string
}