<?php

namespace App\Http\Controllers;

use Exception;
use App\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    public static function ajouterService(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle_service' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }

        $service = new Service();
        $service->libelle_service = $request->libelle_service;
        $service->save();
        return response()->json(['message' => 'Ce service a ete ajoute avec succes']);
    }

    public static function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'libelle_service' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }

        $service = Service::find($request->id);
        $service->libelle_service = $request->libelle_service;
        $service->save();
        return response()->json(['message' => 'Ce service a ete mise a jour']);
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
            $service = Service::where('id', $request->id)->delete();
            return response()->json(['message' => 'Ce service a ete supprime']);
        } catch (Exception $e) {
            return response()->json(['error' => ['Desole vous ne pouvez pas supprimer ce service']], 409);
        }
    }

    public static function show(Request $request)
    {
        session(['key' => $request->keywords]);
        $services = Service::where(function ($q) {
            $value = session('key');
            $q->where('services.id', 'LIKE', '%' . $value . '%')
                ->orwhere('services.libelle_service', 'LIKE', '%' . $value . '%');
        })->get();

        return response()->json(['services' => $services]);
    }
}
