<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDataToTfTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tf_types', function (Blueprint $table) {
            $types = json_decode('[{"name":"Прицепы(полуприцепы)","id":"10"},{"name":"Легковые","id":"4"},{"name":"Автобусы до 16 п.м.","id":"5"},{"name":"Грузовые","id":"6"},{"name":"Троллейбусы, трамваи","id":"7"},{"name":"Мототранспорт","id":"8"},{"name":"Автобусы > 16 п.м.","id":"11"},{"name":"Морской","id":"13"},{"name":"Спец.техника","id":"15"},{"name":"Воздушный","id":"12"},{"name":"Железнодорожный","id":"14"}]');

            foreach ($types as $type) {
                \App\TfType::create([
                    'id'   => $type->id,
                    'name' => $type->name,
                ]);
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tf_types', function (Blueprint $table) {
            //
        });
    }
}
