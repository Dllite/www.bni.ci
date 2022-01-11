var __CRITERES_READY__;
/**************************************************************************** MODULES ADMIN************************************************************/

function SubmitObjetPlaintes(container, nom_form, destination){
 if($(container+' form#'+nom_form).length){

  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
	$(container+' form#'+nom_form).data('error_validation', 0);
    $(container+' form#'+nom_form + ' label.error').remove();
    //var id_pere = Number(SelectValues(container+' form#'+nom_form+' #id_pere'));
	if(!$(container+' form#'+nom_form+' #libelle').TestVide()) Validation_Erreur(SYSTEMLangues.sys_menu_admin.libelle, container+' form#'+nom_form+' #libelle');
	/*if(!id_pere){
		if(!$(container+' form#'+nom_form+' #email').TestEmail()) Validation_Erreur(SYSTEMLangues.login.invalidemail, container+' form#'+nom_form+' #email');
	}*/

	if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
	else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
  });
 }
}

function SubmitObjetRDV(container, nom_form, destination){
 if($(container+' form#'+nom_form).length){


  	//Changement de id_pere
  	jQuery(container+' form#'+nom_form+' #id_pere').change(function() {
	    var id_pere = Number(SelectValues(container+' form#'+nom_form+' #id_pere'));
		if(id_pere) $(container+' form#'+nom_form+' #div_email').fadeOut('fast');
		else $(container+' form#'+nom_form+' #div_email').fadeIn('fast');
	});
	$(container+' form#'+nom_form+' #id_pere').trigger('change');

  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
	$(container+' form#'+nom_form).data('error_validation', 0);
    $(container+' form#'+nom_form + ' label.error').remove();
    var id_pere = Number(SelectValues(container+' form#'+nom_form+' #id_pere'));
	if(!$(container+' form#'+nom_form+' #libelle').TestVide()) Validation_Erreur(SYSTEMLangues.sys_menu_admin.libelle, container+' form#'+nom_form+' #libelle');
	if(!id_pere){
		if(!$(container+' form#'+nom_form+' #email').TestEmail()) Validation_Erreur(SYSTEMLangues.login.invalidemail, container+' form#'+nom_form+' #email');
	}

	if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
	else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
  });
 }
}

function formatTime(h) {
    var result = false, m;
    var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)\s*$/;
    if ((m = h.match(re))) {
        result = (m[1].length == 2 ? "" : "0") + m[1] + ":" + m[2];
    }
    return result;
}

function InitDatasCadre(container,destination){
		$('.show_newsletter').unbind('click');
		$('.show_newsletter').bind('click',function(){
			var datafld = $(this).attr('data-action');
			 AjaxLoad_DatasLoader(container, destination, datafld);
			return false;
		});
}

function ImpressionPage(){
	  if($("a.print, a.imprime_page").length){
		  $('a.print, a.imprime_page').unbind("click");
		  jQuery('a.print, a.imprime_page').bind('click', function() {
			if(!jQuery.isNull($(this).attr('datafld'))){
			  if($($(this).attr('datafld')).find('a.img_zoom').length) $($(this).attr('datafld')).find('a.img_zoom').hide();
			  if($($(this).attr('datafld')).find('.no_imprime').length) $($(this).attr('datafld')).find('.no_imprime').hide();
			  if($($(this).attr('datafld')).find('.noprint').length) $($(this).attr('datafld')).find('.noprint').hide();

			            var mode = 'iframe'; // popup
			            var close = mode == "popup";
			            var style = '';
			            if(!jQuery.isNull($(this).attr('datasrc'))) style += $(this).attr('datasrc');
			            var options = { mode : mode, popClose : close, extraCss : style};
			            $($(this).attr('datafld')).printArea( options );

			  if($($(this).attr('datafld')).find('a.img_zoom').length) $($(this).attr('datafld')).find('a.img_zoom').show();
			  if($($(this).attr('datafld')).find('.no_imprime').length) $($(this).attr('datafld')).find('.no_imprime').show();
			  if($($(this).attr('datafld')).find('.noprint').length) $($(this).attr('datafld')).find('.noprint').show();
		    }
			return false;
		  });
	  }
}

