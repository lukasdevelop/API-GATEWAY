import { IsEmail, Matches } from "class-validator"

export class AuthLoginUsuarioDto {
    @IsEmail()
    email: string

    @Matches(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message: 'senha invalida'})
    senha: string
}