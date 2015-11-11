---
layout: page
title: Converter
permalink: /converter/
main_menu: c
---
<div class="full-width">
<div id="converter">
	<div class="buttons">
		<label>Output Style 
			<select id="themechooser">
				<option value='theme-classic.css'>Classic</option>
				<option value='theme-faber.css'>Book</option>
				<option value='theme-bbc.css'>BBC</option>
			</select>
			<button id="button-raw">Raw HTML</button>
			<button id="button-print">Print</button>
		</label>
	</div>
	<div class="flex">
		<div id="sources" class="col">
			<!--<div id="drop-zone">Drop file here</div>-->
			<textarea id="source" rows="3" placeholder="... drop file here, or start typing" >{% include example.txt %}</textarea>
			<div id="options">
				<label>Smart Quotes <input id="optionSmartQuotes" type="checkbox" /></label>
			</div>
		</div>
		<div id="renderwrapper">
			<div id="renderbox" >
				<iframe id="iframe"></iframe>
			</div>
		</div>
	</div>
</div>
</div>
<script src="{{ "/js/quillex.js" | prepend: site.baseurl }}"></script>
<script>
	var source = document.getElementById("source");
	var renderbox = document.getElementById("renderbox");
	var themechooser = document.getElementById("themechooser");
	var themecss = document.getElementById('theme');
	var iframe = document.getElementById('iframe');
	var buttonRaw = document.getElementById('button-raw');
	var buttonPrint = document.getElementById('button-print');
	var options = document.getElementById('options');
	var optionSmartQuote = document.getElementById('optionSmartQuote');

	function handleDragOver(evt) {
		evt.stopPropagation();
		evt.preventDefault();
		evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
		evt.target.className = (evt.type == "dragover" ? "hover" : "");
	}

	function handleFileSelect(evt) {
		handleDragOver(evt);

		var files = evt.dataTransfer.files; // FileList object.

		var file = files[0];

		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function(theFile) {
			return function(e) {
			  // Render thumbnail.
			  var area = document.getElementById('source');
			  area.value = e.target.result;
			  quillIt();
			};
		})(file);

		// Read in the image file as a data URL.
		reader.readAsText(file);

	}
  
  function loadTheme() {
  	  var url = "/css/" + themechooser.value;
	  iframe.contentDocument.head.innerHTML = '<link rel="stylesheet" href="{{ site.url}}{{ site.baseurl }}' + url + '"/>';
	  resizeIframe();
  }
  
  function resizeIframe() {
  	//iframe.style.height = '300px';
	var div = iframe.contentWindow.document.body.children[0];
	if (div) {
		iframe.style.height = div.scrollHeight + 'px';
	}
  }
  // Setup the dnd listeners
  // var dropZone = document.getElementById('drop-zone');
  // dropZone.addEventListener('dragover', handleDragOver, false);
  // dropZone.addEventListener('dragleave', handleDragOver, false);
  // dropZone.addEventListener('drop', handleFileSelect, false);
  //
  source.addEventListener('dragover', handleDragOver, false);
  source.addEventListener('dragleave', handleDragOver, false);
  source.addEventListener('drop', handleFileSelect, false);
  
  function getOptions() {
	  return {
	  	  smartQuotes: optionSmartQuotes.checked,
		  doubleHyphenToEnDash: true
	  }
  }
  
  
  themechooser.addEventListener('change', loadTheme, false);
  var timeout;
  var quillIt = function() {
	var later = function() {
		timeout = null;
		iframe.contentDocument.body.innerHTML = Quillex.toHTML(source.value, getOptions());
		resizeIframe();
	};
	clearTimeout(timeout);
	timeout = setTimeout(later, 150);
  }
  
  
  buttonRaw.addEventListener('click', function() {
  	window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(iframe.contentDocument.body.innerHTML));
  }, false);
  
  buttonPrint.addEventListener('click', function() {
  	iframe.contentWindow.print();
  }, false);

  source.addEventListener('input', quillIt, false);
  options.addEventListener('click', quillIt, false);
  loadTheme();
  quillIt();
  setInterval(resizeIframe, 1000);
</script>
