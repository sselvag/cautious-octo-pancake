// 1. WHEN I open the planner, THEN the current day is displayed at the top of the calendar
var currentDay = $("#currentDay");
currentDay.text(moment().format('dddd') + ", " + moment().format('MMMM Do'));

// 2. WHEN I scroll down, THEN I am presented with time blocks for standard business hours
// 4. WHEN I click into a time block, THEN I can enter an event
var container = $(".container");
var hourArray = [];

function schedule() {
    for (var i = 0; i < 9; i++) {
        var hour = moment().hour(i + 9).format("h a");
        hourArray.push(hour);
    };
    $.each(hourArray, function (i, value) {
        var timeblocks = $("<div>");
        timeblocks.addClass("row timeblock").attr("id", "row" + i);
        container.append(timeblocks);
        var hour = $("<div>");
        hour.addClass("col-1 hour").text(value).attr("data-hour", i + 9);
        $("#row" + i).append(hour);
        var event = $("<textarea>");
        event.addClass("col-10 description").attr("id", "text" + i).attr("data-row", i);
        $("#row" + i).append(event);
        var saveButton = $("<button>");
        saveButton.addClass("col-1 saveBtn").html("<i class=\"far fa-save\"></i>");
        $("#row" + i).append(saveButton);
    });
};

schedule();

// 3. WHEN I view the time blocks for that day, THEN each time block is color-coded to indicate whether it is in the past, present, or future
function colorcode() {
    $.each(hourArray, function (i, value) {
        if (moment().isAfter(moment().hour(9+i))) {
            $("#text" + i).addClass("past");
        } else if (moment().isSame(moment().hour(9+i))) {
            $("#text" + i).addClass("present");
        } else if (moment().isBefore(moment().hour(9+i))) {
            $("#text" + i).addClass("future");  
        };
    });
};

colorcode();

// 6. WHEN I refresh the page, THEN the saved events persist NEEED TO COMPLETE!!!!!
// var eventFromLocalStorage = JSON.parse(localStorage.getItem("eventHour"));

// function persistEvent() {
//     $.each(hourArray, function (i, value) {
//         $("#text" + i).text(eventFromLocalStorage[i].text);
//     });;
// }

// persistEvent();




// 5. WHEN I click the save button for that time block, THEN the text for that event is saved in local storage
$(document).on("click", ".row[id] .saveBtn", function () {
    var scheduledEvent = $(this).closest(".row");
    var eventInput = scheduledEvent.find("textarea").val();
    var eventHour = scheduledEvent.find("textarea").attr("data-row");

    localStorage.setItem(eventHour, JSON.stringify(eventInput));
});
