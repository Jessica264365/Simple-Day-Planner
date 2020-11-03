// current day is displayed at the top of the calendar
function getCurrentDate() {
  let dateAndTime = moment().format("MMMM Do YYYY, h:mm:ss a");
  $("#currentDay").text(dateAndTime);
  return dateAndTime;
}
let now = getCurrentDate();

//time blocks for standard business hours
let businessHours = [
  {
    time: "9",
    hour: "9",
    amPM: "am",
    id: "0",
    text: "",
  },
  {
    time: "10",
    hour: "10",
    amPM: "am",
    id: "1",
    text: "",
  },
  {
    time: "11",
    hour: "11",
    amPM: "am",
    id: "2",
    text: "",
  },
  {
    time: "12",
    hour: "12",
    amPM: "pm",
    id: "3",
    text: "",
  },
  {
    time: "13",
    hour: "1",
    amPM: "pm",
    id: "4",
    text: "",
  },
  {
    time: "14",
    hour: "2",
    amPM: "pm",
    id: "5",
    text: "",
  },
  {
    time: "15",
    hour: "3",
    amPM: "pm",
    id: "6",
    text: "",
  },
  {
    time: "16",
    hour: "4",
    amPM: "pm",
    id: "7",
    text: "",
  },
  {
    time: "17",
    hour: "5",
    amPM: "pm",
    id: "8",
    text: "",
  },
];
// function for saving the user's input
function saveData() {
  localStorage.setItem("businessHours", JSON.stringify(businessHours));
}
// function for grabbing and displaying any saved input
function storedData() {
  debugger;
  let currentPlans = JSON.parse(localStorage.getItem("businessHours"));
if (currentPlans !== null) {
    businessHours = currentPlans;
    displayPlanner();
  } else {
    displayPlanner();
  }
}
// planner is displayed (with previous user input if there is any)
function displayPlanner() {
  businessHours.forEach(function (currentHour) {
    let hourRow = $("<div>");
    hourRow.addClass("row");
    $("#plannerDisplay").append(hourRow);
    let hourColumn = $("<div>");
    hourColumn.addClass("col-md-2");
    hourColumn.text(`${currentHour.hour} ${currentHour.amPM}`);
    hourRow.append(hourColumn);
    let textColumn = $("<div>");
    textColumn.addClass("col-md-9");
    let textInput = $("<textarea>");
    textInput.addClass("textarea");
    textInput.attr("id", currentHour.id);
    textInput.attr("cols", "80");
    textInput.text(currentHour.text);
    console.log(textInput);
    textColumn.append(textInput);
    hourRow.append(textColumn);
    let saveBtn = $("<button>");
    saveBtn.addClass("col-md-1");
    saveBtn.addClass("saveBtn");
    saveBtn.text("Save");
    hourRow.append(saveBtn);

    // the color of the hour block changes depending on the time of day
    let hour = moment().hour();
    if (currentHour.time < hour) {
      hourRow.addClass("past");
    }
    if (currentHour.time === hour) {
      hourRow.addClass("present");
    } else if (currentHour.time > hour) {
      hourRow.addClass("future");
    }
  });
}
// function is called to retrieve the stored data and display it
storedData();

// when the saved button is clicked the user input is saved in locat storage
$(document).on("click", ".saveBtn", function () {
  let row = $(this).parent();
  let textArea = row.children().find("textarea");
  let userInput = textArea.val();
  let currentId = textArea.attr("id");
  businessHours[currentId].text = userInput;
  saveData();
});
