<?php
   if (!defined("_ECRIRE_INC_VERSION")) return;

   // javascript
   function migreurop_insert_head($flux){
      $js = array(
         'javascript/jquery.hashchange.min.js',
         'javascript/jquery.easytabs.min.js',
         'javascript/migreurop_public.js'
      );
      foreach ($js as $f) {
         $flux .= '<script src="'.find_in_path($f).'" type="text/javascript"></script>'."\n";
      }
      return $flux;
   }

   // css
   function migreurop_insert_head_css($flux) {
      $flux .= "<link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700,400italic,700italic|PT+Sans+Narrow' rel='stylesheet' type='text/css'>\n";
      $css = find_in_path('css/migreurop.css');
      if ($css) {
         $flux .= "<link rel='stylesheet' href='$css'>\n";
      }
      return $flux;
   }

?>