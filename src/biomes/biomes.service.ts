import { Injectable } from '@nestjs/common';
import { CreateBiomeDto } from './dto/create-biome.dto';
import { UpdateBiomeDto } from './dto/update-biome.dto';
import { JdPokemon } from 'src/pokemons/entities/pokemon.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JdBiome } from './entities/biome.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BiomesService {
  constructor(@InjectRepository(JdBiome) private biomeRepo: Repository<JdBiome>) {

  }
  findOne(id: number) {
    return this.biomeRepo.findOneBy({ id: id });
  }
}
