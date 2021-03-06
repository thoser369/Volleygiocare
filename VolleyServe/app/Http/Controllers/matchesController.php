<?php

namespace App\Http\Controllers;

use App\Match;
use Carbon\Carbon;
use function foo\func;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class matchesController extends Controller
{

    function listmatches($idU) {

         $matches= DB::table('match')
             ->select('titolo', 'descrizione', 'luogo', 'tipo', 'organizzatore', 'match.id', 'data_ora','ora')
             ->join('partecipation','match.organizzatore', '=','partecipation.id_giocatore')
             ->where ('numero_giocatori','>',0)
             ->where('match.data_ora', '>=', Carbon::now())
             ->whereNotIn('match.id', function($query) use ($idU){
                 $query->select('id_partita')
                     ->from('partecipation')
                     ->where('id_giocatore', '=', $idU);
             })
             ->orderByDesc('id')
             ->distinct()
             ->get();

         $result = $matches->map(function ($item, $key) {
             $item->organizzatore = DB::table('users')
                 ->where('id', '=', $item->organizzatore)
                 ->get();
             return $item;
         });



        return $matches->toJson();
    }

    function matchDetails($id)
    {

        $details = DB::table('match')
            ->select('titolo', 'descrizione', 'luogo', 'tipo', 'organizzatore', 'id', 'numero_giocatori')
            ->where('id', '=', $id)
            ->get();

        return $details->toJson();
    }

        public function addMatch(Request $request)
        {
            $request->validate([
                'titolo' => 'required|string',
                'luogo' => 'required|string',
                'numero_giocatori' => 'required|string',
                'descrizione' => 'required|string',
                'data_ora' => 'required|date',
                'tipo' => 'required|string',
                'organizzatore' => 'integer'
            ]);

            $match = new Match;
            $match->titolo = $request->titolo;
            $match->luogo = $request->luogo;
            $match->numero_giocatori = $request->numero_giocatori;
            $match->descrizione = $request->descrizione;
            $match->data_ora = $request->data_ora;
            $match->tipo = $request->tipo;
            $match->organizzatore = $request->org;
            $match->save();

            return response()->json([
                'message' => 'Successfully created!'
            ], 201);
        }


    public function partecipazione() {
        $partecipa= DB::table('match')
            ->select('id')
            ->orderByDesc('created_at')
            ->first();


        $utente= DB::table('match')
            ->select('organizzatore')
            ->orderByDesc('created_at')
            ->first();

        DB::table('partecipation')
            ->insert([
                'id_partita'=> $partecipa->id,
                'id_giocatore' => $utente->organizzatore,
            ]);

        return response()->json([
            'message' => 'Successfully created!'
        ], 201);


}
    public function my_Matches(Request $request)  {
        {
            $access_token = $request->header('token');

            $idUtente = DB::table('users')
                ->select('id')
                ->where('users.token', '=', $access_token)
                ->value('id');

            $partitemie = DB::table('match')
                ->select('titolo', 'descrizione', 'luogo', 'tipo', 'organizzatore', 'match.id', 'data_ora', 'ora')
                ->join('partecipation', 'match.id', '=', 'partecipation.id_partita')
                ->where('partecipation.id_giocatore', '=', $idUtente)
                ->where('match.data_ora', '>=', Carbon::now())
                ->orderByDesc('match.id')
                ->distinct()
                ->get();

            $partitemie->map(function ($item, $key) {
                $item->organizzatore = DB::table('users')
                    ->where('id', '=', $item->organizzatore)
                    ->first();
                return $item;
            });


            return $partitemie->toJson();
        }

    }

    public function rimuovi_partecipante (Request $request, $idpartita) {

        $access_token = $request->header('token');

        $idUtente = DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');


        DB::table('partecipation')
            ->where('id_partita', '=', $idpartita)
            ->where('id_giocatore', '=', $idUtente)
            ->delete();

        DB::table('match')
            ->where('id', '=', $idpartita)
            ->increment('numero_giocatori');

        return response()->json([
            'message' => 'Partecipazione cancellata correttamente'
        ]);

    }
    public function elimina_partita($id_partita) {

        DB::table('match')
            ->where('id','=', $id_partita)
            ->delete();

        return response()->json([
            'message' => 'Partita cancellata correttamente'
        ]);
    }

    public function partite_terminate(Request $request)
    {
        $access_token = $request->header('token');

        $idUtente = DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');

        $terminate = DB::table('match')
            ->select('titolo', 'descrizione', 'luogo', 'tipo', 'organizzatore', 'match.id', 'data_ora', 'ora')
            ->join('partecipation', 'match.id', '=', 'partecipation.id_partita')
            ->where('partecipation.id_giocatore', '=', $idUtente)
            ->where('match.data_ora', '<', Carbon::now())
            ->orderByDesc('match.id')
            ->distinct()
            ->get();

        $terminate->map(function ($item, $key) {
            $item->organizzatore = DB::table('users')
                ->where('id', '=', $item->organizzatore)
                ->first();
            return $item;
        });


        return $terminate->toJson();

    }

    public function numero_partite_terminate(Request $request)
    {
        $access_token = $request->header('token');

        $idUtente = DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');

        $numero_partite_terminate = DB::table('match')
            ->join('partecipation', 'match.id', '=', 'partecipation.id_partita')
            ->where('partecipation.id_giocatore', '=', $idUtente)
            ->where('match.data_ora', '<', Carbon::now())
            ->count('match.id');

        return $numero_partite_terminate;

    }

    public function partecipa($idG,$idP) {

        DB::table('partecipation')
            ->insert([
                'id_giocatore' => $idG,
                'id_partita'=> $idP,
            ]);

        DB::table('match')
            ->where('match.id', '=', $idP)
            ->decrement('numero_giocatori');

        return response()->json([
            'message' => 'Wow!'
        ], 201);

    }
    public function feedbackPlayers(Request $request, $idpartita) {

        $access_token = $request->header('token');

        $idUtente = DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');

        $players= DB::table('partecipation')
            ->join('users', 'partecipation.id_giocatore', '=', 'users.id')
            ->select('users.nome', 'users.cognome', 'users.id')
            ->where('partecipation.id_partita', '=', $idpartita)
            ->where('partecipation.id_giocatore', '<>', $idUtente)
            ->distinct()
            ->get();

        return $players->toJson();
    }


}
