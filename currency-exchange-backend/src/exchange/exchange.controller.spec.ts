import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';

describe('ExchangeController', () => {
  let controller: ExchangeController;
  let service: ExchangeService;

  const mockExchangeService = {
    getExchangeRate: jest.fn().mockResolvedValue(4.5),
    simulateTransaction: jest.fn().mockImplementation((amount: number) => ({
      amountEUR: amount,
      amountPLN: amount * 4.5,
      rate: 4.5,
      timestamp: new Date(),
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExchangeController],
      providers: [
        {
          provide: ExchangeService,
          useValue: mockExchangeService,
        },
      ],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return exchange rate from service', async () => {
    const result = await controller.getRate();
    expect(result).toEqual({ rate: 4.5 });
    expect(service.getExchangeRate).toHaveBeenCalled();
  });

  it('should return simulated transaction from service', async () => {
    const result = await controller.simulateTransaction(100);
    expect(result.amountEUR).toBe(100);
    expect(result.amountPLN).toBe(450);
    expect(result.rate).toBe(4.5);
    expect(service.simulateTransaction).toHaveBeenCalledWith(100);
  });
});
