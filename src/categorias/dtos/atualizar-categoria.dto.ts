import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";

export class AtualizarCategoriaDto {

    @IsString()
    @IsOptional()
    descricao: string;

    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>

}

interface Evento {
    nome: string
    operacao: string
    valor: number
}