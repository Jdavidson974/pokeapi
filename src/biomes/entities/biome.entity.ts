import { JdPokemon } from "src/pokemons/entities/pokemon.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JdBiome {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 50 })
    name: string

    @ManyToMany(() => JdPokemon, (pokemons) => pokemons.biomes)
    pokemons: JdPokemon[];
}
