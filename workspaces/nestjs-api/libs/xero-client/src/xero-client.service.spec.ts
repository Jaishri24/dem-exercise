import { Test, TestingModule } from '@nestjs/testing';
import { XeroClientService } from './xero-client.service';

describe('XeroClientService', () => {
  let service: XeroClientService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XeroClientService],
    }).compile();
    service = module.get<XeroClientService>(XeroClientService);
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
