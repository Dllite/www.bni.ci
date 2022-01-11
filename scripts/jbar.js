function Msg_Systeme(options){  
  
  $('.jbar').remove();
  if(!$('.jbar').length){
	if(options.time) timeout = setTimeout('removebar()',options.time);
	else if (timeout) clearTimeout(timeout);
	
	/*if(options.classe=='msg_warning') options.message = '<b>Attention : </b>' + options.message.replace('<b>Attention : </b>', '');
	else if(options.classe=='msg_error') options.message = '<b>Erreur : </b>' + options.message.replace('<b>Erreur : </b>', '');
	else if(options.classe=='msg_info') options.message = '<b>Information : </b>' + options.message.replace('<b>Information : </b>', '');
	else if(options.classe=='msg_succes') options.message = '<b>Succès : </b>' + options.message.replace('<b>Succès : </b>', '');*/
	options.message = Msg_Bar(options);
	var _message_span = $(document.createElement('span')).addClass('jbar-content png').html(options.message);
	var _wrap_bar;
	(options.position == 'bottom') ? 
	_wrap_bar	  = $(document.createElement('div')).addClass('jbar jbar-bottom'):
	_wrap_bar	  = $(document.createElement('div')).addClass('jbar jbar-top') ;
	if(options.classe) _wrap_bar.addClass(options.classe);
	if(options.removebutton){
		var _remove_cross = $(document.createElement('a')).addClass('jbar-cross');
		_remove_cross.html('x');
		_remove_cross.click(function(e){removebar();})
	}
	else{				
		_wrap_bar.css({"cursor"	: "pointer"});
		_wrap_bar.click(function(e){removebar();})
	}
	$('body').append(_wrap_bar);	
	_wrap_bar.append(_message_span).append(_remove_cross).hide().fadeIn('fast');

	if(options.time){
	  $(".jbar").hover(
        function () {
          clearTimeout(timeout);
        }, 
        function () {
	      clearTimeout(timeout);
          timeout = setTimeout('removebar()',options.time);
        }
      );
    }
  }
}

function Msg_Bar(options){
    if(options.classe=='msg_warning') options.message = '<b>Attention : </b>' + options.message.replace('<b>Attention : </b>', '');
	else if(options.classe=='msg_error') options.message = '<b>Erreur : </b>' + options.message.replace('<b>Erreur : </b>', '');
	//else if(options.classe=='msg_info') options.message = '<b>Information : </b>' + options.message.replace('<b>Information : </b>', '');
	//else if(options.classe=='msg_succes') options.message = '<b>Succès : </b>' + options.message.replace('<b>Succès : </b>', '');
	
	return options.message;
}

function Message_Systeme(classe, msg, top, time){
  var pos = !top?'bottom':'top';
  if(time == null && time == undefined) time = 6000;
  if(classe == 'ajax') time = 0;
  msg = msg.replace('\\','');
  
  var options = {
	  classe           : 'msg_'+classe,
	  position		 : pos,
	  removebutton     : true,
	  message			 : msg,
	  time			 : time
  }
  
  if($('.jbar').length) {
	  /*$('.jbar').hide();
	  $('.jbar').removeClass('msg_warning').removeClass('msg_error').removeClass('msg_info').removeClass('msg_succes').removeClass('msg_ajax').removeClass('jbar-bottom').removeClass('jbar-top');
	  $('.jbar').addClass(options.classe);
	  $('.jbar').addClass('jbar-'+pos);
	  $('span.jbar-content').html(Msg_Bar(options));
	  if(time) timeout = setTimeout('removebar()', time);
	  $('.jbar').show();*/
	  clearTimeout(timeout);
	  $('.jbar').fadeOut('fast',function(){
	     $('.jbar').remove();	     	     Msg_Systeme(options);
	  });
  }	
  else Msg_Systeme(options);
}    

var timeout;
function removebar() {
 if($('.jbar').length){
	clearTimeout(timeout);
	$('.jbar').fadeOut('fast',function(){
	  $(this).remove();
	});
 }	
};

function ajax_removebar() {
 if($('.jbar').length){
   if($('.jbar').hasClass('msg_ajax')){
	  clearTimeout(timeout);
	  $('.jbar').fadeOut('fast',function(){
	    $(this).remove();
	  });
   }	  
 }	
};