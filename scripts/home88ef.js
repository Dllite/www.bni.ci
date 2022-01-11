//Création de la balise js pour le cookiealert
var js = document.createElement('script');
js.type = 'text/javascript';
js.src = 'scripts/cookiealert.js' ;
//Ajout de la balise dans la page
document.body.appendChild(js);

function centerMapOnCountry(map, countryName){
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( {'address' : countryName}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	    	//console.debug(results);
	        map.setCenter(results[0].geometry.location,17);
	        map.fitBounds(results[0].geometry.bounds)
	    }
	});
}

function addToolTip(marker){

	var datas = marker.item;

	if(infowindow) infowindow.close();

	var html = '<div class="gMapInfo" id="gMapInfo">';
		html+= '	<div class="name">'+datas.name+'</div>';
		html+= '	<div class="adresse">'+datas.adr1+'</div>';
		if(datas.adr2!=null && datas.adr2!='') html+= '	<div class="adresse">'+datas.adr2+'</div>';
		if(datas.cp!=null && datas.cp!='') html+= '	<div class="adresse">'+datas.cp+' '+datas.ville+'</div>';
		if(datas.description!=null && datas.description!='') html+= '	<div class="adresse">'+datas.description+'</div>';
		if(datas.horaire!=null && datas.horaire!=''){
			html+= '	<div class="Horaire"><i></i><span>'+datas.horaire+'</span></div><br/>';
		}
		if(datas.tel!=null && datas.tel!=''){
			html+= '	<div class="tel fa fa-phone-square fa-1x">'+datas.tel+'</div><br/>';
		}
		if(datas.mail!=null && datas.mail!=''){
			html+= '	<div class="mail"><i>@</i><span>'+datas.mail+'<span></div>';
		}

		if(datas.site){
			var addHttp = '';
			if(datas.site.indexOf('http') == -1){
				addHttp = 'http://';
			}
			if(datas.site.indexOf(' - - ') != -1){
				res = datas.site.split(' - - ');
				html+= '	<div class="web"><strong>Web :</strong> <a href="'+ addHttp + res[0]+'" target="_blank">'+res[1]+'</a></div>';
			}else{
				html+= '	<div class="web"><strong>Web :</strong> <a href="'+ addHttp + datas.site+'" target="_blank">'+datas.site+'</a></div>';
			}

		}

		html+= '</div>';

	infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(260,90),
		content: html
	});

	infowindow.open(map,marker);
    map.setZoom(17);
    map.setCenter(marker.getPosition());
}

/*function deleteCountry(){
	if(polyList.length > 0){
		for(var i = 0; i < polyList.length; i ++){
			polyList[i].setMap(null);
		}
	}
}

function restoreCountry(){
	if(polyList.length > 0){
		for(var i = 0; i < polyList.length; i ++){
			polyList[i].setMap(map);
		}
	}
}*/

/*function drawCountry(filterCountry){

	if(filterCountry == undefined){
		filterCountry = 0;
	}

	for(var i=0; i < countryList.length; i++){
		if(filterCountry == 0 || countryList[i].iso == filterCountry){
			var confPolygonMap = {
				country: [countryList[i].iso],
				strokeColor: countryList[i].color,
				strokeOpacity:0.1,
				strokeWeight:2,
				fillColor: countryList[i].color,
				fillOpacity:0.8,
				hoverFillColor: countryList[i].color,
				hoverFillOpacity:0.1,
				hoverStrokeColor: countryList[i].color,
				hoverStrokeWeight:2,
				hoverStrokeOpacity:0.1
			}

			if(mapConf.countryLink){
				confPolygonMap.onClickValue = {url: [countryList[i].link]};
			}

			poly.createPolygon(map, confPolygonMap, polyList);
		}
	}
}*/

function initialize() {

		/*if(mapConf.showCountryLayer){
			drawCountry(mapConf.activeCountryIso);
		}*/

	// dessiner tous les markers
	var markers = [];
	for(var i=0; i < implantationsList.length; i++){
		var item = implantationsList[i];
		var image = 'images/gmap_marker.png';
		var imageactive = 'images/gmap_marker_active.png';

		var marker = new google.maps.Marker({
			map: map,
			icon: image,
			active: imageactive,
			position: new google.maps.LatLng(item.coordY, item.coordX),
			title: item.name,
			myLink: item.link,
			item: item
		});

		marker.addListener('click', function() {
			addToolTip(this);
  		});


		marker.addListener('change', function() {
   //alert('ok');
   addToolTip(this);
    });
		/*
		google.maps.event.addListener(marker, 'click', function() {
			window.location.href = this.myLink;
		});
		if(item.uid == mapConf.activeImplantation){
			if(!isMobile()){
				addToolTip(map, marker, item);
				map.panBy(-200, -100);
			} else {
				map.panBy(-100, 0);
			}
		}
		*/
		markersList['bni'+item.uid] = marker;
		markers.push(marker);
	}

	/*if(mapConf.useClusters == '1'){
		mcOptions = {gridSize: 20, styles: [ { height: 56, url: mapConf.baseUrl + 'images/cluster.png', width: 56}]}
		var markerCluster = new MarkerClusterer(map, markers, mcOptions);
	}*/

	/*if(mapConf.activeCountry != 0 && mapConf.centerMapOnCountry == 1){
		centerMapOnCountry(map, mapConf.activeCountry);
	}*/

	/*if(mapConf.showLegend != 0){
		map.controls[google.maps.ControlPosition.RIGHT_TOP].push(document.getElementById('gmapLegendWrap'));
	}*/

	/*google.maps.event.addListener(map, 'zoom_changed', function() {
		if(map.getZoom() > 5){
			deleteCountry();
		} else {
			restoreCountry();
		}
	});*/
}

function BrowserDetection() {
    var browser = '';
    //Check if browser is IE or not
    if (navigator.userAgent.search("MSIE") >= 0) browser = 'ie';
    //Check if browser is Chrome or not
    else if (navigator.userAgent.search("Chrome") >= 0)  browser = 'chrome';
    //Check if browser is Firefox or not
    else if (navigator.userAgent.search("Firefox") >= 0)  browser = 'firefox';
    //Check if browser is Safari or not
    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0)  browser = 'safari';
    //Check if browser is Opera or not
    else if (navigator.userAgent.search("Opera") >= 0)  browser = 'opera';

    return browser;
}
// initialise plugins
jQuery(function(){
  $('ul li:first-child').addClass('first');
  $('ul li:last-child').addClass('last');
  var classe = BrowserDetection();
  if(classe) $('body').addClass(classe);
});


