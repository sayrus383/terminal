@extends('terminal.layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <div class="row">
                            <div class="col-12">
                                <nav aria-label="breadcrumb">
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item"><a
                                                href="{{ route('terminal.index') }}">Все заявки</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Заявка "{{ $verifyDoc->reg_number }}"
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>

                    <div class="card-body">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th>Дата заявки</th>
                                <td><input class="form-control" type="text" disabled value="{{ $verifyDoc->pretty_created_at }}"></td>
                            </tr>

                            <tr>
                                <th>Регистрационный номер верификации</th>
                                <td><input class="form-control" type="text" disabled value="{{ $verifyDoc->reg_number }}"></td>
                            </tr>

                            <tr>
                                <th>Тип документа</th>
                                <td><input class="form-control" type="text" disabled value="{{ $verifyDoc->document_type }}"></td>
                            </tr>

                            @foreach($verifyDoc->data as $key => $value)
                                <tr>
                                    <th>{{ $key }}</th>
                                    <td>
                                        <input class="form-control" type="text" name="{{ $key }}" value="{{ $value }}">
                                    </td>
                                </tr>
                            @endforeach

                            </tbody>
                        </table>

                        <form method="POST">
                            @csrf
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Сохранить</button>

                                <button type="submit" class="btn btn-success">Верифицировать</button>
                            </div>
                        </form>

                        <img src="{{ $verifyDoc->image_path }}" class="img-fluid" alt="Responsive image">
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
