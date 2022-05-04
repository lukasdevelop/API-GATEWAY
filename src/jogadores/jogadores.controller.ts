import { Controller, Get, Logger, Post, UsePipes, ValidationPipe, Body, Query, Put, Param, Delete, UseInterceptors, UploadedFile, UseGuards, Req } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto'
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe'
import { FileInterceptor } from '@nestjs/platform-express'
import { JogadoresService } from './jogadores.service';
import { AuthGuard} from '@nestjs/passport'
import { Request } from 'express'
@Controller('api/v1/jogadores')
export class JogadoresController {

  private logger = new Logger(JogadoresController.name)

  constructor(
    private jogadoresService: JogadoresService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
      @Body() criarJogadorDto: CriarJogadorDto) {

      this.logger.log(`criarJogadorDto: ${JSON.stringify(criarJogadorDto)}`)          
      
      await this.jogadoresService.criarJogador(criarJogadorDto)
  }

  @Post('/:_id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadArquivo(@UploadedFile() file, @Param('_id') _id: string)
  {
     return await this.jogadoresService.uploadArquivo(file, _id)
  }


   @UseGuards(AuthGuard('jwt'))
   @Get()
   async consultarJogadores(@Req() req: Request, @Query('idJogador') _id: string) {

    this.logger.log(`req: ${JSON.stringify(req.user)}`)      

    return await this.jogadoresService.consultarJogadores(_id)
   }

   @Put('/:_id')
   @UsePipes(ValidationPipe)
   async atualizarJogador(
       @Body() atualizarJogadorDto: AtualizarJogadorDto, 
       @Param('_id', ValidacaoParametrosPipe) _id: string) {

        await this.jogadoresService.atualizarJogador(atualizarJogadorDto, _id)
  }

   @Delete('/:_id')
    deletarJogador(
       @Param('_id', ValidacaoParametrosPipe) _id: string) {
          this.jogadoresService.deletarJogador(_id)
       }
    
   
}
