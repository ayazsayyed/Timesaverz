// Owl Carousel
$('.owl-carousel').owlCarousel({
  margin: 10,
  loop: true,
  autoWidth: true,
  items: 4,
  dots: true,
  autoplay: true,
  autoplayHoverPause: true,
  nav: true
});

// Get Data From API
$.get("http://52.69.49.40/assignment/getServiceData.php", function (data) {
  $(".service-detail").html(data['subcategoryDescription']);

  $.each(data['variableData'], function (index, value) {
    $('#serviceType').append('<option data-PayNowCost=' + value.variablePayNowCost + '>' + value.variableName + '</option>');
  });

  $.each(data['frequencyData'], function (index, value) {
    $('#serviceFrequency').append('<option data-multiplyingFactor=' + value.multiplyingFactor + '>' + value.caption + '</option>');
  });

});

// Dynamically change the total Service Total
$('#serviceFrequency, #serviceType').change(function () {
  calculateTotal();
});

function calculateTotal() {
  var a = $('#serviceType').find(':selected').attr('data-PayNowCost');
  var b = $('#serviceFrequency').find(':selected').attr('data-multiplyingfactor');
  var c = (a * b).toFixed(2);
  $('#total').html('<i class="fas fa-rupee-sign"></i>' + c);
}

// Service Form Submission
$("#service-request-form").submit(function (event) {
  event.preventDefault();
  var serviceDetails = $(this).serializeArray();
  serviceDetails.push({ name: 'total', value: $('#total').text() })

  // Save in local storage
  localStorage.setItem("data", JSON.stringify(serviceDetails));
  window.location.replace('shopping-cart.html');
});

// Address Form Submission
$("#addressForm").submit(function (event) {
  event.preventDefault();
  var shippingAddress = $('.address').val();
  $('.address-card').children('address').text(shippingAddress);
  $('.address-card, .fa-check-circle').css('display', 'block');
});

// Get from local storage
var localStorageArray = [];
$.each(JSON.parse(localStorage.getItem('data')), function (index, value) {
  localStorageArray.push(value['value']);
});

// Append data in checkout cards
$('.service-name').html('Home ' + localStorageArray[0] + ' : Basic ' + localStorageArray[1] + ' ' + localStorageArray[2]);
$('.service-date').html(localStorageArray[3] + ', ' + localStorageArray[4]);
$('.service-price').html('<i class="fas fa-rupee-sign"></i> ' + localStorageArray[6]);
$('.sub-total').html('<strong> <i class="fas fa-rupee-sign"></i> ' + `${parseInt(localStorageArray[6]) + 99}` + '</strong>');
$('.grand-total').html('<strong> <i class="fas fa-rupee-sign"></i> ' + `${parseInt(localStorageArray[6]) + 99}` + '</strong>');
