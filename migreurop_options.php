<?php
   if (!defined("_ECRIRE_INC_VERSION")) return;

   // pas de cache pour la phase développement
   define('_NO_CACHE',1);

   $GLOBALS['debut_intertitre'] = "\n<h2 class='spip'>";
   $GLOBALS['fin_intertitre'] = "</h2>\n";

?>