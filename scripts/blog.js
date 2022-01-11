function getPostsFeed() {
	$.getJSON('https://www.banquebni.net/includes/blog.feed.php', function(data) {
	  var items = [];
	  var image;
	  var t = ['medium_large', 'medium','large'];

	  $.each(data, function(id, post) {

	  	if (post.medias[post.image]) {
	  		image = getImg(post.medias[post.image]);
	  	} else {
	  		image = getImg(post.medias[Object.keys(post.medias)[0]]);
	  	}
	    items.push( '<li class="col-md-4 blog-item" id="' + id + '"><a href="' + post.link + '" target="_BLANK"><div class="poster"><i style="background-image:url(' + image + ');"></i></div><h6>' + post.title + '</h6><p>' + post.description + '</p></a></li>' );
	  });

	  $('#datas_container .blog-posts-list')
	  	.removeClass('loading')
	  		.append(items.join( "" ));
	});
}

function addImage2Gallery(image, id, title, text) {
    var tpl = '<div class="grid-item loading col-md-3" masonry-brick id="grid-item-' + id + '"><div class="item-image"><div class="thumb"><a class="link"><img class="pic lazyload animated fadeIn" src="{{image}}"><div class="masks"></div></a></div><p>{{title}}</p></div></div>';
    $('.gallery-list').append(tpl.replace('{{image}}', image).replace('{{title}}', title.replace(/&#039;/g, "'")));
    $('#grid-item-' + id).data('description', text.replace(/&#039;/g, "'"));
}

function getImg(data, t) {
	if (!t) {
		t = ['large', 'medium', 'medium_large'];
	}
	var image = '';
	for (var i = 0; i < t.length; i++) {
		if (data[t[i]]) {
			image = data[t[i]];
			break;
		}
	}
	return image.replace('http://', 'https://');
}

function loadGallery() {

	$.getJSON('https://www.banquebni.net/includes/blog.images.php', function(data) {

	  	$.each(data, function(id, post) {
	  		addImage2Gallery(getImg(post), id, post.title, post.description);
	  	});

	  	$('.gallery-list').imagesLoaded().always( function( instance ) {
	  		setTimeout(function(){
		        $('.gallery-list').masonry({
		          // options
		          itemSelector: '.grid-item',
		          columnWidth: '.col-md-3',
		          horizontalOrder: false
		        });
		        $('.grid-item').picEyes();
		    }, 150);

	    });

	    $('.gallery-list .grid-item').each(function() {
	        var _this = $(this);
	        _this.imagesLoaded().always( function( instance ) {
	            _this
	                .removeClass('loading')
	                .addClass('loaded');
	        });
	    });
	    $('.gallery-list').append('<div class="clearfix"></div>');
		});


}
