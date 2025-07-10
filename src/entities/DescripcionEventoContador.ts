// src/entities/DescripcionEventoContador.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 't_descripcion_eventos_contador' })
export class DescripcionEventoContador {
    @PrimaryColumn({ name: 'grp_evento', type: 'int' })
    grpEvento: number;

    @PrimaryColumn({ name: 'cod_evento', type: 'int' })
    codEvento: number;

    @Column({ name: 'des_evento_contador', type: 'varchar', length: 100, nullable: true })
    descripcion: string;

    @Column({ name: 'cod_gravedad_cnt', type: 'int', nullable: true })
    codGravedadCnt: number | null;
}
