class App {
  
  getCalendarData() {
    sheetUtils.ss.toast("Getting calendar events; this may take a minute...");
    const now = new Date();
    const start = dateUtils.offsetHours(now,-4).toISOString();
    const end = dateUtils.offsetHours(now,4).toISOString();
    const events = calendarUtils.getAllEvents(start,end);
    sheetUtils.writeEvents(events);
  }

  saveEditsToCalendar() {
  
  }

  deleteSelectedEvents() {
    const events = sheetUtils.getSelectedEvents();
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(`Are you sure you want to delete ${Object.keys(events).length} selected events?`, ui.ButtonSet.YES_NO)
    if (response == ui.Button.YES) {
      const eventsArray = Object.entries(events);
      for (let event of eventsArray) {
        calendarUtils.deleteEvent(event[0], event[1]);
      }
    }
  }

  gettingStarted() {
  
  }
  
  help() {
  
  }

}

const APP = new App();