/*(function($) {

    // Use this variable to set up the common and page specific functions.
    var Roots = {
        // All pages
        'common': {
            init: function() {
                // JavaScript to be fired on all pages

                // preloader click
                $('.tm-preloader').find('.tm-button').on('click', function () {
                	$(this).parent('.tm-preloader').fadeOut('slow');
                	alert('oui');
                });
            },
            finalize: function() {
                // JavaScript to be fired on all pages, after page specific JS is fired

                //disable prelaoder msg
                $('.tm-preloader').delay(60000).fadeOut('slow');

            }
        }
    };

    UTIL = {

        fire : function(func, funcname, args){

            var namespace = Roots;  // indicate your obj literal namespace here

            funcname = (funcname === undefined) ? 'init' : funcname;
            if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function'){
                namespace[func][funcname](args);
            }
        },

        loadEvents : function(){

            //var bodyId = document.body.id;

            // hit up common first.
            UTIL.fire('common');

            // do all the classes too.
            $.each(document.body.className.split(/\s+/), function(i, classnm){
                UTIL.fire(classnm);
                //UTIL.fire(classnm, bodyId);
            });

            UTIL.fire('common', 'finalize');
        }
    };

    // kick it all off here
    $(document).ready(UTIL.loadEvents);

})(jQuery);*/ // Fully reference jQuery after this point.


function isScrolledIntoView(elem){var $window=$(window);return elem.offset().top+ elem.outerHeight()>=$window.scrollTop()&&elem.offset().top<=$window.scrollTop()+ $window.height();}
function lazyInit(element,func){var $win=jQuery(window);$win.on('load scroll',function(){if((!element.hasClass('lazy-loaded')&&(isScrolledIntoView(element)))){func.call();element.addClass('lazy-loaded');}});}

$(function(){
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
	{
	   //alert('You are using a mobile device!');
	}
	else
	{
		$("html, body").stop().animate({scrollTop:0}, 500, 'swing', function() {

		});
	}

});


function Convert_Valeur(id1, id2) {

   if(isNaN($('#champ_devise'+id1).val().replace(' ', '').replace(',', '.'))) $('#champ_devise'+id1).val(1);
   var val1 = Number(SelectValues('#devise'+id1).replace(',', '.'));
   var val2 = Number(SelectValues('#devise'+id2).replace(',', '.'));

   //var montant = Number(str_replace(',', '.', str_replace(' ', '', V('champ_devise'+id1))));
   var montant = Number($('#champ_devise'+id1).val().replace(',', '.').replace(' ', ''));

   var val = '';
   if(val1>0) val = (val2/val1) * montant;
   val = formatte(val);
   var tab = String(val).split('.');
   val = tab[0];
   r = 0;
   if(tab.length==2) {
     r = tab[1];
	 r = r.substring(0,6);
	 val = val + ',' + r;
   }
   //O('champ_devise' + id1).value = formatte(V('champ_devise'+id1));
   $('#champ_devise'+id1).val(formatte($('#champ_devise'+id1).val()));
   //O('champ_devise' + id2).value = val;
   $('#champ_devise'+id2).val(val);

}

function formatte(valeur2){

	valeur = String(valeur2);
	valeur = valeur.replace(' ', '');
	//valeur = str_replace(' ', '', valeur);
	if (isNaN(valeur.split(' ').join(''))) return valeur;
	var valeurformate =new Array()
	var tempval=valeur.split('.')
	valeur=tempval[0].split(' ').join('')
	valeur=valeur.split('').reverse()

	var i=0
	while(i<valeur.length){

	 valeurformate.push( (valeur[i+2]?valeur[i+2]:'') + (valeur[i+1]?valeur[i+1]:'') + valeur[i] );
	 i=i+3;
	}

	valeurformate=valeurformate.reverse().join(' ') +( tempval[1]?tempval[1].length>0?'.'+tempval[1]:'':'');
	return valeurformate
}

function VerifierNombre(data, min, max, msg) {
    msg = "La zone " + msg + " n'a pas une donnee correcte : " + $('#'+data).val();

    var Val = $('#'+data).val();
    for (var i = 0; i < Val.length; i++) {
        var c = Val.substring(i, i + 1)
        if ((c < "0" || "9" < c) && c != '.') {
            alert(msg);
            return false;
        }
    }
    var num = parseFloat(Val)
    if (num < min || max < num) {
        alert(msg + " n'est pas compris entre [" + min + ".." + max + "]");
        return false;
    }
    //data.value = Val;
    $('#'+data).val(Val);
    return true;
}
function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

