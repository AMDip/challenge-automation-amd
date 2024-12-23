import * as fs from 'fs';
import path from 'path';
import XLSX from 'xlsx';
import { TestDataInterface}  from '../resources/TestDataInterface'

const excelFolderPath = 'tests/resources' + path.sep;

export function readDataFromExcelFile( fileName: string ): TestDataInterface[]{
    const fullPath = excelFolderPath + fileName;
    if(!fs.existsSync(fullPath)) {
        throw new Error(`Cannot find file ${fileName}. Please make sure it exists`);
    }
    const workbook = XLSX.readFile(fullPath);
    const dataFromFirstSheet: TestDataInterface[] = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    return dataFromFirstSheet;
} 