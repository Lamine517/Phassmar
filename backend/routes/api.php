<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('user-profile', 'AuthController@userProfile');

    Route::any('update-utilisateur','AuthController@update');
    Route::any('delete-utilisateur','AuthController@delete');
    Route::any('show-utilisateur','AuthController@show');

    Route::post('profile/ajouter-alerte','AlerteController@ajouterAlerte');
    Route::any('profile/update-alerte','AlerteController@update');
    Route::any('profile/delete-alerte','AlerteController@delete');
    Route::any('profile/show-alerte','AlerteController@show');
});

// alertes
Route::any('ajouter-alerte','AlerteController@ajouterAlerte');
Route::any('update-alerte','AlerteController@update');
Route::any('delete-alerte','AlerteController@delete');
Route::any('show-alerte','AlerteController@show');

// services
Route::any('ajouter-service','ServiceController@ajouterService');
Route::any('update-service','ServiceController@update');
Route::any('delete-service','ServiceController@delete');
Route::any('show-service','ServiceController@show');

//sous  services
Route::any('ajouter-sous-service','SousServiceController@ajouterSousService');
Route::any('update-sous-service','SousServiceController@update');
Route::any('delete-sous-service','SousServiceController@delete');
Route::any('show-sous-service','SousServiceController@show');

// Route::group(['middleware' => ['auth','user'], 'prefix' => 'user'], function(){
//     Route::get('/','AuthController@userprofile')->name("user_dashboard");
// });
// Route::group(['middleware' => ['auth','admin'], 'prefix' => 'admin'], function(){
//     Route::get('/','AuthController@userprofile')->name("admin_dashboard");
// });