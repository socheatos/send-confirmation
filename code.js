function triggerOnEdit(e)
{
  sendEmailOnApproval(e);
  
}
function checkStatusIsApproved(e)
{
  var range = e.range;
  
  if(range.getColumn() === 1 )
  {
    var edited_row = range.getRow();
    
    var status = SpreadsheetApp.getActiveSheet().getRange(edited_row,1).getValue();
    if(status == true)
    {
      return edited_row;
    }
  }
  return 0;
}

function sendEmailOnApproval(e)
{
  var approved_row = checkStatusIsApproved(e);
  
  if(approved_row <= 0)
  {
    return;
  }
  
  sendEmailByRow(approved_row);
}

function sendEmailByRow(row)
{
  var values = SpreadsheetApp.getActiveSheet().getRange(row,1,row,5).getValues();
  var row_values = values[0];
  
  var mail = composeApprovedEmail(row_values);
  
  //SpreadsheetApp.getUi().alert(" subject is "+mail.subject+"\n message "+mail.message);
  MailApp.sendEmail('XXXX@gmail.com',mail.subject,mail.message)
}



function composeApprovedEmail(row_values)
{
  var itemName = row_values[1];
  
  var voucherNo = row_values[2];
  var voucherType = row_values[3];
  var link = row_values[4];

  var message = "The following submission is approved: "+itemName+" "+voucherNo+"\n\nYou can find this submission at: \n"+link+"\n***This is an automated email***\n\nBest, \nXXX";
  var subject = voucherType+" Submission Completed: " +itemName;
  
  return({message:message,subject:subject});
}
/*
function showMessageOnUpdate(e)
{
  var range = e.range;
  
  var columnOfCellEdited = range.getColumn();

  if (columnOfCellEdited === 1) {
    SpreadsheetApp.getUi().alert("Approved " +   range.getA1Notation());  
  };
};
*/

