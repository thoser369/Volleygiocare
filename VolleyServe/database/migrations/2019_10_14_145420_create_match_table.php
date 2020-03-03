<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('match', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('titolo');
            $table->string('descrizione');
            $table->string('data_ora');
            $table->string('ora');
            $table->string('luogo');
            $table->unsignedBigInteger('organizzatore');
            $table->integer('numero_giocatori');
            $table->enum('tipo', ['volley', 'beach']);
            $table->timestamps();

            $table->foreign('organizzatore')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('match');
    }
}