function floatWithSpaces(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

function getBrvm() {
    var str = '',
        c;
    $.get('https://easytrade.bnifinances.ci/BNIFinancesServer/Service.svc/GetMarketSnapshot', function(response) {
        //console.log(response);
      if (response && response.Ticker) {
        $.each(response.Ticker, function(idx, data) {
            c = data.var >= 0 ? 'fa fa-arrow-up text-success' : 'fa fa-arrow-down text-danger';
            data.var = data.var.toFixed(2);
            str += '<span style="padding:0px 10px;display:inline-block;color:#fff">' + data.Titre + ' &nbsp;&nbsp; ' + numberWithSpaces(data.prix) + ' &nbsp;&nbsp;' + data.var + ' <i class="' + c + '"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#6c6d6e">|</span></span>';
        });
        $('#brvm').html(str);
      }
    });
}

$('document').ready(function(){
	console.log($('.main-slider .item .mbr-btn').length);
	$('.main-slider .item .mbr-btn').not(':visible').closest('.item')
      .css('cursor', 'pointer')
        .unbind('click')
        .click(function() {
			
            window.location = $('.mbr-btn', $(this)).attr('href');
        });
	var isNoviBuilder=window.xMode;

    getBrvm();
	/*if($('#mainmap').length) {
		if($('#mainmapmobile:visible').length) var map = new google.maps.Map(document.getElementById("mainmapmobile"),  myOptions);
    	else var map = new google.maps.Map(document.getElementById("mainmap"),  myOptions);
	}*/

	if($('.tm-preloader').length){
		//disable prelaoder msg
	    $('.tm-preloader').delay(30000).fadeOut('slow');

		// preloader click
		//$('.tm-preloader').find('.tm-button').unbind('click');
	    $('.tm-preloader').find('.tm-button').on('click', function () {
	    	//$(this).parent('.tm-preloader').fadeOut('slow');
	    	$(this).parent(".tm-preloader").hide();
	    });
	}

	/****************** Select map *******************/
	if($('#mainmap:visible').length){
		initialize();

		$('#agence-liste form#form_agence #bni').change(function(){

			//alert($(this).children(":selected").attr("id"));

  			var marker = markersList[$(this).children(":selected").attr("id")];
	        new google.maps.event.trigger( marker, 'change' );
	        $.scrollTo($('#mainmap'), 'slow');
	        return false;
		})
	}
	/****************** end Select map *******************/

	if($('#mainmap:visible').length) {
		initialize();

		$('.cadre_agence a').click(function(){
	      var marker = markersList[$(this).attr('id')];
	      new google.maps.event.trigger( marker, 'click' );
	      $.scrollTo($('#mainmap'), 'slow');
	      return false;
	    });
	}

	if($('#mainmapmobile:visible').length) {
		initialize();

		$('.cadre_agence a').click(function(){
	      var marker = markersList[$(this).attr('id')];
	      new google.maps.event.trigger( marker, 'click' );
	      $.scrollTo($('#mainmapmobile'), 'slow');
	      return false;
	    });
	}

	if($('#mainmapmobile:visible').length) {
  		initialize();

		$('#agence-liste form#form_agence #bni').change(function(){

	   		//alert($(this).children(":selected").attr("id"));
	     	var marker = markersList[$(this).children(":selected").attr("id")];
	     	//alert(marker);
	        new google.maps.event.trigger( marker, 'change' );
	        $.scrollTo($('#mainmap'), 'slow');
	        return false;
	  	});
 	}

	if($('#cadre_facebook').length) {
	     var iframe = $(document.createElement('iframe')).attr({'scrolling':'no', 'frameborder':0, 'allowTransparency':true}).css({'border':'none', 'overflow':'hidden', 'height':'210px'});
	     iframe.attr('src', 'https://www.facebook.com/connect/connect.php?id=115027495253538&connections=10&tream=0&locale=fr_FR');

	     $('#cadre_facebook').append(iframe);
	  //$('#cadre_facebook').append('<div class="clear"></div>');
	}

	if($('#section_investissement').length) {
		$('#section_investissement #section_gauche').height($('#section_investissement').height());
	}

	if($('#section_refinancement').length) $('#section_refinancement #section_droite').height($('#section_refinancement').height());
	if($('#section_conseil').length) $('#section_conseil #section_gauche').height($('#section_conseil').height());
	if($('#section_actifs').length) $('#section_actifs #section_droite').height($('#section_actifs').height());

	if($('#section_popup_investissement').length) $('#section_popup_investissement').height($('#section_investissement').height());
	if($('#section_popup_refinancement').length) $('#section_popup_refinancement').height($('#section_investissement').height());
	if($('#section_popup_conseil').length) $('#section_popup_conseil').height($('#section_conseil').height());
	if($('#section_popup_actifs').length) $('#section_popup_actifs').height($('#section_actifs').height());

	/************* CONVERTISSEUR DEVISE ************/
	if($('.block-vacation form #devise1').length) {
		Convert_Valeur(1, 2);
		$('.block-vacation form #devise1').change(function(){
		  var devise1 = $('.block-vacation form #devise1 option:selected').text();//SelectValues('.block-vacation form #devise1');
		  devise1 = devise1.replace("\'", "'");
		  var tab = devise1.split(' - ');
		  devise1 = tab[1];
		  $('.block-vacation form #lib_devise1').html(devise1);
		  //alert(devise1);
		});

		$('.block-vacation form #devise2').change(function(){
		  var devise2 = $('.block-vacation form #devise2 option:selected').text();
		  devise2 = devise2.replace("\'", "'");
		  var tab = devise2.split(' - ');
		  devise2 = tab[1];
		  $('.block-vacation form #lib_devise2').html(devise2);
		  //
		});

		$('.block-vacation form #champ_devise1').keyup(function(){
		  Convert_Valeur(1, 2);
		});

		$('.block-vacation form #champ_devise2').keyup(function(){
		  Convert_Valeur(2, 1);
		});

		return false;
	}

	/************* SIMULATEUR CREDIT ************/
	if($('.block-vacation form #CoutPret').length) {

        $('.block-vacation form #montant_f').on("keyup", function() {
            $('.block-vacation form #montant').val($(this).val().replace(/ /g,''));
            this.value = this.value.replace(/ /g,'');
            var number = this.value;
            this.value = number.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        });

		jQuery('.block-vacation form input:button').bind('click', function() {
			//if($('.block-vacation form #mensualite').val())
			if(!$('form #montant').TestVide()) return Msg_Erreur('Veuillez svp saisir le champ <b>Montant du credit</b>.', '.block-vacation form #montant', 1);
			else if(!$('form #montant').TestNumeric()) return Msg_Erreur('Veuillez svp saisir une valeur numerique pour le champ <b>Montant du credit</b>.', '.block-vacation form #montant', 1);
			if(!$('.block-vacation form #mensualite').TestVide()) return Msg_Erreur('Veuillez svp saisir le champ <b>Nombre de Mensualites</b>.', '.block-vacation form #mensualite', 1);
			else if(!$('form #mensualite').TestEntier()) return Msg_Erreur('Veuillez svp saisir une valeur entiere pour le champ <b>Nombre de Mensualites</b>.', '.block-vacation form #taux_interet', 1);

			if(!$('.block-vacation form #taux_interet').TestVide()) return Msg_Erreur('Veuillez svp saisir le champ <b>Taux d\'interet</b>.', '.block-vacation form #taux_interet', 1);
			else if(!$('form #taux_interet').TestNumeric()) return Msg_Erreur('Veuillez svp saisir une valeur numerique pour le champ <b>Taux d\'interet</b>.', '.block-vacation form #taux_interet', 1);

			if(!VerifierNombre('mensualite', 1, 480, 'Nombre de mensualites') ||
	        !VerifierNombre('taux_interet', 0.001, 99, "taux d'interet") ||
	        !VerifierNombre('montant', 100, 30000000000000, "Montant du credit")){
				$('.block-vacation form #CoutPret').val('');
				$('.block-vacation form #echeance').val('');
				return;
	        }

	        var i = $('.block-vacation form #taux_interet').val();

		    if (i > 1.0) {
		        i = i / 100.0;
		        //form.Taux.value = i;
		        $('.block-vacation form #taux_interet').val(i);
		    }
		    i /= 12;

		    var pow = 1;
		    for (var j = 0; j < $('.block-vacation form #mensualite').val(); j++)
		        pow = pow * (1 + i);
		    var Echeance = ($('.block-vacation form #montant').val() * pow * i) / (pow - 1);
		    Echeance = Echeance.toFixed(2);
		    Echeance = formatte(Echeance);
		    $('.block-vacation form #echeance').val(Echeance);

		    var CoutPret = ((($('.block-vacation form #montant').val() * pow * i) / (pow - 1))*$('.block-vacation form #mensualite').val())-$('.block-vacation form #montant').val();
		    CoutPret = CoutPret.toFixed(2);
		    CoutPret = formatte(CoutPret);
		    $('.block-vacation form #CoutPret').html(CoutPret);
		});
		return false;
	}

	$('#css-modal .close, #css-modal .css-modal-btn a.btn-close').click(function(e) {
		e.preventDefault();
		$('#css-modal').fadeOut(function() {
			$('#css-modal').remove();
		});
	});
});

if(jQuery('#loginform button').length){
    	//alert('ok');
		var login_field = 'username', pwd_field = 'password';
		var anievent = (jQuery.browser.webkit)? 'webkitAnimationEnd' : 'animationend';
		jQuery('.loginwrap').bind(anievent,function(){
			jQuery(this).removeClass('animate2 bounceInDown');
		});

		jQuery('#loginform #'+login_field+',#loginform #'+pwd_field).focus(function(){
			if(jQuery(this).hasClass('error')) jQuery(this).removeClass('error');
		});

		setTimeout( function() {$('#loginform #'+login_field).focus();} , 500);

		jQuery('#loginform button').click(function(){
			jQuery('#loginform #'+login_field).val(jQuery.trim(jQuery('#loginform #'+login_field).val()));
		    jQuery('#loginform #'+pwd_field).val(jQuery.trim(jQuery('#loginform #'+pwd_field).val()));

			//if(!jQuery.browser.msie) {
				if(!(jQuery('#loginform #'+login_field).TestVide() && jQuery('#loginform #'+pwd_field).TestVide())) {
					if(!(jQuery('#loginform #'+login_field).TestVide() && $('#loginform #'+login_field).TestEmail())) jQuery('#loginform #'+login_field).addClass('error'); else jQuery('#loginform #'+login_field).removeClass('error');
					if(!jQuery('#loginform #'+pwd_field).TestVide()) jQuery('#loginform #'+pwd_field).addClass('error'); else jQuery('#loginform #'+pwd_field).removeClass('error');
					if(!jQuery.browser.msie){
						jQuery('.loginwrap').addClass('animate0 wobble').bind(anievent,function(){
						   jQuery(this).removeClass('animate0 wobble');
					    });
					}
				}
				else {
					/*if(!jQuery.browser.msie){
						jQuery('.loginwrapper').addClass('animate0 fadeOutUp').bind(anievent,function(){
							//jQuery('#loginform').submit();
						});
					}*/
					//alert('includes/login.php?login=' + urlencode(jQuery('#loginform #'+login_field).val()) + '&pass=' + urlencode(jQuery('#loginform #'+pwd_field).val()));return false;
					AjaxLoad('includes/login.php', 'login=' + urlencode(jQuery('#loginform #'+login_field).val()) + '&pass=' + urlencode(jQuery('#loginform #'+pwd_field).val()));
				}
				return false;
			//}
		});

		jQuery('#loginform #pwd_oublie').click(function(){
			jQuery('#loginform #'+login_field).val(jQuery.trim(jQuery('#loginform #'+login_field).val()));
			//if(!jQuery.browser.msie) {
				if(!(jQuery('#loginform #'+login_field).TestVide() && $('#loginform #'+login_field).TestEmail())) {
					jQuery('#loginform #'+login_field).addClass('error');
					if(!jQuery.browser.msie){
						jQuery('.loginwrap').addClass('animate0 wobble').bind(anievent,function(){
						   jQuery(this).removeClass('animate0 wobble');
					    });
					}
				}
				else {
					AjaxLoad('includes/login.php', 'login=' + urlencode(jQuery('#loginform #'+login_field).val()) + '&action=O');
				}
				return false;
			//}
		});
}


function EnterPress(container, nom_form){
	$(container+' form#'+nom_form+' input.form-control').keypress(function (e) {
    	var div = $(this).closest(".setup-content");
	  	if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	  		$('#'+div.attr('id')+' .nextBtn').trigger('click');
            return false;
        } else {
            return true;
        }
	});
}

