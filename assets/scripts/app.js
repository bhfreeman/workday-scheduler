//Display the current day at the top of the calendar
$("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));

//Make timeblocks for each standard business hour
for (let i = 9; i < 18; i++) {
  createTimeBlock(i);
}

//Color code the timeblocks based on past present future

//Clicking into the timeblock can enter text

//There is a save button in the timeblock that will save the text in the timeblock into local storage so that the item persists through reloads

function createTimeBlock(i) {
  var container = $(".container");
  var timeBlock = $("<div>");
  var hourBlock = $("<div>");
  var textBlock = $("<textarea>");
  var saveBlock = $("<button>");
  var num = i;
  var hour = moment(num.toString(),"h").format('hA');

  timeBlock.addClass("row time-block");
  hourBlock.addClass("hour col-md-1").append(hour);
  textBlock.addClass("col-md-10 description").attr("id", i);
  saveBlock
    .addClass("btn saveBtn col-md-1")
    .append($("<i>").attr("class", "fas fa-save"));

  timeBlock.append(hourBlock).append(textBlock).append(saveBlock);
  container.append(timeBlock);

  if (parseInt(moment().format("H")) === i) {
    textBlock.addClass("present");
  } else if (parseInt(moment().format("H")) > i) {
    textBlock.addClass("past");
  } else {
    textBlock.addClass("future");
  }

  $('.description').each(function () {
      var id = $(this).attr('id');
      var storedDescription = localStorage.getItem(id);
      $(this).val(storedDescription);
  })

}

$('.saveBtn').on("click", function () {
    var id = $(this).siblings("textarea").attr("id");
    var description = $(this).siblings('textarea').val();
    localStorage.setItem(id, description);
    console.log(id);
    console.log(description);
    console.log($(this).siblings());
})
