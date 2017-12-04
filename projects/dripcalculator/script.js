$(document).ready(function(){

  var timeTable = {
    "Minutes": 60,
    "Hours": 3600,
    "Days": 86400,
    "Weeks": 604800,
    "Months": 2592000,
    "Years": 31536000
  };

  $(".form-control").on("input", function(){
    var driples = $("#driples").val();
    var persecond = $("#persecond").val();
    var duration = $("#duration").val();
    var unit = $("#unit").find(":selected").text();
    if(jQuery.isNumeric(driples) && jQuery.isNumeric(persecond) && jQuery.isNumeric(duration)){
      var unitAmount = timeTable[unit];
      var totalDrops = Math.floor(parseFloat(driples) / parseFloat(persecond) * duration * unitAmount);
      var totalLitre = Math.round(parseFloat(driples) / parseFloat(persecond) * 0.0025 * duration * unitAmount) / 10;
      var totalGallon = Math.round(totalLitre * 0.264172 * 10) / 10;
      var totalPrice = Math.round(totalGallon * 0.0034977212 * 10) / 10;

      var container1half = Math.floor(totalLitre / 1.5);
      var container5gal = Math.floor(totalGallon / 5);
      var containerBarrel = Math.floor(totalLitre / 159);
      var containerBathtub = Math.floor(totalLitre / 413);

      var usedWatering = Math.floor(totalLitre / 0.4);
      var usedDrinking = Math.floor(totalLitre / 2);
      var usedFlushing = Math.floor(totalLitre / 6.1);
      var usedBathing = Math.floor(totalLitre / 65.1);

      $("#total-drops").text(totalDrops.toLocaleString().length < 9 ? totalDrops.toLocaleString() : totalDrops.toExponential(2));
      $("#total-litre").text(totalLitre.toLocaleString().length < 9 ? totalLitre.toLocaleString() : totalLitre.toExponential(2));
      $("#total-gallon").text(totalGallon.toLocaleString().length < 9 ? totalGallon.toLocaleString() : totalGallon.toExponential(2));
      $("#total-price").text(totalPrice.toLocaleString().length < 9 ? totalPrice.toLocaleString() : totalPrice.toExponential(2));
      $("#container-1half").text(container1half.toLocaleString().length < 9 ? container1half.toLocaleString() : container1half.toExponential(2));
      $("#container-5gal").text(container5gal.toLocaleString().length < 9 ? container5gal .toLocaleString() : container5gal .toExponential(2));
      $("#container-barrel").text(containerBarrel.toLocaleString().length < 9 ? containerBarrel.toLocaleString() : containerBarrel.toExponential(2));
      $("#container-bathtub").text(containerBathtub.toLocaleString().length < 9 ? containerBathtub.toLocaleString() : containerBathtub.toExponential(2));
      $("#used-watering").text(usedWatering.toLocaleString().length < 9 ? usedWatering.toLocaleString() : usedWatering.toExponential(2));
      $("#used-drinking").text(usedDrinking.toLocaleString().length < 9 ? usedDrinking.toLocaleString() : usedDrinking.toExponential(2));
      $("#used-flushing").text(usedFlushing.toLocaleString().length < 9 ? usedFlushing.toLocaleString() : usedFlushing.toExponential(2));
      $("#used-bathing").text(usedBathing.toLocaleString().length < 9 ? usedBathing.toLocaleString() : usedBathing.toExponential(2));
      $(".panel").show();
    }
  });
});
