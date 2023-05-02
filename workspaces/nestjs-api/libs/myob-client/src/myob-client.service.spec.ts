import { Test, TestingModule } from '@nestjs/testing';
import { MYOBClientService } from './myob-client.service';

describe('MYOBClientService', () => {
  let service: MYOBClientService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MYOBClientService],
    }).compile();
    service = module.get<MYOBClientService>(MYOBClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should provide abn balance sheet', async () => {
    const abnDetails = await service.getBusinessBalanceSheet('BUSINESS1');
    expect(abnDetails).toBeDefined();
    expect(abnDetails.abn).toEqual('BUSINESS1');
    expect(abnDetails.balanceSheet.length).toEqual(4);
  });

  it('should provide null for invalid abn', async () => {
    const abnDetails = await service.getBusinessBalanceSheet('Invalid');
    expect(abnDetails).toBeUndefined();
  });
});
