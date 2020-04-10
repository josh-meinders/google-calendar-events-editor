const calendarUtils = ( () => {
  
  const getCalendars = () => {
    let calendars = [];
    let options = { maxResults: 250 };
    do {
      let response = Calendar.CalendarList.list(options);
      calendars.push.apply(calendars, response["items"]);
    } while (options["pageToken"]);
    return calendars;
  }
  
  const getCalendarEvents = (calendarId, start, end) => {
    const now = new Date();
    let options = {
      maxResults: 2500,
      orderBy: "startTime",
      singleEvents: true,
      timeMax: end,
      timeMin: start
    };
    console.log(options);
    let events = [];
    do {
      let response = Calendar.Events.list(calendarId, options);
      options["pageToken"] = response["nextPageToken"];
      events.push.apply(events, response["items"]);
    } while (options["pageToken"]);
    return events;
  }
  
  const getAllEvents = (start, end) => {
    const calendars = getCalendars();
    let allEvents = [];
    for (let calendar of calendars) {
      let calEvents = getCalendarEvents(calendar["id"], start, end);
      calEvents.forEach((el) => { el["calendar.id"] = calendar["id"]});
      calEvents.forEach((el) => { el["calendar.name"] = calendar["summary"]});
      allEvents.push.apply(allEvents, calEvents);
    }
    return allEvents;
  }
  
  const flattenEventObject = (o) => {
    let f = {};
    f["calendar.id"] = o["calendar.id"]
    f["calendar.name"] = o["calendar.name"]
    
    f["anyoneCanAddSelf"]=o.anyoneCanAddSelf
    if (o.attachments) {
      f["attachments[].fileId"]=joinArrayOfObjectsProperty(o.attachments,"fileId","; ")
      f["attachments[].fileUrl"]=joinArrayOfObjectsProperty(o.attachments,"fileUrl","; ")
      f["attachments[].iconLink"]=joinArrayOfObjectsProperty(o.attachments,"iconLink","; ")
      f["attachments[].mimeType"]=joinArrayOfObjectsProperty(o.attachments,"mimeType","; ")
      f["attachments[].title"]=joinArrayOfObjectsProperty(o.attachments,"title","; ")
    }
    if (o.attendees) {
      f["attendees[].additionalGuests"]=joinArrayOfObjectsProperty(o.attendees,"additionalGuests","; ")
      f["attendees[].comment"]=joinArrayOfObjectsProperty(o.attendees,"comment","; ")
      f["attendees[].displayName"]=joinArrayOfObjectsProperty(o.attendees,"displayName","; ")
      f["attendees[].email"]=joinArrayOfObjectsProperty(o.attendees,"email","; ")
      f["attendees[].id"]=joinArrayOfObjectsProperty(o.attendees,"id","; ")
      f["attendees[].optional"]=joinArrayOfObjectsProperty(o.attendees,"optional","; ")
      f["attendees[].organizer"]=joinArrayOfObjectsProperty(o.attendees,"organizer","; ")
      f["attendees[].resource"]=joinArrayOfObjectsProperty(o.attendees,"resource","; ")
      f["attendees[].responseStatus"]=joinArrayOfObjectsProperty(o.attendees,"responseStatus","; ")
      f["attendees[].self"]=joinArrayOfObjectsProperty(o.attendees,"self","; ")
    }
    f["attendeesOmitted"]=o.attendeesOmitted
    f["colorId"]=o.colorId
    if (o.conferenceData) {
      f["conferenceData.conferenceId"]=o.conferenceData.conferenceId
      if (o.conferenceData.conferenceSolution) {
        f["conferenceData.conferenceSolution.iconUri"]=o.conferenceData.conferenceSolution.iconUri
        f["conferenceData.conferenceSolution.key.type"]=o.conferenceData.conferenceSolution.key.type
        f["conferenceData.conferenceSolution.name"]=o.conferenceData.conferenceSolution.name
      }
      if (o.conferenceData.createRequest) {
        f["conferenceData.createRequest.conferenceSolutionKey.type"]=o.conferenceData.createRequest.conferenceSolutionKey.type
        f["conferenceData.createRequest.requestId"]=o.conferenceData.createRequest.requestId
        f["conferenceData.createRequest.status.statusCode"]=o.conferenceData.createRequest.status.statusCode
      }
      if (o.conferenceData.entryPoints) {
        f["conferenceData.entryPoints[].accessCode"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"accessCode","; ")
        f["conferenceData.entryPoints[].entryPointType"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"entryPointType","; ")
        f["conferenceData.entryPoints[].label"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"label","; ")
        f["conferenceData.entryPoints[].meetingCode"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"meetingCode","; ")
        f["conferenceData.entryPoints[].passcode"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"passcode","; ")
        f["conferenceData.entryPoints[].password"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"password","; ")
        f["conferenceData.entryPoints[].pin"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"pin","; ")
        f["conferenceData.entryPoints[].uri"]=joinArrayOfObjectsProperty(o.conferenceData.entryPoints,"uri","; ")
      }
      f["conferenceData.notes"]=o.conferenceData.notes
      f["conferenceData.signature"]=o.conferenceData.signature
    }
    f["created"]=o.created
    f["creator.displayName"]=o.creator.displayName
    f["creator.email"]=o.creator.email
    f["creator.id"]=o.creator.id
    f["creator.self"]=o.creator.self
    f["description"]=o.description
    f["end.date"]=o.end.date
    f["end.dateTime"]=o.end.dateTime
    f["end.timeZone"]=o.end.timeZone
    f["endTimeUnspecified"]=o.endTimeUnspecified
    if (o.extendedProperties) {
      f["extendedProperties.private"]=o.extendedProperties.private
      f["extendedProperties.shared"]=o.extendedProperties.shared
    }
    if (o.gadget) {
      f["gadget.display"]=o.gadget.display
      f["gadget.height"]=o.gadget.height
      f["gadget.iconLink"]=o.gadget.iconLink
      f["gadget.link"]=o.gadget.link
      f["gadget.preferences"]=o.gadget.preferences
      f["gadget.title"]=o.gadget.title
      f["gadget.type"]=o.gadget.type
      f["gadget.width"]=o.gadget.width
    }
    f["guestsCanInviteOthers"]=o.guestsCanInviteOthers
    f["guestsCanModify"]=o.guestsCanModify
    f["guestsCanSeeOtherGuests"]=o.guestsCanSeeOtherGuests
    f["hangoutLink"]=o.hangoutLink
    f["htmlLink"]=o.htmlLink
    f["iCalUID"]=o.iCalUID
    f["id"]=o.id
    f["kind"]=o.kind
    f["location"]=o.location
    f["locked"]=o.locked
    f["organizer.displayName"]=o.organizer.displayName
    f["organizer.email"]=o.organizer.email
    f["organizer.id"]=o.organizer.id
    f["organizer.self"]=o.organizer.self
    if (o.originalStartTime) {
      f["originalStartTime.date"]=o.originalStartTime.date
      f["originalStartTime.dateTime"]=o.originalStartTime.dateTime
      f["originalStartTime.timeZone"]=o.originalStartTime.timeZone
    }
    f["privateCopy"]=o.privateCopy
    f["recurringEventId"]=o.recurringEventId
    if (o.reminders.overrides) {
      f["reminders.overrides[].method"]=joinArrayOfObjectsProperty(o.reminders.overrides,"method","; ")
      f["reminders.overrides[].minutes"]=joinArrayOfObjectsProperty(o.reminders.overrides,"minutes","; ")
    }
    f["reminders.useDefault"]=o.reminders.useDefault
    f["sequence"]=o.sequence
    if (o.source) {
      f["source.title"]=o.source.title
      f["source.url"]=o.source.url
    }
    f["start.date"]=o.start.date
    f["start.dateTime"]=o.start.dateTime
    f["start.timeZone"]=o.start.timeZone
    f["status"]=o.status
    f["summary"]=o.summary
    f["transparency"]=o.transparency
    f["updated"]=o.updated
    f["visibility"]=o.visibility
    return f;
  }
  
  const joinArrayOfObjectsProperty = (array, property, delimiter) => {
    try {
      return array.map((obj) => {return obj[property]}).filter(Boolean).join(delimiter);
    } catch(e) {
      return undefined
    }
  }
  
  const deleteEvent = (eventId, calendarId) => {
    Calendar.Events.remove(calendarId, eventId);
  }
  
  return {
    getAllEvents,
    flattenEventObject,
    deleteEvent
  }
})()
  
//Basic: Calendar,Title,Start,End,Description,Location,Attachments,Color,Event Id + Link