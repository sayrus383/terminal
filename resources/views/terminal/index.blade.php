@extends('terminal.layouts.app')

@section('content')
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title">Заявки для верификации</h4>

                    <div class="col-12 table-responsive">
                        <div class="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                            <div class="row justify-content-center">
                                <div class="col-sm-12">
                                    <table class="table dataTable no-footer" role="grid"
                                           aria-describedby="order-listing_info">
                                        <thead>
                                        <tr class="bg-light" role="row">
                                            <th class="sorting" tabindex="0" aria-controls="order-listing"
                                                rowspan="1" colspan="1">
                                                Тип документа
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order-listing"
                                                rowspan="1" colspan="1">
                                                Дата заявки
                                            </th>
                                            <th class="sorting" tabindex="0" aria-controls="order-listing"
                                                rowspan="1" colspan="1">
                                                Действие
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody id="verifyDocs">
                                        @foreach($docs as $doc)
                                            <tr role="row" class="odd">
                                                <td>{{ trans("fields.$doc->document_type") }}</td>
                                                <td>{{ \Carbon\Carbon::parse($doc->created_at)->format('d.m.Y H:i:s') }}</td>

                                                <td class="text-right">
                                                    @if(in_array($doc->reg_number, $attachVerifyDocs))
                                                        <button class="btn btn-warning">
                                                            Рассматривается...
                                                        </button>
                                                    @else
                                                        <a class="btn btn-primary"
                                                           id="open-{{ $doc->reg_number }}"
                                                           href="{{ route('terminal.show', $doc->reg_number) }}">
                                                            Посмотреть
                                                        </a>
                                                    @endif
                                                </td>
                                            </tr>
                                        @endforeach
                                        </tbody>
                                    </table>
                                </div>

                                {{ $docs->links() }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <input type="hidden" value="{{ $channelVerifyDoc }}" id="channelVerifyDoc">
    <input type="hidden" value="{{ $channelOpen }}" id="channelOpen">
@endsection
