var counter = 45;

$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  counter--;
  if (counter == 0) {
    $('#parkingSubmission').submit();
  }
  $('#currenttime').html(counter);
  setTimeout(prepare, 1000);
}
