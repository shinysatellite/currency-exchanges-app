import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager'; // <-- import from @nestjs/cache-manager
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';

@Module({
  imports: [CacheModule.register({ ttl: 60, isGlobal: true })], // <-- register cache here
  providers: [ExchangeService],
  controllers: [ExchangeController],
})
export class ExchangeModule { }
