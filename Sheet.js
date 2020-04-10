const sheetUtils = (() => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const eventHeaders = [
    "anyoneCanAddSelf",
    "attachments[].fileId",
    "attachments[].fileUrl",
    "attachments[].iconLink",
    "attachments[].mimeType",
    "attachments[].title",
    "attendees[].additionalGuests",
    "attendees[].comment",
    "attendees[].displayName",
    "attendees[].email",
    "attendees[].id",
    "attendees[].optional",
    "attendees[].organizer",
    "attendees[].resource",
    "attendees[].responseStatus",
    "attendees[].self",
    "attendeesOmitted",
    "calendar.id",
    "calendar.name",
    "colorId",
    "conferenceData.conferenceId",
    "conferenceData.conferenceSolution.iconUri",
    "conferenceData.conferenceSolution.key.type",
    "conferenceData.conferenceSolution.name",
    "conferenceData.createRequest.conferenceSolutionKey.type",
    "conferenceData.createRequest.requestId",
    "conferenceData.createRequest.status.statusCode",
    "conferenceData.entryPoints[].accessCode",
    "conferenceData.entryPoints[].entryPointType",
    "conferenceData.entryPoints[].label",
    "conferenceData.entryPoints[].meetingCode",
    "conferenceData.entryPoints[].passcode",
    "conferenceData.entryPoints[].password",
    "conferenceData.entryPoints[].pin",
    "conferenceData.entryPoints[].uri",
    "conferenceData.notes",
    "conferenceData.signature",
    "created",
    "creator.displayName",
    "creator.email",
    "creator.id",
    "creator.self",
    "description",
    "end.date",
    "end.dateTime",
    "end.timeZone",
    "endTimeUnspecified",
    "extendedProperties.private",
    "extendedProperties.shared",
    "gadget.display",
    "gadget.height",
    "gadget.iconLink",
    "gadget.link",
    "gadget.preferences.(key)",
    "gadget.title",
    "gadget.type",
    "gadget.width",
    "guestsCanInviteOthers",
    "guestsCanModify",
    "guestsCanSeeOtherGuests",
    "hangoutLink",
    "htmlLink",
    "iCalUID",
    "id",
    "kind",
    "location",
    "locked",
    "organizer.displayName",
    "organizer.email",
    "organizer.id",
    "organizer.self",
    "originalStartTime.date",
    "originalStartTime.dateTime",
    "originalStartTime.timeZone",
    "privateCopy",
    "recurringEventId",
    "reminders.overrides[].method",
    "reminders.overrides[].minutes",
    "reminders.useDefault",
    "sequence",
    "source.title",
    "source.url",
    "start.date",
    "start.dateTime",
    "start.timeZone",
    "status",
    "summary",
    "transparency",
    "updated",
    "visibility"
  ]
//  
//  const basicEventHeaders = [
//    "Calendar",
//    "Title",
//    "Start",End,Description,Location,Attachments,Color,Event Id + Link
//  ]

  const createEventsSheet = () => {
    const sheet = ss.insertSheet("Events - " + new Date().toLocaleString());
    sheet.deleteRows(3, 998);
    sheet.setFrozenRows(1);
    sheet.getRange("1:1").setFontWeight("bold");
    sheet.getRange("1:2").applyRowBanding(SpreadsheetApp.BandingTheme.GREEN);
    sheet.getRange("1:2").setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
    return sheet
  };
  
  const writeEvents = (events) => {
    let rows = [];
    rows.push(eventHeaders);
    for (let event of events) {
      let flat = calendarUtils.flattenEventObject(event);
      let row = [];
      eventHeaders.forEach((header) => {
        row.push(flat[header]);
      })
      rows.push(row);
    }
    const sheet = createEventsSheet();
    sheet.getRange(1,1,rows.length, rows[0].length).setValues(rows);
  }
  
  const getSelectedEvents = () => {
    let events = {}
    const ranges = ss.getActiveSheet().getActiveRangeList().getRanges();
    const calIdCol = eventHeaders.indexOf("calendar.id");
    const eventIdCol = eventHeaders.indexOf("id");
    for (let range of ranges) {
      let rowsInRange = splitRangeIntoRows(range);
      for (row of rowsInRange) {
        const rowValues = row.getValues()[0];
        const eventId = rowValues[eventIdCol];
        const calId = rowValues[calIdCol];
        if (!events.hasOwnProperty(eventId)) {
          events[eventId] = calId;
        }
      }
    }
    return events;
  }
  
  const splitRangeIntoRows = (range)  => {
    const sheet = range.getSheet();
    const firstRow = range.getRow();
    const lastRow = firstRow + range.getNumRows() - 1;
    let rows = [];
    for (let rowIndex = firstRow; rowIndex <= lastRow; rowIndex++) {
      rows.push(sheet.getRange(`${rowIndex}:${rowIndex}`));
    }
    return rows;
  }
  
  

  return {
    ss,
    writeEvents,
    getSelectedEvents
  };
})();