function test() {
var font = "#" + document.getElementById("fontf").value;
var borders = "#" + document.getElementById("bordersf").value;
var envelope = "#" + document.getElementById("envelopef").value;
var paper = "#" + document.getElementById("paperf").value;
var paperlines = "#" + document.getElementById("paperlinesf").value;
var shadow = "#" + document.getElementById("shadowf").value;
var lettertext = document.getElementById("textf").value;
document.getElementById("bigpapertext").innerHTML = lettertext;
document.getElementById("bigpapertext").style.color = font;
document.getElementById("bigpaper").style.border = "1px solid " + borders;
document.getElementById("bigpaper").style.background = paper;
document.getElementById("bigpaper").style.boxShadow = "4px 4px 1px " + shadow;
document.getElementById("envelope").style.background = envelope;
document.getElementById("envelope").style.borderLeft = "1px solid " + borders;
document.getElementById("envelope").style.borderRight = "1px solid " + borders;
document.getElementById("envelope").style.borderBottom = "1px solid " + borders;
document.getElementById("envelope").style.borderTop = "1px solid " + borders;
document.getElementById("envelope").style.boxShadow = "4px 4px 1px " + shadow;
document.getElementById("middleline").style.background = borders;
document.getElementById("intriangle").style.border = "1px solid " + borders;
document.getElementById("intriangle").style.background = envelope;
document.getElementById("intriangle2").style.border = "1px solid " + borders;
document.getElementById("intriangle2").style.background = paper;
document.getElementById("whitecover").style.background = paper;
document.getElementById("whitecover").style.borderRight = "1px solid " + borders;
document.getElementById("whitecover").style.borderLeft = "1px solid " + borders;
document.getElementById("outtriangle").style.border = "1px solid " + borders;
document.getElementById("outtriangle").style.background = envelope;
document.getElementById("paper").style.border = "1px solid " + borders;
document.getElementById("paper").style.background = paper;
var i=0;
for (i=0; i < 19; i++){
document.getElementsByClassName("bigpaperline")[i].style.background = paperlines;
}
document.getElementsByClassName("paperline")[0].style.background = paperlines;
document.getElementsByClassName("paperline")[1].style.background = paperlines;
document.getElementsByClassName("paperline")[2].style.background = paperlines;
}

