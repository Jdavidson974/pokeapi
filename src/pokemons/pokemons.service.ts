import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { JdPokemon } from './entities/pokemon.entity';
import { In, IsNull, Repository } from 'typeorm';
import { BiomesService } from 'src/biomes/biomes.service';
import { HttpService } from '@nestjs/axios';
import { tap } from 'rxjs';

@Injectable()
export class PokemonsService {
  constructor(
    @InjectRepository(JdPokemon) private pokeRepo: Repository<JdPokemon>,
    private biomesService: BiomesService,
    private readonly httpService: HttpService
  ) { }
  //Add img on pokemons
  addImgOnPokemons() {
    return this.pokeRepo.find({ select: { id: true, name: true, idDex: true, imgUrl: true }, where: { imgUrl: IsNull() } }).then(
      pokemons => {
        console.log(pokemons);
        return pokemons.forEach(async pokemon => {
          //todo faire la req
          this.httpService.get('https://pokeapi.co/api/v2/pokemon/' + pokemon.idDex).pipe(
            tap(data => {
              if (data.data) {
                const imgurl = data.data.sprites.front_default;
                pokemon.imgUrl = imgurl;
                console.log(pokemon);
                this.pokeRepo.save(pokemon)
              }
            })
          ).subscribe();
        })
        //return this.pokeRepo.save(pokemons);
      }
    )
  }
  //Create pokemon
  create(createPokemonDto: CreatePokemonDto[]) {
    const pokemons: JdPokemon[] = [];
    createPokemonDto.map((pokemon: JdPokemon) => {
      const pokename = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      pokemon.name = pokename
      pokemons.push(pokemon)
    })
    return this.pokeRepo.save(pokemons);
  }
  //Get pokemon and biome for bingo
  bingo(pokelist: string[]) {
    const placeholders = pokelist.map(() => '?').join(',');
    const query = `
    SELECT jd_biome.name, COUNT(jd_pokemon.id) AS pokeNumber, GROUP_CONCAT(jd_pokemon.name SEPARATOR ', ') As pokeList
    FROM jd_biome 
    INNER JOIN jd_pokemon_biomes_jd_biome ON jd_pokemon_biomes_jd_biome.jdBiomeId = jd_biome.id 
    INNER JOIN jd_pokemon ON jd_pokemon_biomes_jd_biome.jdPokemonId = jd_pokemon.id 
    WHERE jd_pokemon.name IN (${placeholders}) 
    GROUP BY jd_biome.name
    ORDER BY PokeNumber DESC 
  `;

    return this.pokeRepo.query(query, pokelist).then(
      result => {
        return Promise.all(
          result.map((data: {
            pokebingo: JdPokemon[]; name: string, pokeList: any, nbPokebingo: number
          }) => {
            const pokeListOnBiome: string[] = data.pokeList.split(",").map(el => el.trim());
            return this.pokeRepo.find({ select: { id: true, name: true, imgUrl: true }, where: { name: In(pokeListOnBiome) } }).then(
              pokemons => {
                data.pokeList = pokemons;
                return data
              }
            )
          })
        ).then(data => {
          // Utilisation de FIELD pour conserver l'ordre du tableau pokelist
          const orderByClause = `FIELD(name, ${pokelist.map(name => `'${name}'`).join(', ')})`;

          const orderedQuery = `
            SELECT id, name, imgUrl 
            FROM jd_pokemon 
            WHERE name IN (${pokelist.map(() => '?').join(', ')}) 
            ORDER BY ${orderByClause}
          `;
          return this.pokeRepo.query(orderedQuery, pokelist).then((pokeBingo: JdPokemon[]) => {
            return { data, pokeBingo, count: pokeBingo.length };
          });
        });
      }
    );
  }
  //Asign Biome for pokemon
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
}