function SubmitRDV(container, nom_form, destination){
	 if($(container+' form#'+nom_form).length){

	 	$(".date-time")
		 	.keypress(function (evt) {
			  return false;
			});

		if($('#date_rdv').length){
			$("#date_rdv").closest('.input-group').datetimepicker({
                locale: 'fr',
                format: 'L',
                format: 'DD/MM/YYYY',
                ignoreReadonly: true,
                allowInputToggle: true
            });
		}

		if($('#heure_rdv').length){
			$("#heure_rdv").closest('.input-group').datetimepicker({
                format: 'LT',
                locale: 'fr',
                ignoreReadonly: true,
                allowInputToggle: true
            });
		}

		/* ---------- Choosen ---------- */
		if($('.chosen').length){
			$('.chosen').chosen();
		}

		EnterPress(container, nom_form);
		var ok = true;

		if($(container+' form#'+nom_form+' #conteneur_objet').length){
		    jQuery(container+' form#'+nom_form+' #objet_pere').change(function() {
			  var objet_pere = Number(SelectValues(container+' form#'+nom_form+' #objet_pere'));
			  if(objet_pere) {
			    var ids = container+' form#'+nom_form+' #conteneur_objet';
			    AjaxLoad(destination, 'op=change_objets&objet_pere=' + urlencode(objet_pere), ids);
			    //$(container+' form#'+nom_form+' #conteneur_objet').fadeIn('fast');
			  }
			  //else $(container+' form#'+nom_form+' #conteneur_objet').fadeOut('fast');
		    });
			$(container+' form#'+nom_form+' #objet_pere').trigger('change');
		  }

	 if($(container+' form#'+nom_form+' #div_num_compte').length){
	    jQuery(container+' form#'+nom_form+' #type_client').change(function() {
		  var type_client = Number(SelectValues(container+' form#'+nom_form+' #type_client'));
		  if(type_client==1) {
		    $(container+' form#'+nom_form+' #div_num_compte label').addClass('requiredfield');
		    $(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

		  }
		  else{
		  	$(container+' form#'+nom_form+' #div_num_compte label').removeClass('requiredfield');
		  	$(container+' form#'+nom_form+' #div_num_compte').fadeOut('fast');
		  }
	    });
		$(container+' form#'+nom_form+' #type_client').trigger('change');

	  }

	  /*button suivant et verification*/
		var navListItems = $('div.setup-panel div a'),
        div_Content = $('.setup-content'),
        Btn_Suivant = $('.nextBtn');
        Btn_Precedent = $('.previousBtn');

        div_Content.hide();
        navListItems.click(function (e) {
        	div_id = $('.setup-content:visible').attr('id');
        	e.preventDefault();
        	var target = $($(this).attr('href')),
            $item = $(this);
            if (!$item.hasClass('disabled')) {
	            navListItems.removeClass('btn-success').addClass('btn-default');
	            $item.addClass('btn-success');
	            div_Content.hide();
	            target.show();
	            target.find('input:eq(0)').focus();

	            $(container+' form#'+nom_form).data('error_validation', 0);
			    $(container+' form#'+nom_form + ' label.error').remove();
			    $('#'+div_id+' input, #'+div_id+' select, #'+div_id+' textarea').not('.__sys_field__').each(function (el) {
			    	if($(this).closest('div.form-group').find('label.requiredfield').length) {
			    		fid = $(this).attr('id');
			    		if($('#'+div_id+' #anc_'+fid).length) ok = !$('#'+div_id+' #anc_'+fid).TestVide();
			            else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
			            ok = ok && !$(this).hasClass('__field_sys__');
			            if(ok && !$('#'+div_id+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, '#'+div_id+' #'+fid);
			            else ok = false;
			    	}
			    });
			    if(ok == true) return false;
	        }

	        if(div_id == "step-1"){// Condition pour le 1er onglet

				/*if(datefin && datedebut){
					var periodeid = $(container+' form#'+nom_form+' #periodeid').val();
					//AjaxLoad(destination, 'op=change_chantier&chantier=' + chantier+'&datedebut='+urlencode(datedebut)+'&datefin='+urlencode(datefin)+'&__type__=1', '#container_liste_dossier');
					AjaxLoad(destination, 'op=change_chantier&chantier=' + chantier+'&clientip='+clientip+'&datedebut='+urlencode(datedebut)+'&datefin='+urlencode(datefin)+'&__type__=1&periodeid='+urlencode(periodeid), '#container_liste_dossier');// La liste déroulante des Chantier ne s'affiche pas pour les entreprises et la visibilité est paramétrable le 12/07/2018 sous la demande de Anne Cernejeski, parce que les libellé ne sont pas explicite
		  			$(container+' form#'+nom_form+' #container_liste_dossier').fadeIn('fast');
				}*/
			}

			if(div_id == "step-2"){// Si aucun employé présélectionné ne pas pourvoir continuer
		    	if(ok == false){

				}
			}

		    if(div_id == "step-3"){// Si un Champ de l'heure n'est pas saisie, le rendre obligatoire

		    }
		});


		Btn_Suivant.click(function () {
	        var curStep = $(this).closest(".setup-content"),
	        curStepBtn = curStep.attr("id"),
	        nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
	        //curInputs = $(curStep).find("input, select, textarea").not('.__sys_field__'),
	        ok = true;
	        div_id = $('.setup-content:visible').attr('id');

	        $(container+' form#'+nom_form).data('error_validation', 0);
		    $(container+' form#'+nom_form + ' label.error').remove();
		    $('#'+div_id+' input, #'+div_id+' select, #'+div_id+' textarea').not('.__sys_field__').each(function (el) {
		    	if($(this).closest('div.form-group').find('label.requiredfield').length) {
		    		fid = $(this).attr('id');
		    		if($('#'+div_id+' #anc_'+fid).length) ok = !$('#'+div_id+' #anc_'+fid).TestVide();
		            else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
		            ok = ok && !$(this).hasClass('__field_sys__');
		            if(ok && !$('#'+div_id+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, '#'+div_id+' #'+fid);
		            else ok = false;
		    	}
		    });

		    //alert(ok);

		    if(div_id == "step-1"){
				var type_client = Number(SelectValues(container+' form#'+nom_form+' #type_client'));
				if(type_client){
					if(type_client==1) {
					    /*$(container+' form#'+nom_form+' #div_num_compte label').addClass('requiredfield');
					    $(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');*/
					    ok = true;
					    if(!$(container+' form#'+nom_form+' #num_compte').TestVide()) {
					    	ok = true;
					    	Validation_Erreur(SYSTEMLangues.systeme.librequired, '#'+div_id+' #num_compte');
					    }
					    else{
					    	if($(container+' form#'+nom_form+' #num_compte').val() == 'CI092'){
					    		ok = true;
					    		Validation_Erreur(SYSTEMLangues.systeme.librequired, '#'+div_id+' #num_compte');
					    	}
					    	else ok = false;
					    }
						//return Msg_Erreur('Veuillez svp Sélectionner un seul employé pour le Relevé de prestation individuel', '', 1);
					}
					else ok = false;
				}
				else ok = true;

			}

		    if(div_id == "step-2"){// Si aucun employé présélectionné ne pas pourvoir continuer
		    	if(!$(container+' form#'+nom_form+' #objet').TestVide()) {
			    	ok = true;
			    	Validation_Erreur(SYSTEMLangues.systeme.librequired, '#'+div_id+' #objet');
			    }
			    else{
			    	ok = false;
			    }
		    }

		    if(div_id == "step-5"){// Si un Champ de l'heure n'est pas saisie, le rendre obligatoire
		    	ok = false;

		    }

		    if(ok == true) return false;
		    else nextStepWizard.removeAttr('disabled').trigger('click');

	        /*traitement spécial */

		    if(div_id == "step-4"){
				var type_client = Number(SelectValues(container+' form#'+nom_form+' #type_client'));
				var num_compte = $(container+' form#'+nom_form+' #num_compte').val();
				var agence = SelectValues(container+' form#'+nom_form+' #agence');
				var objet = SelectValues(container+' form#'+nom_form+' #objet');
				var date_rdv = $(container+' form#'+nom_form+' #date_rdv').val();
				var heure_rdv = $(container+' form#'+nom_form+' #heure_rdv').val();

				var nom = $(container+' form#'+nom_form+' #nom').val();
				var cel = $(container+' form#'+nom_form+' #cel').val();
				var tel = $(container+' form#'+nom_form+' #tel').val();
				var email = $(container+' form#'+nom_form+' #email').val();
				var msg = $(container+' form#'+nom_form+' #msg').val();
				//return FormSubmit(container+' form#'+nom_form, {'op':'details'}, '#conteneur_recap');
				AjaxLoad(destination, 'op=details&type_client=' + urlencode(type_client)+'&num_compte='+urlencode(num_compte)+'&objet='+urlencode(objet)+'&date_rdv='+urlencode(date_rdv)+'&heure_rdv='+urlencode(heure_rdv)+'&nom='+urlencode(nom)+'&cel='+urlencode(cel)+'&tel='+urlencode(tel)+'&email='+urlencode(email)+'&msg='+urlencode(msg), '#conteneur_recap');

			}

			if(div_id == "step-2"){//Traitement spécial pour le 2è Onglet

				//if(DOSSIPS_SELECTED && chantier && datedebut && datefin){
				/*if(DOSSIPS_SELECTED && datedebut && datefin && (chantier || clientip)){
					var periodeid = $(container+' form#'+nom_form+' #periodeid').val();
					//AjaxLoad(destination, 'op=saisie&chantier=' + chantier+'&datedebut='+urlencode(datedebut)+'&datefin='+urlencode(datefin)+'&numboncommande='+urlencode(numboncommande)+'&dossips='+urlencode(DOSSIPS_SELECTED)+'&renouvellement_prestation='+urlencode(renouvellement_prestation)+'&type_prestation='+urlencode(type_prestation)+'&type_releve='+urlencode(type_releve)+'&appliquer='+urlencode(appliquer), '#conteneur_saisie');
					AjaxLoad(destination, 'op=saisie&chantier=' + urlencode(chantier)+'&clientip='+urlencode(clientip)+'&datedebut='+urlencode(datedebut)+'&datefin='+urlencode(datefin)+'&numboncommande='+urlencode(numboncommande)+'&dossips='+urlencode(DOSSIPS_SELECTED)+'&renouvellement_prestation='+urlencode(renouvellement_prestation)+'&type_prestation='+urlencode(type_prestation)+'&type_releve='+urlencode(type_releve)+'&appliquer='+urlencode(appliquer)+'&periodeid='+urlencode(periodeid), '#conteneur_saisie');
		  			$(container+' form#'+nom_form+' #conteneur_saisie').fadeIn('fast');
				}*/
			}

		    if(div_id == "step-5"){// Si un Champ de l'heure n'est pas saisie, le rendre obligatoire
		    	if(ok == false) return FormSubmit(container+' form#'+nom_form, {'op':'soumis', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
		    }

	    });

		Btn_Precedent.click(function () {
	        var curStep = $(this).closest(".setup-content"),
	            curStepBtn = curStep.attr("id"),
	            nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().prev().children("a"),
	            div_id = $('.setup-content:visible').attr('id');
	            nextStepWizard.removeAttr('disabled').trigger('click');
	        /*traitement*/
		    //div_step2_show (container, nom_form, destination, div_id);
	    });
	    $('div.setup-panel div a.btn-success').trigger('click');

	 }
}


function SubmitPlaintes(container, nom_form, destination){
	 if($(container+' form#'+nom_form).length){

		$(".date-time")
		 	.keypress(function (evt) {
			  return false;
			});

		if($('#date_rdv').length){
			$("#date_rdv").closest('.input-group').datetimepicker({
                locale: 'fr',
                format: 'L',
                format: 'DD/MM/YYYY',
                ignoreReadonly: true,
                allowInputToggle: true
            });
		}

		if($('#heure_rdv').length){
			$("#heure_rdv").closest('.input-group').datetimepicker({
                format: 'LT',
                locale: 'fr',
                ignoreReadonly: true,
                allowInputToggle: true
            });
		}

		/* ---------- Choosen ---------- */
		if($('.chosen').length){
			$('.chosen').chosen();
		}

		if ($('.chosen-container').length) {
            $('.chosen-container').css({ width: '100%' });
        }

        if($(container+' form#'+nom_form+' #container_autre_objet').length){
		    jQuery(container+' form#'+nom_form+' #objet').change(function() {
			  var objet = SelectValues(container+' form#'+nom_form+' #objet');
			  if(objet==-1) {
			    $(container+' form#'+nom_form+' #container_autre_objet label').addClass('requiredfield');
			    $(container+' form#'+nom_form+' #container_autre_objet').fadeIn('fast');

			  }
			  else{
			  	$(container+' form#'+nom_form+' #container_autre_objet label').removeClass('requiredfield');
			  	$(container+' form#'+nom_form+' #container_autre_objet').fadeOut('fast');
			  }
		    });
			$(container+' form#'+nom_form+' #objet').trigger('change');
		}


		if($(container+' form#'+nom_form+' #container_entite_plainte').length){
		    jQuery(container+' form#'+nom_form+' #entite_plainte').change(function() {
			  var entite_plainte = Number(SelectValues(container+' form#'+nom_form+' #entite_plainte'));
			  if(entite_plainte) {
			    var ids = container+' form#'+nom_form+' #container_entite_plainte';
			    AjaxLoad(destination, 'op=change_entite_plainte&entite_plainte=' + urlencode(entite_plainte), ids);
			    //$(container+' form#'+nom_form+' #container_entite_plainte').fadeIn('fast');
			  }
			  //else $(container+' form#'+nom_form+' #container_entite_plainte').fadeOut('fast');
		    });
			$(container+' form#'+nom_form+' #entite_plainte').trigger('change');
		}


		/*if($(container+' form#'+nom_form+' #div_num_compte').length){
			jQuery(container+' form#'+ nom_form + ' [id^="letype_client-"]:radio').bind('click', function() {
			  var type_client = $(container + ' form#' + nom_form + ' #letype_client').val();
			  if(type_client==1) {
			    $(container+' form#'+nom_form+' #div_num_compte label').addClass('requiredfield');
			    $(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

			  }
			  else{
			  	$(container+' form#'+nom_form+' #div_num_compte label').removeClass('requiredfield');
			  	$(container+' form#'+nom_form+' #div_num_compte').fadeOut('fast');
			  }
		    });
		}*/

		if($(container+' form#'+nom_form+' #container_typeclient').length){
			jQuery(container+' form#'+ nom_form + ' [id^="letype_client-"]:radio').bind('click', function() {
			  var type_client = $(container + ' form#' + nom_form + ' #letype_client').val();
			  if(type_client==1) {
			    $(container+' form#'+nom_form+' #container_typeclient label').addClass('requiredfield');
			    $(container+' form#'+nom_form+' #container_typeclient').fadeIn('fast');

			  }
			  else{
			  	$(container+' form#'+nom_form+' #container_typeclient label').removeClass('requiredfield');
			  	$(container+' form#'+nom_form+' #container_typeclient').fadeOut('fast');
			  	$(container+' form#'+nom_form+' #div_num_compte').fadeOut('fast');
			  	$(container+' form#'+nom_form+' #container_num_carte').fadeOut('fast');
			  }
		    });
		}

		if($(container+' form#'+nom_form+' #div_num_compte').length){
		    jQuery(container+' form#'+nom_form+' #letype_client2').change(function() {
			  var letype_client2 = Number(SelectValues(container+' form#'+nom_form+' #letype_client2'));
			  if(letype_client2) {
			  	if(letype_client2==1) {
				    $(container+' form#'+nom_form+' #div_num_compte label').addClass('requiredfield');
			    	$(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

			    	$(container+' form#'+nom_form+' #container_num_carte label').removeClass('requiredfield');
				  	$(container+' form#'+nom_form+' #container_num_carte').fadeIn('fast');
				}
				else{
				  	$(container+' form#'+nom_form+' #div_num_compte label').removeClass('requiredfield');
			  		$(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

			  		$(container+' form#'+nom_form+' #container_num_carte label').addClass('requiredfield');
			    	$(container+' form#'+nom_form+' #container_num_carte').fadeIn('fast');
				}
			  }
			});
			$(container+' form#'+nom_form+' #letype_client2').trigger('change');
		}

	  jQuery(container+' form#'+nom_form+' input:submit').bind('click', function() {
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

	    $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
	        if($(this).closest('div.form-group').find('label.control-label.requiredfield').length) {
	           fid = $(this).attr('id');
	           if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
	           else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
	           ok = ok && !$(this).hasClass('__field_sys__');
	           if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
		   	}
	     });

		if(!$(container+' form#'+nom_form).data('error_validation')){
			return FormSubmit(container+' form#'+nom_form, {'op':'soumis', 'monitoring':1}, container);
		}
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });

	}
}


function SubmitContact_dg(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){
	 // $(container+' form#'+nom_form+' textarea').Editeur({width:340, height:150});


	  jQuery(container+' form#'+nom_form+' input:submit').bind('click', function() {
	  	$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

	    $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
	        if($(this).closest('div.form-group').find('label.control-label.requiredfield').length) {
	           fid = $(this).attr('id');
	           if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
	           else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
	           ok = ok && !$(this).hasClass('__field_sys__');
	           if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
		   	}
	     });


		if(!$(container+' form#'+nom_form).data('error_validation')){
			$('#myModal3 button.close').trigger('click');
			return FormSubmit(container+' form#'+nom_form, {'op':'soumis', 'monitoring':1}, container);
		}
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}

function SubmitFidelite(container, nom_form, destination){

	if($(container+' form#'+nom_form).length){
        $(container+' form#'+nom_form).submit(function() {
            return;
        });
        $(".date-time")
            .keypress(function (evt) {
              return false;
            });

        if($('#date_creation').length){
            $("#date_creation").closest('.input-group').datetimepicker({
                locale: 'fr',
                format: 'L',
                format: 'DD/MM/YYYY',
                ignoreReadonly: true,
                allowInputToggle: true
            });
        }

		if($(container+' form#'+nom_form+' #domaine_activite').length){
		    jQuery(container+' form#'+nom_form+' #domaine_activite').change(function() {
			  var domaine_activite = $(container+' form#'+nom_form+' #domaine_activite').val();
			  if(domaine_activite) {
			  	if(domaine_activite == 'Autres') {
				    $(container+' form#'+nom_form+' #container_autre_domaine_activite label').addClass('requiredfield');
			    	$(container+' form#'+nom_form+' #container_autre_domaine_activite').fadeIn('fast');
				}
				else{
				  	$(container+' form#'+nom_form+' #container_autre_domaine_activite label').removeClass('requiredfield');
			  		$(container+' form#'+nom_form+' #container_autre_domaine_activite').fadeOut('fast');
				}
			  }
			});
			$(container+' form#'+nom_form+' #domaine_activite').trigger('change');
		}

        jQuery(container+' form#'+nom_form+' input:submit').bind('click', function() {
            $(container+' form#'+nom_form).data('error_validation', 0);
            $(container+' form#'+nom_form + ' label.error').remove();

            $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
                if($(this).closest('div.form-group').find('label.control-label.requiredfield').length) {
                   fid = $(this).attr('id');
                   if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
                   else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
                   ok = ok && !$(this).hasClass('__field_sys__');
                   if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
                }
             });

            if(!$(container+' form#'+nom_form).data('error_validation')){
                return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, container);
            }
            else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
        });
	}
}

function SubmitReclamations(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){

	 /*if($(container+' form#'+nom_form+' #div_num_compte').length){
    jQuery(container+' form#'+nom_form+' #type_client').change(function() {
	  var type_client = Number(SelectValues(container+' form#'+nom_form+' #type_client'));
	  if(type_client==1) {
	    $(container+' form#'+nom_form+' #div_num_compte label').addClass('requiredfield');
	    $(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

	  }
	  else{
	  	$(container+' form#'+nom_form+' #div_num_compte label').removeClass('requiredfield');
	  	$(container+' form#'+nom_form+' #div_num_compte').fadeOut('fast');
	  }
    });
	$(container+' form#'+nom_form+' #type_client').trigger('change');

  }*/

  	/*if($(container+' form#'+nom_form+' #div_num_compte').length){
		jQuery(container+' form#'+ nom_form + ' [id^="type_client-"]:radio').bind('click', function() {
		  var type_client = $(container + ' form#' + nom_form + ' #type_client').val();
		  if(type_client==1) {
		    $(container+' form#'+nom_form+' #div_num_compte label').addClass('requiredfield');
		    $(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

		  }
		  else{
		  	$(container+' form#'+nom_form+' #div_num_compte label').removeClass('requiredfield');
		  	$(container+' form#'+nom_form+' #div_num_compte').fadeOut('fast');
		  }
	    });
		//$(container+' form#'+nom_form+' [id^="letype_client-"]:radio').trigger('click');
	}*/

	if($(container+' form#'+nom_form+' #container_typeclient').length){
		jQuery(container+' form#'+ nom_form + ' [id^="type_client-"]:radio').bind('click', function() {
		  var type_client = $(container + ' form#' + nom_form + ' #type_client').val();
		  if(type_client==1) {
		    $(container+' form#'+nom_form+' #container_typeclient label').addClass('requiredfield');
		    $(container+' form#'+nom_form+' #container_typeclient').fadeIn('fast');
            $(container+' form#'+nom_form+' #div_nom_agence label').addClass('requiredfield');
            $(container+' form#'+nom_form+' #div_nom_agence').fadeIn('fast');
		  }
		  else{
		  	$(container+' form#'+nom_form+' #container_typeclient label').removeClass('requiredfield');
		  	$(container+' form#'+nom_form+' #container_typeclient').fadeOut('fast');
		  	$(container+' form#'+nom_form+' #div_num_compte').fadeOut('fast');
		  	$(container+' form#'+nom_form+' #container_num_carte').fadeOut('fast');
            $(container+' form#'+nom_form+' #div_nom_agence label').removeClass('requiredfield');
            $(container+' form#'+nom_form+' #div_nom_agence').fadeOut('fast');
		  }
	    });
	}

		if($(container+' form#'+nom_form+' #div_num_compte').length){
		    jQuery(container+' form#'+nom_form+' #letype_client2').change(function() {
			  var letype_client2 = Number(SelectValues(container+' form#'+nom_form+' #letype_client2'));
			  if(letype_client2) {
			  	if(letype_client2==1) {
				    $(container+' form#'+nom_form+' #div_num_compte label').addClass('requiredfield');
			    	$(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

			    	$(container+' form#'+nom_form+' #container_num_carte label').removeClass('requiredfield');
				  	$(container+' form#'+nom_form+' #container_num_carte').fadeIn('fast');
				}
				else{
				  	$(container+' form#'+nom_form+' #div_num_compte label').removeClass('requiredfield');
			  		$(container+' form#'+nom_form+' #div_num_compte').fadeIn('fast');

			  		$(container+' form#'+nom_form+' #container_num_carte label').addClass('requiredfield');
			    	$(container+' form#'+nom_form+' #container_num_carte').fadeIn('fast');
				}
			  }
			});
			$(container+' form#'+nom_form+' #letype_client2').trigger('change');
		}

	 $(container+' form#'+nom_form+' #champ_fichier').FUploader();

    	jQuery(container+' form#'+nom_form+' input:submit').bind('click', function() {
    		$(container+' form#'+nom_form).data('error_validation', 0);
    	    $(container+' form#'+nom_form + ' label.error').remove();

    	    $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
    	        if($(this).closest('div.form-group').find('label.control-label.requiredfield').length) {
    	           fid = $(this).attr('id');
    	           if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
    	           else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
    	           ok = ok && !$(this).hasClass('__field_sys__');
    	           if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
    		   	}
    	     });

    		if(!$(container+' form#'+nom_form).data('error_validation')){
    			return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, container);
    		}
    		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
    	});
	 }
}


