<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class alerte extends Model
{
    //
    protected $fillable = [
        'intitule', 'niveau', 'description', 'fichier', 'latitude', 'longitude', 'destinataire', 'alerte_services_id'
    ];

    // fils referent a service
    public function service()
    {
        return $this->belongsTo('App\Service');
    }


    public function setDestinataireAttribute($value)
    {
        $this->attributes['destinataire'] = json_encode($value);
    }
    public function getDestinataireAttribute($value)
    {
        $this->attributes['destinataire'] = json_decode($value);
    }
}
