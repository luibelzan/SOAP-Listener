// src/entities/DescripcionEventoLvs.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 't_descripcion_eventos_lvs' })
export class DescripcionEventoLvs {
    @PrimaryColumn({ name: 'grp_evento', type: 'int' })
    grpEvento: number;

    @PrimaryColumn({ name: 'cod_evento', type: 'int' })
    codEvento: number;

    @Column({ name: 'des_evento_lvs', type: 'varchar', length: 100, nullable: true })
    descripcion: string;
}
