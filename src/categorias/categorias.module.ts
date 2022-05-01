import { Module } from '@nestjs/common';
import { CategoriasController } from './categorias.controller';
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module'
import { CategoriasService } from './categorias.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule {}
