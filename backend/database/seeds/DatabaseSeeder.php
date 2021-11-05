<?php

use Illuminate\Database\Seeder;
use App\Models\{alerte, Service, SousService, User};
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('services')->insert([
            [
                'id' => 1,
                'libelle_service' => "Police Nationale"
            ],
            [
                'id' => 2,
                'libelle_service' => "Ministere de l'interieur",
            ],
            [
                'id' => 3,
                'libelle_service' => "Direction des Douanes",
            ],

            [
                'id' => 4,
                'libelle_service' => "Marine Nationale",
            ],
            [
                'id' => 5,
                'libelle_service' => "Port Autonome de Dakar",
            ],

        ]);

        DB::table('sous_services')->insert([
            [
                'id' => 1,
                'libelle_sous_service' => "DIC",
                'services_id' => 1
            ],
            [
                'id' => 2,
                'libelle_sous_service' => "DAF",
                'services_id' => 2
            ],
            [
                'id' => 3,
                'libelle_sous_service' => "DD",
                'services_id' => 3
            ],

            [
                'id' => 4,
                'libelle_sous_service' => "MN",
                'services_id' => 4
            ],
            [
                'id' => 5,
                'libelle_sous_service' => "PAD",
                'services_id' => 5
            ],

        ]);

        DB::table('alertes')->insert([
            [
                'id' => 1,
                'intitule' => "Intitule 1",
                'niveau' => "critique",
                'description' => "une petite description",
                'fichier' => "Image_2.png",
                'latitude' => "12,3",
                'longitude' => "-12.43",
                'destinataire' => "Police Nationale",
                'alerte_services_id' => 1
            ],
            [
                'id' => 2,
                'intitule' => "Intitule 2",
                'niveau' => "urgent",
                'description' => "une petite description",
                'fichier' => "Image_3.png",
                'latitude' => "14,3",
                'longitude' => "-12.43",
                'destinataire' => "Gendarmerie Nationale",
                'alerte_services_id' => 2
            ],
            [

                'id' => 3,
                'intitule' => "Intitule 3",
                'niveau' => "majeur",
                'description' => "une petite description",
                'fichier' => "Image_4.png",
                'latitude' => "15,3",
                'longitude' => "-12.43",
                'destinataire' => "Sapeurs Pompiers",
                'alerte_services_id' => 3
            ],

            [

                'id' => 4,
                'intitule' => "Intitule 4",
                'niveau' => "mineur",
                'description' => "une petite description",
                'fichier' => "Image_5.png",
                'latitude' => "16,3",
                'longitude' => "-16.23",
                'destinataire' => "Ministere de l' interieur",
                'alerte_services_id' => 4
            ],

        ]);

        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => "Fatou Mbengue",
                'email' => 'fb@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'services_id' => 1,
                'sous_services_id' => 1
            ],
            [
                'id' => 2,
                'name' => "Abdoulaye Gueye",
                'email' => 'ag@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'user',
                'services_id' => 2,
                'sous_services_id' => 2
            ],
            [
                'id' => 3,
                'name' => "Fatou Diallo",
                'email' => 'fd@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'user',
                'services_id' => 3,
                'sous_services_id' => 3
            ],

            [
                'id' => 4,
                'name' => "Lamine DIEME",
                'email' => 'ld@gmail.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'services_id' => 4,
                'sous_services_id' => 4
            ],

        ]);
    }
}
