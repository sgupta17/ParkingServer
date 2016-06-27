$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  $.get("http://10.80.7.20:3000/updatepos", function(data) {
    $('#posnum').html(data.pos);
    if (data.pos == "1st") {
      window.location = "http://10.80.7.20:3000/parkingDiagram";
    }
  })
  setTimeout(prepare, 1000);
}
