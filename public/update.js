$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  $.get('/juniors/updatepos', function(data) {
    $('#posnum').html(data.pos);
    if (data.pos == "1st") {
      window.location = '/juniors/parkingDiagram';
    }
  })
  setTimeout(prepare, 1000);
}
