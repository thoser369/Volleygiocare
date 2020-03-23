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
                'ora' => 'required | date',
                'tipo' => 'required|string',
                'organizzatore' => 'string'
            ]);

            $match = new Match;
            $match->titolo = $request->titolo;
            $match->luogo = $request->luogo;
            $match->numero_giocatori = $request->numero_giocatori;
            $match->descrizione = $request->descrizione;
            $match->data_ora = $request->data_ora;
            $match->ora = $request->ora;
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
                ->select('titolo', 'descrizione', 'luogo', 'tipo', 'organizzatore', 'match.id', 'data_ora')
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

    public function partite_terminate(Request $request)
    {
        $access_token = $request->header('token');

        $idUtente = DB::table('users')
            ->select('id')
            ->where('users.token', '=', $access_token)
            ->value('id');

        $terminate = DB::table('match')
            ->select('titolo', 'descrizione', 'luogo', 'tipo', 'organizzatore', 'match.id', 'data_ora')
            ->join('partecipation', 'match.id', '=', 'partecipation.id_partita')
            ->where('partecipation.id_giocatore', '=', $idUtente)
            ->where('match.data_ora', '<', Carbon::now())
            ->orderByDesc('match.id')
            ->distinct()
            ->get();

        $terminate->map(function ($item, $key) {
            $item->id_organizzatore = DB::table('users')
                ->where('id', '=', $item->organizzatore)
                ->first();
            return $item;
        });

        $terminate->map(function ($item, $key) {
            $item->id_tipologia_partita = DB::table('role_type')
                ->where('id', '=', $item->id_tipologia_partita)
                ->first();

            return $item;
        });

        return $terminate->toJson();

    }

    public function partecipa($idG,$idP) {

        DB::table('partecipation')
            ->insert([
                'id_giocatore' => $idG,
                'id_partita'=> $idP,
            ]);

        DB::table('match')->decrement('numero_giocatori');

        return response()->json([
            'message' => 'Wow!'
        ], 201);

    }



}
