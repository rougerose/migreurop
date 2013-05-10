$(window).load(function(){
   // ======================================
   // = Menu principal en version dropdown =
   // ======================================
   $("#nav-principale .nav").each(function(){
      var $items = $(this).children(".nav__item"),
      $haschild = $items.children(".nav--dropdown"),
      $ul_child = $haschild.filter("ul");

      //$ul_child.before('<span class="open s s--dd" />');
      $haschild.before('<span class="sprite sprite--dropdown" />');
      var $opens = $items.children("span");

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

   // ========================================
   // = navigation plan rubrique : animation =
   // ========================================
   /*$("#np").each(function(){
      var np = $(this),
      h1 = np.children("h1"),
      ul = np.children("ul").hide();
      np.click(function(){
         h1.toggleClass("on");
         ul.slideToggle("slow");
      });
   });*/

   // ==============================================
   // = logo en ouverture page (rubrique, article) =
   // ==============================================
   if ($(".carousel-ouverture,.media-ouverture").length){
      $("body").children("header[role='banner']").addClass("ouverture");
   }

   // =========================
   // = easytabs : activation =
   // =========================
   $('#tabs-rubrique-principal').easytabs();

   // =============
   // = recherche =
   // =============
   $(".nav__item.search .action").click(function(){
      $("#formulaire_recherche").slideToggle("fast","swing");
      $(this).toggleClass("sprite--search-is-active");
   });

   // ==============
   // = flexslider =
   // ==============
   $('.flexslider').flexslider({
     animation: "slide",
     slideshow: false,
     start: function(slider){
       $('body').removeClass('loading');
     }
   });

});


