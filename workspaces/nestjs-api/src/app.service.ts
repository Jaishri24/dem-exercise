import { Injectable } from '@nestjs/common';
import { LoanDetails } from './dto/business.model';
import { BalanceSheetService } from '../modules/balance-sheet/balance-sheet.service';
import { AccountingProviders } from '../modules/balance-sheet/enums/accounting-providers.enum';
import { DecisionEngineService } from '../modules/decision-engine/decision-engine.service';

@Injectable()
export class AppService {
  constructor(
    private readonly balanceSheetService: BalanceSheetService,
    private readonly decisionEngineService: DecisionEngineService,
  ) {}

  async getProviders(): Promise<string[]> {
    return Object.keys(AccountingProviders);
  }

  async getBalanceSheet(loanDetails: LoanDetails): Promise<any> {
    return await this.balanceSheetService.getBusinessBalanceSheet(
      loanDetails.provider,
      loanDetails.business.ABN,
    );
  }
}
