
// Add JavaScript here

// TODO:
//   1. Hover for "mySites" URL; hover for "sfarrand" donate page URL
//   2. Hover for 'Edit_Save' button
//   3. Crosshair cursor for hot_spot

var  verString = "Ver 0.15";  // Spin the version with each rev of the site
var  edit_link = 0;           // Global for the link being edited.
var  mi_label = 0;
var  mi_editable = false;     // Global for menu items are editable.




function setVerString () {
     document.getElementById("ver_string").text = verString;
}


// ESC closes modal
 window.onkeyup = function (event) {

  if (event.keyCode == 27) {   // Turn off modal dialogs if 'esc'
          document.getElementById("url-modal").style.display = 'none';
          document.getElementById("button-modal").style.display = 'none';
     }
 }


function edit_mode(button) {
     edit.contentEditable = !edit.isContentEditable;   // toggle edit mode
     mi_editable = edit.contentEditable;  // Sync URL and nav buttons as editable

     if (edit.contentEditable == "true")   // enable URL editing
     {
          button.innerHTML = "Save"
          var elements = document.getElementsByClassName('tbl_image');  // Turn on hot spots
          for (var i = 0; i < elements.length; i++) {
               document.getElementsByClassName('tbl_image')[i].style.visibility = "visible";
               document.getElementsByClassName('tbl_image')[i].style.cursor = "crosshair";
          }
          document.execCommand("defaultParagraphSeparator", false, "br"); // Prevent default line breaks
         
          window.onbeforeunload = function () {   // Notify user if leaving page without saving...
               return true;
          };
     }
     else {
          button.innerHTML = "Edit"
          var elements = document.getElementsByClassName('tbl_image');  // Turn off hot spots
          for (var i = 0; i < elements.length; i++) {
               document.getElementsByClassName('tbl_image')[i].style.visibility = "hidden";
               document.getElementsByClassName('tbl_image')[i].style.cursor = "auto";
          }
          saveAs(window.location.href);
           // Remove navigation prompt
          window.onbeforeunload = null;
     }
}

function handleMenuItem(mi, page)
{
     if (mi_editable == "true")
     {
          mi_label = mi;

          console.log("Clicked nav button in Edit Mode: ", document.getElementById(mi_label).textContent);

          // Get value (label) of button
          var text_value = document.getElementById(mi_label).innerHTML;



          // Preload the model edit box with previous button label for user edit or replacement
          document.forms.namedItem('button_form').elements[0].value = text_value;


          // Popup Model Dialog here
          document.getElementById("button-modal").style.display = 'block';
          document.getElementById("label").focus();

          console.log("Before Button Edit: ", document.getElementById(mi).textContext);
     } else
     {
          mi.contentEditable = "false"
          console.log("Nav to page", document.getElementById(mi).textContext);
          window.location.href = page;
     }
     
}

function handleClick(link) {                // ContentEditable cell / URL clicked
     if (edit.contentEditable == "true") {

          edit_link = link;   // Set the global from the clicked link for other functions

          console.log("Clicked in Edit Mode: ", document.getElementById(edit_link));

          // Get <a> attribute of link
          var href = document.getElementById(edit_link).href;
          var label = document.getElementById(edit_link).text;

          (href == window.location.href) ? href = "" : href = href;


          // Preload the model edit box with previous url and label for user edit or replacement
          document.forms.namedItem('url_form').elements[0].value = href;
          document.forms.namedItem('url_form').elements[1].value = label;


          // Popup Model Dialog here
          document.getElementById("url-modal").style.display = 'block';
          document.getElementById("url").focus();

          console.log("Before URL Edit: ", href, label);
     }
     else {
          edit_link = 0;
          console.log("Active URL clicked");
     }
}

function parse_save_menu_label() {

     var text_value = document.forms.namedItem('button_form').elements[0].value;    // label value input by user

     if (mi_label != 0) {
          document.getElementById(mi_label).textContent = text_value;
     }

     // Clear the dialog
     document.getElementById('button-modal').style.display='none';
     document.getElementById(mi_label).focus();
     

     // See that we get what we expected.
     console.log("After  Button Edit: ", text_value);
}


function parse_save_input() {

     var href = document.forms.namedItem('url_form').elements[0].value;    // url value input by user
     var label = document.forms.namedItem('url_form').elements[1].value;   // label value input by user

     if (edit_link != 0) {
          document.getElementById(edit_link).href = href;
          document.getElementById(edit_link).text = label;
     }

     // Clear the dialog
     document.getElementById('url-modal').style.display='none';

     // See that we get what we expected.
     console.log("After  URL Edit: ", href, label);
     console.log(edit_link, document.getElementById(edit_link));
}



// Save to disk
function saveAs(pathname, allHtml) {
     allHtml = document.documentElement.outerHTML;
     var blob = new Blob([allHtml], { type: 'text/csv' });
     var fileName = location.pathname.split("/").slice(-1)
     if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, fileName);
     }
     else {
          var elem = window.document.createElement('a');
          elem.href = window.URL.createObjectURL(blob);
          elem.download = fileName;
          document.body.appendChild(elem);
          elem.click();
          document.body.removeChild(elem);
     }
}


// Digital Clock
function getDateTime() {
     var now = new Date();
     var year = now.getFullYear();
     var month = now.getMonth() + 1;
     var day = now.getDate();
     var hour = now.getHours();
     var minute = now.getMinutes();
     var second = now.getSeconds();
     if (month.toString().length == 1) {

          month = '0' + month;
     }
     if (day.toString().length == 1) {
          day = '0' + day;
     }

     if (hour.toString().length == 1) {
          hour = '0' + hour;
     }

     if (minute.toString().length == 1) {
          minute = '0' + minute;
     }

     if (second.toString().length == 1) {
          second = '0' + second;
     }

     var dateTime = month + '/' + day + '/' + year + "&nbsp;&nbsp;&nbsp;&nbsp;" + hour + ':' + minute + ':' + second;
     return dateTime;
}

// example usage: realtime clock
setInterval(function () {
     currentTime = getDateTime();
     document.getElementById("digital-clock").innerHTML = currentTime;
}, 1000);
