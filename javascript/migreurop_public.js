// ===================
// = Plugin Carousel =
// ===================
$.fn.carousel = function(){
   return this.each(function(){
      var carousel = $(this),
      langue = carousel.attr("lang"),
      header = carousel.parents("body").children("header[role='banner']"),
      conteneur = carousel.children(".panels"),
      items = conteneur.children("li"),
      pages = items.length,
      itemWidth = 100 / pages,
      pageCourante = 1,
      ouverture = false;

      if (carousel.hasClass("carousel-ouverture")) {
         header.addClass("ouverture");
         ouverture = true;
      }

      // navigation précédent/suivant
      carousel.append('<ul class="nav prevnext"><li><a class="previous" /></li><li><a class="next" /></li></ul>');
      // chaîne de langue pour navigation précédent/suivant
      $.getJSON('plugins/migreurop/lang/migreurop.json', function(data) {
         $.each(data, function (index, value) {
            if (langue === index) {
               $(".prevnext > li")
                  .children("a.previous").text(value.prv)
               .end()
                  .children("a.next").text(value.nxt);
            }
         });
      });

      // ajustement de la taille du conteneur et des items. en % pour rester en adaptatif
      conteneur.css('width', 100 * pages + '%');
      items.css('width', itemWidth + '%');
      // defilement des pages
      function gotoPage(page) {
         var dir = page < pageCourante ? 1 : -1,
         valeur = dir * 100;
         if (page == 0) {
            valeur = -100 * (pages - 1);
            page = pages;
         }
         if (page > pages) {
            valeur = 100 * (pages - 1);
            page = 1;
         }
         pageCourante = page;
         conteneur.animate({left: '+=' + valeur + '%'},900);
      }
      // navigation via les boutons
      $('.prevnext > li > a.previous', this).click(function () {
         //p--;
         //if (p < 1) {p = pages;}
         //var el = pagination.eq(p - 1); selectDefilement.call(el);
         return gotoPage(pageCourante - 1);
      });
      $('.prevnext > li > a.next', this).click(function () {
         //p++;
         //if (p > pages) {p = 1;}
         //var el = pagination.eq(p-1); selectDefilement.call(el);
         return gotoPage(pageCourante + 1);
      });

      if (ouverture) {
         var wraps = items.find(".wrap");
         wraps.each(function(){
            var wrap = $(this),
            calque = wrap.find(".calque"),
            header = calque.children("header"),
            action = $('<span class="action" />'),
            wrapH = wrap.height(),
            headerH = header.height() + 24,
            masque = wrapH - headerH - 24;
            header.prepend(action);
            wrap.css({bottom:-masque});
            calque.hover(
               function(){
                  wrap.stop().animate({bottom: 0},500);
                  action.toggleClass("ouvert");
               },
               function(){
                  wrap.stop().animate({bottom:-masque},500);
                  action.toggleClass("ouvert");
               }
            );
         });
      }
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

   // ============
   // = Carousel =
   // ============
   //
   $(".carousel").carousel();
});


