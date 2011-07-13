/*!
 * jQuery Guide Plugin
 * http://tetsuwo.tumblr.com/
 *
 * Copyright 2011, Tetsuwo OISHI
 * Dual licensed under the MIT license.
 *
 * Date: 2011-07-12
 */
(function($) {
$.guide = function(s) {

	var settings = {
		name      : 'guide',
		index     : 0,
		is_stored : true,
		data      : [],
		rename    : {execute: 'Execute', next: 'Next', close: 'Close'},
		button    : {execute: true, next: true, close: true},
		cookie    : {path: null, expire: null, domain: null, secure: false}
	};
	s = $.extend({}, settings, s);

	var guideid = '#guideui-' + s.name;
//	var guideid = '#guideui-' + new Date().getTime();
	var row = null;

  	var tpl = '';
	tpl += '<div id="' + guideid.substr(1) + '" class="guideui-container">';
		tpl += '<div class="guideui-inner">';
			tpl += '<div class="guideui-content">';
				tpl += '<div class="guideui-header"> -- </div>';
				tpl += '<div class="guideui-body"> -- </div>';
				tpl += '<div class="guideui-footer">';
					if (s.button.execute) {
						tpl += '<input type="button" class="guideui-button-execute" value="' + s.rename.execute + '" />';
					}
					if (s.button.next) {
						tpl += '<input type="button" class="guideui-button-next" value="' + s.rename.next + '" />';
					}
					if (s.button.close) {
						tpl += '<input type="button" class="guideui-button-close" value="' + s.rename.close + '" />';
					}
				tpl += '</div>';
			tpl += '</div>';
			tpl += '<i class="guideui-arrow guideui-arrow-lt"></i>';
			tpl += '<i class="guideui-arrow guideui-arrow-tr"></i>';
			tpl += '<i class="guideui-arrow guideui-arrow-tl"></i>';
			tpl += '<i class="guideui-arrow guideui-arrow-bl"></i>';
			tpl += '<i class="guideui-arrow guideui-arrow-br"></i>';
		tpl += '</div>';
  	tpl += '</div>';

	function list(first) {
		if (!first) {
			if (!s.data[s.index + 1]) {
				s.index = 0;
				reset();
				storage(true);
				return;
			}
			s.index++;
		}
		else {
			if (!s.data[s.index]) {
				return;
			}
		}

		row = s.data[s.index];

		linkable();

		var $this = $(row.selector);
		var prop = {};

		$(guideid)
			.find('.guideui-arrow').hide().end()
			.find('.guideui-header').text(row.title).end()
			.find('.guideui-body').text(row.body).end();

		switch (row.position) {
			case 'tr':
				prop = {
					top  : $this.position().top + $this.height() + 10,
					left : $this.position().left - $this.width()
				};
				break;

			case 'bl':
				prop = {
					top  : $this.position().top - $(guideid).height() - 10,
					left : $this.position().left + 10
				};
				break;

			default:
				row.position = 'tl';
				prop = {
					top  : $this.position().top + $this.height() + 10,
					left : $this.position().left + 10
				};
				break;
		}

		$(guideid)
			.css(prop)
			.find('.guideui-arrow-' + row.position).show().end()
			.show();

		storage(true);
	}

	function error(msg) {
		alert(msg);
		return false;
	}

	function storage(write) {
//		console.log(s.is_stored, typeof $.cookie === 'function');
		if (s.is_stored && typeof $.cookie === 'function') {
			if (write) {
//				alert('write');
				$.cookie(s.name, s.index + 1, s.cookie);
			}
			else {
//				alert('read');
				s.index = parseInt($.cookie(s.name) || 0, 10);
			}
		}
	}

	function reset() {
		$(guideid).hide()
			.find('.guideui-header').empty().end()
			.find('.guideui-body').empty().end();
	}

	function linkable(jump) {
		if (row.link) {
			if (jump) {
				window.location.href = row.link;
			}
			else {
				$(guideid).find('.guideui-button-execute').show();
			}
		}
		else if ($(row.selector).get(0).tagName.toUpperCase() === 'A') {
			if (jump) {
				window.location.href = $(row.selector).attr('href');
			}
			else {
				$(guideid).find('.guideui-button-execute').show();
			}
		}
		else {
			$(guideid).find('.guideui-button-execute').hide();
		}
	}

	function bind() {
		$(guideid).find('.guideui-button-close')
			.unbind('click').bind('click', function() {
				reset();
			});

		$(guideid).find('.guideui-button-next')
			.unbind('click').bind('click', function() {
				reset();
				list();
			});

		$(guideid).find('.guideui-button-execute')
			.unbind('click').bind('click', function() {
				linkable(true);
			});
	}

	$(document).ready(function() {
		if (!$(guideid).length) {
			$('body').append(tpl);
		}
		bind();
		storage();
		list(true);
	});
};
})(jQuery);