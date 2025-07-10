import { Request, Response } from 'express';
import { parseString } from 'xml2js';
import { S13 } from '../entities/S13';
import { S15 } from '../entities/S15';
import { S31 } from '../entities/S31';
import { S63 } from '../entities/S63';
import { S65 } from '../entities/S65';
import { DataSource } from 'typeorm';
import { sendToClientBot } from '../bot/telegramBotManager';

const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<soap:Envelope
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <soap:Body>
    <ReportResponse xmlns="http://www.asais.fr/ns/Saturne/STG/ws">
      <ReportResult>true</ReportResult>
    </ReportResponse>
  </soap:Body>
</soap:Envelope>
`;

const xmlResponseURS = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
<s:Body>
    <UpdateRequestStatusResponse xmlns="http://www.asais.fr/ns/Saturne/STG/ws" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
        <UpdateRequestStatusResult>true</UpdateRequestStatusResult>
    </UpdateRequestStatusResponse>
</s:Body>
</s:Envelope>`;

const xmlResponseUMS = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
<s:Body>
    <UpdateMetersStatusResponse xmlns="http://www.asais.fr/ns/Saturne/STG/ws" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
        <UpdateMetersStatusResult>true</UpdateMetersStatusResult>
    </UpdateMetersStatusResponse>
</s:Body>
</s:Envelope>`;



export function getData(dataSource: DataSource) {
    return async (req: Request, res: Response) => {
        try {
            const fechaHoraActual = new Date();

            // Obtener los componentes de la fecha y hora
            const dia = fechaHoraActual.getDate();
            const mes = fechaHoraActual.getMonth() + 1; // Sumamos 1 porque los meses se indexan desde 0
            const año = fechaHoraActual.getFullYear();
            const hora = fechaHoraActual.getHours();
            const minutos = fechaHoraActual.getMinutes();
            const segundos = fechaHoraActual.getSeconds();
            const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;
            const { body } = req;
            console.log('Trama recibida ', fechaFormateada, `${dataSource.options.database}`)

            // Verificar si el cuerpo de la solicitud contiene datos
            if (body) {
                const envelope = body['soapenv:Envelope'] || body['S:Envelope'] || body['soap:Envelope'] || body['SOAP-ENV:Envelope'];
                const bodyContent = envelope?.['soapenv:Body']?.[0] || envelope?.['S:Body']?.[0] || envelope?.['soap:Body']?.[0] || envelope?.['SOAP-ENV:Body']?.[0];

                const report = bodyContent?.['Report']?.[0]?.['Payload']?.[0] ||
                    bodyContent?.['ns1:Report']?.[0]?.['ns1:Payload']?.[0] ||
                    bodyContent?.['ns2:Report']?.[0]?.['ns2:Payload']?.[0];

                const reportNode =
                    bodyContent?.['Report'] ||
                    bodyContent?.['ns1:Report'] ||
                    bodyContent?.['ns2:Report'];

                if (report !== undefined) {
                    console.log('Evento encontrado. Parseando evento...');
                    const parsedReport = await parseXml(report);
                    console.log('Evento parseado');
                    await processReport(parsedReport, dataSource);
                }
                // Ahora las condiciones para responder
                if (reportNode) {
                    res.set('Content-Type', 'application/xml');
                    res.send(xmlResponse);
                } else if (bodyContent?.['UpdateRequestStatus'] || bodyContent?.['ns1:UpdateRequestStatus'] || bodyContent?.['ns2:UpdateRequestStatus'] || bodyContent?.['ws:UpdateRequestStatus']) {
                    res.set('Content-Type', 'application/xml');
                    res.send(xmlResponseURS);
                } else if (bodyContent?.['UpdateMetersStatus'] || bodyContent?.['ns1:UpdateMetersStatus'] || bodyContent?.['ns2:UpdateMetersStatus'] || bodyContent?.['ws:UpdateMetersStatus']) {
                    res.set('Content-Type', 'application/xml');
                    res.send(xmlResponseUMS);
                } else {
                    // fallback
                    res.status(400).send('Tipo de petición no reconocido');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).send('<h1>Error processing XML</h1>');
        }
    }
};

async function parseXml(xml: string): Promise<any> {
    return new Promise((resolve, reject) => {
        parseString(xml, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

async function processReport(report: any, dataSource: DataSource): Promise<void> {
    console.log('Procesando evento...', `${dataSource.options.database}`)
    const fechaHoraActual = new Date();

    // Obtener los componentes de la fecha y hora
    const dia = fechaHoraActual.getDate();
    const mes = fechaHoraActual.getMonth() + 1; // Sumamos 1 porque los meses se indexan desde 0
    const año = fechaHoraActual.getFullYear();
    const hora = fechaHoraActual.getHours();
    const minutos = fechaHoraActual.getMinutes();
    const segundos = fechaHoraActual.getSeconds();

    // Formatear la fecha y hora
    const fechaFormateada = `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;

    const { IdRpt, IdPet, Version } = report.Report.$;

    switch (IdRpt) {
        case 'S13':
            await processS13(report, IdRpt, IdPet, Version, fechaFormateada, dataSource);
            break;
        case 'S15':
            await processS15(report, IdRpt, IdPet, Version, fechaFormateada, dataSource);
            break;
        case 'S31':
            await processS31(report, IdRpt, IdPet, Version, fechaFormateada, dataSource);
            break;
        case 'S63':
            await processS63(report, IdRpt, IdPet, Version, fechaFormateada, dataSource);
            break;
        case 'S65':
            await processS65(report, IdRpt, IdPet, Version, fechaFormateada, dataSource);
            break;
        default:
            console.error(`Unknown report type: ${IdRpt}`);
            break;
    }
}

