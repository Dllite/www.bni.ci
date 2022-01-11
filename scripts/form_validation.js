$.easing.elasout = function(x, t, b, c, d) {
 var s=1.70158;var p=0;var a=c;
 if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
 if (a < Math.abs(c)) { a=c; var s=p/4; }
 else var s = p/(2*Math.PI) * Math.asin (c/a);
 return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};

(function($) {
	jQuery.extend( {
      isNull: function(o) {
         if(o == null && o == undefined) {
           return true;
         }
         return false
      }
    });



	jQuery.fn.InfosBulles = function() {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;//o.attr('id');
	   o.find(".infobulle").not('.done').tooltip({

	      position: "center right",
	      offset: [-2, 10],
	      effect: "fade",
	      opacity: 0.9,
	      tipClass: 	"infobulles",
	      layout: '<div><span class="arrow"></span></div>',
		  onBeforeShow:function() {
		     $('.infobulles').hide();
		     var span = this.getTip().find('span');
			 var top = (this.getTip().height() - span.height())/2 + 10;
		     span.css('top', top+'px');
	      }

       });
	   o.find(".infobulle").addClass('.done');
    };

	jQuery.fn.InfosBulles2 = function(options) {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;//o.attr('id');
	   if(o.length && o.closest('.input-box').not('.done').length && !jQuery.isNull(options.msg)){
	     var label =  o.closest('.input-box').prev('label');
		 var isl = 0;
		 if(label.length && !jQuery.isNull(options.isl)) isl = options.isl;
		 var msg = '<a class="tooltips'+(isl?' nomargin':'')+'" href="#infosbulles_'+o.attr('id')+'" tabindex="-1"></a><span class="tips" id = \"infosbulles_'+o.attr('id')+'">'+options.msg+(isl?'</span><div class="clear"></div>':'');
	     if(!isl) o.closest('.input-box').append(msg);
		 else label.addClass('infosb').after(msg);
		 o.closest('.input-box').addClass('.done');
	   }
    };

	jQuery.fn.TestVide = function() {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;//o.attr('id');
	   var isfile = false;
	   if(!jQuery.isNull(o.attr('type'))) isfile = (o.attr('type').toLowerCase()=='file' || $(id.replace('#'+o.attr('name'), '#fuploader_'+o.attr('name'))).length);//Ajout de  || $(id.replace('#'+o.attr('name'), '#fuploader_'+o.attr('name'))).length le 30/04/2013

	   //var msg = 'erreur: valeur requise !';
        if(o.hasClass('Sys_Editeur')) {
	    	o.val(o.htmlarea('toHtmlString'));
	     	var ok = jQuery.trim(strip_tags(o.val())) != '';
	    }
	    else if(o.hasClass('Sys_Editor')) {
	   		val($('.Editor-editor').html());
		    var ok = jQuery.trim(strip_tags(o.val())) != '';
        }
	   	else{
	     	if(!isfile) ValueFilter(o);
	     	var ok = IsnoVide(o);
	     	var lib_anc = id.replace('#'+o.attr('name'), '#anc_'+o.attr('name'));
	     	if(isfile && $(lib_anc).length) ok = ok || IsnoVide(lib_anc);
	   	}
	   return ok;
    };
	//"^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4} ([01][0-9]|2[0-3]):([0-5][0-9])$"

	jQuery.fn.TestHeure = function() {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;//o.attr('id');
	   var reg=new RegExp("^([01][0-9]|2[0-3]):([0-5][0-9])$");
       return reg.test(o.val());
    };

	jQuery.fn.TestDate = function() {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;//o.attr('id');
	   var lib_jour = id.replace('#'+o.attr('id'), '#jour_'+o.attr('id'));
	   return o.val().length==($(lib_jour).length?10:7);
    };

	jQuery.fn.TestDatefr = function() {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;//o.attr('id');
	   var reg=new RegExp("^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/((19|20)\\d\\d)$");
       return reg.test(o.val());
    };


	jQuery.fn.DateVide = function() {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;//o.attr('id');
	   var lib_an = id.replace('#'+o.attr('name'), '#an_'+o.attr('name'));
	   var lib_mois = id.replace('#'+o.attr('name'), '#mois_'+o.attr('name'));
	   var lib_jour = id.replace('#'+o.attr('name'), '#jour_'+o.attr('name'));
	   if($(lib_jour).length) return !($(lib_an).val().length || $(lib_mois).val().length ||  $(lib_jour).val().length);
	   else return !($(lib_an).val().length || $(lib_mois).val().length);
    };

	jQuery.fn.TestFileExtensions = function(ext) {
       var o = $(this[0]) // mon element
	   var id = $(this).attr('name');//.selector;//o.attr('id');
	   var ok = true;
	   if(jQuery.isNull(ext)) ext = '';
	   else ext = ext.toLowerCase();
	   if($('#'+id+'_extensions').length) ext = $('#'+id+'_extensions').val().toLowerCase();
	   if(IsnoVide(o) && ext) {
	     ext = ext.replace(/ /g, ',').replace(/;/g, ',').replace(/,,/g, ',').replace(/\|/g, ',').toLowerCase();
	     var tab_ext = ext.split(',');
	     var tab = o.val().split('.');
		 ok = jQuery.inArray('.'+tab[tab.length-1].toLowerCase(), tab_ext)>-1;
	   }
	   //var msg = 'erreur: seuls les fichiers du type '+ext.replace(/,/g, ' ')+' sont autorisés !';
	   return ok;
    };

	jQuery.fn.TestEmail = function() {
       var o = $(this[0]) // mon element
	   //var msg = 'erreur: adresse email invalide !';
	   var id = $(this).selector;//o.attr('id');
	   ValueFilter(o);
	   return BonEmail(o);
    };

	jQuery.fn.TestNumeric = function() {
       var o = $(this[0]) // mon element
	   //var msg = 'erreur: valeur numérique requise !';
	   var id = $(this).selector;//o.attr('id');
	   ValueFilter(o);
	   return isNumeric(o);
    };

	jQuery.fn.TestEntier = function() {
       var o = $(this[0]) // mon element
	   //var msg = 'erreur: valeur numérique entière requise !';
	   var id = $(this).selector;//o.attr('id');
	   ValueFilter(o);

	   return isEntier(o);

    };



	jQuery.fn.CompareTo = function(options) {
       var o = $(this[0]) // mon element

	   if(jQuery.isNull(options.champ)) return false;
	   var champ = options.champ;
	   var obj = typeof champ=="object"?champ:$(champ);
	   if(!obj.length) return false;
	   var casse = !jQuery.isNull(options.casse)?options.casse:true;
	   var id = $(this).selector;//o.attr('id');
	   ValueFilter(o);
	   ValueFilter(obj);
	   return CompareChamps(o, obj, casse);
    };

	jQuery.fn.TestLongueur = function(options) {
       var o = $(this[0]) // mon element
	   var opts = $.extend({}, $.fn.TestLongueur.defaults, options);
	   var min = !jQuery.isNull(opts.min)?opts.min:6;
	   var max = !jQuery.isNull(opts.max)?opts.max:0;
	   //var msg = !max?'erreur: trop court. Au moins '+min+' caractère(s) !':(!min?'erreur: trop long. Au moins '+max+' caractère(s) !':min!=max?'erreur: Entre '+min+' et '+max+' caractère(s) requis !':'erreur: '+max+' caractère(s) requis !');
	   var id = $(this).selector;//o.attr('id');
	   ValueFilter(o);
	   return VNbre_Cars(o, min, max);
    };

	$.fn.TestLongueur.defaults = {
      min: 6,
      max: 0
    };

	jQuery.fn.TestIntervalValeur = function(options) {
       var o = $(this[0]) // mon element
	   var opts = $.extend({}, $.fn.TestIntervalValeur.defaults, options);
	   var min = !jQuery.isNull(opts.min)?opts.min:0;
	   var max = !jQuery.isNull(opts.max)?opts.max:0;
	   var isentier = !jQuery.isNull(opts.isentier)?opts.isentier:1;
	   var lib = 'valeur numérique' + (isentier?' entière':'');
	   var ok = false;

	   if(isentier) o.TestEntier();
	   else o.TestNumeric();
	   if(!o.hasClass('error')){
	     //var msg = !max?'erreur: trop petit. '+lib+' supérieure ou égale à '+min+' requise !':(!min?'erreur: trop grand. '+lib+' inférieure ou égale à '+max+' requise !':min!=max?'erreur: '+lib+' entre '+min+' et '+max+' requise !':'erreur: seule la valeur requise est '+max+' !');
	     var id = $(this).selector;//o.attr('id');
	     ValueFilter(o);
	     return IntervalValeur(o, min, max, isentier);
	   }
    };

	$.fn.TestIntervalValeur.defaults = {
      min: 0,
      max: 0,
	  isentier:1
    };


	jQuery.fn.TestOptions = function(options) {

       var o = $(this[0]) // mon element
	   var opts = $.extend({}, $.fn.TestOptions.defaults, options);
	   var min = !jQuery.isNull(opts.min)?opts.min:0;
	   var max = !jQuery.isNull(opts.max)?opts.max:0;
	   var selector = !jQuery.isNull(opts.selector)?opts.selector.toLowerCase():'select';
	   var nonull = !jQuery.isNull(opts.nonull)?opts.nonull:true;

	   var tab = new Array('select', 'checkbox', 'radio');
	   if(jQuery.inArray(selector, tab)== -1) selector = 'select';
	   if(selector =='radio') min = max = 1;
	   var nbre = 0;
	   var id = o.attr('id');
	   if(selector == 'select') {
	     nbre = $($(this).selector+" option:selected").length;
		 if(nonull && !IsnoVide($(this).selector)) return false;
	   }
	   else {
	     var champ = $(this).selector;
	     id = champ;
		 var container = '';
	     var tab = champ.split(' ');
	     if(tab.length>1) {
	       id = tab[tab.length-1];
		   container = champ.replace(id, '');
	     }
	     if(id.substring(0, 1)=='#') id = id.substring(1);
	     nbre = $(container + 'input[id^="'+id+'-"]:'+selector+':checked').length;
	   }
	   //var msg = !max?'erreur: au moins '+min+' choix requis !':(!min?'erreur: au plus '+max+' choix permi(s) !':min!=max?'erreur: entre '+min+' et '+max+' choix permi(s) !':'erreur: '+min+' choix permi(s) !');
	   if(min) var ok = max>min?nbre>=min && nbre<=max:min!=max?nbre>=min:nbre==min;
	   else var ok = max?nbre<=max:true;

	   return ok;
    };

	$.fn.TestOptions.defaults = {
      min: 1,
      max: 0,
	  selector:'select',
	  nonull: true
    };

	jQuery.fn.Editeur = function(options) {
       var o = $(this[0]) // mon element
	   var id = $(this).selector;
	   if(o.length && o.get(0).nodeName == 'TEXTAREA') {
	     var opts = $.extend({}, $.fn.Editeur.defaults, options);
	     //var opts = $.extend({}, $.fn.Editeur.defaultOptions);
	     o.addClass('Sys_Editeur').htmlarea(opts);
		 o.htmlarea('updateHtmlArea');
	   }
    };

	var __SYS_DROITS__ = $('#__SYS_DROITS__').length?Number($('#__SYS_DROITS__').val()):0;
	if(__SYS_DROITS__>=10)
	jHtmlArea.defaultOptions = {
        toolbar: [
        ["html"], ["bold", "italic", "underline", "strikethrough", "|", "subscript", "superscript"],
        ["increasefontsize", "decreasefontsize", "|", "forecolor"],
        ["orderedlist", "unorderedlist"],
        ["indent", "outdent"],
        ["justifyleft", "justifycenter", "justifyright"],
        ["link", "unlink", "image", "horizontalrule"],
        ["p", "h1", "h2", "h3", "h4", "h5", "h6"],
        ["cut", "copy", "paste"]
    ],
        css: null,
        toolbarText: {
            bold: "Gras", italic: "Italique", underline: "Souligné", strikethrough: "Barré",
            cut: "Couper", copy: "Copier", paste: "Coller",
            h1: "Heading 1", h2: "Heading 2", h3: "Heading 3", h4: "Heading 4", h5: "Heading 5", h6: "Heading 6", p: "Paragraph",
            indent: "Indent", outdent: "Outdent", horizontalrule: "Insert Horizontal Rule",
            justifyleft: "Aligner à Gauche", justifycenter: "Centrer le Texte", justifyright: "Aligner à Droite",
            increasefontsize: "Increase Font Size", decreasefontsize: "Decrease Font Size", forecolor: "Text Color",
            link: "Insert Link", unlink: "Remove Link", image: "Insert Image",
            orderedlist: "Numérotation", unorderedlist: "Puces",
            subscript: "Subscript", superscript: "Superscript",
            html: "Show/Hide HTML Source View"
        },
		width:400,
		height:100
    };
	else
	$.fn.Editeur.defaults = {
      toolbar: [[/*"html", */"bold", "italic", "underline", "strikethrough", "|", "orderedlist", "unorderedlist"],["justifyleft", "justifycenter", "justifyright"]],
      toolbarText: {"bold": "Gras", "italic": "Italique", "underline": "Souligné"},
	  width:400,
	  height:100
    };

	/*$.fn.Editeur.defaults = {
      toolbar: [["bold", "italic", "underline", "strikethrough", "|", "orderedlist", "unorderedlist"],["justifyleft", "justifycenter", "justifyright"]],
      toolbarText: {"bold": "Gras", "italic": "Italique", "underline": "Souligné"},
	  width:400,
	  height:100
    };*/

	/****************************************AJOUT DU CHAMP HEURE*****************************************/


	jQuery.fn.InputHrs = function(options) {
	   var selector = $(this).selector;
	   $(selector).each(function() {
         var o = $(this);
	     var id = o.attr('id');
	     if(!o.length) return false;
	     var classe = !(jQuery.isNull(options) || jQuery.isNull(options.classe))?options.classe:(!jQuery.isNull(o.attr('class'))?o.attr('class'):'');
	     if(o.is('input') && 'TEXT' == o.attr('type').toUpperCase()){
	       var parent = o.parent();
		   if(parent.find('.zone-hrs').length) return false;
		   o.hide();
		   var v = o.val().replace(',', ':').split(':'), Hr='', Mn='';
		   if(v.length==2 && Number(v[0]) && Number(v[1]+'1')){
		     if(Number(v[0])>=0 && Number(v[0])<24 && Number(v[1])>=0 && Number(v[1])<60) {Hr = v[0];Mn = v[1];}
		   }
		   var html = '<div class="zone-hrs"><span class="h"></span><span class="b"></span><input value="'+Hr+'" class="input-hrs __nosys hh '+classe+'" type="text" READONLY></div>';
		   html += '<div class="zone-hrs"><span class="h"></span><span class="b"></span><input value="'+Mn+'" class="input-hrs __nosys mn '+classe+'" type="text" READONLY></div>';
		   parent.append(html);
		   parent.find('.zone-hrs span').unbind('click');
		   parent.find('.zone-hrs span').bind('click', function() {
		     var p = $(this).closest('.zone-hrs');
		     var input = p.find('input.input-hrs');
		     var isH = input.hasClass('hh');
		     var v = Number(input.val());
	         if($(this).hasClass('h')) {
		       v++;
			   if((isH && v>23) || (v>59 && !isH)) v = 0;
		     }
		     else if($(this).hasClass('b')){
		       v--;
			   if(v<0) v = (isH?23:59);
		     }
		     input.val((v<10?'0':'')+v);
		     o.val(parent.find('.zone-hrs input.hh').val()+':'+parent.find('.zone-hrs input.mn').val());
		     return false;
           });
		 }
	   });
    }


	jQuery.fn.InputDate = function() {

	   var selector = $(this).selector;
	   $(selector).each(function() {
         var o = $(this);
	     //var id = o.attr('id');
	     if(!o.length) return false;

	     if(o.is('input') && 'TEXT' == o.attr('type').toUpperCase()){
		   if(o.closest('div.dateinput').length || o.hasClass('dateduild')) return false;

		   var parent = o.parent();
		   var dateinput	  = $(document.createElement('div')).addClass('dateinput').append('<span></span>');
		   //o.addClass('input-date').before('<div class="dateinput"><span></span></div>');
		   o.addClass('input-date __nosys').attr('READONLY', true).width(80);
		   parent.append(dateinput);
		   dateinput.append(o);
		   o.simpleDatepicker({ x: -35, y: 28 });
	       o.addClass('dateduild');
		 }
	   });
    }


	/*****************************************FIN CHAMP HEURE********************************************/

	$.fn.tooltips = function(){
		$(".tooltips").focus(function(){
			$(this).mouseover();
		});
		$(".tooltips").blur(function(){
			$(this).mouseout();
		});

		$(".tooltips").not('.done').each(function(){

			var hrefTemp = jQuery(this).attr('href');

			var anchorIndexId = hrefTemp.indexOf("#");
			var aHref = hrefTemp.slice(anchorIndexId ,hrefTemp.length);

			$(this).poshytip({
				content: jQuery(aHref).html(),
				className: 'tip-white',
				showTimeout: 0.2,
				alignTo: 'target',
				alignX: 'center',
				offsetX: 10,
				allowTipHover: false,
				bgImageFrameSize: 6,
				backgroundGradient: '../images/backgroundwhite.gif',
				fade: true,
				slide: false
			});
			$(this).addClass('done');
		});
	 };


	 jQuery.fn.FUploader = function(options) {

	       var o = $(this[0]) // mon element
	       var opts = $.extend({}, $.fn.FUploader.defaults, options);
		   var id = o.attr('id');
		   var form_id = o.closest('form').attr('id');
		   if(!$('form#'+form_id+' #__SYS_UPLOADING__').length) $('form#'+form_id).append('<input id="__SYS_UPLOADING__" name="__SYS_UPLOADING__" value="0" type="hidden">');
		   if(jQuery.isNull(opts.id)) opts.id = id;
		   //if(jQuery.isNull(opts.container)) {
		     var parent = o.closest('li').eq(0);
		     if(!parent.length) parent = o.closest('div').eq(0);
			 if(!parent.length) return false;
			 parent.prepend('<div id="container_'+id+'"></div>');
			 opts.container = 'container_'+id;
			 /*if(jQuery.isNull(parent.attr('id'))) {
			    parent.attr('id', 'container_'+id);
			    opts.container = 'container_'+id;
			 } */
		   //};
		   var container = opts.container;
		   var allowedExtensions = '',
		   exts2 = '';
		   if($('form#'+form_id+' #'+id+'_extensions').length){
		      allowedExtensions = $('form#'+form_id+' #'+id+'_extensions').val().replace(/\./g, '');
			  exts2 = allowedExtensions;
			  $('form#'+form_id+' #'+id+'_extensions').remove();
		   }
		   if($('form#'+form_id+' #'+id+'_repvar').length){
		      opts.dest = $('form#'+form_id+' #'+id+'_repvar').val();
			  $('form#'+form_id+' #'+id+'_repvar').remove();
		   }
		   if($('form#'+form_id+' #'+id+'_sizelimit').length){
		      opts.sizeLimit = $('form#'+form_id+' #'+id+'_sizelimit').val();
			  $('form#'+form_id+' #'+id+'_sizelimit').remove();
		   }
		   if($('form#'+form_id+' #'+id+'_dims').length){
		      opts.dimsLimit = $('form#'+form_id+' #'+id+'_dims').val();
			  $('form#'+form_id+' #'+id+'_dims').remove();
		   }
		   if($('form#'+form_id+' #'+id+'_dimsstrict').length){
		      opts.dimsStrict = $('form#'+form_id+' #'+id+'_dimsstrict').val();
			  $('form#'+form_id+' #'+id+'_dims').remove();
		   }
		   var anc_file = '';
		   if($('form#'+form_id+' #anc_'+id).length){
		      anc_file = $('form#'+form_id+' #anc_'+id).val();
			  //$('form#'+form_id+' #anc_'+id).remove();
		   }
		   if($('form#'+form_id+' #'+id+'_nom_dest').length){
			      opts.nom_dest = $('form#'+form_id+' #'+id+'_nom_dest').val();
				  $('form#'+form_id+' #'+id+'_nom_dest').remove();
		   }
		   var exts = [];
		   if(allowedExtensions) exts = allowedExtensions.split(',');
		   var datafld = !jQuery.isNull(o.attr('datafld'))?o.attr('datafld'):'';
		   var session_sys = o.closest('form').find('input#session_sys').length?o.closest('form').find('input#session_sys').val():'';
		   o.remove();
		   parent.append('<input id="'+id+'" name="'+id+'" datafld="'+datafld+'" type="hidden">');
		   parent.append('<input id="original_'+id+'" name="original_'+id+'" datafld="" type="hidden">');
		   var uploader = new qq.FileUploader({
	        element: document.getElementById(container),
	        listElement:  document.getElementById(id+'_liste'),
	        action: opts.action,
		    allowedExtensions: exts,
			inputName : 'fuploader_'+id,
			//fileId: id,
			multiple:opts.multiple,
			button_options:{name: 'fuploader_'+id, onInit: opts.onInit, onRemove: opts.onRemove},
			sizeLimit: opts.sizeLimit,
			params: {
	           op: opts.op,
	           rep: opts.dest,
			   session: session_sys,
			   rewrite: opts.rewrite,
		       sys_dims_limit:opts.dimsLimit,
			   sys_file_name: 'fuploader_'+id,
			   sys_multiple:opts.multiple,
			   sys_anc_file_name: anc_file,
			   sys_file_exts: exts2,
			   sys_nom_dest: opts.nom_dest,
			   sys_size_limit: opts.sizeLimit,
			   sys_dim_strict: opts.dimsStrict
	        },
			cancelButtonText:'Annuler',
			failUploadText:'Echec du Téléchargement',
			onUpload: function(id2, fileName, responseJSON){$('form#'+form_id+' #__SYS_UPLOADING__').val(Number($('form#'+form_id+' #__SYS_UPLOADING__').val())+1) ;},
			onComplete: function(id2, fileName, responseJSON){
			   if(responseJSON.success) {
			      var f = $('form#'+form_id+' #'+id).val(),
				  of = $('form#'+form_id+' #original_'+id).val();
				  f += (f?'::':'') + responseJSON.file;
				  of += (of?'::':'') + fileName;
			      $('form#'+form_id+' #'+id).val(f);
				  $('form#'+form_id+' #original_'+id).val(of);
			   }
			   $('form#'+form_id+' #__SYS_UPLOADING__').val(Number($('form#'+form_id+' #__SYS_UPLOADING__').val())-1);
			},
			onError: function(id2, fileName, responseJSON){$('form#'+form_id+' #__SYS_UPLOADING__').val(Number($('form#'+form_id+' #__SYS_UPLOADING__').val())-1);}
	     });
	    };
		$.fn.FUploader.defaults = {
		  action:'includes/ajax/fileuploader.php',
		  multiple:false,
		  sizeLimit: 2 * 1024 * 1024,
		  dest:'',
		  op:'upload',
		  rewrite: 1,
		  dimsLimit:'',
		  nom_dest:'',
		  dimsStrict:0,
		  onInit: function(input){},
		  onRemove: function(input){}
		  //params: {op: 'upload', rep: '$file_rep', rewrite: 0".($file_dims?", dimsLimit:'$file_dims'":"")."},
	    };

})(jQuery);

