import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AccountingProviderServiceFactory } from './accounting-provider-service.factory';
import { MYOBClientService } from '../../../libs/myob-client/src/myob-client.service';
import { XeroClientService } from '../../../libs/xero-client/src/xero-client.service';
import { AccountingProviders } from '../enums/accounting-providers.enum';
import { MYOBClientModule } from '../../../libs/myob-client/src/myob-client.module';
import { XeroClientModule } from '../../../libs/xero-client/src/xero-client.module';
describe('AccountingProviderServiceFactory', () => {
    let service: AccountingProviderServiceFactory;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [MYOBClientModule, XeroClientModule],

            providers: [AccountingProviderServiceFactory,
            ],
        }).compile();
        service = module.get<AccountingProviderServiceFactory>(AccountingProviderServiceFactory);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should provide the selected provider Xero instance', async () => {
        const provider = await service.getProvider(AccountingProviders.Xero);
        expect(provider).toBeDefined();
        expect(provider).toBeInstanceOf(XeroClientService);
    });

    it('should provide the selected provider MYOB instance', async () => {
        const provider = await service.getProvider(AccountingProviders.MYOB);
        expect(provider).toBeDefined();
        expect(provider).toBeInstanceOf(MYOBClientService);
    });

    it('should throw an exception for invalid business from selected provider', async () => {
        const provider = await service.getProvider(undefined);
        expect(provider).toEqual({});
    });
});
