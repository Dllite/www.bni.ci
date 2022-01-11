  //jQuery on an empty object, we are going to use this as our Queue
   var ajaxQueue = $({});

   $.ajaxQueue = function(ajaxOpts) {
     // hold the original complete function
     var oldComplete = ajaxOpts.complete;

    // queue our ajax request
    ajaxQueue.queue(function(next) {

      // create a complete callback to fire the next event in the queue
      ajaxOpts.complete = function() {
        // fire the original complete if it was there
        if (oldComplete) oldComplete.apply(this, arguments);
        next(); // run the next query in the queue
      };

      // run the query
      $.ajax(ajaxOpts);
    });
  };


function FormSubmit(form_id, extras, ids, sep){
  
  //if($(form_id).find('input#__SYS_UPLOADING__').length && Number($(form_id).find('input#__SYS_UPLOADING__').val())>=0) return false;
  var OK = $(form_id).find('input#__SYS_UPLOADING__').length?Number($(form_id).find('input#__SYS_UPLOADING__').val()):0;
  if(OK) return false;
  
  
  if(jQuery.isNull($(form_id).attr('method')))  $(form_id).attr('method', 'POST');
  var data = '', fields = '', tab = new Array(), valeur = '';
  var isfileform = $(form_id + ' input:file').not('.fileuploader').length;
  if(sep==undefined) sep = '<::>';
  sep = decodeURIComponent((sep + '').replace(/\+/g, '%20'));
  if(ids==undefined) ids = '';
  else if($(form_id).closest('div.cadre_datas').length && !$(form_id).hasClass('forcecontainer')) {
     ids = $(form_id).closest('div.cadre_datas div.contenu');
	 if($(form_id).find('#container').length) $(form_id).find('#container').val('#'+$(form_id).closest('div.cadre_datas').attr('id'));
  }	 
  if(!$(form_id).length) return false;
  if(!$(form_id).attr('action')) return Msg_Erreur('Mauvais paramétrage du formulaire: <b>aucune destination spécifiée</b>', '', 1);
  var url = $(form_id).attr('action');
  
  $(form_id+' input, ' + form_id + ' textarea, ' + form_id + ' select').each(function (el) {
     if($(this).attr('datafld') != null && $(this).attr('datafld') != undefined) {
	   valeur = $(this).val();
	   if($(this).hasClass('Sys_Editeur')) valeur = cleanup_word(valeur.replace(/%u2019/g, "'").replace(/%u0153/g, "oe").replace(/%u2026/g, "..."));
	   if($(this).hasClass('Sys_Editor')) valeur = cleanup_word(valeur.replace(/%u2019/g, "'").replace(/%u0153/g, "oe").replace(/%u2026/g, "...").replace(/\n/g, "<br>"));
	   
	   if($(this).get(0).nodeName == 'INPUT' && ($(this).attr('type').toUpperCase() == 'CHECKBOX' || $(this).attr('type').toUpperCase() == 'RADIO')) valeur = $(this).is(':checked')?$(this).val():0;
	   if($(this).get(0).nodeName == 'SELECT') valeur = SelectValues(form_id+' #'+$(this).attr('id'));
	   data += '&'+this.name + '=' + urlencode(valeur);
	   if(fields) fields += '::';
	   fields += this.name + '|' + $(this).attr('datafld');
	 }
  });
  if(!isfileform){//Si pas de upload
     $.each(extras, function(index, value) {
	    tab = index.split('|');
	    index = tab[0];
        data += '&'+index + '=' + urlencode(value);
	    if(fields) fields += '::';
	    fields += index + '|';
	    if(tab.length>1) fields += tab[1];
     });
  
     data = 'sys_fields='+fields + data;
	 //document.write(url + '?'+ data);return false;
     AjaxLoad(url, data, ids, sep);
  } 
  else {
    var liste_f = '', ext;
    $(form_id + ' input:file').not('.fileuploader').each(function (el) {
	   var rep = !jQuery.isNull(eval('extras.'+this.name+'_rep'))?eval('extras.'+this.name+'_rep'):($('#'+this.name+'_rep').length?$('#'+this.name+'_rep').val():'');
	   var extensions = !jQuery.isNull(eval('extras.'+this.name+'_extensions'))?eval('extras.'+this.name+'_extensions'):($('#'+this.name+'_extensions').length?$('#'+this.name+'_extensions').val():'');
	   extensions = extensions.replace(/\|\|/g, '|').replace(/,/g, '|').replace(/ /g, '|');
	   if(!(rep && extensions)) liste_f += ' ' + this.name;
	   else {
	     if(!jQuery.isNull(eval('extras.'+this.name+'_extensions'))) eval('extras.'+this.name+'_extensions = "'+extensions+'"');
	     $('#'+this.name+'_extensions').val(extensions);
	   }	 
	});
	if(liste_f) return Msg_Erreur('Mauvais paramétrage de certains champs upload du formulaire : <b>'+liste_f+'</b>', '', 1);
	
	$(form_id).attr('enctype', 'multipart/form-data');
	$('<iframe id = "upload_target" name = "upload_target" class = "hidden" src = "">').appendTo($(form_id));	
	$.each(extras, function(index, value) {
	   tab = index.split('|');
	   index = tab[0];
       //data += '&'+index + '=' + urlencode(value);
	   $('<input id = "'+index+'" name = "'+index+'" type = "hidden">').val(urlencode(value)).appendTo($(form_id));
	   if(fields) fields += '::';
	   fields += index + '|';
	   if(tab.length>1) fields += tab[1];
    });
	$('<textarea id = "sys_fields" name = "sys_fields" class = "hidden">').val(fields).appendTo($(form_id));
	//Message_Systeme('ajax', 'Chargement en cours...');
	$(form_id).attr('target', 'upload_target');
	$(form_id).submit();
  }
  return false;
}

