import { Injectable } from '@nestjs/common';
import * as MOCKED_RESPONSE from './simulated-balance-sheet.json';
import { BaseClientService } from 'libs/base-client/base-client.service';

@Injectable()
export class MYOBClientService implements BaseClientService {
  async getBusinessBalanceSheet(abn: string) {
    const abnDetails = MOCKED_RESPONSE.filter(
      (abnDetails) => abnDetails.abn === abn,
    );

    if (abnDetails.length > 0) {
      return abnDetails[0];
    } else {
      return undefined;
    }
  }
}
