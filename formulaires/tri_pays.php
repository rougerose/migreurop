<?php

   if (!defined('_ECRIRE_INC_VERSION')) return;
   function formulaires_tri_pays_charger($url_resultat = null,$id_rubrique=null) {
      return array(
         'mots'=>_request('mots'),
         'id_rubrique' => _request($id_rubrique)
      );
   }
   function formulaires_tri_pays_verifier($url_resultat = null,$id_rubrique=null) {

   }
   function formulaires_tri_pays_traiter($url_resultat = null,$id_rubrique=null) {
      if (!$url_resultat) {$url_resultat = self();}
      // Nettoyer l'URL des mots[] qu'elle contiendrait deja
      $url_resultat = parametre_url($url_resultat,'mots','');
      // Mettre dans l'URL
      $url_resultat = parametre_url($url_resultat,'mots',array_unique(_request('mots')));
      $url_resultat = ancre_url($url_resultat, _request('ancre'));
      return array('redirect' => $url_resultat);
   }

?>