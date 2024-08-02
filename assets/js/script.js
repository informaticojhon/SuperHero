/*
Settings lightbox
*/
lightbox.option({
    resizeDuration: 200,
    wrapAround: true,
    fadeDuration: 100,
  }); 
  $(function () {
    $(".wrapper_menu_hamburguesa").click(function () {
      $(".hamburger").toggleClass("is-active");
      $(".backdrop_menu_lateral").toggleClass("is-active");
    });
    $(".backdrop_menu_lateral").click(function () {
      $(".hamburger").trigger("click");
    });
  });
  