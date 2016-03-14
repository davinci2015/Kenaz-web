define(function() {

	var nav = {

		colors: {
			blue: 	'#299ec3',
			red: 	'#ee6151',
			green: 	'#84c14f',
			blue: 	'#299ec3',
			yellow: 	'#fcc44d',
			brown: 	'#a99765'
		},

		cacheElem: function() {
			this.$menu = $('.menu'),
			this.$menuItems = this.$menu.find('ul li')
		},

		setNavigation: function() {
			var that = this;
			this.$menu.slicknav({label: ''});
			this.$menuItems.first().css('background-color', this.colors.blue);

			this.$menuItems.on('click', function() {

				that.$menuItems.each( function() {
					$(this).css('background-color', 'transparent');
				});

				$(this).css('background-color', that.colors[$(this).attr('data-color')]);
			});
		},

		init: function() {
			this.cacheElem();
			this.setNavigation();
		}
	};

	return nav;
});