import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class S15 {

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
