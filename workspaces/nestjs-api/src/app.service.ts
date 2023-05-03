import { Injectable } from '@nestjs/common';
import { LoanDetailsDto } from './dto/business.dto';
import { BalanceSheetService } from '../modules/balance-sheet/balance-sheet.service';
import { AccountingProviders } from '../modules/balance-sheet/enums/accounting-providers.enum';
import { DecisionEngineService } from '../modules/decision-engine/decision-engine.service';
import { LoanDto } from './dto/loan.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly balanceSheetService: BalanceSheetService,
    private readonly decisionEngineService: DecisionEngineService,
  ) {}

  async getProviders(): Promise<string[]> {
    return Object.keys(AccountingProviders);
  }

  async getBalanceSheet(loanDetails: LoanDetailsDto): Promise<any> {
    return await this.balanceSheetService.getBusinessBalanceSheet(
      loanDetails.provider,
      loanDetails.business.ABN,
    );
  }

  async submitLoanApproval(loan: LoanDto): Promise<any> {
    const businessDetails = await this.balanceSheetService.getBusinessBalanceSheet(
      loan.loanDetails.provider,
      loan.loanDetails.business.ABN,
    );
    // Get the established year i.e. starting year of balance sheet
    const establishedYear = Math.min(...businessDetails.balanceSheet.map(item => item.year))
    // Get the last year of the balance sheet
    const lastYear = Math.max(...businessDetails.balanceSheet.map(item => item.year))

    // Get sum of profitLoss grouped by year
    const profitLossSummary = businessDetails.balanceSheet.reduce(this.groupBy('year', this.sum,  'profitOrLoss'), []);
    // Get sum of assetsValue grouped by year
    const assetValueSummary = businessDetails.balanceSheet.reduce(this.groupBy('year', this.sum,  'assetsValue'), []);

    // Get the profitorLoss for last business year
    const lastYearprofitLoss = profitLossSummary.filter(f => f.year == lastYear)[0].profitOrLoss;
    // Get the average assetsValue for last business year
    const averageAssetValue = assetValueSummary.filter(f => f.year == lastYear)[0].assetsValue / 12;

    // Compute the pre assesment value
    const preAssessment = (averageAssetValue > loan.loanDetails.loanAmount) ? 100 : lastYearprofitLoss > 0 ? 60 : 20;

    const request = {
      businessDetails: {
        name: loan.loanDetails.business.ABN,
        profitLossSummary: profitLossSummary,
        yearEstablished: establishedYear
      },
      preAssessment: preAssessment
    }

    await this.decisionEngineService.computeDecision(
      request
    );

    return request;
  }

  sum(a, b){
    return a + b;
  }

  groupBy(propName, computeAggregate, aggregateName){
    return function (output, line){
      const { [propName] : name, [aggregateName]: no} = line;
      const totalInfo = 
        output.find(item => item[propName] === name);
      if(totalInfo) {
        totalInfo[aggregateName] =    
          computeAggregate(totalInfo[aggregateName], no);
      } else {
        const newTotalInfo = 
          { [propName] : name, [aggregateName]: no };
        output.push(newTotalInfo);
      }
      return output;
    }
  }
}

