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
    // const pokemons: JdPokemon[] = [];
    // createPokemonDto.map((pokemon: JdPokemon) => {
    //   pokemons.push(pokemon)
    // })

    // console.log(pokemons);

    // return this.pokeRepo.save(pokemons);
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

  asignBiome(pokelist: string[]) {
    return this.pokeRepo.find(
      {
        select: { name: true, idDex: true, biomes: { name: true } },
        relations: { biomes: true },
        order: { name: "ASC" },
        where: { name: In(pokelist) }
      }).then(pokemons => {
        return this.biomesService.findOne(4).then(biome => {
          const newPokemons = pokemons.map(pokemon => {
            pokemon.biomes.push(biome)
          });
          return this.pokeRepo.save(pokemons)
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
