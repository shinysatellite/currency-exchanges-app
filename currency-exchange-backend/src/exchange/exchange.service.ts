import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';

@Injectable()
export class ExchangeService {
    private readonly API_URL = 'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api';
    private readonly API_KEY = 'DInGz8W0Wr8t0fYAY21ddL2JMmZ2uHT1hxAxUSTa';

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async getExchangeRate() {
        const cachedRate = await this.cacheManager.get<number>('eurToPlnRate');
        if (cachedRate) {
            return cachedRate;
        }
        const response = await axios.get(this.API_URL, {
            headers: { 'x-api-key': this.API_KEY },
        });

        const { exchange_rate } = response.data;
        await this.cacheManager.set('eurToPlnRate', exchange_rate, 60);
        return exchange_rate;
    }
}
