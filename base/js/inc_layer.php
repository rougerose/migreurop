<?php
//
// Ce fichier ne sera execute qu'une fois
if (defined("_INC_LAYER")) return;
define("_INC_LAYER", "1");


//
// Le contenu de cette fonction est a mettre dans inc_version
//

function init_layer() {
	global $HTTP_USER_AGENT, $browser_name, $browser_version, $browser_description;
	ereg("^([A-Za-z]+)/([0-9]+\.[0-9]+) (.*)$", $HTTP_USER_AGENT, $match);
	$browser_name = $match[1];
	$browser_version = $match[2];
	$browser_description = $match[3];
	
	if (eregi("opera", $browser_description)) {
		eregi("Opera ([^\ ]*)", $browser_description, $match);
		$browser_name = "Opera";
		$browser_version = $match[1];
	}
	else if (eregi("msie", $browser_description)) {
		eregi("MSIE ([^;]*)", $browser_description, $match);
		$browser_name = "MSIE";
		$browser_version = $match[1];
	}

}

function test_layer(){
	global $browser_name, $browser_version, $browser_description;

	if (
	(eregi("msie", $browser_name) AND $browser_version >= 5)
	|| (eregi("mozilla", $browser_name) AND $browser_version >= 5)
	)
		return true;
}


function afficher_script_layer(){
	global $flag_ecrire;

	if (test_layer()){
		echo '<script type="text/javascript" src="base/js/layer.js">';
		echo "</script>\n";
	}
}


function debut_block_visible($nom_block){
	if (test_layer()){
		global $numero_block;
		global $compteur_block;

		if (!$numero_block["$nom_block"] > 0){
			$compteur_block++;
			$numero_block["$nom_block"] = $compteur_block;
		}
		$retour .= "<div id='Layer".$numero_block["$nom_block"]."' style='display: block;'>";
	}
	return $retour;
}

function debut_block_invisible($nom_block){
	if (test_layer()){
		global $numero_block;
		global $compteur_block;

		if (!$numero_block["$nom_block"] > 0){
			$compteur_block++;
			$numero_block["$nom_block"] = $compteur_block;
		}

		$retour = "\n<script type='text/javascript'><!--\n";
		$retour .= "vis['".$numero_block["$nom_block"]."'] = 'hide';\n";
		$retour .= "document.write('<div id=\"Layer".$numero_block["$nom_block"]."\" style=\"display: none; margin-top: 1;\">');\n";
		$retour .= "//-->\n";
		$retour .= "</script>\n";

		$retour .= "<noscript><div id='Layer".$numero_block["$nom_block"]."' style='display: block;'></noscript>\n";
	}
	return $retour;
}

function fin_block() {
	if (test_layer()) {
		return "</div>";
	}
}

function bouton_block_invisible($nom_block) {
	global $numero_block;
	global $compteur_block;
	global $spip_lang_rtl;

	$num_triangle = $compteur_block + 1;

	if (test_layer()) {
		$blocks = explode(",", $nom_block);

		for ($index=0; $index < count($blocks); $index ++){
			$nom_block = $blocks[$index];

			if (!$numero_block["$nom_block"] > 0){
				$compteur_block++;
				$numero_block["$nom_block"] = $compteur_block;
			}

			$javasc .= "swap_couche(\\'".$numero_block[$nom_block]."\\', \\'$spip_lang_rtl\\');";
		}
		$retour = "\n<script type='text/javascript'><!--\n";
		$retour .= "document.write('<a href=\"javascript:$javasc\"><img name=\"triangle$num_triangle\" src=\"base/images/menu-rubrique-haut.png\" alt=\"-\" title=\"".addslashes(_T('info_deplier'))."\" width=\"12\" height=\"14\" border=\"0\"></a> ');\n";
		$retour .= "//-->\n";
		$retour .= "</script>\n";

		$retour .= "<noscript><img name='triangle$num_triangle' src='base/images/menu-rubrique-bas.png' alt='-' width='12' height='14' border='0'></noscript>\n";
		return $retour;
	}
}

function bouton_block_visible($nom_block){
	global $spip_lang_rtl;
	if (test_layer()){
		global $numero_block;
		global $compteur_block;

		if (!$numero_block["$nom_block"] > 0){
			$compteur_block++;
			$numero_block["$nom_block"] = $compteur_block;
		}

		return "<a href=\"javascript:swap_couche('".$numero_block["$nom_block"]."', '$spip_lang_rtl')\"><IMG name='triangle".$numero_block["$nom_block"]."' src='base/images/menu-rubrique-bas.png' alt='-' title='".addslashes(_T('info_deplier'))."' width='12' height='14' border='0'></a> ";
	}
}

init_layer();

?>
