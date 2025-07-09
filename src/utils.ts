import { DataSource } from "typeorm";
import express from 'express';
import { getData } from "./controllers/EventsController";

const bodyParser = require('body-parser');
const bodyParserXml = require('body-parser-xml');

export function listenToWebServices(port: number, dataSource: DataSource) {
    if(dataSource.options.database != '') {
        try {
            dataSource.initialize().then(async () => {
				const app = express();
                bodyParserXml(bodyParser);
                app.use(bodyParser.xml());
    
                app.post('/WS_STGSoapService', getData(dataSource));
                app.post('/WS_STG/WS_STG.asmx', getData(dataSource));
                app.post('/WS_DC/WS_DC.asmx', getData(dataSource));
                app.post('/', getData(dataSource));
    
                app.listen(port, () => {
                    console.log(`Servidor Express escuchando en el puerto ${port}`)
                });
            }).catch(error => console.error(error))
        } catch(error) {
            console.error('Error al conectar con la base de datos: ', error);
        }
    } 
}