function AjaxLoad(url, data, ids, sep, loading, f){
   if(sep==undefined) sep = '<::>';
   sep = decodeURIComponent((sep + '').replace(/\+/g, '%20'));
   if(ids==undefined) ids = '';
   if (typeof ids!="object") ids = decodeURIComponent((ids + '').replace(/\+/g, '%20'));
   if(data.substring(0,1)=='?' || data.substring(0,1)=='&') data = data.substring(1);
   if(!jQuery.isNull($('body').attr('id'))) data += '&__module__='+$('body').attr('id').replace('page-','');
   $.ajaxQueue({
     type: "POST",
     url: url,
     data: data,
	 //contentType : 'text/plain; charset=iso-8859-1',	 
	 beforeSend: function( xhr ) {//Avt le début du traitement
	   
	   //Liste des éléments à cacher
	   var elmts_to_hide = new Array('tt', 'webtv_calendar', 'webtv_heure');
	   for(var i=0; i<elmts_to_hide.length;i++) 
	     if($('#'+elmts_to_hide[i]).length) $('#'+elmts_to_hide[i]).hide();
	   //On affiche un message de traitement en cours 
	   if(loading!=0 && !$('.jbar').length){
	     $('.jbar').remove();
	     Message_Systeme('ajax', 'Chargement en cours ...');
	   }	 
     },
     success: function(data){
	  var params = new Array(ids, sep, f);	  
      AjaxCallback(data, params);	    
     },	 
	 error: function (xhr, status, error) { //Erreur lors du traitement
	   var msg_erreur = 'Une erreur est survenue lors de l\'exécution de la requête.';
	   var tab_errors = {
	     timeout     : 'délai d\'attente dépassée',//
		 error       : 'une erreur inconnue',
		 abort       : 'requête annulée', //'requête annulée', 
		 parsererror : 'erreur d\'interprétation de la requête'//,'erreur d\'interprétation de la requête'
	   }
	   if(status!='error') msg_erreur = 'Une erreur est survenue lors de l\'exécution de la requête : <b>'+eval('tab_errors.'+status)+'</b>';
	   else {
	     //if(!(jQuery.isNull(xhr.status) || jQuery.isNull(xhr.statusText))) msg_erreur = 'Une erreur http de type <b>'+xhr.status+'</b> est surnenue lors de l\'exécution de la requête : <b>'+xhr.statusText+'</b>';
	     if(!(jQuery.isNull(xhr.status) || jQuery.isNull(xhr.statusText))) msg_erreur = 'Il y\'a un soucis de connexion au serveur. Veuillez réessayer plus tard, Merci.';
		 else msg_erreur = 'Une erreur <b>non identifiée</b> est survenue lors de l\'exécution de la requête. Veuillez nous contacter si l\'erreur persiste.';
	   }	 
       //alert(msg_erreur);
	   Message_Systeme('error', msg_erreur, 1);
     },
     complete: function(xhr, status){//Fin du Traitement
       ajax_removebar();
	   //$('.jbar').remove();
	   //$('.msg_ajax').remove();
     }
  });
}


