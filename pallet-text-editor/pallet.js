$('html').hide();
$(window).load(function(){
$('#cover').css('display', 'block');
$('html').show();
$('#cover').delay(150).fadeOut(700);
});