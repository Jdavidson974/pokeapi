import { Module } from '@nestjs/common';
import { BusinessPlanService } from './business_plan.service';
import { BusinessPlanController } from './business_plan.controller';
import { BusinessPlan } from './entities/business_plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [BusinessPlanController],
  providers: [BusinessPlanService],
  imports: [TypeOrmModule.forFeature([BusinessPlan])],
})
export class BusinessPlanModule { }
