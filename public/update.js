$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  $.get('/seniors/updatepos', function(data) {
    $('#posnum').html(data.pos);
    if (data.pos == "1st") {
      window.location = '/seniors/parkingDiagram';
    }
  })
  setTimeout(prepare, 1000);
}
