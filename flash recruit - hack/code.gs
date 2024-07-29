function running() {
 importRange(
  "1l8qiYLEQl7-gee29DEHVP4_17BUQBEPvNORuPQ6Uu08", "Source!B2:D", "1WlcOjyZATqc9n9UMPh4UysAC3z40IQdL2CeCEtIFNRo", "Applicants!A2"
 );
 
}

function importRange(sourceID, sourceRange, destinationID, destinationRangeStart) {
  const sourceSS = SpreadsheetApp.openById(sourceID);
  const sourceRng = sourceSS.getRange(sourceRange);
  const sourceVal = sourceRng.getValues();

  //console.log(sourceVal);

  const destinationSS = SpreadsheetApp.openById(destinationID);
  const destStartRange = destinationSS.getRange(destinationRangeStart);
  const destSheet = destinationSS.getSheetByName(destStartRange.getSheet().getName());

  const destRange = destSheet.getRange(
    destStartRange.getRow(), //start row
    destStartRange.getColumn(), //start column
    sourceVal.length, //row depth
    sourceVal[0].length 
  );

  destRange.setValues(sourceVal);
}