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
            $table->string('image_path');
            $table->jsonb('data');

            $table->timestamps();
            $table->timestamp('verified_at')->nullable();
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
