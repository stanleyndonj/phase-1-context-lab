// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(employeeData) {
    return employeeData.map(data => createEmployeeRecord(data));
  }
  
  // Function to add a "TimeIn" event to an employee record
  function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  // Function to add a "TimeOut" event to an employee record
  function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
    return this;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(date) {
    let timeInEvent = this.timeInEvents.find(event => event.date === date);
    let timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }
  
  // Function to calculate total wages for an employee
  function allWagesFor() {
    let dates = this.timeInEvents.map(event => event.date);
    let totalWages = dates.reduce((total, date) => {
      return total + wagesEarnedOnDate.call(this, date);
    }, 0);
    return totalWages;
  }
  
  // Function to find an employee by first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
  }
  
  // Function to calculate payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor.call(employee);
    }, 0);
  }
  
  // Example usage
  let employees = [
    ["Gray", "Worm", "Security", 1],
    ["Daenerys", "Targaryen", "CEO", 10]
  ];
  
  let employeeRecords = createEmployeeRecords(employees);
  
  createTimeInEvent.call(employeeRecords[0], "2024-07-30 0900");
  createTimeOutEvent.call(employeeRecords[0], "2024-07-30 1700");
  createTimeInEvent.call(employeeRecords[1], "2024-07-30 0900");
  createTimeOutEvent.call(employeeRecords[1], "2024-07-30 1700");
  
  console.log(calculatePayroll(employeeRecords)); // Output will be the total payroll
  
