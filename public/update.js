$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  $.get("http://159.203.200.152:3000/updatepos", function(data) {
    $('#posnum').html(data.pos);
    if (data.pos == "1st") {
      window.location = "http://159.203.200.152:3000/parkingDiagram";
    }
  })
  setTimeout(prepare, 1000);
}
