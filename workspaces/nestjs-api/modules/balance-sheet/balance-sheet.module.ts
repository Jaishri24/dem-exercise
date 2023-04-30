import { Module } from '@nestjs/common';
import { BalanceSheetService } from './balance-sheet.service';
import { MYOBClientModule } from 'libs/myob-client/src/myob-client.module';
import { XeroClientModule } from 'libs/xero-client/src/xero-client.module';
import { AccountingProviderServiceFactory } from './factories/accounting-provider-service.factory';

@Module({
  imports: [MYOBClientModule, XeroClientModule],
  providers: [BalanceSheetService, AccountingProviderServiceFactory],
})
export class BalanceSheetModule {}
