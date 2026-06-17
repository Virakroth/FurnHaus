<?php

/*
|--------------------------------------------------------------------------
| Laravel Bootstrap
|--------------------------------------------------------------------------
|
| This file is used to bootstrap the Laravel framework. This is the entry
| point for all requests into the application.
|
*/

// Suppress PHP deprecation warnings
error_reporting(E_ALL & ~E_DEPRECATED & ~E_WARNING);
ini_set('display_errors', '0');

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(
        \Illuminate\Http\Request::capture()
    );
