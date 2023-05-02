import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalanceSheetModule } from '../modules/balance-sheet/balance-sheet.module';
import { DescisionEngineModule } from '../modules/decision-engine/decision-engine.module';

@Module({
  imports: [BalanceSheetModule, DescisionEngineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