function parseScript(_source){
  var source = _source.replace(/SCRIPT/g, 'script').replace(/Script/g, 'script').replace(/\/SCRIPT/g, '/script').replace(/\/Script/g, '/script');
  var scripts = new Array();
  var _datas = new Array();
  // Strip out tags
  while(source.indexOf("<script") > -1 || source.indexOf("</script") > -1) {
	 var s = source.indexOf("<script");
	 var s_e = source.indexOf(">", s);
	 var e = source.indexOf("</script", s);
	 var e_e = source.indexOf(">", e);
 
	 // Add to scripts array
	 scripts.push(source.substring(s_e+1, e));
	 // Strip from source
	 source = source.substring(0, s) + source.substring(e_e+1);
   }
   _datas.push(source);
   _datas.push(scripts);
   
   // Return the cleaned source
   return _datas;
}

function ExecuteScripts(scripts){
  for(var i=0; i<scripts.length; i++) {
    if(jQuery.trim(scripts[i])){
	  try {
		 eval(scripts[i]);
	  }
	  catch(ex) {
				
	  }
	}  
  }
}

function AjaxCallback(data, params){
 var sep = '<::>', fct = null;
 sep = decodeURIComponent((sep + '').replace(/\+/g, '%20'));
 if (typeof params=="object"){
  if(params.length){
    var ids = params[0];
    if(params.length>1) sep = params[1];
	if(params.length>2) fct = params[2];
  }
 }
 else var ids = '';
  
 var tab_data = data.split(sep);
 var t = new Array();
 if(typeof ids=="string"){
    if(!ids) {
	  t = parseScript(data);
	  t[1][t[1].length] = t[0];
	  ExecuteScripts(t[1]);
	}
	else{
	  var tab_ids = ids.split(sep);
      for(var i = 0; i <tab_data.length; i++) {
        t= parseScript(tab_data[i]);
	    if(i<tab_ids.length){
		  var id_str = (tab_ids[i].substring(0, 1)!='#' && tab_ids[i].substring(0, 1)!='.' && !$(tab_ids[i]).length?'#':'')+tab_ids[i];	
		  //var id_str = tab_ids[i];
		  var elmt = $(id_str);
          if(elmt.length) {
	        var tag = elmt.get(0).tagName;//Nom du controle
	        if((tag == 'INPUT' && elmt.attr('type').toUpperCase() == 'TEXT') || tag == 'TEXTAREA') elmt.val(t[0]);
	        else if(jQuery.trim(t[0])) elmt.html(t[0]);//elmt.fadeOut('fast').html(t[0]).fadeIn('fast', function(){ExecuteScripts(t[1]);});
			ExecuteScripts(t[1]);
          }
		}  
	    		   
      }
	}    
 }
 else if(typeof ids=="object"){
   if(ids.length==1){
     t = parseScript(data);
     var tag = ids.get(0).tagName;//Nom du controle
     if((tag == 'INPUT' && ids.attr('type').toUpperCase() == 'TEXT') || tag == 'TEXTAREA') ids.val(t[0]);
     else if(ids.length && t[0]) ids.html(t[0]);
     ExecuteScripts(t[1]);
	 if(ids.closest('div#site_content_gauche2').length && ids.find('h2')) Cufon.set('fontFamily', 'Swiss721Light').replace(ids.selector + ' h2')('.swisslight');
   }
   else {
     tab_ids = ids;
     for(var i = 0; i <tab_data.length; i++) {
        t= parseScript(tab_data[i]);
	    if(i<tab_ids.length){
		  var elmt = tab_ids[i];
          if(elmt.length) {
	        var tag = elmt.get(0).tagName;//Nom du controle
	        if((tag == 'INPUT' && elmt.attr('type').toUpperCase() == 'TEXT') || tag == 'TEXTAREA') elmt.val(t[0]);
	        else if(jQuery.trim(t[0])) elmt.html(t[0]);
			ExecuteScripts(t[1]);
			if(elmt.closest('div#site_content_gauche2').length && elmt.find('h2')) Cufon.set('fontFamily', 'Swiss721Light').replace(elmt.selector + ' h2')('.swisslight');
          }
		}  
	    		   
      }
   }	 
 }	
 //InitUlTd();

 if($("#overlay").length) $("#overlay,.overlayloading, .process_waiting").remove();
 if($('.top-right-toolbar a').length) $('.top-right-toolbar a').tooltip({placement: "top"});
 /*if(typeof ids=="object")  {
   if($.isArray(ids)) for(var i = 0; i <ids.length; i++)  StyleForm_Elmts(ids[i]);
   else StyleForm_Elmts(ids);
 }  
 else StyleForm_Elmts(ids);*/
 $('.input-text').closest('li').css('padding', '8px 0');
 
 if(jQuery.isFunction(fct)) fct(data);
}

