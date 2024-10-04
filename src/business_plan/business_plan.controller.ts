import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusinessPlanService } from './business_plan.service';
import { CreateBusinessPlanDto } from './dto/create-business_plan.dto';
import { UpdateBusinessPlanDto } from './dto/update-business_plan.dto';

@Controller('business-plan')
export class BusinessPlanController {
  constructor(private readonly businessPlanService: BusinessPlanService) {}

  @Post()
  create(@Body() createBusinessPlanDto: CreateBusinessPlanDto) {
    return this.businessPlanService.create(createBusinessPlanDto);
  }

  @Get()
  findAll() {
    return this.businessPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessPlanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusinessPlanDto: UpdateBusinessPlanDto) {
    return this.businessPlanService.update(+id, updateBusinessPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessPlanService.remove(+id);
  }
}
