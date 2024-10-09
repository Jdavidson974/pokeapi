import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Controller('pokemons')
export class PokemonsController {
  constructor(private readonly pokemonsService: PokemonsService) { }

  @Post('bingo')
  bingo(@Body() pokelist: string[]) {
    try {
      const pokelistArray = pokelist[0].split(" ").map(el => el.trim())
      const bingoCase = 25
      if (pokelistArray.length == bingoCase) {
        return this.pokemonsService.bingo(pokelistArray);
      } else {
        return new HttpException('You must have a 25 pokemon in the list. Actually you have ' + pokelistArray.length, HttpStatus.BAD_REQUEST)
      }
    } catch (e) {
      throw new HttpException("Erreur Format", HttpStatus.BAD_REQUEST)
    }
  }

  // @Post()
  // create(@Body() createPokemonDto: CreatePokemonDto[]) {
  //   return this.pokemonsService.create(createPokemonDto);
  // }

  // @Post('asignBiome')
  // asignBiome(@Body() body: { pokelist: string[], biomeId: number }) {
  //   return this.pokemonsService.asignBiome(body.pokelist, body.biomeId);
  // }

  // @Get('addAllPokemonImg')
  // addAllPokemonImg() {
  //   return this.pokemonsService.addImgOnPokemons()
  // }
}