function Init_ImpressionPage(){
	  if($("a.print, a.imprime_page").length){
		  $('a.print, a.imprime_page').unbind("click");
		  jQuery('a.print, a.imprime_page').bind('click', function() {
			if(!jQuery.isNull($(this).attr('datafld'))){
			  if($($(this).attr('datafld')).find('a.img_zoom').length) $($(this).attr('datafld')).find('a.img_zoom').hide();
			  if($($(this).attr('datafld')).find('.no_imprime').length) $($(this).attr('datafld')).find('.no_imprime').hide();
			  var style = 'css/backoffice.css';
			  if(!jQuery.isNull($(this).attr('datasrc'))) style += ','+$(this).attr('datasrc');
			  $.simplePrint($(this).attr('datafld'), style);
			  if($($(this).attr('datafld')).find('a.img_zoom').length) $($(this).attr('datafld')).find('a.img_zoom').show();
			  if($($(this).attr('datafld')).find('.no_imprime').length) $($(this).attr('datafld')).find('.no_imprime').show();
		    }
			return false;
		  });
	  }
}

function SubmitRecherches(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){

	  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

		if(!$(container+' form#'+nom_form).data('error_validation')){
			return FormSubmit(container+' form#'+nom_form, {'op':'recherche', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
		}
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}


function Submit_Unes(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){

	  if($(container+' form#'+nom_form+' #champ_image').length) $(container+' form#'+nom_form+' #champ_image').FUploader();

	  if($(container+' form#'+nom_form+' #nbre_cars_description').length) Limit_Textarea(container+' form#'+nom_form+' #description', '#nbre_cars_description', 100);

	  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

	    $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
	        if($(this).closest('div.control-group').find('label.control-label.requiredfield').length) {
	           fid = $(this).attr('id');
	           if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
	           else ok =  !$(this).closest('div.control-group').find('input[type="file"]').length;
	           ok = ok && !$(this).hasClass('__field_sys__');
	           if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
		   	}
	     });

		if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}


