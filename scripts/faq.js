
$(".faqs-item a").click(function () {
	var item = $(this).closest('.faqs-item'),
		collapsed = !item.hasClass('expanded');

    // Set the effect type
    var effect = 'slide';

    // Set the options for the effect type chosen
    var options = { };

    // Set the duration (default: 400 milliseconds)
    var duration = 500;

    setTimeout(function() {item.toggleClass('expanded'); }, 400 );
    $('.body', item).toggle(effect);
});

$(".faqs-container .grid-filter li").click( function () {
    var filter = $(this).data('filter');

    $(this).addClass('active').siblings().removeClass('active');
    if(filter) {
      $('.faqs-category.' + filter).siblings().slideUp();
      $('.faqs-category.' + filter).slideDown();
    } else {
      $('.faqs-category').slideDown();
    }
    return false;
});
