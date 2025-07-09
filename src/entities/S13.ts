import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class S13 {

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
  et: number;

  @Column()
  c: number;

  @Column({ nullable: true })
  d1: string;

  @Column({ nullable: true })
  d2: string;

  @Column({ nullable: true })
  errCat: number;

  @Column({ nullable: true })
  errCode: number;

}