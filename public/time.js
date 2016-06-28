var counter = 45;

$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  counter--;
  switch (counter) {
    case 1:
        $('#currentTime').css('background-color', '#fce453'); break;
    case 2:
        $('#currentTime').css('background-color', '#a80533'); break;
    case 3:
      $('#currentTime').css('background-color', '#fce453'); break;
    case 4:
        $('#currentTime').css('background-color', '#a80533'); break;
    case 5:
      $('#currentTime').css('background-color', '#fce453'); break;
}
  if (counter == 0) {
    // $('#parkingSubmission').submit();
    window.location = "http://10.0.1.6:3000/timeout";
  }
  $('#currentTime').html(counter);
  setTimeout(prepare, 1000);
}
