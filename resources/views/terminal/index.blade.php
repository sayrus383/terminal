@extends('terminal.layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">Тип документа</th>
                        <th scope="col">Регистрационный номер верификации</th>
                        <th scope="col">Дата заявки</th>
                        <th scope="col">Действие</th>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($docs->data as $doc)
                            <tr>
                                <td>{{ $doc->document_type }}</td>
                                <td>{{ $doc->reg_number }}</td>
                                <td>{{ \Carbon\Carbon::parse($doc->created_at)->format('H:i d/m/Y') }}</td>
                                <td>
                                    <a href="{{ route('terminal.show', $doc->reg_number) }}" class="btn-sm btn-primary">Посмотреть</a>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection
