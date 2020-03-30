<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProfileController extends Controller
{
    public function updateDescr(Request $request){

        $access_token = $request->header('token');

        $idUtente = DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');


        DB::table('users')
            ->where('id', '=', $idUtente)
            ->update(['users.description'=> $request->input('descrizione')

            ]);

        return response()->json([
            'message' => 'Successfully updated!',
            'data' =>  $request->input('descrizione')
        ], 201);

    }

    public function getCommenti(Request $request){

        $access_token = $request->header('token');

        $id = DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');

        $commenti = DB::table('feedback')
            ->join('users', 'feedback.id_giocatore_votato', '=', 'users.id')
            ->select('feedback.commento', 'feedback.voto', 'feedback.id_giocatore_votante AS utente_id', 'feedback.id')
            ->where('feedback.id_giocatore_votato','=', $id)
            ->orderByDesc('feedback.id')
            ->distinct()
            ->get();

        $commenti->map(function ($item, $key) {
            $item->id_giocatore_votante= DB::table('users')
                ->where('id', '=', $item->utente_id)
                ->select('users.name', 'users.surname')
                ->distinct()
                ->first();

            return $item;
        });

        return $commenti->toJson();
    }
    public function getMedia(Request $request){
        $access_token = $request->header('token');

        $id= DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');

        $media =DB::table('feedback')
            ->where('id_giocatore_votato', '=', $id)
            ->avg('voto');

        $media1 =DB::table('feedback')
            ->where('id_giocatore_votato', '=', $id)
            ->where('voto', '=', 1)
            ->count('voto');
        $media2 =DB::table('feedback')
            ->where('id_giocatore_votato', '=', $id)
            ->where('voto', '=', 2)
            ->count('voto');
        $media3 =DB::table('feedback')
            ->where('id_giocatore_votato', '=', $id)
            ->where('voto', '=', 3)
            ->count('voto');
        $media4 =DB::table('feedback')
            ->where('id_giocatore_votato', '=', $id)
            ->where('voto', '=', 4)
            ->count('voto');
        $media5 =DB::table('feedback')
            ->where('id_giocatore_votato', '=', $id)
            ->where('voto', '=', 5)
            ->count('voto');

        return response()->json([
            'media' => $media,
            'media1' => $media1,
            'media2' => $media2,
            'media3' => $media3,
            'media4' => $media4,
            'media5' => $media5
        ]);
    }
}
