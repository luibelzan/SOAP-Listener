import "reflect-metadata"
import config from "../configLoader"
import { DataSource } from "typeorm"
import { S13 } from "./entities/S13"
import { S15 } from "./entities/S15"
import { S31 } from "./entities/S31"
import { S63 } from "./entities/S63"
import { S65 } from "./entities/S65"


export const AppDataSource1 = new DataSource({
    type: "postgres",
    host: config.host,
    port: config.databasePort,
    username: config.username,
    password: config.password,
    database: config.database,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource2 = new DataSource({
    type: "postgres",
    host: config.host2,
    port: config.databasePort2,
    username: config.username2,
    password: config.password2,
    database: config.database2,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource3 = new DataSource({
    type: "postgres",
    host: config.host3,
    port: config.databasePort3,
    username: config.username3,
    password: config.password3,
    database: config.database3,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource4 = new DataSource({
    type: "postgres",
    host: config.host4,
    port: config.databasePort4,
    username: config.username4,
    password: config.password4,
    database: config.database4,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource5 = new DataSource({
    type: "postgres",
    host: config.host5,
    port: config.databasePort5,
    username: config.username5,
    password: config.password5,
    database: config.database5,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource6 = new DataSource({
    type: "postgres",
    host: config.host6,
    port: config.databasePort6,
    username: config.username6,
    password: config.password6,
    database: config.database6,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource7 = new DataSource({
    type: "postgres",
    host: config.host7,
    port: config.databasePort7,
    username: config.username7,
    password: config.password7,
    database: config.database7,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource8 = new DataSource({
    type: "postgres",
    host: config.host8,
    port: config.databasePort8,
    username: config.username8,
    password: config.password8,
    database: config.database8,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})

export const AppDataSource9 = new DataSource({
    type: "postgres",
    host: config.host9,
    port: config.databasePort9,
    username: config.username9,
    password: config.password9,
    database: config.database9,
	schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13, S15, S31, S63, S65],
    migrations: [],
    subscribers: [],
})
