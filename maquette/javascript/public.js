$(document).ready(function(){
	/**
	 * Grille de mise en page ajoutée aux boutons d'administration de spip
	 */
	$("#conteneur").append("<div id='spip-admin' class='spip-admin-float'><a id='grille' class='spip-admin-boutons' href='#'>Grille</a></div>");
	$("#grille").click(function(){
		$(".container_24").toggleClass("grille");
	});

	/**
	* Animation du bloc Recherche
	*/
	$("#recherche").each(function(){
		var $recherche = $(this),
			$slide = $recherche.find("form")
			compteur = 0;
		$slide.after('<p class="icone-recherche">recherche</p>');
		var $bouton = $recherche.find(".icone-recherche");

		$slide.hide();
		$bouton.hover(
			function(){
				$(this).stop().animate({ bottom: '-37px' }, "slow");
			},
			function(){
				if ($(this).hasClass("on")) { return false; }
				else {
					$(this).stop().animate({ bottom: '-29px'}, "slow");
				}

			}
		);
		 $bouton.click(function(){
			$(this).addClass("on").animate({bottom: '-37px'},'slow');
			compteur++;
			$slide.slideToggle("slow", function(){
				if (compteur %2 == 0) {
					$bouton.removeClass("on").stop().animate({bottom: '-29px'}, "slow");
				 }
				else {$bouton.stop().animate({bottom: '-37px'},"fast").addClass("on");}
			});
			$recherche.toggleClass("on");
		});
	});


	/**
	 * Slider
	 * script est un mix entre deux sources principales :
	 * http://jqueryfordesigners.com/coda-slider-effect/
	 * et
	 * http://jqueryfordesigners.com/jquery-infinite-carousel/
	 */

	$(".slider").each(function(){
		var slider = $(this),
			scroll = slider.find("> .scroll"),
			conteneur = scroll.find("> .scrollConteneur"),
			panneaux = conteneur.find("> .panneau"),
			pages = panneaux.length,
			nav = slider.find(".sliderNav a"),
			pageCourante = 1,
			p = 1,
			panneauLargeur = panneaux.outerWidth(),
			horizontal = true,
			delai = 700;

		// pas de barre défilement sur le div.scroll
		scroll.css("overflow","hidden");


		// défilement horizontal du slider
		if (horizontal) {
			panneaux.css({ 'float': 'left', 'position' : 'relative' });
			conteneur.css('width', panneauLargeur * pages);
		}

		// hauteur du premier panneau
		var panneauHauteur = panneaux.eq((pageCourante - 1)).outerHeight(true);

		// premier bouton de la navigation sélectionné
		nav.eq(0).addClass("actif");

		// boutons de navigation gauche et droite
		// et application de la hauteur du premier panneau
		scroll
			.before('<span id="sbg" class="scrollBouton gauche">&nbsp;</span>')
			.after('<span id="sbd" class="scrollBouton droite">&nbsp;</span>')
			.css({ height:panneauHauteur });

		if (slider.hasClass("sizeS")) {
			
		}

		// ajustement du positionnement en hauteur des boutons de navigation
	//	$("span.scrollBouton").css({ top: Math.round(panneauHauteur/2) })

		// navigation via les boutons
		$('span.scrollBouton.gauche', this).click(function () {
			p--; if (p < 1) p = pages;
			var el = nav.eq(p-1); selectNav.call(el);
			return gotoPage(pageCourante - 1);
		});
		$('span.scrollBouton.droite', this).click(function () {
			p++; if (p > pages) p = 1;
			var el = nav.eq(p-1); selectNav.call(el);
			return gotoPage(pageCourante + 1);
		});

		function gotoPage(page) {
			var dir = page < pageCourante ? -1 : 1,
				n = Math.abs(pageCourante - page),
				left = panneauLargeur * dir * n;

			if (page < 1) {
				left = Math.abs(left*pages);
				page = pages;
			} else if (page > pages) {
				left = - (panneauLargeur * pages);
				page = 1;
			}
			p = page;
			pageCourante = page;

			// modification de la hauteur du scroll en fonction de celle du panneau affiché
			var hauteurPanneau = panneaux.eq(pageCourante-1).outerHeight(true);

			scroll.animate({
				scrollLeft: '+=' + left,
				height: hauteurPanneau
			},delai);
		}

		nav.each(function (a) {
			$(this).bind("click",function(){
				selectNav.call($(this));
				gotoPage(a + 1);
			});
		});

		function selectNav () {
			$(this)
				.parents("ul")
					.find("a")
						.removeClass("actif")
					.end()
				.end()
			.addClass("actif");
		}

		// l'url comporte un hash, on affiche l'œuvre directement
		if (window.location.hash) {
			var afficher = '[hash=' + window.location.hash + ']';
			$("#slider .sliderNav a").filter(afficher).click();
		}
	});

	/**
	* Jquery UI tabs
	*/
	$(".tabBox").tabs();



	/**
	* Menu drop-down de la navigation principale
	*/

	$("#nav").each(function(){
		var $nav = $(this),
			$dropdown = $nav.find("li > .ddm");
			$li = $dropdown.parent("li")
			// easing plugin
			easingDown = "easeOutBounce", easingUp = "jswing";

		$li.append("<span/>"); // $dropdown.filter(":first").show();

		var $span = $li.find("> span").addClass("closed").hide();

		$li.hover(
			function(){$(this).find(">span").show();}
			,
			function(){$(this).find(">span").hide();}
		);

		$span.click(function(){
			// premier clic sur le span
			if ($(this).hasClass("closed")) {
				$(this).removeClass().addClass("opened")
					.parent().find(".ddm").stop().slideDown(800,easingDown).show();
				$(this).parent().hover(
					function(){}
					,
					function(){
						$(this).find(".ddm").stop().slideUp(500,easingUp);
						$(this).find(">span").removeClass("opened").addClass("closed");
					}
				);
			}
			// second clic sur le span déjà ouvert
			else {
				$(this).removeClass("opened").addClass("closed")
					.parent().find(".ddm").stop().slideUp(500,easingUp);
			}
		});
	});
});

