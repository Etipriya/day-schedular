//Declaring the value for container
//const scheduleContainer = $(".container");

// Declare the function to get time
const currentTime = () => {
  const currentDay = $("#currentDay");
  const currentTime = moment().format("dddd, MMMM Do, YYYY");
  currentDay.text(currentTime);
};

//setInterval(currentTime, 1000); (for minutes stuff)
// function to add textarea data to local storage
const renderTextArea = () => {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));

  //Check if data is null
  if (plannerEvents !== null) {
    //Declare variable to get current Hour
    const currentHour = moment().hour();

    // Declare time block array
    const timeBlockArray = $(".container .row");

    const callback = function () {
      const textArea = $(this).find("textarea");
      const timeBlockTime = Number.parseInt($(this).data("time"), 10);

      //Time block to be color coded
      if (timeBlockTime === currentHour) {
        textArea.removeClass("past").addClass("present");
      }
      if (timeBlockTime > currentHour) {
        textArea.removeClass("present").addClass("future");
      }

      const plannedEvent = plannerEvents[timeBlockTime];
      textArea.text(plannedEvent);
    };
    timeBlockArray.each(callback);
  } else {
    //Add an empty array into local storage
    localStorage.setItem("plannerEvents", JSON.stringify({}));
  }
};

//on button click get items from local storage into planner
const onClick = function (event) {
  const plannerEvents = JSON.parse(localStorage.getItem("plannerEvents"));
  const target = $(event.target);
  // const currentTarget = $(event.currentTarget);

  if (target.is("button")) {
    const key = target.attr("id");
    const value = target.parent().find("textarea").val();

    const newObject = {
      ...plannerEvents,
      [key]: value,
    };
    localStorage.setItem("plannerEvents", JSON.stringify(newObject));
  }
};

//on ready function get current date and render planner events
const onReady = () => {
  //Event Listener
  $(".container").click(onClick);
  currentTime();
  renderTextArea();

  //Current date
  //renderCurrentDate();
  //renderCalenderEvents();
};

$(document).ready(onReady);