function CallBack_Ajax(url, data, ids, sep, f) {
 if(sep==undefined) sep = '<::>';
 if(ids==undefined) ids = '';
 sep = decodeURIComponent((sep + '').replace(/\+/g, '%20'));
 if(typeof ids=="string") ids = decodeURIComponent((ids + '').replace(/\+/g, '%20'));
 if(!jQuery.isNull($('body').attr('id'))) data += '&__module__='+$('body').attr('id').replace('page-','');
 //if($('#infos_header input#__WP_ID__').length) data += '&__wp_id__='+$('#infos_header input#__WP_ID__').val();
 var lien = url+'?'+data;
 var params = new Array(ids, sep, f);
 g_ajax_obj.CallXMLHTTPObjectGETParamPartial ( lien, AjaxCallback, params, '', '');
}

function Confirm_Suppression(lien, msg) {
	 var ok ;
	 ok = confirm(msg);
	  if (ok == '1') {
	    ok = confirm('Cette opération est irreversible, êtes-vous vraiment certain de vouloir poursuivre l\'action ?'); 
		  if (ok == '1') {
	         location.replace(lien);
		  }
	  }
}

function Confirm_Suppression_ajax(page, lien, type, msg) {
	 var ok ;
	 ok = confirm(msg);
	  if (ok == '1') {
	    ok = confirm('Cette opération est irreversible, êtes-vous vraiment certain de vouloir poursuivre l\'action ?'); 
		  if (ok == '1') {
		     //removebar();
	         AjaxLoad(page, lien, type);
		  }
	  }
}


function Confirm_Suppression_ajax2(page, lien, obj) {
	var type = typeof obj!="object"?obj:obj.selector; 
	 //var msg = SYSTEMLangues.systeme.elmtdelconfirm+"<br><a href='#' Onclick = \"removebar();AjaxLoad('"+page+"', '"+lien+"', '"+type+"'); return false;\">"+SYSTEMLangues.systeme.elmtdelconfirmyes+'</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" Onclick = \'removebar(); return false;\'>'+SYSTEMLangues.systeme.elmtdelconfirmno+'</a>';
	 var msg = 'Cette opération est irreversible, êtes-vous vraiment certain de vouloir poursuivre l\'action ?<br><a href="#" Onclick = \'AjaxLoad("'+page+'", "'+lien+'", "'+type+'"); return false;\'><b>OUI</b> je souhaite poursuivre l\'action</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" Onclick = \'removebar(); return false;\'><b>NON</b> annuler cette action</a>';
	Message_Systeme('warning', msg, 0, 10000);	
}

function changeCouleur(ligne, couleur) {
 ligne.bgColor = couleur;
}

function Msg_Erreur(msg, champ, top) {
  Message_Systeme('error', msg, top);
  if(champ) {
    if(champ.substring(0,1)!='#') champ = '#'+champ;
    if($(champ).length) {
	
	  $(champ).focus();
	  var y = $(champ).closest('div').offset().top-100;
	  if(y<0) y =0;
	  $.scrollTo(y, 800, {easing:'elasout'});
	  //Active_Onglet(champ);
	}
  }	  
  return false;
}

function Validation_Erreur(msg, champ) {
	  if(champ) {
		var obj = typeof champ!="object"?$(champ):champ; 
		var id = obj.attr('id'), container = obj.closest('ul.inline-control-group').length?obj.closest('li'):(obj.closest('.controls').length?obj.closest('.controls'):(obj.closest('td').length?obj.closest('td'):obj.parent()));
	    if(container != null){
	    	if(container.find('label[for="'+id+'"]').length) container.find('label[for="'+id+'"]').text(msg).show();
	    	else container.append('<label class="error" generated="true" for="'+id+'">'+msg+'</label>');
	    }
	    if(obj.closest('form').length) obj.closest('form').data('error_validation', 1);
	  }	  
}

//

