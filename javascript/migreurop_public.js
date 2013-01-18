// ===================
// = Plugin Carousel =
// ===================
$.fn.carousel = function(){
   return this.each(function(){
      var carousel = $(this),
      conteneur = carousel.children(".panels");
      //console.log(conteneur);
   });
};

$(document).ready(function(){
   // ======================================
   // = Menu principal en version dropdown =
   // ======================================
   $("#barrenav .nav").each(function(){
      var $items = $(this).children(".item"),
      $haschild = $items.children("ul").before('<span class="ouvrir" />').parent().addClass("haschild"),
      $ouvrir = $haschild.children("span"),
      $dropdown = $items.children("ul");

      function ouvrir_dropdown(){
         var index = $ouvrir.index(this),
         dd = $dropdown.eq(index);
         if (dd.is(".active")) {
            $(this).removeClass("active");
            dd.removeClass("active");
            return false;
         }
         $dropdown.removeClass("active");
         $ouvrir.removeClass("active");
         $(this).addClass("active");
         dd.addClass('active');
         return false;
      }
      $ouvrir.click(ouvrir_dropdown);
      // fermer le menu dropdown éventuellement ouvert lors d'un clic dans la page
      $("html").click(function(){$dropdown.removeClass("active");});
   });

});


