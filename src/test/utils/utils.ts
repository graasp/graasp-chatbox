import Papa from 'papaparse';
import path from 'path';

import { EXPORT_CSV_HEADERS } from '../../constants';

const validateCsvData = (data: unknown[], numMessages: number): void => {
  expect(data).to.have.length(numMessages);
};

const validateHeaders = (headers?: string[]): void => {
  const expectedHeader = EXPORT_CSV_HEADERS.map((h) => h.label);
  expect(headers).to.deep.equal(expectedHeader);
};

export const verifyDownloadedChat = (
  name: string,
  numMessages: number,
): void => {
  // get file from download folder
  const downloadsFolder = Cypress.config('downloadsFolder');
  const filename = path.join(downloadsFolder, name);
  cy.readFile(filename, 'utf-8').then((csvString) => {
    // parse CSV data with headers
    const { data, meta } = Papa.parse(csvString, { header: true });
    validateHeaders(meta.fields);
    validateCsvData(data, numMessages);
  });
};
