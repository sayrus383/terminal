@extends('layouts.app')

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
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
