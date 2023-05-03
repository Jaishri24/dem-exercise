import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceSheetModule } from '../modules/balance-sheet/balance-sheet.module';
import { DescisionEngineModule } from '../modules/decision-engine/decision-engine.module';
import { DecisionEngineService } from '../modules/decision-engine/decision-engine.service';
import { BalanceSheetService } from '../modules/balance-sheet/balance-sheet.service';
import { LoanDetailsDto } from './dto/business.dto';
import { LoanDto } from './dto/loan.dto';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [BalanceSheetModule, DescisionEngineModule],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: BalanceSheetService,
          useClass: BalanceSheetService,
        },
        {
          provide: DecisionEngineService,
          useClass: DecisionEngineService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('should get the accounting providers with errors', async () => {
      const response = await appController.getProviders();
      expect(response).toBeDefined();
      expect(response.length).toEqual(2);

    });


    it('should get the balance sheet without errors', async () => {
      const request = {
        "business": {
          "ABN": "BUSINESS1"
        },
        "loanAmount": 10000,
        "provider": "MYOB"
      } as LoanDetailsDto;

      const response = await appController.getBalanceSheet(request);
      expect(response).toBeDefined();
      
    });

    it('should submit a loan approval without errors', async () => {
      const request = { "loanDetails": {
        "business": {
          "ABN": "BUSINESS1"
        },
        "loanAmount": 10000,
        "provider": "MYOB"
      } as LoanDetailsDto} as LoanDto;

      const response = await appController.submitLoanApproval(request);
      expect(response).toBeDefined();
      
    });

  });
});
