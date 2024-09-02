var _ = require('lodash');
const { google } = require('googleapis');
// googleSheetsService.js
const {GoogleSpreadsheet}=require('google-spreadsheet');
const {JWT}=require('google-auth-library');
const {convertArrayObject}=require('../utils/ArrToObject');
const {changeObjectKeys}=require('../utils/changeObjectKeys');
const spreadsheetId=process.env.SHEED_ID
const googleServiceMail=process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const googlePrivateKey=process.env.GOOGLE_PRIVATE_KEY


// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
    // env var values here are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    email:googleServiceMail,
    key: googlePrivateKey.replace(/\\n/g, '\n'), 
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  });
  

async function getContacts() {
    const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

    await doc.loadInfo(); // loads document properties and worksheets

    
    const sheet = doc.sheetsByIndex[0]; // or use `doc.sheetsById[id]` or `doc.sheetsByTitle[title]`
  
    const rows= await sheet.getRows();

    
    if(rows){
      const headerValues=rows[0]._worksheet._headerValues;
      const data =rows.map(item=>(
        item._rawData
      ))
      
      const el = convertArrayObject(data);

      const finalData= el.map(item=>(
        _.mapKeys(item, function(value, key) {
            return headerValues[+key]
          })
      ))

      return finalData;
    } 
}


module.exports = {getContacts}