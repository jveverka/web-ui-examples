
function appendLinesText(lines) {
   wrapper = document.getElementById("scrollWrapper");
   text = wrapper.innerHTML;
   text = text + "\n" + lines;
   wrapper.innerHTML = text;
   wrapper.scrollTop = wrapper.scrollHeight;
}

function appendRandomLog() {
   text = "";
   possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   chars = Math.floor((Math.random() * 100));
   for( var i=0; i < chars; i++ ) {
      text = text + possible.charAt(Math.floor(Math.random() * possible.length));
   }
   appendLinesText(text);
}

