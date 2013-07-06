<?php

if (!defined('_ECRIRE_INC_VERSION')) return;

function formulaires_select_nav_charger_dist($class='') {
   $valeurs = array(
      'class' => $class,
      'rubrique' => _request('rubrique')
   );
   return $valeurs;

}

function formulaires_select_nav_verifier_dist() {

}

function formulaires_select_nav_traiter_dist() {
   $id_rubrique = _request('rubrique');
   if ($id_rubrique == 'home') {
      $url = url_de_base();
   }
   else {
      $url = 'rubrique'.$id_rubrique.'.html';
   }
   return array('redirect' => $url);
}

?>