//Liste des fonctions pour valider le formulaire
    function strip_tags (input, allowed) {
       allowed = (((allowed || "") + "")
          .toLowerCase()
          .match(/<[a-z][a-z0-9]*>/g) || [])
          .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
       var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
           commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
       return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1){
          return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
       });
    }

	function Update_Date(champ) {
	   var obj = typeof champ=="object"?champ:$(champ);
	   var id = champ, container = '';
	   var tab = champ.split(' ');
	   if(tab.length>1) {
	    id = tab[tab.length-1];
		container = champ.replace(id, '');
	   }
	   if(id.substring(0, 1)=='#') id = id.substring(1);

	   var lib_an = champ.replace('#'+id, '#an_'+id);
	   var lib_mois = champ.replace('#'+id, '#mois_'+id);
	   var lib_jour = champ.replace('#'+id, '#jour_'+id);
	   var les_champs = lib_an+', '+lib_mois;
	   if($(lib_jour).length) les_champs += ', '+lib_jour;

	   $(les_champs).change(function() {
	     var isdate = $(lib_an).val().length && $(lib_mois).val().length;
		 if($(lib_jour).length) isdate = isdate &&  $(lib_jour).val().length;
	     if(!isdate) obj.val('');
	     else obj.val($(lib_an).val() + '-' +  $(lib_mois).val() + ($(lib_jour).length?'-' + $(lib_jour).val():''));
	   });
	   $(lib_an).trigger('change');
    }

	function CompareChamps(champ1, champ2, casse){
	  casse = !jQuery.isNull(casse)?casse:false;
	  var obj1 = typeof champ1=="object"?champ1:$(champ1);
	  var obj2 = typeof champ2=="object"?champ2:$(champ2);
	  return casse?obj1.val() == obj2.val():obj1.val().toUpperCase() == obj2.toUpperCase();
	}

	function ValueFilter(champ){
	  var obj = typeof champ=="object"?champ:$(champ);
	  obj.val(jQuery.trim(obj.val()));
	}

	function IsnoVide(champ){
	  var obj = typeof champ=="object"?champ:$(champ);
	  if(obj) return VNbre_Cars(obj, 1);
	  else return false;
	}

	function SelectValues(champ, sep){
	  var obj = typeof champ=="object"?champ:$(champ);
	  if(!obj.length) return '';
	  var str = '';
	  if(jQuery.isNull(sep)) sep = ',';
	  $(champ+" option:selected").each(function () {
	     if(str) str += sep;
         str += $(this).val();
      });
	  return str;
	}
	//

	function Options_multipleChecked(champ, sep){

	  var id = champ, container = '';
	  var tab = champ.split(' ');
	  if(tab.length>1) {
	    id = tab[tab.length-1];
		container = champ.replace(id, '');
	  }

	  if(id.substring(0, 1)=='#') id = id.substring(1);

	  if(jQuery.isNull(sep)) sep = ',';
	  var str = '';

	  $(container + 'input[id^="'+id+'_"][type="hidden"]').each(function (i) {
         if($(this).val()) {
		   if(str) str += sep;
		   str += $(this).val();
		 }
      });
	  //alert(str);
	  return str;
	}

	function OptionsMultiples_LibsUpdate(id, id_parent, sep){
	  var nbre = $(id).val()?$(id).val().split(sep).length:0;
	  var parent = $(id).closest('ul.liste_multiple li');
	  parent.find('a span.label').removeClass('lib_checked').removeClass('lib_unchecked');
	  parent.find('a span.label').addClass(nbre?'lib_checked':'lib_unchecked').html('<b>'+nbre+'</b> sélection'+(nbre>1?'s':''));

	  parent.find('a').removeClass('selected');
	  if(nbre) parent.find('a').addClass('selected');


	  //Gestion de tous les parents selectionnes
	  parent = $(id).closest('ul.liste_multiple');
	  var str = '';
	  parent.find('input[id^="'+id_parent+'_"][type="hidden"]').each(function (i) {
         if($(this).val()) {
		   if(str) str += sep;
		   str += $(this).val();
		 }
      });
	  parent.find('input[id="'+id_parent+'"][type="hidden"]').val(str);

	  var str = '';
	  parent.find('a span.lib_checked').each(function (i) {
		if(str) str += sep;
		str += $(this).closest('a').attr('id').substring(2);
      });
	  parent.find('input[id="'+id_parent+'_pere"][type="hidden"]').val(str);
	}

	function OptionsMultiples_Init(id, scroll){
	  if(jQuery.isNull(scroll)) scroll = 0;
	  else scroll = Number(scroll);

	  $(id+" > li > a").click(function(){
	    $(id + " > li").removeClass("opened");
		 $(id + " > li > a").removeClass('selected');
	    $(id + " > li").find(" div.toggle_content").fadeOut("fast");
        if($(this).find('div.show_hide_sub_menu').text()=="+"){
          $(id + " > li a").find('div.show_hide_sub_menu').text("+");
          $(this).parents("li").addClass("opened");
		  $(this).parents("li").find(" div.toggle_content").fadeIn("fast", function(){if(scroll) Scroll_to_Element($(this), 'li', 400);});
          $(this).parents("li").find('div.show_hide_sub_menu').text('-');
		  $(this).addClass('selected');

        }
        else{
          $(this).find('div.show_hide_sub_menu').text("+");
        }
        return false;
      });
	  if($(id+'  > li a span.lib_checked').length) $(id+' li a span.lib_checked').eq(0).closest('a').trigger('click');
	  else $(id+" > li a").eq(0).trigger('click');
    }

	function OptionsChecked(champ, selector, sep, max){
      var id = champ, container = '';
	  var tab = champ.split(' ');
	  if(tab.length>1) {
	    id = tab[tab.length-1];
		container = champ.replace(id, '');
	  }
	  if(id.substring(0, 1)=='#') id = id.substring(1);

	  if(jQuery.isNull(selector)) selector = 'checkbox';
	  if(jQuery.isNull(sep)) sep = ',';
	  if(jQuery.isNull(max)) max = 0;
	  selector = selector.toLowerCase();
	  if(selector != 'checkbox') max = 0;
	  var str = '', tag = '';

	  if(!jQuery.isNull($(champ).attr('type'))) tag = $(champ).attr('type').toLowerCase();
	  if(selector!='checkbox' && selector!='radio') return str;

	  if(tag == selector) return $(champ+ ':checked').length?1:0;
	  $(container + 'input[id^="'+id+'-"]:'+selector+':checked').each(function (i) {
	     if(i<=max || !max) {
		   if(str) str += sep;
		   str += $(this).val();
		 }
		 else if(i>max) $(this).attr('checked', false);
      });
	  if(max) {
	    var bol =  $(container + 'input[id^="'+id+'-"]:'+selector+':checked').length >= max;
        $(container + 'input[id^="'+id+'-"]:'+selector).not(":checked").attr("disabled",bol);
      }

	  return str;
	}


	function isNumeric(champ){
	  var obj = typeof champ=="object"?champ:$(champ);
	  var number = obj.val().replace(',', '.');
	  obj.val(number);
      var anum=/(^\d+$)|(^\d+\.\d+$)/
      return anum.test(number);
    };

	function isEntier(champ) {
	  var obj = typeof champ=="object"?champ:$(champ);
	  var s = $.trim(obj.val());
      return (s.toString().search(/^[0-9]+$/) == 0);
    }

	function is_Numeric(n){
	  var number = n.toString().replace(',', '.');
      var anum=/(^\d+$)|(^\d+\.\d+$)/
      return anum.test(number);
    };

	function is_Entier(n) {
      return (n.toString().search(/^[0-9]+$/) == 0);
    }

	/*function BonEmail(champ){
	   var obj = typeof champ=="object"?champ:$(champ);
	   var a = jQuery.trim(obj.val());
	   var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	   var filter2 = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	   return filter.test(a) || filter2.test(a);
	}*/

	function BonEmail(champ){
	   var obj = typeof champ=="object"?champ:$(champ);
	   var a = jQuery.trim(obj.val());
	   var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	   var filter2 = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]+@[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	   return filter.test(a) || filter2.test(a);
	}

	function CheckEmail(a){
	   var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	   var filter2 = /^[a-zA-Z0-9]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;
	   return filter.test(a) || filter2.test(a);
	}

	function VNbre_Cars(champ, min, max){
	  var obj = typeof champ=="object"?champ:$(champ);
	  var nbre = $.trim(obj.val()).length;
	  min = parseInt(min);
	  max = parseInt(max);

	  if(min) return max>min?nbre>=min && nbre<=max:min!=max?nbre>=min:nbre==min;
	  else return max?nbre<=max:true;
	}

	function IntervalValeur(champ, min, max, isentier){

	  var obj = typeof champ=="object"?champ:$(champ);
	  var nbre = Number(obj.val());
	  if(isentier){
		min = parseInt(min);
	    max = parseInt(max);
	  }
	  else{
	    min = Number(min);
	    max = Number(max);
	  }
	  if(min) return max>min?nbre>=min && nbre<=max:min!=max?nbre>=min:nbre==min;
	  else return max?nbre<=max:true;
	}

	function Limit_Textarea(id, id_cmpt, max){
	  var obj = typeof id=="object"?id:$(id);
	  var obj_cmpt = typeof id_cmpt=="object"?id_cmpt:$(id_cmpt);

	  if(obj.length && max) {
	   var val = obj.val();
	   if(val.length>max) obj.val(val.substring(0, max-1));
	   var nbre = max - val.length;
	   if(nbre<0) nbre = 0;
	   obj_cmpt.text(nbre);
	   obj.keyup(function(event){
		  var nbre_chars = $(this).val().length;
          if(nbre_chars>=max) {
		    $(this).val($(this).val().substring(0, max));
			if(obj_cmpt.length) obj_cmpt.html(0);
		  }
		  else if(obj_cmpt.length) obj_cmpt.html(max - nbre_chars);
       });
	   obj.blur(function(){
		  var nbre_chars = $(this).val().length;
          if(nbre_chars>=max) {
		    $(this).val($(this).val().substring(0, max));
			if(obj_cmpt.length) obj_cmpt.html(0);
		  }
		  else if(obj_cmpt.length) obj_cmpt.html(max - nbre_chars);
       });
	   obj.click(function(){
		  var nbre_chars = $(this).val().length;
          if(nbre_chars>=max) {
		    $(this).val($(this).val().substring(0, max));
			if(obj_cmpt.length) obj_cmpt.html(0);
		  }
		  else if(obj_cmpt.length) obj_cmpt.html(max - nbre_chars);
       });
	  }
	}

	function Init_Sections(){
	  $('h6.relative').each(function () {
	     var id = $(this).next().next().attr('id');
	     Section_Form(id);
      });
	}

	function Section_Form(id){
	  var tab = id.split(' ');
	  var container = id.replace(tab[tab.length-1], '#h2_'+tab[tab.length-1].replace('#', ''));
	  //$(id).hide().delay(300).slideDown('fast').delay(1000).slideUp('slow');
	  $(container+' .show_hide a').unbind('click');
  	  $(container+' .show_hide a').bind('click', function() {
        if($(this).find('span.show_hide_sub_menu').text()=='+'){
	      $(this).find('span.show_hide_sub_menu').text('-');
	      $(this).html($(this).html().replace('Afficher', 'Cacher'));
	      $(id).slideDown('medium');
	    }
	    else{
	      $(this).find('span.show_hide_sub_menu').text('+');
	      $(this).html($(this).html().replace('Cacher', 'Afficher'));
	      $(id).slideUp('medium');
	   }
	   return false;
      });
  	}


