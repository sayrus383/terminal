@extends('terminal.layouts.app')

@section('content')
    <div class="d-flex align-items-center auth theme-one">
        <div class="row w-100 mx-auto">
            <div class="col-lg-4 mx-auto">
                <div class="auto-form-wrapper">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group">
                            <label class="label">E-Mail</label>
                            <div class="input-group">
                                <input type="email" class="form-control" placeholder="E-Mail" name="email">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="mdi mdi-check-circle-outline"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="label">Пароль</label>
                            <div class="input-group">
                                <input type="password" class="form-control" placeholder="*********" name="password">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="mdi mdi-check-circle-outline"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary submit-btn btn-block" type="submit">Войти</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection
