import config from "../configLoader";
import { AppDataSource1, AppDataSource2, AppDataSource3, AppDataSource4, AppDataSource5, AppDataSource6, AppDataSource7, AppDataSource8, AppDataSource9 } from "./data-source"
import { listenToWebServices } from "./utils";

const PORT = config.listenPort;
const PORT2 = config.listenPort2;
const PORT3 = config.listenPort3;
const PORT4 = config.listenPort4;
const PORT5 = config.listenPort5;
const PORT6 = config.listenPort6;
const PORT7 = config.listenPort7;
const PORT8 = config.listenPort8;
const PORT9 = config.listenPort9;

listenToWebServices(PORT, AppDataSource1);

listenToWebServices(PORT2, AppDataSource2);

listenToWebServices(PORT3, AppDataSource3);

listenToWebServices(PORT4, AppDataSource4);

listenToWebServices(PORT5, AppDataSource5);

listenToWebServices(PORT6, AppDataSource6);

listenToWebServices(PORT7, AppDataSource7);

listenToWebServices(PORT8, AppDataSource8);

listenToWebServices(PORT9, AppDataSource9);

