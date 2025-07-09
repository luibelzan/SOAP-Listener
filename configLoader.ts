import * as fs from 'fs';
import * as ini from 'ini';

const config = ini.parse(fs.readFileSync('config.ini', 'utf-8'));

export default config;