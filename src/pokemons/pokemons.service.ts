import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JdPokemon } from './entities/pokemon.entity';
import { In, Repository } from 'typeorm';
import { BiomesService } from 'src/biomes/biomes.service';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(JdPokemon) private pokeRepo: Repository<JdPokemon>,
    private biomesService: BiomesService
  ) { }
  create(createPokemonDto: CreatePokemonDto[]) {
    const pokemons: JdPokemon[] = [];
    createPokemonDto.map((pokemon: JdPokemon) => {
      const pokename = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      pokemon.name = pokename
      pokemons.push(pokemon)
    })

    console.log(pokemons);

    return this.pokeRepo.save(pokemons);
  }

  bingo(pokelist: string[]) {
    return this.pokeRepo.find(
      {
        select: { name: true, idDex: true, biomes: { name: true } },
        relations: { biomes: true },
        order: { biomes: { name: "ASC" } },
        where: { name: In(pokelist) }
      });
  }

  asignBiome(pokelist: string[], biomeID: number) {
    return this.pokeRepo.find(
      {
        select: { id: true, name: true, idDex: true, biomes: { id: true, name: true } },
        relations: { biomes: true },
        order: { name: "ASC" },
        where: { name: In(pokelist) }
      }).then(pokemons => {
        return this.biomesService.findOne(biomeID).then(biome => {
          pokemons.map(pokemon => {
            if (!pokemon.biomes.find(b => b.id == biomeID)) {
              pokemon.biomes.push({ ...biome });
            }
          });
          return this.pokeRepo.save(pokemons)
        })
      });
  }

  debugBiome(pokelist: string[]) {
    return this.pokeRepo.find(
      {
        select: { id: true, name: true, idDex: true, biomes: { id: true, name: true } },
        relations: { biomes: true },
        order: { name: "ASC" },
        where: { name: In(pokelist) }
      }).then(pokemons => {
        return this.biomesService.findOne(3).then(biome => {
          const newPokemons = pokemons.map(pokemon => {
            pokemon.biomes.pop()
            console.log(pokemon.name);
            console.log(pokemon.biomes);

          });
          return newPokemons
        })
      });
  }
  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
