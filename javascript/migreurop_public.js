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
      p = 1,
      ouverture = false;

      // ajustement de la taille du conteneur et des items. en % pour rester en adaptatif
      conteneur.css('width', 100 * pages + '%');
      items.css('width', itemWidth + '%');

      if (carousel.hasClass("carousel-ouverture")) {
         header.addClass("ouverture");
         ouverture = true;
      }

      if (pages > 1) {
         // navigation précédent/suivant
         carousel.append('<ul class="nav prevnext"><li><a class="previous" /></li><li><a class="next" /></li></ul>');
         var nav_pn = carousel.children(".prevnext");
         // chaîne de langue pour navigation précédent/suivant
         $.getJSON('plugins/migreurop/lang/migreurop.json', function(data) {
            $.each(data, function (index, value) {
               if (langue === index) {
                  nav_pn.children()
                     .children("a.previous").text(value.prv)
                  .end()
                     .children("a.next").text(value.nxt);
               }
            });
         });

         // navigation par page
         carousel.append('<ol class="nav pages" />');
         var nav_pages = carousel.children(".pages"), str = '', n = 1;
         for(var i=0; i < pages; i++){
             str += '<li><a>' + n + '</a></li>';
             n++;
         }

         nav_pages.append(str);
         var nav_pages_liens = nav_pages.find("> li > a");
         nav_pages_liens.eq(0).addClass("active");

         nav_pages_liens.each(function (a) {
            $(this).bind("click",function(){
               if ($(this).hasClass("active")) {return false;}
               selectDefilement.call($(this));
               gotoPage(a + 1);
            });
         });


         // navigation via les boutons
         $('.prevnext > li > a.previous', this).click(function () {
            p--; if (p < 1) {p = pages;}
            var el = nav_pages_liens.eq(p - 1); selectDefilement.call(el);
            return gotoPage(pageCourante - 1);
         });
         $('.prevnext > li > a.next', this).click(function () {
            p++; if (p > pages) {p = 1;}
            var el = nav_pages_liens.eq(p-1); selectDefilement.call(el);
            return gotoPage(pageCourante + 1);
         });
      }

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

      // defilement des pages
      function selectDefilement () {
         nav_pages_liens.removeClass('active');
         $(this).addClass("active");
      }

      function gotoPage(page) {
         var dir = page < pageCourante ? 1 : -1,
         n = Math.abs(pageCourante - page),
         valeur = dir * 100 * n;
         if (page === 0) {
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
   $(".carousel").carousel();

   // ==========================================
   // = Image en ouverture (rubrique, article) =
   // ==========================================
   if ($("#ouverture").length) {
      $("body").children("header[role='banner']").addClass("ouverture");
   }

   // ========================================
   // = navigation plan rubrique : animation =
   // ========================================
   $("#np").each(function(){
      var np = $(this),
      ul = np.children("ul").hide();
      np.click(function(){
         $(this).toggleClass("open");
         ul.slideToggle("slow");
      });
   });

   // =========================
   // = easytabs : activation =
   // =========================
   $('#tabs-rubrique-principal').easytabs();
});