function SubmitExportation(container, nom_form, destination){

  if($(container+' form#'+nom_form).length){


  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {

      if(!$(container+' form#'+nom_form+' #debut').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #debut');
      if(!$(container+' form#'+nom_form+' #fin').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #fin');

    if(!$(container+' form#'+nom_form).data('error_validation')){

      var debut = $(container+' form#'+nom_form+' #debut').val();
      var fin = $(container+' form#'+nom_form+' #fin').val();

      AjaxLoad(destination, 'op=exporter&debut='+debut+'&fin='+fin+'', '#main-wrapper-container');

      return false;


    }
    else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);

    });

  }

}




function Submit_Recrutement(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){

	 $(container+' form#'+nom_form+' #champ_lm').FUploader();
	 $(container+' form#'+nom_form+' #champ_fichier').FUploader();

	  jQuery(container+' form#'+nom_form+' input:submit').bind('click', function() {
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

	    $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
	        if($(this).closest('div.form-group').find('label.control-label.requiredfield').length) {
	           fid = $(this).attr('id');
	           if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
	           else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
	           ok = ok && !$(this).hasClass('__field_sys__');
	           if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
		   	}
	     });

		if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'nav', 'monitoring':1, 'op2':'postuler'}, $(container+' form#'+nom_form+' #container').val());
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}


