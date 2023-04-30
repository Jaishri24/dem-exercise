import { Module } from '@nestjs/common';
import { MYOBClientService } from './myob-client.service';

@Module({
  imports: [],
  providers: [MYOBClientService],
  exports: [MYOBClientService]
})
export class MYOBClientModule {}
