import { Inject, Injectable } from '@nestjs/common';
import { AccountingProviders } from '../enums/accounting-providers.enum';
import { XeroClientService } from '../../../libs/xero-client/src/xero-client.service';
import { MYOBClientService } from '../../../libs/myob-client/src/myob-client.service';

@Injectable()
export class AccountingProviderServiceFactory {
    constructor(
        private mYOBClientService: MYOBClientService,
        private xeroClientService: XeroClientService) { }


    public getProvider(provider: AccountingProviders) {
        switch (provider) {
            case AccountingProviders.MYOB: {
                return this.mYOBClientService;
            }
            case AccountingProviders.Xero: {
                return this.xeroClientService;
            }
            default: {
                return undefined;
            }
        }
    }
}