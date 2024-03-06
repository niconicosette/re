$(document).ready(function () {
  $("a").click(function () {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500
    );
    return false;
  });

  const date = new Date();
  let year = date.getFullYear();
  document.getElementById("current-year").innerHTML = year;
});
