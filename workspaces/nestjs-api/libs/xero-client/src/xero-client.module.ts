import { Module } from '@nestjs/common';
import { XeroClientService } from './xero-client.service';

@Module({
  imports: [],
  providers: [XeroClientService],
  exports: [XeroClientService],
})
export class XeroClientModule {}
