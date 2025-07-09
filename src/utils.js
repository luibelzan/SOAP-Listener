"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenToWebServices = listenToWebServices;
const express_1 = __importDefault(require("express"));
const EventsController_1 = require("./controllers/EventsController");
const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');
function listenToWebServices(port, dataSource) {
    if (dataSource.options.database != '') {
        try {
            dataSource.initialize().then(async () => {
                const app = (0, express_1.default)();
                bodyParserXml(bodyParser);
                app.use(bodyParser.xml());
                app.post('/WS_STGSoapService', (0, EventsController_1.getData)(dataSource));
                app.post('/WS_STG/WS_STG.asmx', (0, EventsController_1.getData)(dataSource));
                app.post('/WS_DC/WS_DC.asmx', (0, EventsController_1.getData)(dataSource));
                app.post('/', (0, EventsController_1.getData)(dataSource));
                app.listen(port, () => {
                    console.log(`Servidor Express escuchando en el puerto ${port}`);
                });
            }).catch(error => console.error(error));
        }
        catch (error) {
            console.error('Error al conectar con la base de datos: ', error);
        }
    }
}
