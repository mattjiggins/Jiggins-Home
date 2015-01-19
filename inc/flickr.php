<?php

// SIMPLE GET AND CACHE PHOTOSTREAM FOR USER

include('keys.php');

error_reporting( 0 );

$user_id = '8466254%40N03';
$per_page = 100;
$feed = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=".$flickrKey."&user_id=".$user_id."&per_page=".$per_page."&format=json&nojsoncallback=1";
$cache_file = dirname(__FILE__).'/cache/'.'flickr-cache';
$modified = filemtime( $cache_file );
$now = time();
$interval = 900; // fifteen minutes

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