import { Injectable } from '@nestjs/common';
import * as MOCKED_RESPONSE from './simulated-balance-sheet.json';

@Injectable()
export class XeroClientService {
    async getBusinessBalanceSheet(abn: string){
        const abnDetails = MOCKED_RESPONSE.filter((abnDetails) => abnDetails.abn === abn);

         if(abnDetails.length > 0){
            return abnDetails[0];
         } else {
            return null;
         }
     }
}