async function processS13(report: any, idRpt: string, idPet: number, version: string, fecha: string, dataSource: DataSource): Promise<void> {
    try {
        console.log('S13 encontrado')
        const s13Repository = dataSource.getRepository(S13);
        var s13 = new S13();
        s13.idRpt = idRpt;
        s13.idPet = idPet;
        s13.version = version;
        s13.cnc = report.Report.Cnc[0].$.Id;
        s13.cnt = report.Report.Cnc[0].Cnt[0].$.Id;
        s13.fh = report.Report.Cnc[0].Cnt[0].S13[0].$.Fh;
        s13.et = parseInt(report.Report.Cnc[0].Cnt[0].S13[0].$.Et);
        s13.c = parseInt(report.Report.Cnc[0].Cnt[0].S13[0].$.C);
        s13.d1 = report.Report.Cnc[0].Cnt[0].S13[0].D1?.[0];
        s13.d2 = report.Report.Cnc[0].Cnt[0].S13[0].D2?.[0];
        if (report.Report.Cnc[0].Cnt[0].S13[0].$.ErrCat !== undefined) {
            s13.errCat = parseInt(report.Report.Cnc[0].Cnt[0].S13[0].$.ErrCat);
            s13.errCode = parseInt(report.Report.Cnc[0].Cnt[0].S13[0].$.ErrCode);
        }
        s13Repository.save(s13);
        console.log('S13 event inserted on DB ', fecha, `${dataSource.options.database}`, '/n');

        // 🔔 Notificación por Telegram
        const dbName = dataSource.options.database as string;
        const c = s13.c ?? 'N/A';
        const et = s13.et;

        const message =
            `<b>📥 Reporte recibido</b>
            🗂 <b>Tipo:</b> S13
            📁 <b>Cliente:</b> ${dbName}
            📅 <b>Fecha:</b> ${fecha}
            🔢 <b>C:</b> ${c}
            ⚙️ <b>Et:</b> ${et}`;

        sendToClientBot(dbName, message);
    } catch (error) {
        console.error('Error al procesar S13: ', error);
    }

}

async function processS15(report: any, idRpt: string, idPet: number, version: string, fecha: string, dataSource: DataSource): Promise<void> {
    try {
        console.log('S15 detectado')
        const s15Repository = dataSource.getRepository(S15);
        var s15 = new S15();
        s15.idRpt = idRpt;
        s15.idPet = idPet;
        s15.version = version;
        s15.cnc = report.Report.Cnc[0].$.Id;
        s15.fh = report.Report.Cnc[0].S15[0].$.Fh;
        s15.et = parseInt(report.Report.Cnc[0].S15[0].$.Et);
        s15.c = parseInt(report.Report.Cnc[0].S15[0].$.C);
        s15.d1 = report.Report.Cnc[0].S15[0].D1?.[0];
        s15.d2 = report.Report.Cnc[0].S15[0].D2?.[0];
        s15Repository.save(s15);
        console.log('S15 event inserted on DB ', fecha, `${dataSource.options.database}`, '/n');

        // 🔔 Notificación por Telegram
        const dbName = dataSource.options.database as string;
        const c = s15.c ?? 'N/A';
        const et = s15.et;

        const message =
            `<b>📥 Reporte recibido</b>
            🗂 <b>Tipo:</b> S15
            📁 <b>Cliente:</b> ${dbName}
            📅 <b>Fecha:</b> ${fecha}
            🔢 <b>C:</b> ${c}
            ⚙️ <b>Et:</b> ${et}`;

        sendToClientBot(dbName, message);
    } catch (error) {
        console.error('Error al procesar S15:', error);
    }

}

