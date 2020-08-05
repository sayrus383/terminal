<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>@yield('title')</title>


    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="/assets/vendors/iconfonts/mdi/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.base.css">
    <link rel="stylesheet" href="/assets/vendors/css/vendor.bundle.addons.css">
    <link rel="stylesheet" href="{{ mix('v2/css/admin/app.min.css') }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">


</head>

<body>
<div class="container-scroller">
    @if(auth()->check())
        <nav class="navbar horizontal-layout col-lg-12 col-12 p-0">
            <div class="container d-flex flex-row">
                <div class="text-center navbar-brand-wrapper d-flex align-items-top">
                    <a class="navbar-brand brand-logo" href="{{ route('terminal.index') }}">
                        {{ config('app.name') }}
                    </a>
                </div>
                <div class="navbar-menu-wrapper d-flex align-items-center">
                    <form class="search-field ml-auto" action="#">
                        <div class="form-group mb-0">
                        </div>
                    </form>
                    <ul class="navbar-nav navbar-nav-right mr-0">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="UserDropdown" href="#" data-toggle="dropdown"
                               aria-expanded="false">
                                <img class="img-xs rounded-circle" src="https://placehold.it/100x100"
                                     alt="Profile image">
                            </a>
                            <div class="dropdown-menu dropdown-menu-right navbar-dropdown"
                                 aria-labelledby="UserDropdown">
                                <a class="dropdown-item"></a>

                                <a class="dropdown-item" href="{{ url('/logout') }}"
                                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    Выйти
                                </a>

                                <form id="logout-form" action="{{ url('/logout') }}" method="POST"
                                      style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </div>
                        </li>
                    </ul>
                    <button class="navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span class="mdi mdi-menu"></span>
                    </button>
                </div>
            </div>
        </nav>
    @endif

    <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
            <div class="content-wrapper">
                @yield('content')
            </div>

            @if(auth()->check())
                <footer class="footer">
                    <div class="container-fluid clearfix">
                    <span class="text-muted d-block text-center text-sm-left d-sm-inline-block">Copyright © {{ date('Y') }} <a
                            href="{{ config('app.url') }}" target="_blank">{{ config('app.name') }}</a></span>
                        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">made with <i
                                class="mdi mdi-heart text-danger"></i></span>
                    </div>
                </footer>
            @endif
        </div>
        <!-- main-panel ends -->
    </div>
</div>

<script src="/assets/vendors/js/vendor.bundle.base.js"></script>
<script src="/assets/vendors/js/vendor.bundle.addons.js"></script>

<script src="{{ mix('v2/js/admin/app.min.js') }}"></script>

<script>

    $(function () {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    })
</script>

<script>
    (function ($) {
        @if(session()->has('success'))
        resetToastPosition();
        $.toast({
            heading: 'Success',
            text: '{{ session('success') }}',
            showHideTransition: 'slide',
            icon: 'success',
            loaderBg: '#f96868',
            position: 'top-right'
        });
        @endif
        @if(session()->has('error'))
        resetToastPosition();
        $.toast({
            heading: 'Error',
            text: '{{ session('error') }}',
            showHideTransition: 'slide',
            icon: 'error',
            loaderBg: '#f2a654',
            position: 'top-right'
        });
        @endif
        @if ($errors->any())
        @foreach($errors->all() as $error)
        $.toast({
            heading: 'Error',
            text: '{{ $error }}',
            showHideTransition: 'slide',
            icon: 'error',
            loaderBg: '#f2a654',
            position: 'top-right'
        });

        @endforeach
        @endif

        function resetToastPosition() {
            $('.jq-toast-wrap').removeClass('bottom-left bottom-right top-left top-right mid-center');
            $(".jq-toast-wrap").css({
                "top": "",
                "left": "",
                "bottom": "",
                "right": ""
            });
        }
    })(jQuery);

</script>
@stack('scripts')
</body>
</html>