function SaisieCode(champ){
  var obj = typeof champ=="object"?champ:$(champ);
  obj.keypress(function(event){
    var keyVal = (event.charCode ? event.charCode : ((event.keyCode) ? event.keyCode : event.which));
	//alert(keyVal);
	var ok_N = (keyVal > 47 && keyVal < 58);// Numbers
	var ok_C = (keyVal > 64 && keyVal < 91) || (keyVal > 96 && keyVal < 123);// ALPHA
	var ok_U = (keyVal == 95 || keyVal == 127 || keyVal == 37 || keyVal == 39 || keyVal == 8 || keyVal == 46 || keyVal == 35 || keyVal == 36);//_
	var ok = ok_N || ok_C || ok_U;
    if(((ok_N || ok_U) && !$(this).val()) || !ok) return false;
  });
}
function Extend_Onglets(){
  if($('#contenu_principal #espace_gauche').is(':visible') && $('#contenu_principal #espace_droit').is(':visible')) $('.pannel_extend, .pannel_extend1, .pannel_extend2').hide();
  else {
    $('.pannel_extend, .pannel_extend1').show();
	if(!($('#contenu_principal #espace_gauche').is(':visible') || $('#contenu_principal #espace_droit').is(':visible'))) $('.pannel_extend2').show();
    else $('.pannel_extend2').hide();
  }
  if($('#contenu_espace_centre .extendwidth').length) $('#contenu_espace_centre .extendwidth').width($('#contenu_espace_centre').width()-40);

}

