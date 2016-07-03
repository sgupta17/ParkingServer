$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  $.get('/updatepos', function(data) {
    $('#posnum').html(data.pos);
    if (data.pos == "1st") {
      window.location = '/parkingDiagram';
    }
  })
  setTimeout(prepare, 1000);
}
