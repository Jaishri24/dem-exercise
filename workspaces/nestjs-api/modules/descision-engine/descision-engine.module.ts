import { Module } from '@nestjs/common';
import { DecisionEngineService } from './descision-engine.service';

@Module({
    providers: [DecisionEngineService],
})
export class DescisionEngineModule { }
