import { Injectable } from '@nestjs/common';
import { CreateBusinessPlanDto } from './dto/create-business_plan.dto';
import { UpdateBusinessPlanDto } from './dto/update-business_plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessPlan } from './entities/business_plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BusinessPlanService {
  constructor(@InjectRepository(BusinessPlan) private businesPlanRepo: Repository<BusinessPlan>) { }
  create(createBusinessPlanDto: CreateBusinessPlanDto) {

  }

  findAll() {
    return this.businesPlanRepo.find({ select: { id: true, name: true, price: true } });;
  }

  findOne(id: number) {
    return `This action returns a #${id} businessPlan`;
  }

  update(id: number, updateBusinessPlanDto: UpdateBusinessPlanDto) {
    return `This action updates a #${id} businessPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} businessPlan`;
  }
}
