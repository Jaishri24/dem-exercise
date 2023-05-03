import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AccountingProviders } from './enums/accounting-providers.enum';
import { AccountingProviderServiceFactory } from './factories/accounting-provider-service.factory';
import { BalanceSheet, BusinessBalanceSheets } from './interfaces/balance-sheet.dto';

@Injectable()
export class BalanceSheetService {
   constructor(
      private readonly accountingProviderServiceFactory: AccountingProviderServiceFactory) { }

   async getBusinessBalanceSheet(provider: AccountingProviders, abn: string) : Promise<BusinessBalanceSheets> {
      const providerService = await this.accountingProviderServiceFactory.getProvider(provider);
      if(!providerService){
         throw new NotFoundException(`Accounting provider is not available`)
      }
      const balanceSheet = await providerService.getBusinessBalanceSheet(abn);
      if (!balanceSheet) {
         throw new NotFoundException(`Balance sheet not available for the business`)
      }
      
      return balanceSheet;
   }
}
