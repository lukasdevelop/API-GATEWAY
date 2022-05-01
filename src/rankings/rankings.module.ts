import { Module } from '@nestjs/common';
import { ProxyRMQModule } from 'src/proxyrmq/proxyrmq.module';
import { RankingsController } from './rankings.controller';
import { RankingsService } from './rankings.service';

@Module({
  imports: [ProxyRMQModule],
  controllers: [RankingsController],
  providers: [RankingsService]
})
export class RankingsModule {}
