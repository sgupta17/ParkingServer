$(function() {
  setTimeout(prepare, 1000);
})

function prepare() {
  $.get("http://kdsatp.org:3000/updatepos", function(data) {
    $('#posnum').html(data.pos);
    if (data.pos == "1st") {
      window.location = "http://kdsatp.org:3000/parkingDiagram";
    }
  })
  setTimeout(prepare, 1000);
}