function Init_Menus_Form(){
  if($("#menus_form ul li a").length){
	  if($.browser.msie) $('#menus_form ul li a').corner("round 3px top");
	  jQuery('#menus_form ul li a').bind('click', function() {
	    var Nbre = $("#menus_form ul li a").length;

		var form = $(this).closest('form');
	    $('#menus_form ul li a').removeClass('current');
		$(this).addClass('current');
		var index = $(this).parent().index();
		$('div.onglets_content:visible').hide();
		if($('div.onglets_content').eq(index).length) {
		  var contenu = $('div.onglets_content').eq(index);
		  contenu.show();
		  if(!(jQuery.isNull(contenu.attr('datafld')) || jQuery.isNull(contenu.attr('datasrc')) || (contenu.html() && contenu.html()!='<div class="loading_grd"></div>'))){
		    contenu.html('<div class="loading_grd"></div>');
		    var url = contenu.attr('datasrc');
		    var data = contenu.attr('datafld');
			AjaxLoad(url, data, contenu);
	      }
		  if(!jQuery.isNull(contenu.attr('datasrc2'))) eval(contenu.attr('datasrc2'));
		}
		if(index != Nbre-1) {
		  form.find('input:submit').fadeOut('fast');
		  if(form.find('input#'+form.attr('id')+'_suiv').length) form.find('input#'+form.attr('id')+'_suiv').remove();
		  form.find('input:button').eq(0).after('<input type="button" class="lscc" id = "'+form.attr('id')+'_suiv" value = "Etape Suiv »" Onclick = "$(\'form#'+form.attr('id')+' #menus_form ul li\').eq('+(index+1)+').find(\'a\').trigger(\'click\');return false;">');
		}
		else {
		  form.find('input:submit').val('Terminer').fadeIn('fast');
		  if(form.find('input#'+form.attr('id')+'_suiv').length) form.find('input#'+form.attr('id')+'_suiv').remove();
		}
		if(index) {
		   if(form.find('input#'+form.attr('id')+'_prec').length) form.find('input#'+form.attr('id')+'_prec').remove();
		   form.find('input:button').eq(0).after('<input type="button" class="lscc" id = "'+form.attr('id')+'_prec" value = "« Etape Préc" Onclick = "$(\'form#'+form.attr('id')+' #menus_form ul li\').eq('+(index-1)+').find(\'a\').trigger(\'click\');return false;">');
		}
		else if(!index) form.find('input#'+form.attr('id')+'_prec').remove();
		return false;
	  });
	  if(!$('#menus_form ul li a.current').length) $('#menus_form ul li a').eq(0).trigger('click');
	  else $('#menus_form ul li a.current').eq(0).trigger('click');
  }
}

