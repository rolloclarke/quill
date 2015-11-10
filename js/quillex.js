var Quillex = function() {
	var regex = {
		meta: /^\s*---([\s\S]*)\n---/g,
		comment: /\/\*[\s\S]*?\*\//g,
		carriage: /\r/g,
		ampersand: /&/g,
		lessthan: /\</g,
		greaterthan: />/g,
		spaces: /\n[^\S\n]+\n/g,
		act: /\n{2,}^[^\S\n]*#(.+)$/gm,
		scene: /^[^\S\n]*\.(?!\.{2})(.+)$/gm,
		forcedcharacter: /\n{2}@(.*?):\s*?$/gm,
		character: /\n{2}^[^\S\n]*([A-Z0-9-]+\b.*?):\s*?$/gm,
		actionmulti: /\[([^\]]*$[^\]]*)\]/gm,
		actionsequence: /\n{2}(\s*\[[^\]]*\])+[^\S\n]*(?=\n{2})/g,
		action: /\[(.*?)\]/g,
		dialogue: /(\<\/div>)([^\<]*)(?=\<|$)/g,
		bold: /\*{2}([^\n]+?)\*{2}/g,
		italic: /\*([^\n]+?)\*/g,
		underline: /_([^\n]+?)_/g,
		cleanup: /\>\s*\</g,
		pagebreak: /^===.*/gm,
		escape: /\\(.)/g
	}

	function trimD(match, p1, p2) {
		var t = p2.trim();
		return p1 + (t ? ('\n<div class="dialogue">' + t + '</div>\n') : '');
	}

	function makeBlockAction(match, p1) {
		return "\n\n" + match.replace(regex.action, '<div class="action">$1</div>\n') + "\n\n";
	}
	
	function escape(match, p1) {
		return '&#' + p1.charCodeAt(0) + ';';
	}

	function processMeta(match, p1) {
		var re = /^([^:\n]+):([\s|\S]*?)(?=(^[^:\n]+:)|^---)/gm;
		var meta = {};
		var a;
		while (a = re.exec(match)) {
			var key = a[1].trim().toLowerCase();
			var val = a[2].trim();
			meta[key] = val;
		}
		var ret = "";
		if (meta) {
			if (meta.title) {
				ret += "<div class=\"title-page\">\n<h1>" + meta.title + "</h1>\n";
				if (meta.credit) {
					ret += "<div class=\"credit\">" + meta.credit + "</div>\n";
				}
				if (meta.author) {
					ret += "<div class=\"authors\">" + meta.author + "</div>\n";
				}
				ret += "<div class='page-break'></div>\n</div>\n\n";
			}
		}
		return ret;


	}

	this.toHTML = function(text, options) {

		text = '\n\n' + text + '\n\n'; /* add new lines at start and end*/
		
		text = text
			.replace(regex.comment, '') /* remove comments */

			// html specials
			.replace(regex.ampersand, '&amp;')
			.replace(regex.lessthan, '&lt;')
		.replace(regex.greaterthan, '&gt;');
		
		// do smart quotes before adding in any html quotes
		if (options && options.smartQuotes) {
			text = text
			.replace(/([\s“"\(\[\{])'(tis|twere|twill|twixt|tween|twas)\b/gi, '$1’$2')
		 	.replace(/([\s“"\(\[\{])'/g, '$1‘')
		 	.replace(/'/g, '’')
		 	.replace(/([\s‘\(\[\{])"/g, '$1“')
			.replace(/"/g, '”');
			
		}



		text = text
			.replace(regex.escape, escape)
			.replace(regex.meta, processMeta)
			.replace(regex.pagebreak, '\n\n<div class="page-break"></div>\n\n')
			.replace(regex.carriage, '')
			.replace(regex.spaces, '\n\n')
			.replace(regex.act, '\n\<h2 class="act">$1\</h2>\n\n') 
			.replace(regex.scene, '\n<h2 class="scene">$1</h2>\n\n') 
			.replace(regex.forcedcharacter, '\n\n<div class="character">$1</div>')
			.replace(regex.character, '\n\n<div class="character">$1</div>')
			.replace(regex.actionmulti, '\n\n<div class="action">$1</div>\n\n') 
			.replace(regex.actionsequence, makeBlockAction)
			.replace(regex.dialogue, trimD) 
			.replace(regex.action, '<span class="action">$1</span>') /*  parentheticals */
			.replace(regex.bold, '<strong>$1</strong>') /* bold emphasis */
			.replace(regex.italic, '<em>$1</em>') /* italic emphasis */
			.replace(regex.underline, '<u>$1</u>') /* underline  */
			.replace(/(\/div\>)\s*(\<)/g, '$1$2');
			
		// turn hyphens into dashes
		if (options && options.doubleHyphenToEnDash) text = text.replace(/--/g, '–');
	
		// turn hyphens into dashes
		if (options && options.doubleHyphenToEmDash) text = text.replace(/--/g, '—');
	
		// turn hyphens into dashes
		if (options && options.tripleHyphenToEmDash) text = text.replace(/---/g, '—');
		
		return '<div class="script">\n' + text + '\n</div>';
	}

	return this;
}();
