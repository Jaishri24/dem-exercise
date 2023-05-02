import { Test, TestingModule } from '@nestjs/testing';
import { DecisionEngineService } from './decision-engine.service';
import { DecisionModel } from './decision.model';

describe('DecisionEngineService', () => {
    let service: DecisionEngineService;
    let mockDecisionModel: DecisionModel = {
        preAssessment: 60,
        businessDetails: {
            name: "BUSINESS1",
            profitLossSummary: [
                [2024, 50],
                [2023, 60]
            ],
            yearEstablished: 2022
        }
    }
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                DecisionEngineService, 
            ],
        }).compile();
        service = module.get<DecisionEngineService>(DecisionEngineService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return true for decision', async () => {
         expect(await service.computeDecision(mockDecisionModel)).toEqual(true);
    });

    
});