function SubmitPhotos(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){

	 $(container+' form#'+nom_form+' #image').FUploader();

	  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();
	    if(!$(container+' form#'+nom_form+' #statut').TestOptions()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #statut');
	    if((!$(container+' form#'+nom_form+' #image').TestVide()) && !$(container+' form#'+nom_form+' #anc_image').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #image');

		if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}

function SubmitNote_site(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){
	  //alert('ok');

	  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();
	    //if(!$(container+' form#'+nom_form+' #note').TestOptions()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #note');
	   // if((!$(container+' form#'+nom_form+' #image').TestVide()) && !$(container+' form#'+nom_form+' #anc_image').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #image');

		if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}


function SubmitEntites_SITE(container, nom_form, destination){

	 if($(container+' form#'+nom_form).length){

	  if($(container+' form#'+nom_form+' #champ_pdf').length) $(container+' form#'+nom_form+' #champ_pdf').FUploader();
	  if($(container+' form#'+nom_form+' #champ_image').length) $(container+' form#'+nom_form+' #champ_image').FUploader();
	  if($(container+' form#'+nom_form+' #champ_fichier').length) $(container+' form#'+nom_form+' #champ_fichier').FUploader();
	  if($(container+' form#'+nom_form+' #champ_film').length) $(container+' form#'+nom_form+' #champ_film').FUploader();
	  if($(container+' form#'+nom_form+' #champ_photo').length) $(container+' form#'+nom_form+' #champ_photo').FUploader();
	  if($(container+' form#'+nom_form+' #champ_logo').length) $(container+' form#'+nom_form+' #champ_logo').FUploader();
	  //if($(container+' form#'+nom_form+' textarea.editeur').length) $(container+' form#'+nom_form+' textarea.editeur').Editeur({width:$(container+' form#'+nom_form+' textarea.editeur').closest('div.controls').width()-40, height:200});
	  if($(container+' form#'+nom_form+' textarea.editeur').length){
	  	$(container+' form#'+nom_form+' textarea.editeur' ).ckeditor({
			extraPlugins: 'imageuploader',
			filebrowserBrowseUrl: 'ckeditor/plugins/imageuploader/imgbrowser.php',
			forceSimpleAmpersand : true,
		    HtmlEncodeOutput : false,
		    entities : false,
			HtmlEncodeOutput : false,
			toolbar :[
			           	[ 'Source', '-', 'Cut','Copy','Paste','PasteText','PasteFromWord','-','Undo','Redo' ],
			            [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ],
			            [ 'Link','Unlink','Anchor' ],
			            [ 'NumberedList','BulletedList','-','Outdent','Indent','-','Blockquote',
			                '-','JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock','-','BidiLtr','BidiRtl' ],
			                [ 'Image','Table','HorizontalRule','Smiley' ],
			                [ 'Styles','Format','Font','FontSize', '-', 'TextColor','BGColor' ]
			            ],
            // width: $(container).width()-40,

			width: $(container+' form#'+nom_form+'textarea.editeur').closest('div.controls').width()-40,
            align: "left"
		});
	  }
	  if($(container+' form#'+nom_form+' #__type__').length) var __type__ = Number($(container+' form#'+nom_form+' #__type__').val());

	  if($(container+' form#'+nom_form+' #nbre_cars_description').length) Limit_Textarea(container+' form#'+nom_form+' #description', '#nbre_cars_description', 100);

	  //if(__type__==7||__type__==14) InitAlbumsPhotos(container, nom_form, destination);
	  if($(container+' form#'+nom_form+' #__type__').length && __type__==15) $(container+' form#'+nom_form).addClass('forcecontainer');

	  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
		var id = Number($(container+' form#'+nom_form+' #__id__').val()), fid;
		if($(container+' form#'+nom_form+' #__type__').length) __type__ = Number($(container+' form#'+nom_form+' #__type__').val());
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

	    $(container+' form#'+nom_form+' input,'+container+' form#'+nom_form+' select,'+container+' form#'+nom_form+' textarea').not('.__sys_field__').each(function (el) {
	        if($(this).closest('div.control-group').find('label.control-label.requiredfield').length) {
	           fid = $(this).attr('id');
	           if($(container+' form#'+nom_form+' #anc_'+fid).length) ok = !$(container+' form#'+nom_form+' #anc_'+fid).TestVide();
	           else ok =  !$(this).closest('div.control-group').find('input[type="file"]').length;
	           ok = ok && !$(this).hasClass('__field_sys__');
	           if(ok && !$(container+' form#'+nom_form+' #'+fid).TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #'+fid);
		   	}
	     });

	    /*if(__type__==5 && $(container+' form#'+nom_form+' #champ_date_fin').TestVide() && $(container+' form#'+nom_form+' #champ_date_fin').val()<$(container+' form#'+nom_form+' #champ_date').val()) Validation_Erreur('Intervalle de temps invalide', container+' form#'+nom_form+' #champ_date_fin');
	    if(__type__==7) {
	    	var h = formatTime($(container+' form#'+nom_form+' #champ_heure').val());
	        if(!h) Validation_Erreur('Heure invalide', container+' form#'+nom_form+' #champ_heure');
	        else $(container+' form#'+nom_form+' #champ_heure').val(h);
	    }*/

	    var error_div_exists =  0;
	    if($(container+' form#'+nom_form+' #__type__').length && __type__ == 14){
	    	  error_div_exists = $(container+' form#'+nom_form+' #cadre_photos_associees').find('div.zone_msg_error').length;
			  if(!$(container+' form#'+nom_form+' #cadre_photos_associees').find('td.photo_thumb').length){
					if(!error_div_exists) $(container+' form#'+nom_form+' #cadre_photos_associees').append('<div class="zone_msg_error"></div>');
					var zone_msg_error1 = $(container+' form#'+nom_form+' #cadre_photos_associees').find('div.zone_msg_error');
					zone_msg_error1.html('<span></span> <b class=\"noir\">Erreur :</b> Vous ne pouvez créer un Album Photos vide. Veuillez svp associer au moins <b class=\"noir\">une photo</b> à l\'Album.<div class="clear"></div>');
					error_div_exists = 1;
			  }
			  else if(error_div_exists) {
					$(container+' form#'+nom_form+' #cadre_photos_associees').find('div.zone_msg_error').remove();
					error_div_exists = 0;
			  }
	    }

	    if(!($(container+' form#'+nom_form).data('error_validation')||error_div_exists)) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, (__type__==15?'#cadre_photos_associees':$(container+' form#'+nom_form+' #container').val()));
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
	  });
	 }
}

