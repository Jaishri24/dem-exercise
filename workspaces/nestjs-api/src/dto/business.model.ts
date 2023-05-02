import { ApiProperty } from '@nestjs/swagger';
import { AccountingProviders } from '../../modules/balance-sheet/enums/accounting-providers.enum';

export class Business {
  @ApiProperty({
    type: String,
    description: 'ABN Number',
    required: true,
    example: 'ABN123456789',
  })
  public ABN: string;
}

export class LoanDetails {
  @ApiProperty({
    type: Business,
    description: 'Business Details',
    required: true,
  })
  public business: Business;

  @ApiProperty({
    type: Number,
    description: 'Loan Amount',
    required: true,
    example: 12000,
  })
  public loanAmount: number;

  @ApiProperty({
    description: 'Accounting Provider',
    required: true,
    enum: AccountingProviders,
  })
  public provider: AccountingProviders;
}
