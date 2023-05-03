import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceSheetModule } from '../modules/balance-sheet/balance-sheet.module';
import { DescisionEngineModule } from '../modules/decision-engine/decision-engine.module';
import { DecisionEngineService } from '../modules/decision-engine/decision-engine.service';
import { BalanceSheetService } from '../modules/balance-sheet/balance-sheet.service';
import { LoanDetailsDto } from './dto/business.dto';
import { LoanDto } from './dto/loan.dto';

describe('AppService', () => {
  let appService: AppService;
  let mockBalanceSheetService = { getBusinessBalanceSheet: jest.fn() };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [BalanceSheetModule, DescisionEngineModule],
      controllers: [AppService],
      providers: [
        AppService,
        {
          provide: BalanceSheetService,
          useValue: mockBalanceSheetService,
        },
        {
          provide: DecisionEngineService,
          useClass: DecisionEngineService,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appService).toBeDefined();
    });

    it('should get the accounting providers', async () => {
      const response = await appService.getProviders();
      expect(response).toBeDefined();
      expect(response.length).toEqual(2);
    });


    it('should get the balance sheet', async () => {
      const request = {
        "business": {
          "ABN": "BUSINESS1"
        },
        "loanAmount": 10000,
        "provider": "MYOB"
      } as LoanDetailsDto;



      const mockData = {
        "abn": "BUSINESS1",
        "balanceSheet": [
          {
            "year": 2021,
            "month": 12,
            "profitOrLoss": -100000,
            "assetsValue": -1000000
          },
        ]
      };

      mockBalanceSheetService.getBusinessBalanceSheet.mockReturnValueOnce(mockData);
      const response = await appService.getBalanceSheet(request);
      expect(response).toBeDefined();

    });

    it('should call submit loan and return with pre assessment value as 20', async () => {
      const request = {
        "loanDetails": {
          "business": {
            "ABN": "BUSINESS2"
          },
          "loanAmount": 10000,
          "provider": "MYOB"
        } as LoanDetailsDto
      } as LoanDto;


      const preAssessment20Scenerio = {
        "abn": "BUSINESS1",
        "balanceSheet": [
          {
            "year": 2021,
            "month": 12,
            "profitOrLoss": -100000,
            "assetsValue": -1000000
          },
          {
            "year": 2021,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
          },
          {
            "year": 2021,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
          },
          {
            "year": 2021,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
          },
          {
            "year": 2021,
            "month": 8,
            "profitOrLoss": 250000,
            "assetsValue": 1234
          },
          {
            "year": 2021,
            "month": 7,
            "profitOrLoss": 1150,
            "assetsValue": 5789
          },
          {
            "year": 2021,
            "month": 6,
            "profitOrLoss": 2500,
            "assetsValue": 22345
          },
          {
            "year": 2021,
            "month": 5,
            "profitOrLoss": -187000,
            "assetsValue": 223452
          },
          {
            "year": 2021,
            "month": 4,
            "profitOrLoss": 250000,
            "assetsValue": 1234
          },
          {
            "year": 2021,
            "month": 3,
            "profitOrLoss": 1150,
            "assetsValue": 5789
          },
          {
            "year": 2021,
            "month": 2,
            "profitOrLoss": 2500,
            "assetsValue": 22345
          },
          {
            "year": 2021,
            "month": 1,
            "profitOrLoss": -187000,
            "assetsValue": 223452
          },
          {
            "year": 2020,
            "month": 12,
            "profitOrLoss": 250000,
            "assetsValue": 1234
          },
          {
            "year": 2020,
            "month": 11,
            "profitOrLoss": 1150,
            "assetsValue": 5789
          },
          {
            "year": 2020,
            "month": 10,
            "profitOrLoss": 2500,
            "assetsValue": 22345
          },
          {
            "year": 2020,
            "month": 9,
            "profitOrLoss": -187000,
            "assetsValue": 223452
          },
          {
            "year": 2020,
            "month": 8,
            "profitOrLoss": 250000,
            "assetsValue": 1234
          },
          {
            "year": 2020,
            "month": 7,
            "profitOrLoss": 1150,
            "assetsValue": 5789
          },
          {
            "year": 2020,
            "month": 6,
            "profitOrLoss": 2500,
            "assetsValue": 22345
          },
          {
            "year": 2020,
            "month": 5,
            "profitOrLoss": -187000,
            "assetsValue": 223452
          },
          {
            "year": 2020,
            "month": 4,
            "profitOrLoss": 250000,
            "assetsValue": 1234
          },
          {
            "year": 2020,
            "month": 3,
            "profitOrLoss": 1150,
            "assetsValue": 5789
          },
          {
            "year": 2020,
            "month": 2,
            "profitOrLoss": 2500,
            "assetsValue": 22345
          },
          {
            "year": 2020,
            "month": 1,
            "profitOrLoss": -187000,
            "assetsValue": 223452
          }
        ]
      };

      mockBalanceSheetService.getBusinessBalanceSheet.mockReturnValueOnce(preAssessment20Scenerio);
      const response = await appService.submitLoanApproval(request);
      expect(response).toBeDefined();
      expect(response.preAssessment).toEqual(20);
    });
  });

  it('should call submit loan and return with pre assessment value as 60', async () => {
    const request = {
      "loanDetails": {
        "business": {
          "ABN": "BUSINESS2"
        },
        "loanAmount": 10000,
        "provider": "MYOB"
      } as LoanDetailsDto
    } as LoanDto;


    const preAssessment60Scenerio = {
      "abn": "BUSINESS1",
      "balanceSheet": [
        {
          "year": 2021,
          "month": 12,
          "profitOrLoss": 100000,
          "assetsValue": -1000000
        },
        {
          "year": 2021,
          "month": 11,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2021,
          "month": 10,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2021,
          "month": 9,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2021,
          "month": 8,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2021,
          "month": 7,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2021,
          "month": 6,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2021,
          "month": 5,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2021,
          "month": 4,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2021,
          "month": 3,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2021,
          "month": 2,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2021,
          "month": 1,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2020,
          "month": 12,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2020,
          "month": 11,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2020,
          "month": 10,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2020,
          "month": 9,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2020,
          "month": 8,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2020,
          "month": 7,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2020,
          "month": 6,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2020,
          "month": 5,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2020,
          "month": 4,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2020,
          "month": 3,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2020,
          "month": 2,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2020,
          "month": 1,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        }
      ]
    };

    mockBalanceSheetService.getBusinessBalanceSheet.mockReturnValueOnce(preAssessment60Scenerio);
    const response = await appService.submitLoanApproval(request);
    expect(response).toBeDefined();
    expect(response.preAssessment).toEqual(60);
  });

  it('should call submit loan and return with pre assessment value as 100', async () => {
    const request = {
      "loanDetails": {
        "business": {
          "ABN": "BUSINESS2"
        },
        "loanAmount": 10000,
        "provider": "MYOB"
      } as LoanDetailsDto
    } as LoanDto;


    const preAssessment100Scenerio = {
      "abn": "BUSINESS1",
      "balanceSheet": [
        {
          "year": 2021,
          "month": 12,
          "profitOrLoss": 100000,
          "assetsValue": 1000000
        },
        {
          "year": 2021,
          "month": 11,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2021,
          "month": 10,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2021,
          "month": 9,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2021,
          "month": 8,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2021,
          "month": 7,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2021,
          "month": 6,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2021,
          "month": 5,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2021,
          "month": 4,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2021,
          "month": 3,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2021,
          "month": 2,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2021,
          "month": 1,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2020,
          "month": 12,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2020,
          "month": 11,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2020,
          "month": 10,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2020,
          "month": 9,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2020,
          "month": 8,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2020,
          "month": 7,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2020,
          "month": 6,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2020,
          "month": 5,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        },
        {
          "year": 2020,
          "month": 4,
          "profitOrLoss": 250000,
          "assetsValue": 1234
        },
        {
          "year": 2020,
          "month": 3,
          "profitOrLoss": 1150,
          "assetsValue": 5789
        },
        {
          "year": 2020,
          "month": 2,
          "profitOrLoss": 2500,
          "assetsValue": 22345
        },
        {
          "year": 2020,
          "month": 1,
          "profitOrLoss": -187000,
          "assetsValue": 223452
        }
      ]
    };

    mockBalanceSheetService.getBusinessBalanceSheet.mockReturnValueOnce(preAssessment100Scenerio);
    const response = await appService.submitLoanApproval(request);
    expect(response).toBeDefined();
    expect(response.preAssessment).toEqual(100);
  });
});