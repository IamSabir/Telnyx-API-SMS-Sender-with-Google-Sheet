function onOpen() {
   const ui = SpreadsheetApp.getUi();
   ui.createMenu('Send Bulk SMS')
      .addItem('Send Now', 'getMessage')
      .addToUi();
}

function getMessage() {
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = ss.getSheets()[0];
   // This represents ALL the data
   var range = sheet.getDataRange();
   var values = range.getValues();
   // This logs the spreadsheet in CSV format with a trailing comma
   var testMode = false;
   var code = [];
   (testMode) ? url = "https://api.telnyx.com/v2/messages" : url = "https://api.telnyx.com/v2/messages";
   // Logger.log(url);
   for (i = 1; i < values.length; i++) {
      fromNumber = values[i][0];
      toContacts = values[i][1];
      sendingMsg = values[i][2];

      Logger.log(fromNumber);

      var raw = JSON.stringify({
         "from": fromNumber,
         "to": toContacts,
         "text": sendingMsg
      });
      Logger.log(raw);
      var myHeaders = JSON.stringify({
         "Content-Type": "application/json",
         "Authorization": "Bearer KEY01803E0028051FEA60C4F0C60EA76D97_fxRVlgJQTR6miMPtafhNfN"
      });
      Logger.log(myHeaders);
      var requestOptions = {
         "method": 'post',
         "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer KEY01803E0028051FEA60C4F0C60EA76D97_fxRVlgJQTR6miMPtafhNfN"
         },
         "payload": raw
      };
      Logger.log(requestOptions);

      
      if(UrlFetchApp.fetch("https://api.telnyx.com/v2/messages", requestOptions)){
         code.push("Sent");
      } else {
         code.push("Error while Sending");
      }

      Logger.log(requestOptions);
   }

   for (var i = 0; i < code.length; i++) {
      sheet.getRange("D" + (i + 2)).setValue(code[i]);
   }

}
