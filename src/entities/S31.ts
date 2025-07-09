import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class S31 {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idRpt: string;

    @Column()
    idPet: number;

    @Column()
    version: string;

    @Column()
    cnc: string;

    @Column()
    cnt: string;

    @Column()
    fh: string;

    @Column()
    clientId: number;

    @Column()
    status: number;

    @Column()
    keyRequest: string;

    //Faltarian los codigos de error (En el software antiguo no los incluyen)
}