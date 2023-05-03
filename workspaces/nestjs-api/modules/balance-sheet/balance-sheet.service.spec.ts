import { Test, TestingModule } from '@nestjs/testing';
import { AccountingProviderServiceFactory } from './factories/accounting-provider-service.factory';
import { AccountingProviders } from './enums/accounting-providers.enum';
import { BalanceSheetService } from './balance-sheet.service';
import { MYOBClientModule } from '../../libs/myob-client/src/myob-client.module';
import { XeroClientModule } from '../../libs/xero-client/src/xero-client.module';
import { NotFoundException } from '@nestjs/common';
import { XeroClientService } from '../../libs/xero-client/src/xero-client.service';
import { MYOBClientService } from '../../libs/myob-client/src/myob-client.service';

describe('BalanceSheetService', () => {
    let service: BalanceSheetService;
    const mockAccountingProviderServiceFactory = { getProvider: jest.fn()}
    const mockprovider = {getBusinessBalanceSheet :jest.fn()}
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MYOBClientModule, XeroClientModule],
            providers: [BalanceSheetService, 
                {
                    provide: AccountingProviderServiceFactory,
                    useValue: mockAccountingProviderServiceFactory,
                },
                {
                    provide: MYOBClientService,
                    useValue: mockprovider,
                }
            ],
        }).compile();
        service = module.get<BalanceSheetService>(BalanceSheetService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should provide the selected provider Xero instance abn details', async () => {
        mockAccountingProviderServiceFactory.getProvider = jest.fn((r) => new XeroClientService());
        const abnDetails = await service.getBusinessBalanceSheet(AccountingProviders.Xero, "BUSINESS1");
        expect(abnDetails).toBeDefined();
        expect(abnDetails.abn).toEqual("BUSINESS1");
        expect(abnDetails.balanceSheet.length).toEqual(24);

    });

    it('should provide the selected provider MYOB instance abn details', async () => {
        mockAccountingProviderServiceFactory.getProvider.mockReturnValue(new MYOBClientService())

        const abnDetails = await service.getBusinessBalanceSheet(AccountingProviders.MYOB, "BUSINESS2");
        expect(abnDetails).toBeDefined();
        expect(abnDetails.abn).toEqual("BUSINESS2");
        expect(abnDetails.balanceSheet.length).toEqual(24);

    });

    it('should throw an error for valid AccountingProvider and invalid business', async () => {
        mockAccountingProviderServiceFactory.getProvider.mockReturnValue(new MYOBClientService());
        mockprovider.getBusinessBalanceSheet.mockReturnValue(undefined);
        await expect(service.getBusinessBalanceSheet(AccountingProviders.MYOB, "Invalid"))
        .rejects.toThrowError('Balance sheet not available for the business');
    });

    it('should throw an error for invalid AccountingProvider', async () => {
        mockAccountingProviderServiceFactory.getProvider = jest.fn((r) =>undefined);
        mockprovider.getBusinessBalanceSheet.mockReturnValue(null);
        await expect(service.getBusinessBalanceSheet(undefined, "Business1"))
        .rejects.toThrowError('Accounting provider is not available');
    });
});
