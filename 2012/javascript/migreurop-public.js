//
//  migreurop-public.js
//  www.migreurop.org
//
//  Created on April 2012.
//

$(document).ready(function() {

   // ==================
   // = Menu principal =
   // ==================
   $("#nav").each(function(){
      var $niveau0 = $(this).find("ul.menu-principal > li"),
         $panneaux = $niveau0.find("> div.panneau");

         $niveau0.has("div.panneau").addClass("dropdown").children("a").after('<span class="arrow" />');
   });


   // ==========
   // = Slider =
   // ==========

   $(".slider").each(function(){
      var slider   = $(this),
      fenetre      = slider.find("> .fenetre"),
      scroll       = fenetre.find("> .scroll"),
      items        = scroll.find("> .item"),
      pages        = items.length,
      pagination   = slider.find(".slider-pagination li"),
      pageCourante = 1,
      p            = 1,
      itemsLargeur = items.outerWidth(),
      horizontal   = true,
      delai        = 700;

      // pas de barre défilement sur le div.fenetre
      // fenetre.css("overflow","hidden");

      // défilement horizontal du slider
      if (horizontal) {
         items.css({ 'float': 'left', 'position' : 'relative' });
         scroll.css('width', itemsLargeur * pages);
      }

      // hauteur du premier item
      //var itemsHauteur = items.eq((pageCourante - 1)).outerHeight(true);

      // premier bouton de la navigation sélectionné
      pagination.eq(0).addClass("on");

      // boutons de defilement gauche et droite
      // et application de la hauteur du premier item
      fenetre.before('<span class="defilement gauche none">&nbsp;</span>')
            .after('<span class="defilement droite none">&nbsp;</span>');
            //.css({ height:itemsHauteur });


      // ajustement du positionnement en hauteur des boutons de navigation
      //	$("span.scrollBouton").css({ top: Math.round(panneauHauteur/2) })

      // navigation via les boutons
      $('span.defilement.gauche', this).click(function () {
         p--; if (p < 1) p = pages;
         var el = pagination.eq(p - 1); selectDefilement.call(el);
         return gotoPage(pageCourante - 1);
      });
      $('span.defilement.droite', this).click(function () {
         p++; if (p > pages) p = 1;
         var el = pagination.eq(p-1); selectDefilement.call(el);
         return gotoPage(pageCourante + 1);
      });

      function gotoPage(page) {
         var dir = page < pageCourante ? -1 : 1,
         n = Math.abs(pageCourante - page),
         left = itemsLargeur * dir * n;

         if (page < 1) {
            left = Math.abs(left*pages);
            page = pages;
         } else if (page > pages) {
            left = - (itemsLargeur * pages);
            page = 1;
         }
         p = page;
         pageCourante = page;

         // modification de la hauteur du scroll en fonction de celle du panneau affiché

         var itemsHauteur = items.eq(pageCourante-1).outerHeight(true);

         fenetre.animate({
            scrollLeft: '+=' + left//, height: itemsHauteur
         },delai);
      }

      pagination.each(function (a) {
         $(this).bind("click",function(){
            selectDefilement.call($(this));
            gotoPage(a + 1);
         });
      });

      function selectDefilement () {
         $(this)
         .parents("ul")
            .find("li")
               .removeClass("on")
               .end()
            .end()
         .addClass("on");
      }

      // l'url comporte un hash, on affiche l'œuvre directement
      if (window.location.hash) {
         var afficher = '[hash=' + window.location.hash + ']';
         $(".slider .slider-pagination a").filter(afficher).click();
      }

      // slider sommaire = grand format
      if (slider.hasClass('sommaire')) {
         var contenuArt   = $(this).find(".contenu-article");
         // positionnement du contenu de l'article
         contenuArt.each(function(){
            var   contenuTitre = $(this).find("> h2"),
                  hauteurBloc = $(this).outerHeight(true),
                  hauteurTitre = contenuTitre.outerHeight(true),
                  hauteurDepart = hauteurBloc - hauteurTitre - 20, // 20 padding-top
                  $action = $('<span class="action" />');

            $(this).css({ bottom: -hauteurDepart }).prepend($action);

            // affichage
            $(this).hover(
               function(){
                  $(this).stop().animate({bottom: 0}, 500);
                  $action.toggleClass("ouvert");
               },
               function(){
                  $(this).stop().animate({bottom: -hauteurDepart}, 500);
                  $action.toggleClass("ouvert");
               }
            );
         });
      }
   });
});
