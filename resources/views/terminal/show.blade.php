@extends('terminal.layouts.app')

@section('content')
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
                                    <li class="breadcrumb-item active" aria-current="page">Заявка
                                        "{{ $verifyDoc->reg_number }}"
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="image-zoom">
                                <img id="image" src="{{ $verifyDoc->image_path }}" class="img-fluid"
                                     alt="Responsive image">
                            </div>
                        </div>

                        <div class="col-md-6">
                            <form method="POST" action="{{ route('terminal.verify', $verifyDoc) }}">
                                @csrf

                                <div class="form-group">
                                    <label>Дата заявки</label>
                                    <input type="text" class="form-control" disabled
                                           value="{{ $verifyDoc->pretty_created_at }}">
                                </div>

                                <div class="form-group">
                                    <label>Регистрационный номер верификации</label>
                                    <input type="text" class="form-control" disabled
                                           value="{{ $verifyDoc->reg_number }}">
                                </div>

                                <div class="form-group">
                                    <label>Тип документа</label>
                                    <input type="text" class="form-control" disabled
                                           value="{{ $verifyDoc->document_type }}">
                                </div>

                                @foreach($verifyDoc->data as $name => $value)
                                    @switch($name)
                                        @case('SexID')
                                        <div class="form-group">
                                            <label>{{ trans("fields.$name") }}</label>
                                            <select class="form-control" name="{{ $name }}">
                                                <option {{ $value == 1 ? 'selected' : null }} value="1">Мужской</option>
                                                <option {{ $value == 2 ? 'selected' : null }} value="2">Женский</option>
                                            </select>
                                        </div>
                                        @break
                                        @default
                                        <div class="form-group">
                                            <label>{{ trans("fields.$name") }}</label>
                                            <input type="text" class="form-control"
                                                   name="{{ $name }}" value="{{ $value }}">
                                        </div>
                                        @break
                                    @endswitch
                                @endforeach

                                <div class="form-group">
                                    <button type="submit" class="btn btn-success">Верифицировать</button>

                                    <button type="button" class="btn btn-danger" data-toggle="modal"
                                            data-target="#refuseModal">Отказать
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {{--    Modals--}}
    <div class="modal fade" id="refuseModal" tabindex="-1" role="dialog" aria-labelledby="refuseModal"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel-2">ОТКАЗАТЬ ПО ПРИЧИНЕ</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="POST" action="{{ route('terminal.refuse', $verifyDoc) }}">
                        @csrf

                        <div class="form-group">
                            <label class="col-form-label">Комментарии:</label>
                            <textarea class="form-control" name="comments"></textarea>
                        </div>

                        <div class="modal-footer">
                            <button type="submit" class="btn btn-danger">Отказать</button>
                            <button type="button" class="btn btn-light" data-dismiss="modal">Закрыть окно</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        const viewer = new Viewer(document.getElementById('image'), {
            inline: true,
            viewed() {
                viewer.zoomTo(1);
            },
        });
    </script>
@endpush
