import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JdPokemon } from './entities/pokemon.entity';
import { JdBiome } from 'src/biomes/entities/biome.entity';
import { BiomesService } from 'src/biomes/biomes.service';

@Module({
  controllers: [PokemonsController],
  providers: [PokemonsService, BiomesService],
  imports: [TypeOrmModule.forFeature([JdPokemon, JdBiome])]
})
export class PokemonsModule { }
