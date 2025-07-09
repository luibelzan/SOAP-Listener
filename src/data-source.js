"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource9 = exports.AppDataSource8 = exports.AppDataSource7 = exports.AppDataSource6 = exports.AppDataSource5 = exports.AppDataSource4 = exports.AppDataSource3 = exports.AppDataSource2 = exports.AppDataSource1 = void 0;
require("reflect-metadata");
const configLoader_1 = __importDefault(require("../configLoader"));
const typeorm_1 = require("typeorm");
const S13_1 = require("./entities/S13");
const S15_1 = require("./entities/S15");
const S31_1 = require("./entities/S31");
const S63_1 = require("./entities/S63");
const S65_1 = require("./entities/S65");
exports.AppDataSource1 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host,
    port: configLoader_1.default.databasePort,
    username: configLoader_1.default.username,
    password: configLoader_1.default.password,
    database: configLoader_1.default.database,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource2 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host2,
    port: configLoader_1.default.databasePort2,
    username: configLoader_1.default.username2,
    password: configLoader_1.default.password2,
    database: configLoader_1.default.database2,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource3 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host3,
    port: configLoader_1.default.databasePort3,
    username: configLoader_1.default.username3,
    password: configLoader_1.default.password3,
    database: configLoader_1.default.database3,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource4 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host4,
    port: configLoader_1.default.databasePort4,
    username: configLoader_1.default.username4,
    password: configLoader_1.default.password4,
    database: configLoader_1.default.database4,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource5 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host5,
    port: configLoader_1.default.databasePort5,
    username: configLoader_1.default.username5,
    password: configLoader_1.default.password5,
    database: configLoader_1.default.database5,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource6 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host6,
    port: configLoader_1.default.databasePort6,
    username: configLoader_1.default.username6,
    password: configLoader_1.default.password6,
    database: configLoader_1.default.database6,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource7 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host7,
    port: configLoader_1.default.databasePort7,
    username: configLoader_1.default.username7,
    password: configLoader_1.default.password7,
    database: configLoader_1.default.database7,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource8 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host8,
    port: configLoader_1.default.databasePort8,
    username: configLoader_1.default.username8,
    password: configLoader_1.default.password8,
    database: configLoader_1.default.database8,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource9 = new typeorm_1.DataSource({
    type: "postgres",
    host: configLoader_1.default.host9,
    port: configLoader_1.default.databasePort9,
    username: configLoader_1.default.username9,
    password: configLoader_1.default.password9,
    database: configLoader_1.default.database9,
    schema: "core",
    synchronize: true,
    logging: false,
    entities: [S13_1.S13, S15_1.S15, S31_1.S31, S63_1.S63, S65_1.S65],
    migrations: [],
    subscribers: [],
});
