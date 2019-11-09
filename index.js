function createEmployeeRecords(recordArrays) {
  return recordArrays.map(createEmployeeRecord)
}

function createEmployeeRecord(recordArray) {
  return {
    firstName: recordArray[0],
    familyName: recordArray[1],
    title: recordArray[2],
    payPerHour: recordArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createTimeInEvent(record, dateTimeString) {
  const date = dateTimeString.split(' ')[0]
  const time = dateTimeString.split(' ')[1]
  record["timeInEvents"].push({
    type: "TimeIn",
    date: date,
    hour: parseInt(time)
  })
  return record
}

function createTimeOutEvent(record, dateTimeString) {
  const date = dateTimeString.split(' ')[0]
  const time = dateTimeString.split(' ')[1]
  record["timeOutEvents"].push({
    type: "TimeOut",
    date: date,
    hour: parseInt(time)
  })
  return record
}

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find(event => event.date === date).hour
  const timeOut = record.timeOutEvents.find(event => event.date === date).hour

  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(record, date) {
  return record.payPerHour * hoursWorkedOnDate(record, date)
}

function allWagesFor(record) {
  const dates = record.timeInEvents.map(event => event.date)
  return dates.reduce( (sum, date) => sum += wagesEarnedOnDate(record, date), 0)
}

function calculatePayroll(records) {
  return records.reduce((sum, record) => sum += allWagesFor(record), 0)
}

function findEmployeeByFirstName(records, firstName) {
  return records.find(record => record.firstName === firstName)
}