function SubmitTableRef(container, nom_form, destination){

	//container = 'div.cadre_datas:visible';
	 if($(container+' form#'+nom_form).length){

	  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
		var id = Number($(container+' form#'+nom_form+' #id').val());
		$(container+' form#'+nom_form).data('error_validation', 0);
	    $(container+' form#'+nom_form + ' label.error').remove();

	    if($(container+' form#'+nom_form+' .fkey').length && !$(container+' form#'+nom_form+' .fkey').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' .fkey');
	    if(!$(container+' form#'+nom_form+' #libelle').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #libelle');
		if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
		else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);

	  });
	 }
}

function ToolsBtn(destination, container){
	var classe, t, op, dest, datafld, printablezone;

	var obj = $(container);
	var div = obj;

	if($('.cadre_datas:visible').length){
		obj = $('.cadre_datas:visible');
		div = obj.find('div.contenu');
		if(obj.find('a.printerbtn').length) obj.find('a.printerbtn').hide();
	}
	if(obj.length) obj.data('destination', destination);

	if(obj.length && obj.find('ul.top-right-toolbar').length){
		obj.find('.top-right-toolbar > li > a').unbind('click');
		obj.find('.top-right-toolbar > li > a').bind('click', function() {
			destination = obj.data('destination');
			classe = $(this).attr('class');
			t = classe.split(' ');
			classe = t[t.length-1];
			switch(classe){
			  case 'Btnadd':
			  case 'Btnlist':
			  case 'Btnformrecherche':
				  AjaxLoad(destination, $(this).attr('datafld'), div, '<::>', 1, function(datas){});
			  break;

			  case 'Btnexpemail':
				  AjaxLoad_DatasLoader(container, destination, $(this).attr('datafld'));
			  break;

			  case 'Btnprint':
				  printablezone = $(this).closest('div.span12').next('div.span12').find('div.printablezone').eq(0);
				  $.simplePrint(printablezone, 'css/bootstrap.css,css/bootstrap-responsive.css,css/style.css,css/tablecloth.css,css/print.css');
			  break;
			}
			return false;
			//alert(classe);

		});
	}

	if(obj.length && obj.find('.search-input-area .icon-search').length){
		var mot_recherche = obj.find('.search-input-area').find('.search-query');
		obj.find('.search-input-area .icon-search').unbind('click');
		obj.find('.search-input-area .icon-search').bind('click', function() {
			destination = obj.data('destination');
			datafld = mot_recherche.attr('datafld');
			if(!datafld) datafld = 'op=nav';
			datafld += '&mot_recherche='+urlencode(mot_recherche.val());
			// alert(destination+'?'+datafld);
			AjaxLoad(destination, datafld, div, '<::>', 1, function(datas){});
		});

		$(".search-input-area .search-query").keypress(function (e) {
	        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
	        	$('.search-input-area .icon-search').trigger('click');
	            return false;
	        }
	        else return true;
	    });
	}

	//
}

function formatDate(date1) {
  if(!date1) date1 = new Date();
  return date1.getFullYear() + '-' + (date1.getMonth() < 9 ? '0' : '') + (date1.getMonth()+1) + '-' + (date1.getDate() < 10 ? '0' : '') + date1.getDate();
}

