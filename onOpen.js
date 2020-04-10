function onOpen() {
  SpreadsheetApp.getUi().createMenu("Events Editor")
    .addItem("Get calendar data", "APP.getCalendarData")
    .addItem("Save edits to calendar", "APP.saveEditsToCalendar")
    .addItem("Delete selected events", "APP.deleteSelectedEvents")
    .addSeparator()
    .addItem("Getting started", "APP.gettingStarted")
    .addItem("Help", "APP.help")
    .addToUi();
}