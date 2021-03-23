<?php
/**
 * Plugin Name: Calendar Widget
 * Description: Calendar Widget
 * Author: IMAD ABOULHOUDA
 */





 function registerCssAndJs()
 {
     //Register Css
     wp_enqueue_style('fontMontserrat', 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,700,800&#038;display=swap', null);
     wp_enqueue_style('calendar-css', plugins_url()."/calendarWidget/css/app.css", null);
     //register Javascript
     wp_enqueue_script('calendar-widget', plugins_url()."/calendarWidget/js/helper.js", ['jquery'], "1.0", true);
     wp_enqueue_script('calendar-widget-app', plugins_url()."/calendarWidget/js/app.js", ['jquery'], "1.0", true);
 }

 add_action('wp_enqueue_scripts', 'registerCssAndJs');

 function createPageDynamique($template)
 {

     //global $wp;
     $pagename = get_query_var('pagename');
     if ($pagename === 'imadox') {
         add_filter('wp_title', function ($title) {
             return "Simulateur";
         }, 20);

         $template = __DIR__."/template/a.php";
     }

     return $template;
 }
 add_action('template_include', 'createPageDynamique');
