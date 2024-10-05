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
  create(pokelist: JdPokemon[]) {
    // return this.biomeRepo.find({ where: { name: "Land" } }).then();
  }

  findAll() {
    return `This action returns all biomes`;
  }

  findOne(id: number) {
    return this.biomeRepo.findOneBy({ id: id });
  }

  update(id: number, updateBiomeDto: UpdateBiomeDto) {
    return `This action updates a #${id} biome`;
  }

  remove(id: number) {
    return `This action removes a #${id} biome`;
  }
}
