<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateForeignKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sous_services', function (Blueprint $table) {
            $table->foreign('services_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('services_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->foreign('sous_services_id')
                ->references('id')
                ->on('sous_services')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        Schema::table('alertes', function (Blueprint $table) {
            $table->foreign('alerte_services_id')
                ->references('id')
                ->on('services')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('sous_services', function (Blueprint $table) {
            $table->dropForeign('sous_services_services_id_foreign');
        });
    }
}
