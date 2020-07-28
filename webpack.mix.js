const mix = require('laravel-mix');

mix.options({
    processCssUrls: false,
}).version().sourceMaps();

// Admin
mix.styles([
    'resources/v2/css/admin/summernote.min.css',
    'resources/v2/css/admin/style.css',

], 'public/v2/css/admin/app.css');

mix.combine([
    'resources/v2/js/admin/template.js',
    'resources/v2/js/admin/file-upload.js',
    'resources/v2/js/admin/iCheck.js',
    'resources/v2/js/admin/select2.js',
    'resources/v2/js/admin/typeahead.js',
    'resources/v2/js/admin/data-table.js',
    'resources/v2/js/admin/desktop-notification.js',
    'resources/v2/js/admin/summernote.min.js',
    'resources/v2/js/admin/summernote-list-of-links.js',
    'resources/v2/js/admin/admin.js',

], 'public/v2/js/admin/app.js');

mix.minify('public/v2/css/app.css');
mix.minify('public/v2/js/app.js');


// Admin
mix.minify('public/v2/css/admin/app.css');
mix.minify('public/v2/js/admin/app.js');

mix.copyDirectory('resources/v2/css/fonts', 'public/v2/css/fonts');
mix.copyDirectory('resources/v2/css/images', 'public/v2/css/images');
mix.version();
