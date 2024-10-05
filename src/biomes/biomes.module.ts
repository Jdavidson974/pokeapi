import { Module } from '@nestjs/common';
import { BiomesService } from './biomes.service';
import { BiomesController } from './biomes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JdBiome } from './entities/biome.entity';

@Module({
  controllers: [BiomesController],
  providers: [BiomesService],
  imports: [TypeOrmModule.forFeature([JdBiome])]
})
export class BiomesModule { }
