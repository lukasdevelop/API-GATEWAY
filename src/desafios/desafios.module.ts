import { Module } from '@nestjs/common';
import { DesafiosController } from './desafios.controller';
import { ProxyRMQModule } from '../proxyrmq/proxyrmq.module'
import { DesafiosService } from './desafios.service';

@Module({
  imports: [ProxyRMQModule],  
  controllers: [DesafiosController], 
  providers: [DesafiosService]
})
export class DesafiosModule {}
