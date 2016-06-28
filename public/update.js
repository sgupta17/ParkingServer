$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  $.get("http://10.0.1.6:3000/updatepos", function(data) {
    $('#posnum').html(data.pos);
    if (data.pos == "1st") {
      window.location = "http://10.0.1.6:3000/parkingDiagram";
    }
  })
  setTimeout(prepare, 1000);
}
