
/**
 * Log viewer window with terminal-like behavior and auto scroll function
 * There is maximum number of lines displayed by this component, excessive lines are deleted. 
 * id - id of wrapping html element (div) 
 */ 
function LogViewer(id) {
   this.id = id;
   this.odd = true;
   this.wrapper;
   this.table;
   this.autoScroll = true;
   this.MAXLINES = 2048;
   this.lineVisibilityMask = {};
      
   this.wrapper = document.getElementById(this.id);
   this.wrapper.className = "log-viewer-wrapper";
   this.table = document.createElement("table");
   this.wrapper.appendChild(this.table);

   /**
    * turn on/off autoscroll
    * true - autoscroll off
    * false - autoscroll on         
    */       
   this.setAutoScroll = function(enabled) {
      this.autoScroll = enabled;
   }

   /**
    * toggle auto scroll functionality   
    */   
   this.autoScrollToggle = function() {
      this.autoScroll = !this.autoScroll;
   }

   /**
    * returns true if autoscroll is enabled, false otherwise
    */       
   this.isAutoScrollEnabled = function() {
      return this.autoScroll;
   }
   
   /**
    * returns maximum number of lines of this log viewer   
    */   
   this.getMaxLines = function() {
      return this.MAXLINES;
   }
   
   /**
    * returns actual line count of this log viewer   
    */   
   this.getLinesCount = function() {
      return this.table.getElementsByTagName("tr").length;
   }

   /**
    * append single log record into log viewer window
    * style - css style tag for this log record
    * data - json formated data { 'key1' : 'value1', 'key2' : 'value2', ... }           
    */   
   this.appendLogRecord = function(style, data) {
      tableRow = document.createElement("tr");
      style = "log-viewer-line-" + style.toLowerCase();
      tableRow.className = style;
      if (this.lineVisibilityMask[style] == undefined) {
         this.lineVisibilityMask[style] = true;
      }
      if (this.lineVisibilityMask[style]) { 
         tableRow.style.display = "table-row";
      } else {
         tableRow.style.display = "none";
      }
      
      for(var key in data) {
         dataCol = document.createElement("td");
         dataCol.innerHTML = data[key];
         dataCol.className = "log-viewer-" + key.toLowerCase();
         tableRow.appendChild(dataCol);
      }
      
      this.table.appendChild(tableRow);

      //remove excessive elements
      lines = this.table.getElementsByTagName("tr").length;
      if (lines > this.MAXLINES) {
          firstLine = this.table.getElementsByTagName("tr")[0];
          this.table.removeChild(firstLine);
      }
      //scroll to bottom if autoscroll
      if (this.autoScroll) {
          this.wrapper.scrollTop = this.wrapper.scrollHeight;
      }
   }
   
   /**
    * set visibility of log lines by style tag
    */       
   this.setLinesVisible = function(style, visible) {
      style = "log-viewer-line-" + style.toLowerCase();
      this.lineVisibilityMask[style] = visible;
      elements = this.table.getElementsByTagName("tr");
      for (var i=0; i<elements.length; i++) {
          if (elements[i].className === style) {
             if (visible) {
                elements[i].style.display = "table-row";
             } else {
                elements[i].style.display = "none";
             }
          }   
      }
      //scroll to bottom if autoscroll
      if (this.autoScroll) {
          this.wrapper.scrollTop = this.wrapper.scrollHeight;
      }
   }
}
