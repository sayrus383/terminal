<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVerifyDocsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('verify_docs', function (Blueprint $table) {
            $table->id();
            $table->string('reg_number');
            $table->string('document_type');
            $table->string('name');
            $table->string('surname');
            $table->string('type_doc');
            $table->string('pa_number');
            $table->timestamp('birthdate');
            $table->tinyInteger('sex_id');
            $table->smallInteger('country_id');
            $table->boolean('is_resident')->default(true);
            $table->boolean('barcode')->default(true);
            $table->string('pers_number')->nullable();
            $table->text('doc_base64');
            $table->timestamp('issue_date');
            $table->timestamp('expired_at');
            $table->timestamp('verified_at')->nullable();

            $table->timestamps();

            $table->boolean('is_verified')->default(false);
            $table->bigInteger('manager_id')->nullable();
            $table->foreign('manager_id')
                ->on('users')
                ->references('id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('verify_docs');
    }
}
