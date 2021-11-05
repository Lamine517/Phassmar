<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SousService extends Model
{
    protected $fillable = ['libelle_sous_service', 'services_id'];

    // fils referent a service
    public function service()
    {
        return $this->belongsTo('App\Service');
    }
}
