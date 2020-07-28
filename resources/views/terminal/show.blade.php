@extends('terminal.layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">

                    </div>

                    <div class="card-body">
                        <table class="table">
                            <tbody>
                            <tr>
                                <th>Дата заявки</th>
                                <td>{{ $verifyDoc->pretty_created_at }}</td>
                            </tr>

                            <tr>
                                <th>Регистрационный номер верификации</th>
                                <td>{{ $verifyDoc->reg_number }}</td>
                            </tr>

                            <tr>
                                <th>Тип документа</th>
                                <td>{{ $verifyDoc->document_type }}</td>
                            </tr>

                            @foreach($verifyDoc->data as $key => $value)
                                <tr>
                                    <th>{{ $key }}</th>
                                    <td>
                                        <input class="input-group-text" type="text" name="{{ $key }}"
                                               value="{{ $value }}">
                                    </td>
                                </tr>
                            @endforeach

                            </tbody>
                        </table>

                        <form action="{{ route('terminal.verify', $verifyDoc) }}" method="POST">
                            @csrf

                            <button class="btn btn-success">Верифицировать</button>
                        </form>

                        <img src="{{ $verifyDoc->image_path }}" class="img-fluid" alt="Responsive image">
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