async function processS31(report: any, idRpt: string, idPet: number, version: string, fecha: string, dataSource: DataSource): Promise<void> {
    try {
        console.log('S31 detectado')
        const s31Repository = dataSource.getRepository(S31);
        var s31 = new S31();
        s31.idRpt = idRpt;
        s31.idPet = idPet;
        s31.version = version;
        s31.cnc = report.Report.Cnc[0].$.Id;
        s31.cnt = report.Report.Cnc[0].Cnt[0].$.Id;
        s31.fh = report.Report.Cnc[0].Cnt[0].S31[0].$.Fh;
        s31.clientId = parseInt(report.Report.Cnc[0].Cnt[0].S31[0].$.ClientId);
        s31.status = parseInt(report.Report.Cnc[0].Cnt[0].S31[0].$.Status);
        s31.keyRequest = report.Report.Cnc[0].Cnt[0].S31[0].$.KeyRequest;
        s31Repository.save(s31);
        console.log('S31 event inserted on DB ', fecha, `${dataSource.options.database}`, '/n');

        // 🔔 Notificación por Telegram
        const dbName = dataSource.options.database as string;
        const status = s31.status;

        const message =
            `<b>📥 Reporte recibido</b>
            🗂 <b>Tipo:</b> S31
            📁 <b>Cliente:</b> ${dbName}
            📅 <b>Fecha:</b> ${fecha}
            🔢 <b>Status:</b> ${status}`;

        sendToClientBot(dbName, message);
    } catch (error) {
        console.error('Error al procesar S31:', error);
    }

}

async function processS63(report: any, idRpt: string, idPet: number, version: string, fecha: string, dataSource: DataSource): Promise<void> {
    try {
        for (let i = 0; i < Object.keys(report.Report.Rtu[0].LVSLine[0].S63).length; i++) {
            console.log('S63 detectado')
            var s63Repository = dataSource.getRepository(S63);
            var s63 = new S63();
            s63.idRpt = idRpt;
            s63.idPet = idPet;
            s63.version = version;
            s63.rtuId = report.Report.Rtu[0].$.Id;
            s63.lvsId = report.Report.Rtu[0].LVSLine[0].$.Id;
            s63.lvsPos = parseInt(report.Report.Rtu[0].LVSLine[0].$.Pos);
            if (report.Report.Rtu[0].LVSLine[0].$.ErrCat !== undefined) {
                s63.errCat = parseInt(report.Report.Rtu[0].LVSLine[0].$.ErrCat);
                s63.errCode = parseInt(report.Report.Rtu[0].LVSLine[0].$.ErrCode);
            }
            s63.fh = report.Report.Rtu[0].LVSLine[0].S63[i].$.Fh;
            s63.et = parseInt(report.Report.Rtu[0].LVSLine[0].S63[i].$.Et);
            s63.c = parseInt(report.Report.Rtu[0].LVSLine[0].S63[i].$.C);
            s63.d1 = report.Report.Rtu[0].LVSLine[0].S63[i].D1?.[0];
            s63.d2 = report.Report.Rtu[0].LVSLine[0].S63[i].D2?.[0];
            s63Repository.save(s63);
            console.log('S63 event inserted on DB ', fecha, `${dataSource.options.database}`, '/n');

            // 🔔 Notificación por Telegram
            const dbName = dataSource.options.database as string;
            const c = s63.c ?? 'N/A';
            const et = s63.et;

            const message =
                `<b>📥 Reporte recibido</b>
            🗂 <b>Tipo:</b> S63
            📁 <b>Cliente:</b> ${dbName}
            📅 <b>Fecha:</b> ${fecha}
            🔢 <b>C:</b> ${c}
            ⚙️ <b>Et:</b> ${et}`;

            sendToClientBot(dbName, message);
        }
    } catch (error) {
        console.error('Error al procesar S63: ', error);
    }

}

async function processS65(report: any, idRpt: string, idPet: number, version: string, fecha: string, dataSource: DataSource): Promise<void> {
    try {
        for (let i = 0; i < Object.keys(report.Report.Rtu[0].S65).length; i++) {
            console.log('S65 detectado')
            var s65Repository = dataSource.getRepository(S65);
            var s65 = new S65();
            s65.idRpt = idRpt;
            s65.idPet = idPet;
            s65.version = version;
            s65.rtuId = report.Report.Rtu[0].$.Id;
            if (report.Report.Rtu[0].$.ErrCat !== undefined) {
                s65.errCat = parseInt(report.Report.Rtu[0].$.ErrCat);
                s65.errCode = parseInt(report.Report.Rtu[0].$.ErrCode);
            }
            s65.fh = report.Report.Rtu[0].S65[i].$.Fh;
            s65.et = parseInt(report.Report.Rtu[0].S65[i].$.Et);
            s65.c = parseInt(report.Report.Rtu[0].S65[i].$.C);
            s65.d1 = report.Report.Rtu[0].S65[i].D1?.[0];
            s65.d2 = report.Report.Rtu[0].S65[i].D2?.[0];
            s65Repository.save(s65);
            console.log('S65 event inserted on DB ', fecha, `${dataSource.options.database}`, '/n');

            // 🔔 Notificación por Telegram
        const dbName = dataSource.options.database as string;
        const c = s65.c ?? 'N/A';
        const et = s65.et;

        const message = 
            `<b>📥 Reporte recibido</b>
            🗂 <b>Tipo:</b> S65
            📁 <b>Cliente:</b> ${dbName}
            📅 <b>Fecha:</b> ${fecha}
            🔢 <b>C:</b> ${c}
            ⚙️ <b>Et:</b> ${et}`;

        sendToClientBot(dbName, message);
        }
    } catch (error) {
        console.error('Error al procesar S65:', error);
    }

}