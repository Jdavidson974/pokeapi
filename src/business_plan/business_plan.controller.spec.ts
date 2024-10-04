import { Test, TestingModule } from '@nestjs/testing';
import { BusinessPlanController } from './business_plan.controller';
import { BusinessPlanService } from './business_plan.service';

describe('BusinessPlanController', () => {
  let controller: BusinessPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessPlanController],
      providers: [BusinessPlanService],
    }).compile();

    controller = module.get<BusinessPlanController>(BusinessPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
