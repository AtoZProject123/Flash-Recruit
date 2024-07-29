/*
function autoMail() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let address = sheet.getRange('B4').getValue();
  let subject = sheet.getRange('C4').getValue();
  let body = `Congrats ${subject}! you passed`;

  MailApp.sendEmail(address,subject,body);
}*/


function makeCalendarEvent() {
  let events = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  let sent = [];
  let newEvents = [];

  events.forEach(function(e) {
    if(e[6]){
      sent.push(e[1]);
    }else {
      newEvents.unshift(e[1]);
    }
  });

  events.forEach(function(e) {
    if(!e[6] && e[3] == 'Interview'){
      let guestEmail = e[0];
      let startDate = new Date(e[4]);
      let endDate = new Date(e[5]);
      let desc = 'We invite you to join our interview. Please be prepared and join on time. Thank you!'

        /* Log values for debugging
        Logger.log('Creating event for: ' + guestEmail);
        Logger.log('Event title: Interview for ' + e[1]);
        Logger.log('Start Date: ' + startDate);
        Logger.log('End Date: ' + endDate);
        */

        // Check if email is valid
      if (!guestEmail || !guestEmail.includes('@')) {
          Logger.log('Invalid email: ' + guestEmail);
          return; // Skip this entry if email is invalid
      }

        // Create event
      try {
        CalendarApp.getCalendarById('c76daed995a09bfed25ab54a5ce2557fe43c69c888f8ed114a25e2afd0761a4d@group.calendar.google.com').createEvent(
          'Interview for ' + e[1], 
          startDate,
          endDate,
          {
            guests: guestEmail, 
            sendInvites: true,
            description: desc
          }
        );
        Logger.log('Event created successfully for ' + guestEmail);

        } catch (error) {
          Logger.log('Error creating event: ' + error.message);
        }
    }
  });
}

function hiredEmail(e) {
  let ss = e.source.getActiveSheet();
  let range = e.range;
  let editCell = range.getA1Notation();
  let accept = 8;
  let decline = 9;

  if (range.getColumn() == accept && range.getRow() >= 2) {
    if (range.getValue() === true) {
      let recipient = ss.getRange(range.getRow(),1).getValue();
      let subject = 'Job Offer Acceptance for ' + ss.getRange(range.getRow(),2).getValue();;
      let body = 'Dear ' + ss.getRange(range.getRow(),2).getValue() + ', \n We hope this email finds you well. \nCongratulations! We are pleased to confirm that after careful consideration and review of your interview, we are delighted to offer you the position at A to Z Company. We were highly impressed with your skills, experience, and enthusiasm, and we believe you will be a valuable addition to our team. \nYour working hours will be from 9AM to 6PM, Monday to Friday. \nThe allowances, benefits, and other terms and conditions of your employment will be as Company policies as applicable from time to time. \n\nPlease report to our admin, for documentation and orientation. If this date is not acceptable, please contact me immediately. Once again we welcome you to our company and team. Looking forward to see you soon! \n\nRegards, A to Z';
      
      MailApp.sendEmail(recipient, subject, body);
      Logger.log('Email succesfully sent to ' + recipient);
    }
    
  } else if (range.getColumn() == decline && range.getRow() >= 2) {
    if (range.getValue() === true) {
      let recipient = ss.getRange(range.getRow(),1).getValue();
      let subject = 'Job Offer Rejection for ' + ss.getRange(range.getRow(),2).getValue();;
      let body = 'Dear ' + ss.getRange(range.getRow(),2).getValue() + ', \nWe appreciate your interest in joining the team, and the time invested to apply. Unfortunately, we regret to inform you that you have not been selected for the role. This was not an easy decision, as we were impressed with your qualifications and the skills you bring. \n\nWe thank you for considering us a potential employer and best of luck with your job search, as well as your personal and professional edeavors. \n\nSincerely, A to Z';

      MailApp.sendEmail(recipient, subject, body);
      Logger.log('Email succesfully sent to ' + recipient);
    }
  }
}




