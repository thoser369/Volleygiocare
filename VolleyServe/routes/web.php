<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/home/{idU}', 'matchesController@listmatches');

Route::get('/api/partecipa', 'matchesController@partecipazione');

Route::get('/api/matchD/{id}', 'matchesController@matchDetails');

Route::get('/api/aggiunta/{idG}/{idP}', 'matchesController@partecipa');

Route::get('/api/miepartite', 'matchesController@my_Matches');

Route::post('/api/newM', 'matchesController@addMatch');

Route::get('/api/mymatches', 'matchesController@my_Matches');

Route::get('/api/terminated', 'matchesController@partite_terminate');

Route::post('/api/updateDescription', 'ProfileController@updateDescr');

Route::delete('/api/rimuovipartecipante/{idpartita}', 'matchesController@rimuovi_partecipante');

Route::delete('/api/eliminapartita/{idpartita}', 'matchesController@elimina_partita');

Route::get('api/feedbackP/{id}', 'matchesController@feedbackPlayers');

Route::post('api/inviafeedback', 'feedbackController@inviafeedback');

Route::get('api/getfeedback/{idpartita}/{idgiocatore}', 'feedbackController@getfeedback');

Route::get('api/getcommenti', 'ProfileController@getcommenti');

Route::get('api/getmedia', 'ProfileController@getmedia');

Route::get('api/getnumeropartite', 'matchesController@numero_partite_terminate');

