<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            //'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = $request->user();
        $token = Str::random(32);
        DB::table('users')->where('email', $request->input('email'))->update(['token' => "$token"]);

        return response(
            ['nome' => $user->name,
                'cognome' => $user->surname,
                'id' => $user->id,
                'partite_totali' => $user->partite_totali,
                'descrizione' => $user->descrizione,
                'email' => $user -> email,


            ], 200)->withHeaders([ 'token' => $token]);
    }







    public function register(Request $request)
    {
        $request->validate([
            'fName' => 'required|string',
            'lName' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string',
            'phone' => 'required|string',
            'favourite_role' => 'required|string'
        ]);
        $user = new User;
        $user->name = $request->fName;
        $user->surname = $request->lName;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->phone = $request->phone;
        $user->token = "null";
        $user->favourite_role = $request->favourite_role;
        $user->save();
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
