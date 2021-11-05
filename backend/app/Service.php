<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = ['libelle_service'];

    public function sousservices()
    {
        return $this->hasMany('App\SousService');
    }
    public function alertes()
    {
        return $this->hasMany('App\Alerte');
    }
    public function users()
    {
        return $this->hasMany('App\User');
    }
}
