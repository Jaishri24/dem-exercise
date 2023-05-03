import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoanDetailsDto } from './dto/business.dto';
import { LoanDto } from './dto/loan.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Get('accounting/providers')
  @UsePipes(ValidationPipe)
  @ApiTags('Accounting')
  @ApiOperation({ summary: 'Get the accounting providers' })
  async getProviders(): Promise<string[]> {
    return await this.appService.getProviders();
  }

  @Version('1')
  @Post('accounting/balancesheet')
  @UsePipes(ValidationPipe)
  @ApiTags('Accounting')
  @ApiOperation({ summary: 'Get the balance sheet for a business' })
  async getBalanceSheet(@Body() loanDetails: LoanDetailsDto): Promise<any> {
    return await this.appService.getBalanceSheet(loanDetails);
  }

  @Version('1')
  @Post('loan/decision')
  @UsePipes(ValidationPipe)
  @ApiTags('Loan')
  @ApiOperation({ summary: 'Submit a loan for approval' })
  async submitLoanApproval(@Body() loan: LoanDto): Promise<any> {
    return await this.appService.submitLoanApproval(loan);
  }
}
