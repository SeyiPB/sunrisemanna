function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the request body
    var data = JSON.parse(e.postData.contents);

    // Get the data from the request
    var firstname = data.firstname;
    var email = data.email;
    var timestamp = data.timestamp;

    // Append the row to the sheet
    sheet.appendRow([firstname, email, timestamp]);

    // Return a success response
    return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}

function setup() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    // Add headers if they don't exist
    if (sheet.getLastRow() === 0) {
        sheet.appendRow(["firstname", "email", "timestamp"]);
    }
}
