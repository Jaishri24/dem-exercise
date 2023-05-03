import { ApiProperty } from "@nestjs/swagger";
import { LoanDetailsDto } from "./business.dto";

export class LoanDto {
    @ApiProperty({
        type: LoanDetailsDto,
        description: 'Loan Details',
        required: true,
    })
    public loanDetails: LoanDetailsDto;
}  