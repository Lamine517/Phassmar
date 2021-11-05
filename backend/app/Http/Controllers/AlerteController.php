<?php

namespace App\Http\Controllers;

use Exception;
use App\alerte;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AlerteController extends Controller
{
    public static function ajouterAlerte(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'intitule' => 'required|string',
            'intitule' => 'required|string',
            'niveau' => 'required|string',
            'description' => 'required|string',
            'fichier' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1999',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'destinataire' => 'required',
            'alerte_services_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }

        $alerte = new alerte();
        $alerte->intitule = $request->intitule;
        $alerte->niveau = $request->niveau;
        $alerte->description = $request->description;
        $alerte->fichier = $request->file('fichier');
        $alerte->latitude = $request->latitude;
        $alerte->longitude = $request->longitude;
        $alerte->destinataire = $request->destinataire;
        $alerte->alerte_services_id = $request->alerte_services_id;
        // $alerte['destinataire'] = $request->$alerte('destinataire');

        if ($fichier = $request->file('fichier')) {
            $destinationPath = 'images/';
            $Monfichier = date('YmdHis') . "." . $fichier->getClientOriginalExtension();
            $fichier->move($destinationPath, $Monfichier);
            $alerte['fichier'] = "$Monfichier";
        }
        if ($alerte->save()) {
            return response()->json(['message' => 'Cette alerte a ete ajoutee avec succes']);
        } else {
            return response()->json(['message' => 'Veuillez svp remplir une image']);
        }
    }

    public static function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'intitule' => 'required|string',
            'niveau' => 'required|string',
            'description' => 'required|string',
            'fichier' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:1999',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'destinataire' => 'required',
            'alerte_services_id' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 409);
        }

        $alerte = alerte::find($request->id);
        $alerte->intitule = $request->intitule;
        $alerte->niveau = $request->niveau;
        $alerte->description = $request->description;
        $alerte->fichier = $request->fichier;
        $alerte->latitude = $request->latitude;
        $alerte->longitude = $request->longitude;
        $alerte->destinataire = $request->destinataire;
        $alerte->alerte_services_id = $request->alerte_services_id;
        $alerte->save();
        return response()->json(['message' => 'Cette alerte a ete mise a jour']);
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
            $alerte = alerte::where('id', $request->id)->delete();
            return response()->json(['message' => 'Cette alerte a ete supprime']);
        } catch (Exception $e) {
            return response()->json(['error' => ['Desole vous ne pouvez pas supprimer cette alerte']], 409);
        }
    }

    public static function show(Request $request)
    {
        session(['key' => $request->keywords]);
        $value = session('key');
        $alertes = DB::table('services')
            ->select(['libelle_service', 'alertes.id', 'intitule', 'niveau', 'description', 'fichier', 'latitude', 'longitude', 'destinataire'])
            ->join('alertes', function ($join) {
                $join->on('alertes.alerte_services_id', '=', 'services.id');
            })
            ->where('alertes.id', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.intitule', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.niveau', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.description', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.fichier', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.latitude', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.longitude', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.destinataire', 'LIKE', '%' . $value . '%')
            ->orwhere('alertes.alerte_services_id', 'LIKE', '%' . $value . '%')
            ->orwhere('services.libelle_service', 'LIKE', '%' . $value . '%')
            ->get();
        return response()->json(['alertes' => $alertes]);
    }
}
