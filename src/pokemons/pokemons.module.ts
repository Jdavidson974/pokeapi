import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JdPokemon } from './entities/pokemon.entity';
import { JdBiome } from 'src/biomes/entities/biome.entity';
import { BiomesService } from 'src/biomes/biomes.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService, BiomesService],
  imports: [TypeOrmModule.forFeature([JdPokemon, JdBiome]), HttpModule]
})
export class PokemonsModule { }