function Field_Valaidation_Error(msg, champ, classe, champ2){
  var tab_classe = new Array('flb','flh','flg','fld');
  
  if(champ.length) {
    if(typeof champ=="string") obj = $(champ);
	else obj = champ;
	if(jQuery.estNull(champ2)) champ2 = obj;
	
	if(champ2.closest('.input-box:not(:visible)').length || !champ2.length) return false;
	
	if(obj.closest('ul.form-list').length && obj.closest('ul.form-list:not(:visible)').length) 
	  obj.closest('ul.form-list').slideDown(400, function(){
	    $(this).prev('.section-divider').find('a.section_toggle').removeClass('closed').addClass('opened').text('reduire');
	  });
	
    if(champ2.closest('.input-box').find('.notice_error').length) champ2.closest('.input-box').find('.notice_error').remove();
    var _error_div_	  = $(document.createElement('div')).hide().addClass('notice_error '+classe).html('<p>'+msg+'<span></span></p>');
	champ2.closest('.input-box').append(_error_div_);
	var pos = champ2.position();
	if(champ2.closest('div.selector').length) {
	  pos = champ2.closest('div.selector').position();
	  pos.left -= 10;
	}  
	var x = pos.left, y = pos.top, w = champ2.width(), h = champ2.height();
	
	if(obj.closest('div.field').length) obj.closest('div.field').find('label').not('.optionelements_label').addClass('erreur');
	else obj.closest('li').find('label').not('.optionelements_label').addClass('erreur');
	
	if(classe=='flg') {
	 if(champ2.is(':visible'))  _error_div_.css({'top':(y-8)+'px', 'left':(x + w + 50)+'px'});
	 else _error_div_.css({'top':(-25)+'px', 'left':'250px'});
	}  
	if(classe=='fld') _error_div_.css({'top':(y-8)+'px', 'left':(x - _error_div_.width() - 15)+'px'});
	if(classe=='flb') _error_div_.css({'top':(y-65)+'px', 'left':x +'px'});
	if(classe=='flh') _error_div_.css({'top':(y+h+10)+'px', 'left':x +'px'});
	_error_div_.fadeIn(400, function(){
	  if(_error_div_.find('p').height()<22) $(this).find('p').height(22);
	  _error_div_.bind('click', function() {
	     _error_div_.fadeOut(400);
	  });
	  obj.bind('click', function() {
	     _error_div_.fadeOut(400);
	  });
	  obj.closest('li').bind('click', function() {
	     _error_div_.fadeOut(400);
	  });
	});
  }
}


function Msg_Erreur2(msg, top) {
  Message_Systeme('error', msg, top);	
  return false;
}

function Msg_Erreur3(msg, champ, top) {
   if(champ) {
     if(champ.substring(0,1)!='#') champ = '#'+champ;
	 if($(champ).length) {
	  $(champ).focus();
	  var y = $(champ).closest('div').offset().top-100;
	  if(y<0) y =0;
	  $.scrollTo(y, 800, {easing:'elasout'});
	  Active_Onglet(champ);
	 }
   }	   
   Message_Systeme('error', msg, top);
  return false;
}

function Msg_Statut(code_msg, msg, champ, top) { 
  if(champ){
   if(champ.substring(0,1)!='#') champ = '#'+champ;  
   if($(champ).length) {
	  $(champ).focus();
	  var y = $(champ).closest('div').offset().top-100;
	  if(y<0) y =0;
	  $.scrollTo(y, 800, {easing:'elasout'});
	  Active_Onglet(champ);
	}
  }	  
  var tab_class = {'Done':'succes', 'Warning':'warning', 'Alert':'error', 'Info':'info'};
  var classe = tab_class.Info;
  for (var key in tab_class) {
    if(key == code_msg) {classe = tab_class[key];break;}
  } 
  Message_Systeme(classe, msg, top);
  return false;
}

function overStar(v){
	/* Preloading image */
	if(!tempImage)
	{
		tempImage = new Image;
		tempImage.src = "images/votes/star2_0.gif"
	}

	new_image = "images/votes/star2_0.gif"
	for(i=1; i<=5; i++)
	{
		if(i<=v)
			O('etoile_'+i).src = new_image;
		else
			O('etoile_'+i).src = "images/votes/star1_0.gif";
	}
}

function outStar(hasVoted){
	for(i=1; i<6; i++){
		if(i<=hasVoted)	O('etoile_'+i).src = "images/votes/star2_0.gif";
		else O('etoile_'+i).src = "images/votes/star1_0.gif";
	}
}
 
 