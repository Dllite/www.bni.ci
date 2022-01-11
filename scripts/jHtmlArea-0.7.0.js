/*
* jHtmlArea 0.7.0 - WYSIWYG Html Editor jQuery Plugin
* Copyright (c) 2009 Chris Pietschmann
* http://jhtmlarea.codeplex.com
* Licensed under the Microsoft Reciprocal License (Ms-RL)
* http://jhtmlarea.codeplex.com/license
*/
(function($) {
    $.fn.htmlarea = function(opts) {
        if (opts && typeof (opts) === "string") {
            var args = [];
            for (var i = 1; i < arguments.length; i++) { args.push(arguments[i]); }
            var htmlarea = jHtmlArea(this[0]);
            var f = htmlarea[opts];
            if (f) { return f.apply(htmlarea, args); }
        }
        return this.each(function() { jHtmlArea(this, opts); });
    };
    var jHtmlArea = window.jHtmlArea = function(elem, options) {
        if (elem.jquery) {
            return jHtmlArea(elem[0]);
        }
        if (elem.jhtmlareaObject) {
            return elem.jhtmlareaObject;
        } else {
            return new jHtmlArea.fn.init(elem, options);
        }
    };
    jHtmlArea.fn = jHtmlArea.prototype = {

        // The current version of jHtmlArea being used
        jhtmlarea: "0.7.0",

        init: function(elem, options) {
            if (elem.nodeName.toLowerCase() === "textarea") {
                var opts = $.extend({}, jHtmlArea.defaultOptions, options);
                elem.jhtmlareaObject = this;

                var textarea = this.textarea = $(elem);
				if(!jQuery.isNull(opts.width)) textarea.width(opts.width);
				if(!jQuery.isNull(opts.height)) textarea.height(opts.height);
				
				var container = this.container = $("<div/>").addClass("jHtmlArea").width(textarea.width()).insertAfter(textarea);

                var toolbar = this.toolbar = $("<div/>").addClass("ToolBar").appendTo(container);
                priv.initToolBar.call(this, opts);

                var iframe = this.iframe = $("<iframe/>").addClass('editor_iframe').height(textarea.height());
                iframe.width(textarea.width() - ($.browser.msie ? 0 : 4));
                var htmlarea = this.htmlarea = $("<div/>").append(iframe);

                container.append(htmlarea).append(textarea.hide());

                priv.initEditor.call(this, opts);
                priv.attachEditorEvents.call(this);

                // Fix total height to match TextArea
                iframe.height(iframe.height() - toolbar.height());
                toolbar.width(textarea.width() - 2);

                if (opts.loaded) { opts.loaded.call(this); }
				
				iframe.keydown(function() {
                   alert('Handler for .blur() called.');
                });

            }
        },
        dispose: function() {
            this.textarea.show().insertAfter(this.container);
            this.container.remove();
            this.textarea[0].jhtmlareaObject = null;
        },
        execCommand: function(a, b, c) {
            this.iframe[0].contentWindow.focus();
            this.editor.execCommand(a, b || false, c || null);
            this.updateTextArea();
        },
        ec: function(a, b, c) {
            this.execCommand(a, b, c);
        },
        queryCommandValue: function(a) {
            this.iframe[0].contentWindow.focus();
            return this.editor.queryCommandValue(a);
        },
        qc: function(a) {
            return this.queryCommandValue(a);
        },
        getSelectedHTML: function() {
            if ($.browser.msie) {
                return this.getRange().htmlText;
            } else {
                var elem = this.getRange().cloneContents();
                return $("<p/>").append($(elem)).html();
            }
        },
        getSelection: function() {
            if ($.browser.msie) {
                //return (this.editor.parentWindow.getSelection) ? this.editor.parentWindow.getSelection() : this.editor.selection;
                return this.editor.selection;
            } else {
                return this.iframe[0].contentDocument.defaultView.getSelection();
            }
        },
        getRange: function() {
            var s = this.getSelection();
            if (!s) { return null; }
            //return (s.rangeCount > 0) ? s.getRangeAt(0) : s.createRange();
            return (s.getRangeAt) ? s.getRangeAt(0) : s.createRange();
        },
        html: function(v) {
            if (v) {
                this.pastHTML(v);
            } else {
                return toHtmlString();
            }
        },
        pasteHTML: function(html) {		
            this.iframe[0].contentWindow.focus();
            var r = this.getRange();
            if ($.browser.msie) {
                r.pasteHTML(html);
            } else if ($.browser.mozilla) {
                r.deleteContents();
                r.insertNode($((html.indexOf("<") != 0) ? $("<span/>").append(html) : html)[0]);
            } else { // Safari
                r.deleteContents();
                r.insertNode($(this.iframe[0].contentWindow.document.createElement("span")).append($((html.indexOf("<") != 0) ? "<span>" + html + "</span>" : html))[0]);
            }
            r.collapse(false);
            r.select();
        },
        cut: function() {
            this.ec("cut");
        },
        copy: function() {
            this.ec("copy");
        },
        paste: function() {
            this.ec("paste");
        },
        bold: function() { this.ec("bold"); },
        italic: function() { this.ec("italic"); },
        underline: function() { this.ec("underline"); },
        strikeThrough: function() { this.ec("strikethrough"); },
        image: function(url) {
            if ($.browser.msie && !url) {
                this.ec("insertImage", true);
            } else {
                this.ec("insertImage", false, (url || prompt("Image URL:", "http://")));
            }
        },
        removeFormat: function() {
            this.ec("removeFormat", false, []);
            this.unlink();
        },
        link: function() {
            if ($.browser.msie) {
                this.ec("createLink", true);
            } else {
                this.ec("createLink", false, prompt("Link URL:", "http://"));
            }
        },
        unlink: function() { this.ec("unlink", false, []); },
        orderedList: function() { this.ec("insertorderedlist"); },
        unorderedList: function() { this.ec("insertunorderedlist"); },
        superscript: function() { this.ec("superscript"); },
        subscript: function() { this.ec("subscript"); },

        p: function() {
            this.formatBlock("<p>");
        },
        h1: function() {
            this.heading(1);
        },
        h2: function() {
            this.heading(2);
        },
        h3: function() {
            this.heading(3);
        },
        h4: function() {
            this.heading(4);
        },
        h5: function() {
            this.heading(5);
        },
        h6: function() {
            this.heading(6);
        },
        heading: function(h) {
            this.formatBlock($.browser.msie ? "Heading " + h : "h" + h);
        },

        indent: function() {
            this.ec("indent");
        },
        outdent: function() {
            this.ec("outdent");
        },

        insertHorizontalRule: function() {
            this.ec("insertHorizontalRule", false, "ht");
        },

        justifyLeft: function() {
            this.ec("justifyLeft");
        },
        justifyCenter: function() {
            this.ec("justifyCenter");
        },
        justifyRight: function() {
            this.ec("justifyRight");
        },

        increaseFontSize: function() {
            if ($.browser.msie) {
                this.ec("fontSize", false, this.qc("fontSize") + 1);
            } else if ($.browser.safari) {
                this.getRange().surroundContents($(this.iframe[0].contentWindow.document.createElement("span")).css("font-size", "larger")[0]);
            } else {
                this.ec("increaseFontSize", false, "big");
            }
        },
        decreaseFontSize: function() {
            if ($.browser.msie) {
                this.ec("fontSize", false, this.qc("fontSize") - 1);
            } else if ($.browser.safari) {
                this.getRange().surroundContents($(this.iframe[0].contentWindow.document.createElement("span")).css("font-size", "smaller")[0]);
            } else {
                this.ec("decreaseFontSize", false, "small");
            }
        },

        forecolor: function(c) {
            this.ec("foreColor", false, c || prompt("Enter HTML Color:", "#"));
        },

        formatBlock: function(v) {
            this.ec("formatblock", false, v || null);
        },

        showHTMLView: function() {
            this.updateTextArea();
            this.textarea.show();
            this.htmlarea.hide();
            $("ul li:not(li:has(a.html))", this.toolbar).hide();
            $("ul:not(:has(:visible))", this.toolbar).hide();
            $("ul li a.html", this.toolbar).addClass("highlighted");
        },
        hideHTMLView: function() {
            this.updateHtmlArea();
            this.textarea.hide();
            this.htmlarea.show();
            $("ul", this.toolbar).show();
            $("ul li", this.toolbar).show().find("a.html").removeClass("highlighted");
        },
        toggleHTMLView: function() {
            (this.textarea.is(":hidden")) ? this.showHTMLView() : this.hideHTMLView();
        },

        toHtmlString: function() {
            return this.editor.body.innerHTML;
        },
        toString: function() {
            return this.editor.body.innerText;
        },

        updateTextArea: function() {
            this.textarea.val(this.toHtmlString());
        },
        updateHtmlArea: function() {
            this.editor.body.innerHTML = this.textarea.val();
        }
    };
    jHtmlArea.fn.init.prototype = jHtmlArea.fn;

    jHtmlArea.defaultOptions = {
        toolbar: [
        ["html"], ["bold", "italic", "underline", "strikethrough", "|", "subscript", "superscript"],
        ["increasefontsize", "decreasefontsize"],
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
		width:250,
		height:100
    };
    var priv = {
        toolbarButtons: {
            strikethrough: "strikeThrough", orderedlist: "orderedList", unorderedlist: "unorderedList",
            horizontalrule: "insertHorizontalRule",
            justifyleft: "justifyLeft", justifycenter: "justifyCenter", justifyright: "justifyRight",
            increasefontsize: "increaseFontSize", decreasefontsize: "decreaseFontSize",
            html: function(btn) {
                this.toggleHTMLView();
            }
        },
        initEditor: function(options) {
            var edit = this.editor = this.iframe[0].contentWindow.document;
            edit.designMode = 'on';
            edit.open();
            edit.write(this.textarea.val());
            edit.close();
            if (options.css) {
                var e = edit.createElement('link'); e.rel = 'stylesheet'; e.type = 'text/css'; e.href = options.css; edit.getElementsByTagName('head')[0].appendChild(e);
            }
        },
        initToolBar: function(options) {
            var that = this;

            var menuItem = function(className, altText, action) {
                return $("<li/>").append($("<a href='javascript:void(0);'/>").addClass(className).attr("title", altText).click(function() { action.call(that, $(this)); }));
            };

            function addButtons(arr) {
                var ul = $("<ul/>").appendTo(that.toolbar);
                for (var i = 0; i < arr.length; i++) {
                    var e = arr[i];
                    if ((typeof (e)).toLowerCase() === "string") {
                        if (e === "|") {
                            ul.append($('<li class="separator"/>'));
                        } else {
                            var f = (function(e) {
                                // If button name exists in priv.toolbarButtons then call the "method" defined there, otherwise call the method with the same name
                                var m = priv.toolbarButtons[e] || e;
                                if ((typeof (m)).toLowerCase() === "function") {
                                    return function(btn) { m.call(this, btn); };
                                } else {
                                    return function() { this[m](); this.editor.body.focus(); };
                                }
                            })(e.toLowerCase());
                            var t = options.toolbarText[e.toLowerCase()];
                            ul.append(menuItem(e.toLowerCase(), t || e, f));
                        }
                    } else {
                        ul.append(menuItem(e.css, e.text, e.action));
                    }
                }
            };
            if (options.toolbar.length !== 0 && priv.isArray(options.toolbar[0])) {
                for (var i = 0; i < options.toolbar.length; i++) {
                    addButtons(options.toolbar[i]);
                }
            } else {
                addButtons(options.toolbar);
            }
        },
        attachEditorEvents: function() {
            var t = this;

            var fnHA = function() {
                t.updateHtmlArea();
            };
			

            this.textarea.click(fnHA).
                keyup(fnHA).
                keydown(fnHA).
                mousedown(fnHA).
                blur(fnHA);



            var fnTA = function() {
                t.updateTextArea();
            };

            $(this.editor.body).click(fnTA).
                keyup(fnTA).
                keydown(fnTA).
                mousedown(fnTA).
                blur(fnTA);

            $('form').submit(function() { t.toggleHTMLView(); t.toggleHTMLView(); });
            //$(this.textarea[0].form).submit(function() { //this.textarea.closest("form").submit(function() {


            // Fix for ASP.NET Postback Model
            if (window.__doPostBack) {
                var old__doPostBack = __doPostBack;
                window.__doPostBack = function() {
                    if (t) {
                        if (t.toggleHTMLView) {
                            t.toggleHTMLView();
                            t.toggleHTMLView();
                        }
                    }
                    return old__doPostBack.apply(window, arguments);
                };
            }
            
        },
        isArray: function(v) {
            return v && typeof v === 'object' && typeof v.length === 'number' && typeof v.splice === 'function' && !(v.propertyIsEnumerable('length'));
        }
		
    };
	
})(jQuery);

function Nettoie_Word(id) {
  return cleanup_word($(id).htmlarea('toHtmlString'), true, true, true); 
}


	function cleanup_word(s, bIgnoreFont, bRemoveStyles, bCleanWordKeepsStructure) {
		s = s.replace(/<o:p>\s*<\/o:p>/g, '') ;
		s = s.replace(/<o:p>[\s\S]*?<\/o:p>/g, '&nbsp;') ;

		// Remove mso-xxx styles.
		s = s.replace( /\s*mso-[^:]+:[^;"]+;?/gi, '' ) ;

		// Remove margin styles.
		s = s.replace( /\s*MARGIN: 0cm 0cm 0pt\s*;/gi, '' ) ;
		s = s.replace( /\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"" ) ;

		s = s.replace( /\s*TEXT-INDENT: 0cm\s*;/gi, '' ) ;
		s = s.replace( /\s*TEXT-INDENT: 0cm\s*"/gi, "\"" ) ;

		s = s.replace( /\s*TEXT-ALIGN: [^\s;]+;?"/gi, "\"" ) ;

		s = s.replace( /\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi, "\"" ) ;

		s = s.replace( /\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"" ) ;

		s = s.replace( /\s*tab-stops:[^;"]*;?/gi, '' ) ;
		s = s.replace( /\s*tab-stops:[^"]*/gi, '' ) ;

		// Remove FONT face attributes.
		if (bIgnoreFont) {
			s = s.replace( /\s*face="[^"]*"/gi, '' ) ;
			s = s.replace( /\s*face=[^ >]*/gi, '' ) ;

			s = s.replace( /\s*FONT-FAMILY:[^;"]*;?/gi, '' ) ;
		}

		// Remove Class attributes
		s = s.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi, "<$1$3") ;

		// Remove styles.
		if (bRemoveStyles)
			s = s.replace( /<(\w[^>]*) style="([^\"]*)"([^>]*)/gi, "<$1$3" ) ;

		// Remove style, meta and link tags
		s = s.replace( /<STYLE[^>]*>[\s\S]*?<\/STYLE[^>]*>/gi, '' ) ;
		s = s.replace( /<(?:META|LINK)[^>]*>\s*/gi, '' ) ;

		// Remove empty styles.
		s =  s.replace( /\s*style="\s*"/gi, '' ) ;

		s = s.replace( /<SPAN\s*[^>]*>\s*&nbsp;\s*<\/SPAN>/gi, '&nbsp;' ) ;

		s = s.replace( /<SPAN\s*[^>]*><\/SPAN>/gi, '' ) ;

		// Remove Lang attributes
		s = s.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3") ;

		s = s.replace( /<SPAN\s*>([\s\S]*?)<\/SPAN>/gi, '$1' ) ;

		s = s.replace( /<FONT\s*>([\s\S]*?)<\/FONT>/gi, '$1' ) ;

		// Remove XML elements and declarations
		s = s.replace(/<\\?\?xml[^>]*>/gi, '' ) ;

		// Remove w: tags with contents.
		s = s.replace( /<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '' ) ;

		// Remove Tags with XML namespace declarations: <o:p><\/o:p>
		s = s.replace(/<\/?\w+:[^>]*>/gi, '' ) ;

		// Remove comments [SF BUG-1481861].
		s = s.replace(/<\!--[\s\S]*?-->/g, '' ) ;

		s = s.replace( /<(U|I|STRIKE)>&nbsp;<\/\1>/g, '&nbsp;' ) ;

		s = s.replace( /<H\d>\s*<\/H\d>/gi, '' ) ;

		// Remove "display:none" tags.
		s = s.replace( /<(\w+)[^>]*\sstyle="[^"]*DISPLAY\s?:\s?none[\s\S]*?<\/\1>/ig, '' ) ;

		// Remove language tags
		s = s.replace( /<(\w[^>]*) language=([^ |>]*)([^>]*)/gi, "<$1$3") ;

		// Remove onmouseover and onmouseout events (from MS Word comments effect)
		s = s.replace( /<(\w[^>]*) onmouseover="([^\"]*)"([^>]*)/gi, "<$1$3") ;
		s = s.replace( /<(\w[^>]*) onmouseout="([^\"]*)"([^>]*)/gi, "<$1$3") ;

		if (bCleanWordKeepsStructure) {
			// The original <Hn> tag send from Word is something like this: <Hn style="margin-top:0px;margin-bottom:0px">
			s = s.replace( /<H(\d)([^>]*)>/gi, '<h$1>' ) ;

			// Word likes to insert extra <font> tags, when using MSIE. (Wierd).
			s = s.replace( /<(H\d)><FONT[^>]*>([\s\S]*?)<\/FONT><\/\1>/gi, '<$1>$2<\/$1>' );
			s = s.replace( /<(H\d)><EM>([\s\S]*?)<\/EM><\/\1>/gi, '<$1>$2<\/$1>' );
		} else {
			s = s.replace( /<H1([^>]*)>/gi, '<div$1><b><font size="6">' ) ;
			s = s.replace( /<H2([^>]*)>/gi, '<div$1><b><font size="5">' ) ;
			s = s.replace( /<H3([^>]*)>/gi, '<div$1><b><font size="4">' ) ;
			s = s.replace( /<H4([^>]*)>/gi, '<div$1><b><font size="3">' ) ;
			s = s.replace( /<H5([^>]*)>/gi, '<div$1><b><font size="2">' ) ;
			s = s.replace( /<H6([^>]*)>/gi, '<div$1><b><font size="1">' ) ;

			s = s.replace( /<\/H\d>/gi, '<\/font><\/b><\/div>' ) ;

			// Transform <P> to <DIV>
			var re = new RegExp( '(<P)([^>]*>[\\s\\S]*?)(<\/P>)', 'gi' ) ;	// Different because of a IE 5.0 error
			s = s.replace( re, '<div$2<\/div>' ) ;

			// Remove empty tags (three times, just to be sure).
			// This also removes any empty anchor
			s = s.replace( /<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g, '' ) ;
			s = s.replace( /<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g, '' ) ;
			s = s.replace( /<([^\s>]+)(\s[^>]*)?>\s*<\/\1>/g, '' ) ;
		}

		return s;
	}