function SubmitModerateurs(container, nom_form, destination){
 if($(container+' form#'+nom_form).length){
  if($(container+' form#'+nom_form+' #div_modules_user').length){
    jQuery(container+' form#'+nom_form+' #droits').change(function() {
	  var droits = Number(SelectValues(container+' form#'+nom_form+' #droits'));
	  if(droits>9 && droits<90) {
	    var ids = container+' form#'+nom_form+' #content_modules';
	    AjaxLoad(destination, 'op=change_droits&les_droits=' + droits+'&modules=' + urlencode($(container+' form#'+nom_form+' #anc_modules').val()), ids);
	    $(container+' form#'+nom_form+' #div_modules_user').fadeIn('fast');

	  }
	  else $(container+' form#'+nom_form+' #div_modules_user').fadeOut('fast');
    });
	$(container+' form#'+nom_form+' #droits').trigger('change');
  }


  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
	$(container+' form#'+nom_form).data('error_validation', 0);
	$(container+' form#'+nom_form + ' label.error').remove();
	if($(container+' form#'+nom_form+' #droits').length && !$(container+' form#'+nom_form+' #droits').TestOptions()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #droits');
	if(!$(container+' form#'+nom_form+' #nom').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #nom');

	if(!$(container+' form#'+nom_form+' #email').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #email');
	if(!$(container+' form#'+nom_form+' #email').TestEmail()) Validation_Erreur(SYSTEMLangues.login.invalidemail, container+' form#'+nom_form+' #email');
	if(!$(container+' form#'+nom_form+' #secret').TestVide()) Validation_Erreur(SYSTEMLangues.systeme.librequired, container+' form#'+nom_form+' #secret');
	if(!$(container+' form#'+nom_form+' #secret').TestLongueur({min:6})) Validation_Erreur(SYSTEMLangues.systeme.pwdcourt, container+' form#'+nom_form+' #secret');
	if(!$(container+' form#'+nom_form+' #secret').CompareTo({champ:container+' form#'+nom_form+' #secret2'})) Validation_Erreur(SYSTEMLangues.systeme.champdifferent, container+' form#'+nom_form+' #secret2');
	//if($(container+' form#'+nom_form+' #modules').length && !$(container+' form#'+nom_form+' #modules').TestOptions({'selector':'checkbox'})) Validation_Erreur(SYSTEMLangues.systeme.formerrormsg, container+' form#'+nom_form+' #modules');

	if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'statut|statut':1, 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
	else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
   });
 }
}

function IdPere_Change(container, nom_form, destination){
	jQuery(container+' form#'+nom_form+' #id_pere').change(function() {
	    var id_pere = Number(SelectValues(container+' form#'+nom_form+' #id_pere'));
		if(id_pere) {
		  $(container+' form#'+nom_form+' #div_url,#contenu_espace_centre form#'+nom_form+' #div_data').fadeIn('fast');
		}
		else {
		  $(/*container+' form#'+nom_form+' #div_url,*/'#contenu_espace_centre form#'+nom_form+' #div_data').fadeOut('fast');
		}

	 });
	 $(container+' form#'+nom_form+' #id_pere').trigger('change');
}

function SubmitMenusAdmin(container, nom_form, destination){
 if($(container+' form#'+nom_form).length){


  //Changement de id_pere
  IdPere_Change(container, nom_form, destination)

  //Changement de type_menu
  if($(container+' form#'+nom_form+' #type_menu').length){
	  jQuery(container+' form#'+nom_form+' #type_menu').change(function() {
	    var type_menu = SelectValues(container+' form#'+nom_form+' #type_menu'), id_pere = SelectValues(container+' form#'+nom_form+' #id_pere');
		if(!type_menu) $(container+' form#'+nom_form+' #div_droits').fadeIn('fast');
		else $(container+' form#'+nom_form+' #div_droits').fadeOut('fast');
		var ids = $(container+' form#'+nom_form+' #id_pere').closest('.controls');
		//alert(destination+'?op=change_type_menu&type_menu=' + urlencode(type_menu)+'&id_pere='+urlencode(id_pere));
	    AjaxLoad(destination, 'op=change_type_menu&type_menu=' + urlencode(type_menu)+'&id_pere='+urlencode(id_pere), ids, '<::>', 1, function(){
	    	IdPere_Change(container, nom_form, destination);
	    });

	  });
	  $(container+' form#'+nom_form+' #type_menu').trigger('change');
  }

  jQuery(container+' form#'+nom_form+' button:submit').bind('click', function() {
	$(container+' form#'+nom_form).data('error_validation', 0);
    $(container+' form#'+nom_form + ' label.error').remove();
    var id_pere = Number(SelectValues(container+' form#'+nom_form+' #id_pere'));
	if(!$(container+' form#'+nom_form+' #libelle').TestVide()) Validation_Erreur(SYSTEMLangues.sys_menu_admin.libelle, container+' form#'+nom_form+' #libelle');
	if(id_pere && !$(container+' form#'+nom_form+' #url').TestVide()) Validation_Erreur(SYSTEMLangues.sys_menu_admin.url, container+' form#'+nom_form+' #url');
	if(id_pere && !$(container+' form#'+nom_form+' #data').TestVide()) Validation_Erreur(SYSTEMLangues.sys_menu_admin.data, container+' form#'+nom_form+' #data');

	if(!$(container+' form#'+nom_form).data('error_validation')) return FormSubmit(container+' form#'+nom_form, {'op':'insert', 'monitoring':1}, $(container+' form#'+nom_form+' #container').val());
	else return Msg_Erreur(SYSTEMLangues.systeme.error_validation, '', 1);
  });
 }
}

/* ------------------------------------------------------fiun modules administration -----------------------------------------------------------*/
