import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DecisionModel } from './decision.model';

@Injectable()
export class DecisionEngineService {
   async computeDecision(decisionModel: DecisionModel){
      console.log(JSON.stringify(decisionModel));
      return true;
   }
}
