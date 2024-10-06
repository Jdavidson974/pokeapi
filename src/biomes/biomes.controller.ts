import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BiomesService } from './biomes.service';
import { CreateBiomeDto } from './dto/create-biome.dto';
import { UpdateBiomeDto } from './dto/update-biome.dto';

@Controller('biomes')
export class BiomesController {
  constructor(private readonly biomesService: BiomesService) { }
}
