import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
@Controller('exchange')
export class ExchangeController {
    constructor(private readonly exchangeService: ExchangeService) { }

    @Get('rate')
    async getRate() {
        const rate = await this.exchangeService.getExchangeRate();
        return { rate };
    }

    @Post('transaction')
    async simulateTransaction(@Body('amountEUR') amountEUR: number) {
        const transaction = await this.exchangeService.simulateTransaction(amountEUR);
        return transaction;
    }
}
