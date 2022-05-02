import { Controller, Post, UsePipes, ValidationPipe, Body, Get, Query, Put, Param, Delete, Logger } from '@nestjs/common';
import { CriarDesafioDto } from './dtos/criar-desafio.dto'
import { DesafioStatusValidacaoPipe } from './pipes/desafio-status-validation.pipe';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { DesafiosService } from './desafios.service';

@Controller('api/v1/desafios')
export class DesafiosController {

    constructor(
        private desafiosService: DesafiosService
    ) { }

    private readonly logger = new Logger(DesafiosController.name)


    @Post()
    @UsePipes(ValidationPipe)
    async criarDesafio(
        @Body() criarDesafioDto: CriarDesafioDto) {
        this.logger.log(`criarDesafioDto: ${JSON.stringify(criarDesafioDto)}`)

        await this.desafiosService.criarDesafio(criarDesafioDto)

    }

    @Get()
    async consultarDesafios(
        @Query('idJogador') idJogador: string) {
        return await this.desafiosService.consultarDesafios(idJogador)
    }

    @Put('/:desafio')
    async atualizarDesafio(
        @Body(DesafioStatusValidacaoPipe) atualizarDesafioDto: AtualizarDesafioDto,
        @Param('desafio') _id: string) {

        this.desafiosService.atualizarDesafio(atualizarDesafioDto, _id)
    }

    @Post('/:desafio/partida/')
    async atribuirDesafioPartida(
        @Body(ValidationPipe) atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
        @Param('desafio') _id: string) {
       await this.desafiosService.atribuirDesafioPartida(atribuirDesafioPartidaDto, _id)

    }

    @Delete('/:_id')
    async deletarDesafio(
        @Param('_id') _id: string) {

        await this.desafiosService.deletarDesafio(_id)
    }

}
