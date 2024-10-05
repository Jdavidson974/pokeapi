import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';
import { BiomesModule } from './biomes/biomes.module';
import { PokemonsModule } from './pokemons/pokemons.module';
import { JdPokemon } from './pokemons/entities/pokemon.entity';
import { JdBiome } from './biomes/entities/biome.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [JdPokemon, JdBiome],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BiomesModule,
    PokemonsModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
