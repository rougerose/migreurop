$(window).load(function(){
   // ======================================
   // = Menu principal en version dropdown =
   // ======================================
   $("#nav-principale .desk-nav").each(function(){
      var $items = $(this).children(".nav__item"),
      $haschild = $items.find(".nav--dropdown");

      $haschild.before('<span class="sprite sprite--dropdown" />');
      var $opens = $items.children("span");
      console.log($opens);

      function open_dropdown(){
         var index = $opens.index(this),
         dd = $haschild.eq(index);
         if (dd.is(".active")) {
            $(this).removeClass("active");
            dd.removeClass("active");
            return false;
         }
         $haschild.removeClass("active");
         $opens.removeClass("active");
         $(this).addClass("active");
         dd.addClass("active");
         return false;
      }

      $opens.click(open_dropdown);
      $("html").click(function(){$haschild.removeClass("active"); $opens.removeClass("active");});
   });
   // ============================
   // = Menu principal en select =
   // ============================
   $("#formulaire_select_nav form select").change(function() {
      $(this).closest("form").submit();
   });
   // ==============================================
   // = logo en ouverture page (rubrique, article) =
   // ==============================================
   if ($(".carousel-ouverture,.media-ouverture").length){
      $("body").children("header[role='banner']").addClass("ouverture");
   }
   // =============
   // = recherche =
   // =============
   $(".nav__item.search .action").click(function(){
      $("#formulaire_recherche").slideToggle("fast","swing");
      $(this).toggleClass("sprite--search-is-active");
   });
   // =========================
   // = easytabs : activation =
   // =========================
   $('.tabs').easytabs();
   // ==============
   // = flexslider =
   // ==============
   $('.flexslider').flexslider({
     animation: "slide",
     slideshow: false,
     start: function(slider){
       // $('body').removeClass('loading');
     }
   });
});