function Active_Onglet(champ){
  var obj = typeof champ=="object"?champ:$(champ);
  if(obj.length){
    if(obj.closest('div.onglets_content').length){
	   if(!obj.parent('div.onglets_content:visible').length) $('#menus_form ul li a').eq(obj.closest('div.onglets_content').index()).trigger('click');
	}
  }
}
/****************************************Classe Form functions*****************************************************/
   //if(ok && obj.hasClass('numfield')) ok = jQuery.isNumeric(Number(obj.val())) && Number(obj.val())!=0;

   //3 Date Liste
   jQuery.fn.DateListe = function(params) {
       var o = $(this[0]) // mon element
	   if(!o.length) return false;
	   var options = {
          jour: 1,
		  mois:1,
		  annee:1
       };
	   $.extend(options, params);
	   var id = o.attr('id');
	   var lib_an = '#an_'+id;
	   var lib_mois = '#mois_'+id;
	   var lib_jour = '#jour_'+id;
	   var champs = '';
	   if(options.jour) champs = lib_jour;
	   if(options.mois) champs += (champs?',':'') + lib_mois;
	   if(options.annee) champs += (champs?',':'') + lib_an;
	   $(champs).change(function() {
	     var isdate = true;
		 var dv = '', chmp = '';
		 if(options.annee) {
		    if($(lib_an).val().length) dv += $(lib_an).val();
			else isdate = false;
			chmp = lib_an;
		 }
		 if(options.mois) {
		    if($(lib_mois).val().length) dv += (dv?'-':'') + $(lib_mois).val();
			else isdate = false;
			if(!chmp) chmp = lib_mois;
		 }
		 if(options.jour) {
		    if($(lib_jour).val().length) dv += (dv?'-':'') + $(lib_jour).val();
			else isdate = false;

		 }
	     if(!isdate) o.val('');
	     else o.val(dv);
	   });
	   $(champs).eq(0).trigger('change');
   }

   jQuery.fn.TestNumeroTel = function() {
       var o = $(this[0]) // mon element
	   ValueFilter(o);
	   var val = o.val();
	   if(val.substring(0, 1)=='+') return is_Entier(val.substring(1));
	   else return isEntier(o);

    };

	jQuery.fn.TestIdSender = function() {
       var o = $(this[0]) // mon element
	   ValueFilter(o);
	   var val = o.val(), ok = !o.TestEntier(), tab_ids = tab_ids = new Array('+', '.', '-', ' ', "'"), i=0;

	   if(ok){
	     ok = !is_Entier(val.replace('+', '').replace('.', '').replace('-', '').replace(' ', '').replace("'", '').replace("o", '0').replace("O", '0'));
	     if(ok) ok = jQuery.inArray(val.substring(0,1), tab_ids)<0;
		 /*if(ok && val.length>2){
		   for(i=0;i<val.length-1;i++){

		   }
		 }*/
	   }
	   return ok;

    };

   //2.Restriction saisie caractère
   jQuery.fn.SaisieChar = function(params) {
     //Type : 1 = Nombre, 2 = Entier, 3 = Alpha + Numérique + 56='_' + 110='.', 188=',' + 109='-', 4 = iD sender + '-'(109, 54) + '.'(110, 58, 59) + "'"(52) + ' '(32) + '+'(107,61)
	 //127 = del, 46=suppr, 37 = fleche gauche, 39 = fleche droite, 8=del
	 //35=#, 36=$, 32=' '


	   var o = $(this[0]); // mon element
	   if(!o.length) return false;
	   //o.addClass('numfield');
	   var options = {
          type: 1,
	      masque:'',
		  telephone:false,
		  f:function(){}
       };
	   $.extend(options, params);
	   var type = options.type;
	   var val = o.val(), tab_ids = tab_ids = new Array('+', '.', '-', ' ', "'");

	   var D=0,d=0, v='';
	   if(type==1 && val!='' && options.masque){
		  var t = options.masque.split('.');
		  if(t.length==2){

			 D = Number(t[0]);
			 d = Number(t[1]);
			 t = val.split('.');
			 if(D) v = t[0].substring(0, D);
			 else v = t[0];
			 if(t.length==2) {
			   v += '.';
			    if(d) v += t[1].substring(0, d);
			    else v = t[1];
			 }
			 o.val(v);
	      }
	   }

	   o.bind('keydown',function(e){
	      var keyVal = Number(e.which);
	      //alert(keyVal);
		  var ok_N = (keyVal > 95 && keyVal < 106) || (keyVal > 47 && keyVal < 58);// Numbers
	      var ok_C = (keyVal > 64 && keyVal < 91);// ALPHA
		  var ok_S = (keyVal == 56 || keyVal == 109 || keyVal == 54 || keyVal == 56);// Separateurs de code '_', '-'
	      var ok_U = (keyVal == 127 || keyVal == 37 || keyVal == 39 || keyVal == 8 || keyVal == 46|| keyVal == 13);//Suppresion, fleche
		  var ok_N_P = (keyVal == 107 || keyVal == 61);
		  var ok_SENDER = (keyVal == 109 || keyVal == 54 || keyVal == 110 || keyVal == 58 || keyVal == 59|| keyVal == 52 || keyVal == 32 || keyVal == 107|| keyVal == 61);//iD sender + '-'(109, 54) + '.'(110, 58, 59) + "'"(52) + ' '(32) + '+'(107,61)

		  var __ok__ = true;

		  if(type==1) {
			 val = o.val();
			 var ok=true;
			 if(val!='' && (D||d)) {
				 t = val.split('.');
				 var pospt = val.length;
				 if(t.length==2) pospt = val.indexOf('.')
				 var pos = Number(o.getCursorPosition());
				 if(D && t[0].length>=D&&ok_N && pospt>=pos) __ok__ = false;
				 if(t.length==2)
				   if(d && t[1].length>=d&&ok_N && pospt<pos && t.length==2) __ok__ = false;
			 }
		     __ok__ = ok_N || ((keyVal == 58 || keyVal == 59 || keyVal == 110 || keyVal == 190)  && val!='' && val.indexOf('.')<0) || ok_U;
		  }
		  else{
		    if(type==2) {
			  __ok__ =  ok_N || ok_U || (options.telephone && ok_N_P && !Number(o.getCursorPosition()));
			}
			else {
			  if(type==4) {
			     val = o.val();
				 var ok = true;
				 if(ok_SENDER) {
				   var pos = Number(o.getCursorPosition());
				   //alert(val.substring(pos-1, pos) + '------------' + val.substring(pos, pos+1));
				   ok = val!='';
				   if(keyVal==32) ok = ok && val.substring(pos-1, pos)!= ' ' && val.substring(pos, pos+1)!= ' ';
				   else ok = ok && (jQuery.inArray(val.substring(pos-1, pos), tab_ids)<0 || val.substring(pos-1, pos)== ' ') && jQuery.inArray(val.substring(pos, pos+1), tab_ids)<0;
				   //&& (jQuery.inArray(val.substring(keyVal, keyVal+1), tab_ids)<0||(keyVal == 32 && val.substring(pos-1, pos)!= ' '));
				 }
				 else ok = ok_N || ok_C || ok_U;
				 //alert(ok_N+' || '+ok_C+' || '+ok_U);

			     __ok__ = ok;
			  }
			  else __ok__ = ok_C || ok_N || ok_U || ok_S;
			}
		  }

		  if(!jQuery.isNull(options.f)){
		    if(jQuery.isFunction(options.f)) options.f();
		  }

		  return __ok__;
	   });
   };

   //Cette fonction nous permet d'obtenir la position du curseur dans un input text
   jQuery.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if (document.selection) {
            // IE
           input.focus();
        }
        return 'selectionStart' in input ? input.selectionStart:'' || Math.abs(document.selection.createRange().moveStart('character', -input.value.length));
   };

    //Cette fonction nous permet d'obtenir la position du curseur dans un input text
   jQuery.fn.TestMinSelections = function(min) {
       var o = $(this[0]) // mon element
	   if(!o.length) return false;
	   min = parseInt(min);
       var tab = o.val().split(',');
	   return tab.length>=min;
   };


   //1. Initialisation Radio et checkbox
   jQuery.fn.InitOptionsElements = function(params) {
       var o = $(this[0]) // mon element
	   if(!o.length) return false;
	   var id = o.attr('id');
	   var container = $('#_'+id+'_');
	   var nbre = 0;
	   var vals = o.val();

	   var options = {
          max: 0,
	      selector:'checkbox',
		  f:function(){},
		  croise: false
       };
	   $.extend(options, params);
	   var selector = 'input:'+options.selector;
	   var ischeckbox = options.selector.toUpperCase()=='CHECKBOX';
	   var styledform = container.find(selector).closest(ischeckbox?'div.checker':'div.radio').length;
	   var max_selections = Number(options.max);

       container.find(selector).attr('checked', false);
	   if(styledform) container.find(selector).closest('span').removeClass('checked');
	   if(vals){
	     vals = ','+vals+',';
	     container.find(selector).each(function() {
	       var val = $(this).val();
	       if(vals.indexOf(','+val+',')>-1) {
		     $(this).attr('checked', true);
			 $(this).closest('span').addClass('checked');
		   }
         });
	   }


	   container.find(selector).unbind('click');
       container.find(selector).bind('click', function() {
	     var val = $(this).val();
	     if(ischeckbox){
		   vals = '';//o.val();
		   if($(this).attr('checked')) {
			  //vals += (vals?',':'')+ val;
			  nbre = vals?vals.split(',').length:0;
			  if(options.croise) nbre = $(this).closest('tr').find(selector+':checked').length;
			  if(max_selections && nbre>max_selections) return false;
			  else if(styledform) $(this).closest('span').addClass('checked');
		   }
		   else {
		      //if(vals.substring(0, val.length) == val) vals = vals.substring(val.length+(vals.substring(val.length, val.length+1)==','?1:0));
		      //else vals = vals.replace(','+val, '');
			  if(styledform) $(this).closest('span').removeClass('checked');
		   }
	     }
	     else {
		   //vals = val;
		   if(styledform){
		     container.find(selector).closest('span').removeClass('checked');
		     if($(this).attr('checked')) $(this).closest('span').addClass('checked');
		   }
		 }
		 vals = OptionsChecked(id, options.selector, ',', max_selections);
	     o.val(vals);

		 if(!jQuery.isNull(options.f)){
		   if(jQuery.isFunction(options.f)) options.f(o.val());
		 }
	  });

   };

  jQuery.fn.KeyPress_Champ = function(f, fcts) {
	   if(fcts=='undefined' || !fcts) fcts = 'keyup keypress blur change click';
       var o = $(this[0]) // mon element
	   if(!o.length) return false;
	   if(jQuery.isFunction(f)) {
	     /*o.click(function(){f()});
	     o.blur(function() {f()});
	     o.keyup(function() {f()});
	     o.keypress(function() {f()});*/
		 o.on(fcts, function() {
           f();
         });
	   }
  };

