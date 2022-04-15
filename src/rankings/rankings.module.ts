import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';
import { RankingsController } from './rankings.controller';

@Module({
  imports: [ProxyRMQModule],
  controllers: [RankingsController]
})
export class RankingsModule {}
