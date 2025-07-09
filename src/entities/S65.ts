import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class S65 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idRpt: string;

    @Column()
    idPet: number;

    @Column()
    version: string;

    @Column()
    rtuId: string;

    @Column({ nullable: true })
    errCat: number;

    @Column({ nullable: true })
    errCode: number;

    @Column()
    fh: string;

    @Column()
    et: number;

    @Column()
    c: number;

    @Column({ nullable: true })
    d1: string;

    @Column({ nullable: true })
    d2: string;
}