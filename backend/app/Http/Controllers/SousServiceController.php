<?php

namespace App\Http\Controllers;

use Exception;
use App\{SousService, Service};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class SousServiceController extends Controller
{
    public static function ajouterSousService(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'libelle_sous_service' => 'required|string',
            'services_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }

        $sousservice = new SousService();
        $sousservice->libelle_sous_service = $request->libelle_sous_service;
        $sousservice->services_id = $request->services_id;
        $sousservice->save();
        return response()->json(['message' => 'Ce sous service a ete ajoute avec succes']);
    }

    public static function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'libelle_sous_service' => 'required|string',
            'services_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }

        $sousservice = SousService::find($request->id);
        $sousservice->libelle_sous_service = $request->libelle_sous_service;
        $sousservice->services_id = $request->services_id;
        $sousservice->save();
        return response()->json(['message' => 'Ce sous service a ete mise a jour']);
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
            $sousservice = SousService::where('id', $request->id)->delete();
            return response()->json(['message' => 'Ce sous service a ete supprime']);
        } catch (Exception $e) {
            return response()->json(['error' => ['Desole vous ne pouvez pas supprimer ce sous service']], 409);
        }
    }

    public static function show(Request $request)
    {
        // session(['key' => $request->keywords]);
        // $sousservices = Service::where(function ($q) {
        // $value = session('key');
        // $q->select(['sous_services.id', 'sous_services.libelle_sous_service', 'sous_services.services_id', 'services.libelle_sous_service', 'services.id'])
        // ->join('sous_services', function ($join) {
        // $join->on('sous_services.services_id', '=', 'services.id');
        // })
        // ->where('sous_services.id', 'LIKE', '%' . $value . '%')
        // ->orwhere('sous_services.libelle_sous_service', 'LIKE', '%' . $value . '%')
        // ->orwhere('sous_services.services_id', 'LIKE', '%' . $value . '%')
        // ->orwhere('services.libelle_sous_service', 'LIKE', '%' . $value . '%');
        // })->get();

        // return response()->json(['sousservices' => $sousservices]);
        session(['key' => $request->keywords]);
        $value = session('key');
        $sousservices = DB::table('services')
            ->select(['sous_services.id', 'libelle_sous_service', 'libelle_service'])
            ->join('sous_services', function ($join) {
                $join->on('sous_services.services_id', '=', 'services.id');
            })
            ->where('sous_services.id', 'LIKE', '%' . $value . '%')
            ->orwhere('sous_services.libelle_sous_service', 'LIKE', '%' . $value . '%')
            ->orwhere('sous_services.services_id', 'LIKE', '%' . $value . '%')
            ->orwhere('services.libelle_service', 'LIKE', '%' . $value . '%')
            ->get();
        return response()->json(['sousservices' => $sousservices]);
    }
}
