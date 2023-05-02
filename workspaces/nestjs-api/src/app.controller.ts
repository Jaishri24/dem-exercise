import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Version,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoanDetails } from './dto/business.model';

@Controller('loans')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('1')
  @Post('providers')
  @UsePipes(ValidationPipe)
  @ApiTags('Loans')
  @ApiOperation({ summary: 'Get the accounting providers' })
  async getProviders(): Promise<string[]> {
    return await this.appService.getProviders();
  }

  @Version('1')
  @Post('balancesheet')
  @UsePipes(ValidationPipe)
  @ApiTags('Loans')
  @ApiOperation({ summary: 'Get the balance sheet for a business' })
  async getBalanceSheet(@Body() loanDetails: LoanDetails): Promise<any> {
    return await this.appService.getBalanceSheet(loanDetails);
  }
}
