var	g_ajax_obj = new c_ajax_object;	// This will be the gobal AJAX object. There can be only one...

function c_ajax_object() {
	// THIS SPACE FOR RENT
};

// Initialize up the prototype fields.

c_ajax_object.prototype._dm_xmlhttprequest_type=null;		// Used when trying for the correct XMLHTTP object type.
c_ajax_object.prototype._dm_xmlhttprequestobject=null;	// This is the HTTP Request Object for this instance.
c_ajax_object.prototype._dm_callback_function=null;		// The function to be called upon completion of a request.
c_ajax_object.prototype._dm_param=null;						// An additional parameter to be passed to the function
c_ajax_object.prototype._dm_partialcallback_function=null;	// A function to be called for the interactive phase
c_ajax_object.prototype._dm_param2=null;						// An additional parameter to be passed to that function
c_ajax_object.prototype._dm_phase=0;							// The phase during which this function is called (Default 3).
c_ajax_object.prototype._dm_queue=new Array();				// This is the queue
c_ajax_object.prototype._dm_queue_state=true;				// This is the queue state
																			// 	false = paused
																			// 	true = normal
c_ajax_object.prototype._dm_committed=false;					// This is set to true when the HTTPRequest reaches Stage 3.
c_ajax_object.prototype._dm_pre_queue_in_url=null;			// These are all used for the "pre-queue."
c_ajax_object.prototype._dm_pre_queue_in_callback=null;
c_ajax_object.prototype._dm_pre_queue_in_method=null;
c_ajax_object.prototype._dm_pre_queue_in_param=null;
c_ajax_object.prototype._dm_pre_queue_in_pcallback=null;
c_ajax_object.prototype._dm_pre_queue_in_param2=null;
c_ajax_object.prototype._dm_pre_queue_in_c2_phase=0;

