// ==UserScript==
// @name         AO3CB
// @namespace    https://github.com/niconicosette/re/ao3-comment-blocker
// @version      0.1
// @description  hide content of comments from blocked users on AO3
// @author       niconicosette
// @include      https://archiveofourown.org
// @include      https://archiveofourown.org/*
// @grant        none
// ==/UserScript==

(function() {
/*

- - - - - - HOW TO USE - - - - - -

this script hides the content of comments from blocked users,
so you can delete their comments without having to read them.
it'll hide the comments from your blocked users on the homepage
feed, inbox, unreviewed comment pages, and the comment sections
on works. please keep reading for instructions on how to enter
the usernames you want to block.

below this comment section you'll find a list with 20 x marks
inside quotations. to block a user, just replace one of the x
inside quotation marks with their username. keep in mind that
usernames are case sensitive. for example, if you wanted to
block the users LittleForest6 and bad70s_rock, and you wanted
to block a user's pseud, Meninist (bad70s_rock), your list
would look like this:

const x9wkxL = ["LittleForest6","bad70s_rock","Meninist (bad70s_rock)","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"];

you can edit the real list below

*/




const x9wkxL = ["x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x","x"];





/*

done. no need to edit anything else below this line. to make full
use of this script, you can log out of ao3 on your phone and also
disable comment notification emails in your ao3 preferences
(dashboard > preferences > comments > turn off emails about comments)

please note that if you're looking to block an anonymous commenter,
you should go into your ao3 preferences and disable anonymous commenting.

*/




var xacomlist = document.getElementsByTagName("a");
var xcomid; var xbqlist; var xcommentinid; var xfeedbackinid; var xatxtcnt;

xblockusercomment();

function xblockusercomment() {
    function xgetblocks() {
        xbqlist = document.getElementById(xcomid).getElementsByTagName("blockquote");
        xbqlist[0].innerHTML = "<p><i>This comment is hidden because this user is blocked.</i></p>";
    }
    for (var i = 0; i < xacomlist.length; i++) {
        xatxtcnt = xacomlist[i].textContent;
        if (x9wkxL.includes(xatxtcnt)) {
            xcomid = xacomlist[i].parentNode.parentNode.id;
            xcommentinid = xcomid.slice(0, 7);
            xfeedbackinid = xcomid.slice(0, 8);
            if (xcommentinid == "comment") {
                xgetblocks();
            }
            else if (xfeedbackinid == "feedback") {
                xgetblocks();
            }
        }
    }
}

var xcmplcnt1; var xcmplcnt2; var xcommentpaglist; var xcommentpaglist2; var xcommentpaglist3;

if (document.getElementById("show_comments_link")) {
    xcmplcnt1 = document.getElementById("comments_placeholder").innerHTML;
    document.getElementById("show_comments_link").addEventListener("click", x39879345);
    document.getElementById("show_comments_link_top").addEventListener("click", x39879345);
}

if (document.getElementById("comments_placeholder") && document.getElementById("comments_placeholder").offsetHeight > 0) {
    xaddblanks776();
}

function x39879345() {
   xcmplcnt2 = document.getElementById("comments_placeholder").innerHTML;
   if ( xcmplcnt2 != xcmplcnt1 ) {
       xblockusercomment();
       xaddblanks776();
   } else {
     setTimeout(x39879345, 15);
   }
}

function xaddblanks776() {
    xcommentpaglist = document.getElementById("comments_placeholder").getElementsByClassName("pagination");
    xcommentpaglist2 = xcommentpaglist[0].getElementsByTagName("a");
    xcommentpaglist3 = xcommentpaglist[1].getElementsByTagName("a");

    for (var s = 0; s < xcommentpaglist2.length; s++) {
        xcommentpaglist2[s].setAttribute("target", "_blank");
    }

    for (var f = 0; f < xcommentpaglist3.length; f++) {
        xcommentpaglist3[f].setAttribute("target", "_blank");
    }
}

})();
