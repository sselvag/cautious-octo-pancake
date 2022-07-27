var currentDay = $("#currentDay");
currentDay.text(moment().format('dddd') + ", " + moment().format('MMMM Do'));

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

$(document).on("click", ".row[id] .saveBtn", function () {
    var scheduledEvent = $(this).closest(".row");
    var eventInput = scheduledEvent.find("textarea").val();
    var eventHour = scheduledEvent.find("textarea").attr("data-row");

    localStorage.setItem(eventHour, JSON.stringify(eventInput));
});