// New version, created by Jeremy Lucier
c_ajax_object.prototype.GetNewRequestObject = function() {
	// check the dom to see if this is IE or not
	if (window.XMLHttpRequest) {
		// Not IE
		this._dm_xmlhttprequestobject = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		// Hello IE!
		// Instantiate the latest MS ActiveX Objects
		if (this._dm_xmlhttprequest_type) {
			this._dm_xmlhttprequestobject = new ActiveXObject(this._dm_xmlhttprequest_type);
		} else {
			// loops through the various versions of XMLHTTP to ensure we're using the latest
			var versions = ["Msxml2.XMLHTTP.7.0", "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0", "Msxml2.XMLHTTP.4.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
			for (var i = 0; i < versions.length ; i++) {
         	try {
					// try to create the object
						// if it doesn't work, we'll try again
						// if it does work, we'll save a reference to the proper one to speed up future instantiations
					this._dm_xmlhttprequestobject = new ActiveXObject(versions[i]);
					if (this._dm_xmlhttprequestobject) {
						this._dm_xmlhttprequest_type = versions[i];
						break;
					}
            }
            catch (objException) {
            	// trap; try next one
				};
			};
		}
	}
};
c_ajax_object.prototype.QueueFlush = function ( ) {
	this._dm_queue = new Array();
	this.QueueResume();	// If the queue was paused, it is now re-enabled
}
c_ajax_object.prototype.QueuePause = function ( ) {
	this._dm_queue_state = false;
}

c_ajax_object.prototype.QueueResume = function ( ) {
	this._dm_queue_state = true;
	this.Dequeue();
}
c_ajax_object.prototype.QueueInterrupt = function ( in_url, in_callback, in_method, in_param, in_pcallback, in_param2, in_phase ) {
	var url = in_url;
	this._dm_callback_function = in_callback;	// The basic callback
	var method = in_method;
	this._dm_param = in_param;	// If there is a parameter, we get it here.
	this._dm_partialcallback_function = in_pcallback;	// If there is a partial callback, we get it here.
	this._dm_param2 = in_param2;	// If there is a second parameter, we get it here.
	this._dm_phase = in_phase;	// If there is a second parameter, we get it here.
	
	if ( url && method ) {
		ret = this._CallXMLHTTPObject ( url, method );
		}
	
	return ret;
}
c_ajax_object.prototype.QueueInject = function ( in_url, in_callback, in_method, in_param, in_pcallback, in_param2, in_phase ) {

	this._dm_queue_state = false;

	// Move the queue up one to make room at the start.
	for ( var counter = this._dm_queue.length; counter > 0; counter-- ) {
		this._dm_queue[counter] = this._dm_queue[counter - 1];
		}
		
	this._dm_queue[0] = new Array ( in_url, in_callback, in_method, in_param, in_pcallback, in_param2, in_phase );

	this._dm_queue_state = true;	// We don't call DeQueue, so we won't interrupt any request in progress.
}

c_ajax_object.prototype.CallXMLHTTPObjectGET = function ( in_url, in_callback ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "GET", null, null, 0 );
}
c_ajax_object.prototype.CallXMLHTTPObjectGETParam = function ( in_url, in_callback, in_param ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "GET", in_param, null, 0 );
}
c_ajax_object.prototype.CallXMLHTTPObjectGETParamPartial = function ( in_url, in_callback, in_param, in_pcallback, in_param2 ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "GET", in_param, in_pcallback, in_param2, 0 );
}
c_ajax_object.prototype.CallXMLHTTPObjectGETParamPartialPhase = function ( in_url, in_callback, in_param, in_pcallback, in_param2, in_phase ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "GET", in_param, in_pcallback, in_param2, in_phase );
}
c_ajax_object.prototype.CallXMLHTTPObjectPOST = function ( in_url, in_callback ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "POST", null, null, 0 );
}
c_ajax_object.prototype.CallXMLHTTPObjectPOSTParam = function ( in_url, in_callback, in_param ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "POST", in_param, null, 0 );
}
c_ajax_object.prototype.CallXMLHTTPObjectPOSTParamPartial = function ( in_url, in_callback, in_param, in_pcallback, in_param2 ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "POST", in_param, in_pcallback, in_param2, 0 );
}
c_ajax_object.prototype.CallXMLHTTPObjectPOSTParamPartialPhase = function ( in_url, in_callback, in_param, in_pcallback, in_param2, in_phase ) {
	return this.CallXMLHTTPObject ( in_url, in_callback, "POST", in_param, in_pcallback, in_param2, in_phase );
}
c_ajax_object.prototype.CallXMLHTTPObject = function ( in_url, in_callback, in_method, in_param, in_pcallback, in_param2, in_phase ) {
	// Set up the "pre queue."
	this._dm_pre_queue_in_url=in_url;
	this._dm_pre_queue_in_callback=in_callback;
	this._dm_pre_queue_in_method=in_method;
	this._dm_pre_queue_in_param=in_param;
	this._dm_pre_queue_in_pcallback=in_pcallback;
	this._dm_pre_queue_in_param2=in_param2;
	this._dm_pre_queue_in_c2_phase=in_phase;
	if ( (this._dm_pre_queue_in_c2_phase < 1) || (this._dm_pre_queue_in_c2_phase > 3) ) {
		this._dm_pre_queue_in_c2_phase = 3;
		}
	this.Enqueue();
	return true;
};
c_ajax_object.prototype.Enqueue = function ( ) {
	// Set up the main queue from the prequeue.
	this._dm_queue[this._dm_queue.length] = new Array ( this._dm_pre_queue_in_url, this._dm_pre_queue_in_callback,
		this._dm_pre_queue_in_method, this._dm_pre_queue_in_param, this._dm_pre_queue_in_pcallback,
		this._dm_pre_queue_in_param2, this._dm_pre_queue_in_c2_phase );
	
	// As you were...
	this._dm_pre_queue_in_url=null;
	this._dm_pre_queue_in_callback=null;
	this._dm_pre_queue_in_method=null;
	this._dm_pre_queue_in_param=null;
	this._dm_pre_queue_in_pcallback=null;
	this._dm_pre_queue_in_param2=null;
	this._dm_pre_queue_in_c2_phase=0;
		
	// If there are no other commands in progress, we start the daisy-chain.
	if ( !this._dm_xmlhttprequestobject ) {
		this.Dequeue();
		}
};
c_ajax_object.prototype.Dequeue = function ( ) {
	var command = null;
	var ret=false;
	
	if ( this._dm_queue.length && this._dm_queue_state ) {
		command = this._dm_queue[0];
		
		var url = command[0];
		this._dm_callback_function = command[1];	// The basic callback
		var method = command[2];
		this._dm_param = command[3];	// If there is a parameter, we get it here.
		this._dm_partialcallback_function = command[4];	// If there is a partial callback, we get it here.
		this._dm_param2 = command[5];	// If there is a second parameter, we get it here.
		this._dm_phase = command[6];	// If there is a second parameter, we get it here.
		
		for ( var counter = 1; counter < this._dm_queue.length; counter++ ) {
			this._dm_queue[counter - 1] = this._dm_queue[counter];
			}
		
		this._dm_queue.length = counter - 1;
		}
	
	if ( url && method ) {
		ret = this._CallXMLHTTPObject ( url, method );
		}
	
	return ret;
};
c_ajax_object.prototype._CallXMLHTTPObject = function ( in_url, in_method ) {
	try {
		var sVars = null;
		
		// Split the URL up, if this is a POST.
		if ( in_method == "POST" ) {
			var rmatch = /^([^\?]*)\?(.*)$/.exec ( in_url );
			in_url = rmatch[1];
			sVars = unescape ( rmatch[2] );
			}
		
		this._dm_committed = false;
		this.GetNewRequestObject();
		this._dm_xmlhttprequestobject.open(in_method, in_url, true);
		
		if ( in_method == "POST" ) {
		  this._dm_xmlhttprequestobject.setRequestHeader("Method", "POST "+in_url+" HTTP/1.1");
		  this._dm_xmlhttprequestobject.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
		
		this._dm_xmlhttprequestobject.onreadystatechange = Handle_HTTP_Response;
		this._dm_xmlhttprequestobject.send(sVars);
		
		return true;
		}
	catch ( z ) { }
	
	return false;
};
function Handle_HTTP_Response () {
	var ie = navigator.appName=='Microsoft Internet Explorer';	// Are we IE?
	
	if ( g_ajax_obj && g_ajax_obj._dm_xmlhttprequestobject ) {	// Don't even bother if we don't have a request object to use.
		if ( g_ajax_obj._dm_xmlhttprequestobject.readyState == 0 ) {	// Uninitialized (sent, but no information yet)
			}
		else {
			if ( g_ajax_obj._dm_xmlhttprequestobject.readyState == 1 ) {	// Loading (probably received)
				if ( g_ajax_obj._dm_phase == g_ajax_obj._dm_xmlhttprequestobject.readyState ) {
					if ( g_ajax_obj._dm_partialcallback_function ) {
						var resp;	// This is all about the IE fix mentioned above.
						if(!ie && g_ajax_obj._dm_xmlhttprequestobject.responseText){
							resp=g_ajax_obj._dm_xmlhttprequestobject.responseText;
							}
						g_ajax_obj._dm_partialcallback_function ( resp, g_ajax_obj._dm_param2 ? g_ajax_obj._dm_param2 : g_ajax_obj._dm_param );
						}
					}
				}
			else {
				if ( g_ajax_obj._dm_xmlhttprequestobject.readyState == 2 ) {	// Loaded (received for sure, but no further data)
					// At this point, the server has the request, and is executing it (probably).
					if ( g_ajax_obj._dm_phase == g_ajax_obj._dm_xmlhttprequestobject.readyState ) {
						if ( g_ajax_obj._dm_partialcallback_function ) {
							var resp;
							if(!ie && g_ajax_obj._dm_xmlhttprequestobject.responseText){
								resp=g_ajax_obj._dm_xmlhttprequestobject.responseText;
								}
							g_ajax_obj._dm_partialcallback_function ( resp, g_ajax_obj._dm_param2 ? g_ajax_obj._dm_param2 : g_ajax_obj._dm_param );
							}
						}
					}
				else {
					if ( g_ajax_obj._dm_xmlhttprequestobject.readyState == 3 ) {	// Interactive
						// At this point, the server has the request, and is executing it. A partial response MAY be available
						// in the g_ajax_obj._dm_xmlhttprequestobject.responseText and g_ajax_obj._dm_xmlhttprequestobject.responseBody
						// fields.
						// We have the option of sending a "Partial Callback" function, which we can use to do things like
						// disable a button to prevent additional requests.
						g_ajax_obj._dm_committed = true;
						if ( g_ajax_obj._dm_phase == g_ajax_obj._dm_xmlhttprequestobject.readyState ) {
							if ( g_ajax_obj._dm_partialcallback_function ) {
								var resp;
								if(!ie && g_ajax_obj._dm_xmlhttprequestobject.responseText){
									resp=g_ajax_obj._dm_xmlhttprequestobject.responseText;
									}
								g_ajax_obj._dm_partialcallback_function ( resp, g_ajax_obj._dm_param2 ? g_ajax_obj._dm_param2 : g_ajax_obj._dm_param );
								}
							}
						}
					else {
						if ( g_ajax_obj._dm_xmlhttprequestobject.readyState == 4 ) {	// We're done. Back to you.
							// We send both parameters, just in case they both apply (for example, the partial disables a field,
							// so the complete one re-enables it).
							g_ajax_obj._dm_callback_function ( g_ajax_obj._dm_xmlhttprequestobject.responseText, g_ajax_obj._dm_param, g_ajax_obj._dm_param2 );
							if( typeof g_ajax_obj != 'undefined' ) { // Just in case they nuked the object in the callback.
								g_ajax_obj._dm_xmlhttprequestobject = null;	// Kill the request object. we're done.
								g_ajax_obj._dm_committed = false;
								g_ajax_obj._dm_phase = 0;
								g_ajax_obj.Dequeue();
								}
							}
						}
					}
				}
			}
		}
return true;
};

if (typeof SupportsAjax == 'undefined'){	// In case we included ajax_threads.js
	function SupportsAjax ( ) {
		var test_obj = new c_ajax_object;
		
		if( typeof test_obj != 'undefined' ) {
			test_obj.GetNewRequestObject();
			
			if ( test_obj._dm_xmlhttprequestobject ) {
				test_obj._dm_xmlhttprequestobject = null;
				test_obj = null;
				return true;
				}
			
			test_obj = null;
			}
		
		return false;
	};
}
function SimpleAJAXCall ( in_uri, in_callback, in_method, in_param ) {
	// The method indicator is actually optional, so we make it GET if nothing was passed.
	if ( (typeof in_method == 'undefined') || ((in_method != 'GET')&&(in_method != 'POST')) ) {
		in_method = 'GET';
		}
	
	in_method = in_method.toUpperCase();
	
	// We verify that the proper parameters have been passed in.
	if ( SupportsAjax() && (typeof in_uri != 'undefined') && in_uri && (typeof in_callback == 'function') ) {
		if ( in_method == 'POST' ) {
			return g_ajax_obj.CallXMLHTTPObjectPOSTParam ( in_uri, in_callback, in_param );
			} else {
			return g_ajax_obj.CallXMLHTTPObjectGETParam ( in_uri, in_callback, in_param );
			}
		} else {
			return false;
		}
};