// ===================
// = Plugin Carousel =
// ===================
$.fn.carousel = function(){
   return this.each(function(){
      var carousel = $(this),
      langue = carousel.attr("lang"),
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
         ouverture = true;
      }

      if (pages > 1) {
         // navigation précédent/suivant
         carousel.append('<ul class="nav prevnext"><li><a class="previous s" /></li><li><a class="next s" /></li></ul>');
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
            action = $('<span class="s s--north" />'),
            wrapH = wrap.height(),
            headerH = header.height() + 24,
            masque = wrapH - headerH - 24;
            header.prepend(action);
            wrap.css({bottom:-masque});
            calque.hover(
               function(){
                  wrap.stop().animate({bottom: 0},500);
                  action.removeClass("s--north").addClass("s--south");
               },
               function(){
                  wrap.stop().animate({bottom:-masque},500);
                  action.removeClass("s--south").addClass("s--north");
               }
            );
         });
      }

      // animation de la légende image dans portfolio
      if (carousel.hasClass("carousel-portfolio")) {
         var figures = items.children("figure"), images = figures.children("img"), captions = figures.children("figcaption");
         captions.each(function(){
            var caption = $(this), h = caption.outerHeight();
            caption.css({top:-h});
            images.hover(
               function(){
                  caption.stop().animate({top: 0},500);
               },
               function(){
                  caption.stop().animate({top: -h},500);
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

   // ============
   // = Carousel =
   // ============
   $(".carousel").carousel();

   // ========================================
   // = navigation plan rubrique : animation =
   // ========================================
   $("#np").each(function(){
      var np = $(this),
      h1 = np.children("h1"),
      ul = np.children("ul").hide();
      np.click(function(){
         h1.toggleClass("on");
         ul.slideToggle("slow");
      });
   });

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
});