function cod() {
var sfont = "#" + document.getElementById("fontf").value;
var sborders = "#" + document.getElementById("bordersf").value;
var senvelope = "#" + document.getElementById("envelopef").value;
var spaper = "#" + document.getElementById("paperf").value;
var spaperlines = "#" + document.getElementById("paperlinesf").value;
var sshadow = "#" + document.getElementById("shadowf").value;
var slettertext = document.getElementById("textf").value;
document.getElementById("stylecode").innerHTML = "#mailboxcage &lcub; position:fixed; bottom:22px; left:32px; z-index:9999999;  height:82px; width:62px; display:block; &rcub;" + "<br /><br />" + "#mailbox &lcub; cursor:pointer; &rcub;" + "<br /><br />" + "#envelope &lcub; position:absolute; width:60px; height:80px; background:" + senvelope + "; border-left:1px solid " + sborders + "; border-right:1px solid " + sborders + "; border-bottom:1px solid " + sborders + "; border-top:1px solid " + sborders + "; -webkit-border-radius:4px; -moz-border-radius:4px; border-radius:4px; overflow:hidden; box-shadow:4px 4px 1px " + sshadow + "; z-index:10; &rcub;" + "<br /><br />" + "#middleline &lcub; height:80px; width:1px; background:" + sborders + "; position:absolute; margin:0px 0px 0px 29px; opacity:0.5; &rcub;" + "<br /><br />" + "#intriangle &lcub; position:absolute; width:60px; height:60px; border:1px solid " + sborders + "; -webkit-border-radius:15px; -moz-border-radius:15px; border-radius:15px; background:" + senvelope + "; margin:-39px 0px 0px -1px; 	-ms-transform:rotate(45deg); -webkit-transform:rotate(45deg); transform:rotate(45deg); &rcub;" + "<br /><br />" + "#outtriangle &lcub; position:absolute; margin:-20px 0px 0px 5px; width:50px; height:50px; border:1px solid " + sborders + "; -webkit-border-radius:15px; -moz-border-radius:15px; border-radius:15px; background:" + senvelope + "; -ms-transform:rotate(45deg); -webkit-transform:rotate(45deg); transform:rotate(45deg); z-index:8; opacity:0; &rcub;" + "<br /><br />" + "#paper &lcub; position:absolute; z-index:9; margin:-15px 0px 0px 0px; width:60px; height:40px; border:1px solid " + sborders + "; background:" + spaper + "; -webkit-border-radius:3px; -moz-border-radius:3px; border-radius:3px; opacity:0; overflow:hidden; &rcub;" + "<br /><br />" + ".paperline &lcub; width:40px; height:1px; background:" + spaperlines + "; margin:4px 0px -2px 10px; &rcub;" + "<br /><br />" + "#bigpapercontainer &lcub; position:absolute; margin:-125px 0px 0px 100px; opacity:0; transition:all 0.5s ease-in-out; &rcub;" + "<br /><br />" + "#bigpaper &lcub; border:1px solid " + sborders + "; background:" + spaper + "; -webkit-border-radius:4px; -moz-border-radius:4px; border-radius:4px; box-shadow:4px 4px 1px " + sshadow + "; overflow:hidden; width:120px; height:160px; &rcub;" + "<br /><br />" + "#bigpapertext &lcub; position:absolute; z-index:11; margin:5px 0px 0px 10px; font-family:arial; font-size:10px; line-height:13px; overflow:hidden; color:" + sfont + "; width:100px; height:140px; &rcub;" + "<br /><br />" + ".bigpaperline &lcub; width:120px; height:1px; background:" + spaperlines + "; margin-top:7px; &rcub;" + "<br /><br />" + "#coverletter &lcub; position:absolute; width:130px; height:170px; margin:-125px 0px 0px 100px; opacity:0; &rcub;" + "<br /><br />" + "#mailbox:hover #outtriangle &lcub; opacity:1; &rcub;" + "<br /><br />" + "#mailbox:hover #intriangle &lcub; background:" + spaper + "; margin:-43px 0px 0px -1px; border-radius:20px; &rcub;" + "<br /><br />" + "#mailbox:hover #envelope &lcub; border-top:1px solid " + spaper + "; &rcub;" + "<br /><br />" + "#mailbox:hover #paper &lcub; opacity:1; &rcub;" + "<br /><br />" + "#mailbox:hover #bigpapercontainer &lcub; opacity:1; margin:-130px 0px 0px 100px; &rcub;";

document.getElementById("bodycode").innerHTML = "&lt;div id&equals;&quot;mailboxcage&quot;&gt;" + "<br />" + "&lt;div id&equals;&quot;mailbox&quot;&gt;" + "<br />" + "&lt;div id&equals;&quot;envelope&quot;&gt;" + "<br />" + "&lt;div id&equals;&quot;middleline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div id&equals;&quot;intriangle&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;&sol;div&gt;" + "<br />" + "&lt;div id&equals;&quot;outtriangle&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div id&equals;&quot;paper&quot;&gt;" + "<br />" + "&lt;div class&equals;&quot;paperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;paperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;paperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;&sol;div&gt;" + "<br />" + "&lt;div id&equals;&quot;bigpapercontainer&quot;&gt;" + "<br />" + "&lt;div id&equals;&quot;bigpaper&quot;&gt;" + "<br />" + "&lt;div id&equals;&quot;bigpapertext&quot;&gt;" + slettertext + "&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;div class&equals;&quot;bigpaperline&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;&sol;div&gt;" + "<br />" + "&lt;&sol;div&gt;" + "<br />" + "&lt;&sol;div&gt;" + "<br />" + "&lt;div id&equals;&quot;coverletter&quot;&gt;&lt;&sol;div&gt;" + "<br />" + "&lt;&sol;div&gt;";
}

function SelectText(element) {
var doc = document, text = doc.getElementById(element), range, selection;    
if (doc.body.createTextRange) {
range = document.body.createTextRange();
range.moveToElementText(text);
range.select();
} 
else if (window.getSelection) {
selection = window.getSelection();        
range = document.createRange();
range.selectNodeContents(text);
selection.removeAllRanges();
selection.addRange(range);
}
}

document.onclick = function(e) {    
if (e.target.id === 'stylecode') {
SelectText('stylecode');
}
else if (e.target.id === 'bodycode') {
SelectText('bodycode');
}
};
