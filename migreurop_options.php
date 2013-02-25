<?php
   if (!defined("_ECRIRE_INC_VERSION")) return;

   // bloc zcore : extra2 n'est pas utilisé, ajout de breadcrumb
   $GLOBALS['z_blocs'] = array('content','extra1','breadcrumb','head','head_js','header','footer');

   // pas de cache pour la phase développement
   define('_NO_CACHE',1);

   $GLOBALS['debut_intertitre'] = "\n<h2 class='spip'>";
   $GLOBALS['fin_intertitre'] = "</h2>\n";

?>