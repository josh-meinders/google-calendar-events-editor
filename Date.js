const dateUtils = ( () => {

  const offsetMonths = (date,months) => {
    const copyOfDate = new Date(date.getTime());
    return new Date(copyOfDate.setMonth(copyOfDate.getMonth()+months));
  }
  
  const offsetHours = (date,hours) => {
    const copyOfDate = new Date(date.getTime());
    return new Date(copyOfDate.setTime(copyOfDate.getTime() + (hours*60*60*1000)));
  }
  
  return {
    offsetMonths,
    offsetHours
  }
})()