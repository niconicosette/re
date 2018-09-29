// live preview color function

var color;
function changecolor() {
    color = document.getElementById("playercolor").value;
    document.getElementById("xtrackname").style.color = "#" + color;
    document.getElementById("pbar1").style.background = "#" + color;
    document.getElementById("pbar2").style.background = "#" + color;
    document.getElementById("xplay").style.borderLeft = "6px solid " + "#" + color;
    document.getElementById("sk1").style.borderLeft = "4px solid " + "#" + color;
    document.getElementById("sk2").style.borderLeft = "4px solid " + "#" + color;
}

// turn autoplay on or off function

var autos = "off";
function auto() {
    if ( autos == "off" ) {
        autos = "on";
        document.getElementById("abutton").style.background = "#10C48E";
        document.getElementById("abutton").value = "autoplay is on";
    }
    else if ( autos == "on" ) {
        autos = "off";
        document.getElementById("abutton").style.background = "#ED4C57";
        document.getElementById("abutton").value = "autoplay is off";
    }
    else {}
}

// generate user code function

function generate() {

    // hide customisation interface and show codebox

    document.getElementById("cinterface").style.display = "none";
    document.getElementById("codebox").style.display = "block";
    document.getElementById("infobox").style.textAlign = "center";
    document.getElementById("infobox").innerHTML = "Copy and paste the code below into your blog or website html!"

    // declare variables for xlittleplayerinfo and xlittleplayernames spans

    var oneinfo = "#" + color + " " + autos + " ";
    var twoinfo = "0,0,";

    // add spaces after valid urls and commas after valid titles in form

    var aa, bb, cc, dd, i;

    for (i=1; i < 10; i++) {
        aa = "trackurl" + i;
        cc = "trackname" + i;
        bb = document.getElementById(aa);
        dd = document.getElementById(cc);
        if ( bb.value != "" ) {
            bb.value += " ";
            oneinfo += bb.value;
        }
        if ( dd.value != "" ) {
            dd.value += ",";
            twoinfo += dd.value;
        }
    }

    (function() {

        // delete the last index in info strings so they don't end in space or comma

        var oneinfolength = oneinfo.length - 1;
        var oneinfonew = oneinfo.slice(0,oneinfolength);
        var twoinfolength = twoinfo.length - 1;
        var twoinfonew = twoinfo.slice(0,twoinfolength);

        // generate user code in textarea

        document.getElementById("codebox").innerHTML = "&lt;script src&equals;&quot;https://niconicosette.github.io/re/littlered-music-player/littleredplayer.js&quot;&gt;&lt;&sol;script&gt;&lt;div id&equals;&quot;xlittleplayer&quot;&gt;&lt;span id&equals;&quot;xlittleplayerinfo&quot; style&equals;&quot;display:none;&quot;&gt;" + oneinfonew + "&lt;&sol;span&gt;&lt;span id&equals;&quot;xlittleplayernames&quot; style&equals;&quot;display:none;&quot;&gt;" + twoinfonew + "&lt;&sol;span&gt;&lt;&sol;div&gt;";

    })();
}
