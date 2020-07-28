(function ($) {

	$(document).ready(function () {
		$('.js-destroy').click(function () {
			$(this).parent().find('.js-destroy-form').submit();
		});

		let body = $('body');

		body.on('click', '.js-ajax-btn', function () {

			let b = $(this).data('form');

			if (!b) {
				return false;
			}

			$(this).parent().find('.js-' + b + '-form').submit();
			// $(this).parent().find('.js-clone-form').submit();
		});


		function patch_slug() {
			let val = $(this).val();

			val = val.toLowerCase();
			val = val.replace(/[^-\w\s]+/gi, '');
			val = val.replace(/[^\w]+/gi, '-');
			val = val.replace(/-{1,}/gi, '-');
			val = val.replace(/^-+|-+$/gi, '');

			$(this).val(val);
		}

		body.on('blur', '#slug', function () {
			patch_slug.call(this);
			// $(this).parent().find('.js-clone-form').submit();
		});

		let api_mapping_front = $('#api_mapping_front');
		let api_mapping_back = $('#api_mapping_back');

		if (api_mapping_front.length && api_mapping_back.length) {

			$('#preferred_api_id').on('change', function (e) {
				e.preventDefault();

				let api_id = $(this).val();

				if(!api_id) {
					api_mapping_front.html('');
					return false;
				}

				api_mapping_front.html($('#api_id_' + api_id).html())
				// console.log(api_id)

			}).change();

		}


	});

})(jQuery)
