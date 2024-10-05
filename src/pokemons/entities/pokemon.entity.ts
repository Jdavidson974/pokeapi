import { JdBiome } from "src/biomes/entities/biome.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JdPokemon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string;

    @Column()
    idDex: number;

    @JoinTable()
    @ManyToMany(() => JdBiome, (biome) => biome.pokemons)
    biomes: JdBiome[];

}
