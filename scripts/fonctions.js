function jssorScript(){
	 var _SlideshowTransitions = [
    //Fade in L
        {$Duration: 1200, x: 0.3, $During: { $Left: [0.3, 0.7] }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade out R
        , { $Duration: 1200, x: -0.3, $SlideOut: true, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade in R
        , { $Duration: 1200, x: -0.3, $During: { $Left: [0.3, 0.7] }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade out L
        , { $Duration: 1200, x: 0.3, $SlideOut: true, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }

    //Fade in T
        , { $Duration: 1200, y: 0.3, $During: { $Top: [0.3, 0.7] }, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }
    //Fade out B
        , { $Duration: 1200, y: -0.3, $SlideOut: true, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }
    //Fade in B
        , { $Duration: 1200, y: -0.3, $During: { $Top: [0.3, 0.7] }, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade out T
        , { $Duration: 1200, y: 0.3, $SlideOut: true, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }

    //Fade in LR
        , { $Duration: 1200, x: 0.3, $Cols: 2, $During: { $Left: [0.3, 0.7] }, $ChessMode: { $Column: 3 }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }
    //Fade out LR
        , { $Duration: 1200, x: 0.3, $Cols: 2, $SlideOut: true, $ChessMode: { $Column: 3 }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }
    //Fade in TB
        , { $Duration: 1200, y: 0.3, $Rows: 2, $During: { $Top: [0.3, 0.7] }, $ChessMode: { $Row: 12 }, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade out TB
        , { $Duration: 1200, y: 0.3, $Rows: 2, $SlideOut: true, $ChessMode: { $Row: 12 }, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }

    //Fade in LR Chess
        , { $Duration: 1200, y: 0.3, $Cols: 2, $During: { $Top: [0.3, 0.7] }, $ChessMode: { $Column: 12 }, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }
    //Fade out LR Chess
        , { $Duration: 1200, y: -0.3, $Cols: 2, $SlideOut: true, $ChessMode: { $Column: 12 }, $Easing: { $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade in TB Chess
        , { $Duration: 1200, x: 0.3, $Rows: 2, $During: { $Left: [0.3, 0.7] }, $ChessMode: { $Row: 3 }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }
    //Fade out TB Chess
        , { $Duration: 1200, x: -0.3, $Rows: 2, $SlideOut: true, $ChessMode: { $Row: 3 }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }

    //Fade in Corners
        , { $Duration: 1200, x: 0.3, y: 0.3, $Cols: 2, $Rows: 2, $During: { $Left: [0.3, 0.7], $Top: [0.3, 0.7] }, $ChessMode: { $Column: 3, $Row: 12 }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }
    //Fade out Corners
        , { $Duration: 1200, x: 0.3, y: 0.3, $Cols: 2, $Rows: 2, $During: { $Left: [0.3, 0.7], $Top: [0.3, 0.7] }, $SlideOut: true, $ChessMode: { $Column: 3, $Row: 12 }, $Easing: { $Left: $JssorEasing$.$EaseInCubic, $Top: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2, $Outside: true }

    //Fade Clip in H
        , { $Duration: 1200, $Delay: 20, $Clip: 3, $Assembly: 260, $Easing: { $Clip: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade Clip out H
        , { $Duration: 1200, $Delay: 20, $Clip: 3, $SlideOut: true, $Assembly: 260, $Easing: { $Clip: $JssorEasing$.$EaseOutCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade Clip in V
        , { $Duration: 1200, $Delay: 20, $Clip: 12, $Assembly: 260, $Easing: { $Clip: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
    //Fade Clip out V
        , { $Duration: 1200, $Delay: 20, $Clip: 12, $SlideOut: true, $Assembly: 260, $Easing: { $Clip: $JssorEasing$.$EaseOutCubic, $Opacity: $JssorEasing$.$EaseLinear }, $Opacity: 2 }
        ];

    var options = {
        $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
        $AutoPlayInterval: 2500,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
        $PauseOnHover: 1,                                //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

        $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
        $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
        $SlideDuration: 800,                                //Specifies default duration (swipe) for slide in milliseconds

        $SlideshowOptions: {                                //[Optional] Options to specify and enable slideshow or not
            $Class: $JssorSlideshowRunner$,                 //[Required] Class to create instance of slideshow
            $Transitions: _SlideshowTransitions,            //[Required] An array of slideshow transitions to play slideshow
            $TransitionsOrder: 1,                           //[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random
            $ShowLink: true                                    //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
        },

        $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
            $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
            $ChanceToShow: 1                               //[Required] 0 Never, 1 Mouse Over, 2 Always
        },

        $ThumbnailNavigatorOptions: {                       //[Optional] Options to specify and enable thumbnail navigator or not
            $Class: $JssorThumbnailNavigator$,              //[Required] Class to create thumbnail navigator instance
            $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always

            $ActionMode: 1,                                 //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
            $SpacingX: 7,                                   //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
            $DisplayPieces: 9,                             //[Optional] Number of pieces to display, default value is 1
            $ParkingPosition: 360                          //[Optional] The offset position to park thumbnail
        }
    };

    var jssor_slider1 = new $JssorSlider$("slider_container", options);
    //responsive code begin
    //you can remove responsive code if you don't want the slider scales while window resizes
    function ScaleSlider() {
        var parentWidth = jssor_slider1.$Elmt.parentNode.clientWidth;
        if (parentWidth)
            jssor_slider1.$ScaleWidth(Math.max(Math.min(parentWidth, 640), 300));
        else
            window.setTimeout(ScaleSlider, 30);
    }
    ScaleSlider();

    $(window).bind("load", ScaleSlider);
    $(window).bind("resize", ScaleSlider);
    $(window).bind("orientationchange", ScaleSlider);
    //responsive code end
	console.log($('.main-slider .item .mbr-btn').not(':visible').length);
	$('.main-slider .item .mbr-btn').not(':visible').closest('.item')
      .css('cursor', 'pointer')
        .unbind('click')
        .click(function() {
            $('.mbr-btn', $(this)).trigger('click');
        });
}

function InitOnglets_Pays(){
	  if($("#quicktabsview ul.quicktabs-tabs li a").length){
		  jQuery('#quicktabsview ul.quicktabs-tabs li a').unbind('click');
		  jQuery('#quicktabsview ul.quicktabs-tabs li a').bind('click', function() {
		    $('#quicktabsview ul.quicktabs-tabs li').removeClass('active');
			$(this).closest('li').addClass('active');
			var index = $(this).parent().index(), ul = $(this).closest('div.item-list').next('div.quicktabs_main').find('ul').eq(0);
			ul.find('li.onglets_content:visible').hide();
			//alert(ul.length);
			if(ul.find('li.onglets_content').eq(index).length) {
			  var contenu = $('li.onglets_content').eq(index);
			  contenu.show();
			}
			return false;
		  });
		  $('#quicktabsview ul.quicktabs-tabs li.active').find('a').trigger('click');
	  }
}

function AjaxLoad_DatasLoader(id, __page__, datafld, forceid, print){
	var obj = typeof id!="object"?$(id):id;
	var cadre_id = 'cadre_datas_loader_'+(jListe_isNull(forceid)?obj.attr('id'):forceid);
	var Opts = {
	   hide : true,
	   print: print!=0,
	   id: cadre_id,
	   onInit: function(){CallBack_Ajax(__page__, datafld, $('#'+cadre_id).find('div.contenu'));},
       onClose: function(){}
	}
	obj.DatasLoader(Opts);
}

jQuery.fn.DatasLoader = function(options) {
       var o = $(this[0]);
	   if(o.closest('div.cadre_datas').length) o = o.closest('div.cadre_datas');
	   //var selector_id = $(this).selector;
	   var opts = $.extend({}, $.fn.DatasLoader.defaults, options);
	   if(jListe_isNull(opts.id)) return false;
       var cadre = o.prev('div.cadre_datas');

       if(!cadre.length) {
	      o.before('<div class="cadre_datas marg clearfix" id = "'+opts.id+'">'+(opts.print?'<a class="printerbtn"></a>':'')+'<a class="close"></a><div class="contenu"></div><div class="clear"></div></div>');
		  cadre = o.prev('div.cadre_datas');
		  if(opts.print){
			  cadre.find('a.printerbtn').unbind('click');
			  cadre.find('a.printerbtn').bind('click', function() {
				  printablezone = cadre.find('div.printablezone').length?cadre.find('div.printablezone').eq(0):cadre.find('div.contenu');
				  $.simplePrint(printablezone, 'css/bootstrap.css,css/bootstrap-responsive.css,css/style.css,css/tablecloth.css,css/print.css');
				  return false;
			 });
		  }
	   }
	   if(o.find('.ajax_loading_b').length) o.find('.ajax_loading_b').hide();
	   if(opts.hide)  o.hide();
	   if(!cadre.is(':visible')){
	     cadre.slideDown('normal', function() {
			$(this).find('div.contenu').html('<div class="loader_container"><br><br><br><div class="loading_grd"></div></div><div class="clear"></div>');
	        opts.onInit();
	        $.scrollTo($('#mains_menus_top')/*cadre*/, 'slow');
		 });
		 //cadre.data('container', selector_id);
	   }
	   else{
	     $(this).find('div.contenu').html('<div class="loader_container"><br><br><br><div class="loading_grd"></div></div><div class="clear"></div>');
	     opts.onInit();
		 $.scrollTo($('#mains_menus_top')/*cadre*/, 'slow');
	   }


	   if(cadre.find("a.close")) {
	      cadre.find("a.close").unbind("click").bind('click', function() {
			if(!jListe_isNull(cadre.data('onClose'))) {
			   eval(cadre.data('onClose'));
			   cadre.removeData("onClose");
			}
			else {
			  //var obj_close = !jListe_isNull(cadre.data('container'))?$(cadre.data('container')):o;
			  opts.onClose();
			  cadre.slideUp('normal', function(){o.show();this.remove();}).find('div.contenu').html('');
			}

            return false;
          });
       }

 };

 $.fn.DatasLoader.defaults = {
    hide: false,
	id: 'cadre_datas_loader',
	print:true,
	onInit: function(){},
	onClose: function(){}
 };

 function jListe_isNull(o){
	  return (o == null && o == undefined);
 }
$.easing.elasout = function(x, t, b, c, d) {

 var s=1.70158;var p=0;var a=c;

 if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;

 if (a < Math.abs(c)) { a=c; var s=p/4; }

 else var s = p/(2*Math.PI) * Math.asin (c/a);

 return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;

};


$(window).load(function(){

 if(jQuery.isFunction(window.SubmitLogin)) SubmitLogin();

});

//(function($) {

	jQuery.extend( {

      isNull: function(o) {

         if(o == null && o == undefined) {

           return true;

         }

         return false

      }

    });
//});

function AnminH_Elmt(elmt, h){
     elmt.animate({
       opacity: 0.50,
       top: '-='+h
     }, 1000, function() {
       // Animation complete.
	   $(this).css({ opacity: 1 });
     });
}

jQuery.extend( {
      estNull: function(o) {
         if(o == null && o == undefined) {
           return true;
         }
         return false;
      }
});

function RechercheSubmit(form_id){
  var data = '', fields = '', tab = new Array(), valeur = '';
  if(!$(form_id).length) return false;
  if(!$(form_id).attr('action')) return Msg_Erreur('Mauvais paramétrage du formulaire: <b>aucune destination spécifiée</b>', '', 1);
  var url = $(form_id).attr('action');

  $(form_id+' input, ' + form_id + ' textarea, ' + form_id + ' select').each(function (el) {
     if($(this).attr('datafld') != null && $(this).attr('datafld') != undefined) {
	   valeur = $(this).val();
	   if($(this).get(0).nodeName == 'INPUT' && ($(this).attr('type').toUpperCase() == 'CHECKBOX' || $(this).attr('type').toUpperCase() == 'RADIO')) valeur = $(this).is(':checked')?$(this).val():0;
	   if($(this).get(0).nodeName == 'SELECT') valeur = SelectValues(form_id+' #'+$(this).attr('id'));
	   data += '&'+this.name + '=' + urlencode(valeur);
	   if(fields) fields += '::';
	   fields += this.name + '|' + $(this).attr('datafld');
	 }
  });
  data = 'op=recherche&sys_fields='+fields + data;
  AjaxLoad(url, data, $(form_id+' #container').val());
  return false;
}

function SubmitLogin(){
	//alert('ok');
	if($("div.loginform #bout_ok").length){
	  setTimeout( function() {$("div.loginform #login").focus();} , 500);
      jQuery('div.loginform #bout_ok').bind('click', function() {
	    $('div.loginform #login').val(jQuery.trim($('div.loginform #login').val()));
	    $('div.loginform #pwd').val(jQuery.trim($('div.loginform #pwd').val()));
	    /*var tab = $('div.loginform #login').val().split('@');
		var login = $('div.loginform #login').val();*/

	    if(!$('div.loginform #login').TestVide()) return Msg_Erreur('Veuillez spécifier votre <b>Email</b> de connexion.', 'div.loginform #login', 1);
		//if(tab.length > 1) {
		else  if(!$('div.loginform #login').TestEmail()) return Msg_Erreur('l\'adresse email spécifiée ( <b>'+$('div.loginform #login').val()+ '</b> ) n\'est pas valide.', 'div.loginform #login', 1);
		if(!$('div.loginform #pwd').TestVide()) return Msg_Erreur('Veuillez spécifier votre mot de passe.', 'div.loginform #pwd', 1);
	    AjaxLoad('includes/login.php', 'email=' + urlencode($('div.loginform #login').val()) + '&pass=' + urlencode($('div.loginform #pwd').val()));
		return false;
      });
	  jQuery('div.loginform a#oublie').bind('click', function() {
	    $('div.loginform #login').val(jQuery.trim($('div.loginform #login').val()));
	    $('div.loginform #pwd').val(jQuery.trim($('div.loginform #pwd').val()));
	    /*var tab = $('div.loginform #login').val().split('@');
		var login = $('div.loginform #login').val();*/

	    if(!$('div.loginform #login').TestVide()) return Msg_Erreur('Veuillez spécifier votre <b>Email</b> de connexion.', 'div.loginform #login', 1);
		//if(tab.length > 1) {
		else  if(!$('div.loginform #login').TestEmail()) return Msg_Erreur('L\'adresse email spécifiée ( <b>'+$('div.loginform #login').val()+ '</b> ) n\'est pas valide.', 'div.loginform #login', 1);
		//}
		AjaxLoad('includes/login.php', 'login=' + urlencode($('div.loginform #login').val()) + '&action=O');
		return false;
	  });

	  jQuery('div.loginform form').bind('submit', function() {
	     $("div.loginform #bout_ok").trigger('click');
	  });

	  $("div.loginform form").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $("div.loginform #bout_ok").trigger('click');
            return false;
        } else {
            return true;
        }
    });
    }
}

/*function urlencode(str) {
  return escape(str).replace('+', '%2B').replace('%20', '+').replace('*', '%2A').replace('/', '%2F').replace('@', '%40');
}
*/

function urlencode(str) {
   return escape(str).replace(/\+/g, '%2B').replace(/%20/g, '+').replace(/\*/g, '%2A').replace(/\//g, '%2F').replace(/@/g, '%40').replace(/=/g, '%3D').replace(/&/g, '%26');
}

function KeyPress_Champ(champ, fonction){
	$('#'+champ).click(function(){eval(fonction)});
	$('#'+champ).blur(function() {eval(fonction)});
	$('#'+champ).keyup(function() {eval(fonction)});
	$('#'+champ).keypress(function() {eval(fonction)});
}

function str_repeat ( input, multiplier ) {
    return new Array(multiplier+1).join(input);
}

function Complete_Chaine(chaine, n, str2, sens) {
	 //alert(str + '='+str.length + '/' +n);
	 str = String(chaine);
	 if(Number(n) > str.length) {
	    var lg = Number(n) - str.length;
	    if(sens<0) return str + str_repeat( str2, lg );
		else return  str_repeat( str2, lg) + str;
	 }
	 else return str;
}

function str_replace( sujet, remplacant,chaine) {
  position = chaine.indexOf(sujet);
  retour = '';
  if (position == -1) return chaine;
  retour += chaine.substring(0,position) + remplacant;
  if ( position + sujet.length < chaine.length)
    retour += str_replace( sujet, remplacant,chaine.substring(position + sujet.length, chaine.length));
  return retour;
}

function Elmt_Over(elmt, classe) {
    elmt.className = classe;
}

function ElmtOverlay(id){

  var obj = $("body");
  if(!jQuery.estNull(id)) id = '';
  else{
    if(typeof id=="string") obj = $(id);
    else if(typeof id=="object") obj = id;
  }
  if(!obj.length) return false;

  if($("#overlay").length) $("#overlay").remove();
  var docHeight = !id?$(document).height():obj.height();

   obj.css('position', 'relative').append("<div id='overlay'></div><div class='overlayloading'>chargement...</div>");

   $("#overlay")
      .height(docHeight)
      .css({
         'opacity' : 0.6,
         'position': 'absolute',
         'top': 0,
         'left': 0,
         'background-color': '#fff',
         'width': '100%',
         'z-index': 5000,
		 '-ms-filter' : 'progid:DXImageTransform.Microsoft.Alpha(Opacity=60)',
         'filter': 'alpha(opacity=60)'
      });
	  obj.find('.overlayloading').css({'left':(obj.width()/2)+50, 'top':(obj.height()/2)-100});
}


$.simplePrint = function(selector, style){
	var obj = typeof selector=="object"?selector:$(selector)
    if(!obj.length) return;
    // Crea un nuevo elemento iframe
    printArea = document.createElement('iframe');

    // Applies styles to hide the item set
    $(printArea).attr({style: 'border:0;position:absolute;width:0px;height:0px;left:0px;top:0px;'});
    var d = new Date();
    var n = d.getTime();

	if(style==undefined) style = '<link rel="stylesheet" href="css/backoffice.css" type="text/css" />';
	else{
	  var tab = style.split(',');
	  style = '';
	  for(var i=0;i<tab.length;i++) style += '<link rel="stylesheet" href="'+tab[i]+'?t='+n+'" type="text/css" />';
	}

    // Add the element to document
    document.body.appendChild(printArea);

    // Applies the content
    printArea.doc = printArea.contentWindow.document;

    // Starts the document, writes data and closes
    printArea.doc.open();
	//printArea.doc.$('head').append('<link rel="stylesheet" href="backoffice/css/backoffice.css" type="text/css" />');
	var content = '';
	obj.each(function() {
	  var clone = $(this).clone();
	  /*if(clone.find('.cadre_impression.facture').length){

		  var table = clone.find('.cadre_impression.facture table.table-paper');
		  var td = table.find('tr:last-child').find('td').eq(0);
		  var facturecontent = clone.find('.cadre_impression.facture .facturecontent');
		  var h = 25;
		  table.find('tr').each(function () {
			  if($(this).find('td').eq(0).length) h+=$(this).find('td').eq(0).actual('innerHeight');
		  });
		  if(h < facturecontent.actual('innerHeight')){

			td.innerHeight(facturecontent.actual('innerHeight')-h));

		  }
		  //table.append('<tr><td height='+h+'></td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
		  //alert($('body').data('tdh'));

	  }*/
	  clone.css('border', 'none');
	  //
	  //clone.find('div.cadre_impression').before('<div class="entete_cadre_impression"><ul><li>Traiteur By Chri\'s</li><li class="adr"><b>Vente à Emporter: </b>(225) 5800- 3838 - <b>Service Traiteur:</b> (225) 7711-0202 / 2241-6183</li></ul></div>');
	  clone.find('div').not('.sautpage').show();
	  clone.find('.noprint').remove();
	 // clone.find('.sautpage').remove();
	 // clone.find('div.cadre_impression').after('<div class="sautpage"></div>');
      content += clone.html()+'<br>';
    });
	content = '<html><head>'+style+'</head><body style=\"background:#fff;padding:0;margin:0;\">'+content+'</body></html>';
    printArea.doc.write(content);
    printArea.doc.close();

    // Focuses on the item and print launches
    printArea.contentWindow.focus();
    printArea.contentWindow.print();

    // Return
    return false;

    // Remove the element to document
    document.body.removeChild(printArea);
}


	// http://remysharp.com/2007/01/25/jquery-tutorial-text-box-hints/
jQuery.fn.hint = function (blurClass) {
  if (!blurClass) {
    blurClass = 'blur';
  }

  return this.each(function () {
    // get jQuery version of 'this'
    var $input = jQuery(this),

    // capture the rest of the variable to allow for reuse
      title = $input.attr('title'),
      $form = jQuery(this.form),
      $win = jQuery(window);

    function remove() {
      if ($input.val() === title && $input.hasClass(blurClass)) {
        $input.val('').removeClass(blurClass);
      }
    }

    // only apply logic if the element has the attribute
    if (title) {
      // on blur, set value to title attr if text is blank
      $input.blur(function () {
        if (this.value === '') {
          $input.val(title).addClass(blurClass);
        }
      }).focus(remove).blur(); // now change all inputs to title

      // clear the pre-defined text when form is submitted
      $form.submit(remove);
      $win.unload(remove); // handles Firefox's autocomplete
    }
  });
};


function tronquer_texte (selector, nb_lignes)
{
	var elmts = typeof selector=="object"?selector:$(selector), t, h, tab_texte, t0;
	if(!(elmts.length&&nb_lignes)) return false;
	elmts.each(function(){
		conteneur = $(this);
		t = conteneur.html();
		t0='';
		for(var i=0;i<nb_lignes;i++) t0 += (t0?'<br>':'')+'|';
		conteneur.html(t0);
		h = conteneur.actual('innerHeight');
		tab_texte = t.split(' '), texte = '';
		for (var i = 0; i < tab_texte.length; i++){
		  conteneur.html(texte+' '+tab_texte[i]+'...');
		  if(conteneur.actual('innerHeight')>h){
		    conteneur.html(texte+'...');
			break;
		  }
		  else texte += ' '+tab_texte[i];
		}
		if (i >=tab_texte.length) conteneur.html(texte);
	});
}

function InitOnglets(selector){
	  var container = typeof selector=="object"?selector:$(selector);
	  if(!container.length) return false;
	  if(!container.find('ul.tab_onglets > li a').length) return false;
	  container.find('ul.tab_onglets > li a').unbind('click');
  	  container.find('ul.tab_onglets > li a').bind('click', function() {
	    var index = $(this).parent('li').index();
		var indexselected = container.find('ul.tab_onglets > li.selected').length?container.find('ul.tab_onglets > li.selected').index():-1;
		if(container.find('.tab_content').eq(index).length){
		  container.find('ul.tab_onglets > li.selected').removeClass('selected');
		  $(this).parent('li').addClass('selected');
		  if(indexselected>=0) container.find('.tab_content').eq(indexselected).hide();
		  container.find('.tab_content').eq(index).fadeIn(700);
		}
	    return false;
      });
	  container.find('ul.tab_onglets > li').eq(0).find('a').trigger('click');
}
var isMsie = window.navigator.userAgent.indexOf("MSIE ") > 0;
/************************************ Jquery time**********************************************/
jQuery.fn.extend({ everyTime: function(interval, label, fn, times, belay) { return this.each(function() { jQuery.timer.add(this, interval, label, fn, times, belay); }); }, oneTime: function(interval, label, fn) { return this.each(function() { jQuery.timer.add(this, interval, label, fn, 1); }); }, stopTime: function(label, fn) { return this.each(function() { jQuery.timer.remove(this, label, fn); }); } }); jQuery.extend({ timer: { guid: 1, global: {}, regex: /^([0-9]+)\s*(.*s)?$/, powers: {'ms': 1, 'cs': 10, 'ds': 100, 's': 1000, 'das': 10000, 'hs': 100000, 'ks': 1000000 }, timeParse: function(value) { if (value == undefined || value == null) return null; var result = this.regex.exec(jQuery.trim(value.toString())); if (result[2]) { var num = parseInt(result[1], 10); var mult = this.powers[result[2]] || 1; return num * mult; } else { return value; } }, add: function(element, interval, label, fn, times, belay) { var counter = 0; if (jQuery.isFunction(label)) { if (!times) times = fn; fn = label; label = interval; } interval = jQuery.timer.timeParse(interval); if (typeof interval != 'number' || isNaN(interval) || interval <= 0) return; if (times && times.constructor != Number) { belay = !!times; times = 0; } times = times || 0; belay = belay || false; if (!element.$timers) element.$timers = {}; if (!element.$timers[label]) element.$timers[label] = {}; fn.$timerID = fn.$timerID || this.guid++; var handler = function() { if (belay && this.inProgress) return; this.inProgress = true; if ((++counter > times && times !== 0) || fn.call(element, counter) === false) jQuery.timer.remove(element, label, fn); this.inProgress = false; }; handler.$timerID = fn.$timerID; if (!element.$timers[label][fn.$timerID]) element.$timers[label][fn.$timerID] = window.setInterval(handler,interval); if ( !this.global[label] ) this.global[label] = []; this.global[label].push( element ); }, remove: function(element, label, fn) { var timers = element.$timers, ret; if ( timers ) { if (!label) { for ( label in timers ) this.remove(element, label, fn); } else if ( timers[label] ) { if ( fn ) { if ( fn.$timerID ) { window.clearInterval(timers[label][fn.$timerID]); delete timers[label][fn.$timerID]; } } else { for ( var fn in timers[label] ) { window.clearInterval(timers[label][fn]); delete timers[label][fn]; } } for ( ret in timers[label] ) break; if ( !ret ) { ret = null; delete timers[label]; } } for ( ret in timers ) break; if ( !ret ) element.$timers = null; } } } }); if (isMsie) jQuery(window).one("unload", function() { var global = jQuery.timer.global; for ( var label in global ) { var els = global[label], i = els.length; while ( --i ) jQuery.timer.remove(els[i], label); } });
