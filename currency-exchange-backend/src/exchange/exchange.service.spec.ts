import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ExchangeService', () => {
  let service: ExchangeService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const cacheMock = {
      get: jest.fn(),
      set: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock,
        },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    cacheManager = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return cached exchange rate if available', async () => {
    (cacheManager.get as jest.Mock).mockResolvedValue(4.5);

    const rate = await service.getExchangeRate();

    expect(rate).toBe(4.5);
    expect(cacheManager.get).toHaveBeenCalledWith('eurToPlnRate');
  });

  it('should fetch and cache exchange rate if not cached', async () => {
    (cacheManager.get as jest.Mock).mockResolvedValue(null);

    mockedAxios.get.mockResolvedValueOnce({
      data: { exchange_rate: 4.9 },
    });

    const rate = await service.getExchangeRate();

    expect(rate).toBe(4.9);
    expect(cacheManager.set).toHaveBeenCalledWith('eurToPlnRate', 4.9, 60000);
  });

  it('should simulate a transaction correctly', async () => {
    jest.spyOn(service, 'getExchangeRate').mockResolvedValue(5);

    const transaction = await service.simulateTransaction(100);

    expect(transaction.amountEUR).toBe(100);
    expect(transaction.amountPLN).toBe(500);
    expect(transaction.rate).toBe(5);
    expect(transaction.timestamp).toBeInstanceOf(Date);
  });
});
