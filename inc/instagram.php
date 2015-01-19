<?php
include('keys.php');

error_reporting( 0 );

$user_id = "549060201";
$feed = "https://api.instagram.com/v1/users/".$user_id."/media/recent/?access_token=".$instagramToken;
$cache_file = dirname(__FILE__).'/cache/'.'instagram-cache';
$modified = filemtime( $cache_file );
$now = time();
$interval = 600; // ten minutes

// check the cache file
if ( !$modified || ( ( $now - $modified ) > $interval ) ) {
  $context = stream_context_create(array(
    'http' => array(
      'method'=>'GET',
      )
  ));
  
  $json = file_get_contents( $feed, false, $context );
  
  if ( $json ) {
    $cache_static = fopen( $cache_file, 'w' );
    fwrite( $cache_static, $json );
    fclose( $cache_static );
  }
}

header( 'Cache-Control: no-cache, must-revalidate' );
header( 'Expires: Mon, 26 Jul 1997 05:00:00 GMT' );
header( 'Content-type: application/json' );

$json = file_get_contents( $cache_file );
echo $json;