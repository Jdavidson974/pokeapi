import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) { }

  // @Post()
  // create(@Body() createPokemonDto: CreatePokemonDto[]) {
  //   return this.pokemonsService.create(createPokemonDto);
  // }

  // @Post('asignBiome')
  // asignBiome(@Body() body: { pokelist: string[], biomeId: number }) {
  //   return this.pokemonsService.asignBiome(body.pokelist, body.biomeId);
  // }

  @Post('bingo')
  bingo(@Body() pokelist: string[]) {
    return this.pokemonsService.bingo(pokelist);
  }
}
