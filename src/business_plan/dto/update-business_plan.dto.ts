import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessPlanDto } from './create-business_plan.dto';

export class UpdateBusinessPlanDto extends PartialType(CreateBusinessPlanDto) {}