function SubmitContacts(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){
	 // $(container+' form#'+nom_form+' textarea').Editeur({width:340, height:150});


	  jQuery(container+' form#'+nom_form+' input:submit').bind('click', function() {
	  	$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

	    $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
	        if($(this).closest('div.form-group').find('label.control-label.requiredfield').length) {
	           fid = $(this).attr('id');
	           if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
	           else ok =  !$(this).closest('div.form-group').find('input[type="file"]').length;
	           ok = ok && !$(this).hasClass('__field_sys__');
	           if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
		   	}
	     });


		if(!$(container+' form#'+nom_form).data('error_validation')){
			$('#myModal2 button.close').trigger('click');
			return FormSubmit(container+' form#'+nom_form, {'op':'soumis', 'monitoring':1}, container);
		}
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}


$(".accordion-title-dg").on("click", function() {
  if (
    $(this)
      .next(".accordion-content-dg")
      .css("display") == "none"
  ) {
    $(this)
      .next(".accordion-content-dg")
      .slideDown(500);
    $(this)
      .children(".accordion-control-dg")
      .toggleClass("rotate-dg");
  } else {
    $(this)
      .next(".accordion-content-dg")
      .slideUp(500);
    $(this)
      .children(".accordion-control-dg")
      .toggleClass("rotate-dg");
  }
});
