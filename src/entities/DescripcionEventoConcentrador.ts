// src/entities/DescripcionEventoConcentrador.ts

import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 't_descripcion_eventos_concentrador' })
export class DescripcionEventoConcentrador {
    @PrimaryColumn({ name: 'grp_evento_dc', type: 'int' })
    grpEventoDc: number;

    @PrimaryColumn({ name: 'cod_evento_dc', type: 'int' })
    codEventoDc: number;

    @Column({ name: 'des_evento_dc', type: 'varchar', length: 100, nullable: true })
    descripcion: string;

    @Column({ name: 'cod_gravedad_dc', type: 'int', nullable: true })
    codGravedadDc: number | null;
}
