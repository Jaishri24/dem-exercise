import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountingProviders } from './enums/accounting-providers.enum';
import { AccountingProviderServiceFactory } from './factories/accounting-provider-service.factory';

@Injectable()
export class BalanceSheetService {
   constructor(
      private readonly accountingProviderServiceFactory: AccountingProviderServiceFactory) { }

   async getBusinessBalanceSheet(provider: AccountingProviders, abn: string) {
      const providerService = await this.accountingProviderServiceFactory.getProvider(provider);
      const balanceSheet = await providerService.getBusinessBalanceSheet(abn);
      if (balanceSheet === null) {
         throw new NotFoundException(`Balance sheet not available for the business`)
      }
      
      return balanceSheet;
   }
}
