<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class AuthController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'update', 'delete', 'show']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            // 'role' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Either email or password is wrong.'], 401);
        }

        return $this->createNewToken($token);
    }

    protected function authenticated(Request $request, $user)
    {
        if ($user->isAdmin()) {
            return redirect(route('admin_dashboard'));
            // return $this->createNewToken($token);
        } else  if ($user->isUser()) {
            return redirect(route('user_dashboard'));
            // return $this->createNewToken($token);
        }
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'role' => 'required|string',
            'services_id' => 'required|string',
            'sous_services_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        $users = User::all();
        if ($users->role = 'user') {
            return response()->json(auth()->user());
        } else {
            return 'hello';
        }
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    // 
    public static function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'role' => 'required|string',
            'services_id' => 'required|string',
            'sous_services_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }

        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role = $request->role;
        $user->services_id = $request->services_id;
        $user->sous_services_id = $request->sous_services_id;
        $user->save();
        return response()->json(['message' => 'Cet utilisateur a ete mise a jour']);
    }

    public static function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }
        try {
            $user = User::where('id', $request->id)->delete();
            return response()->json(['message' => 'Cet utilisateur a ete supprime']);
        } catch (Exception $e) {
            return response()->json(['error' => ['Desole vous ne pouvez pas supprimer cet utilisateur']], 409);
        }
    }

    public static function show(Request $request)
    {
        session(['key' => $request->keywords]);
        $value = session('key');
        $users = DB::table('users')
            ->select(['users.id', 'libelle_sous_service', 'libelle_service', 'name', 'email', 'password', 'role'])
            ->join('services', function ($join) {
                $join->on('users.services_id', '=', 'services.id');
            })
            ->join('sous_services', function ($join) {
                $join->on('users.sous_services_id', '=', 'sous_services.id');
            })
            ->where('users.id', 'LIKE', '%' . $value . '%')
            ->orwhere('users.name', 'LIKE', '%' . $value . '%')
            ->orwhere('users.email', 'LIKE', '%' . $value . '%')
            ->orwhere('users.password', 'LIKE', '%' . $value . '%')
            ->orwhere('users.role', 'LIKE', '%' . $value . '%')
            ->orwhere('users.services_id', 'LIKE', '%' . $value . '%')
            ->orwhere('users.sous_services_id', 'LIKE', '%' . $value . '%')
            ->orwhere('services.libelle_service', 'LIKE', '%' . $value . '%')
            ->orwhere('sous_services.libelle_sous_service', 'LIKE', '%' . $value . '%')
            ->get();
        return response()->json(['users' => $users]);
    }
}
