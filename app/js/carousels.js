define( function() {

    var carousels = {

        cacheElem: function() {
            this.$carousel = {
                header 		   : $('.header__carousel'),
                gallery  	   : $('.gallery'),
                galleryCarousel: $('.gallery__carousel'),
                thumbnails 	   : $('.gallery__thumbnails'),
                thumbWrapper   : $('.gallery__thumb-wrapper'),
                news  		   : $('.news-carousel'),
                editorials 	   : $('.editorials-carousel'),
                localNews 	   : $('.local-news-carousel')
            };
        },

        setArrows: function() {
            this.arrows = {
                header: {
                    prev: "<div class='header__prev-arrow'></div>",
                    next: "<div class='header__next-arrow'></div>"
                },
                gallery: {
                    prev: "<div class='gallery__prev-arrow'></div>",
                    next: "<div class='gallery__next-arrow'></div>"
                },
                news: {
                    prev: $('.news-carousel-prev'),
                    next: $('.news-carousel-next')
                },
                editorials: {
                    prev: $('.editorials-prev'),
                    next: $('.editorials-next'),
                },
                localNews: {
                    prev: $('.local-news-prev'),
                    next: $('.local-news-next')
                }
            }
        },

        startCarousels: function() {
            this.$carousel.header.slick({
                autoplay: true,
                autoplaySpeed: 5000,
                prevArrow: this.arrows.header.prev,
                nextArrow: this.arrows.header.next
            });

            this.$carousel.galleryCarousel.slick({
                autoplay: true,
                autoplaySpeed: 5000,
                prevArrow: this.arrows.gallery.prev,
                nextArrow: this.arrows.gallery.next
            });

            this.$carousel.thumbnails.slick({
                asNavFor: this.$carousel.galleryCarousel,
                slidesToShow: 7,
                slidesToScroll: 1,
                focusOnSelect: true
            });

            this.$carousel.news.slick({
                autoplay: true,
                autoplaySpeed: 3000,
                slidesToShow: 2,
                prevArrow: this.arrows.news.prev,
                nextArrow: this.arrows.news.next,
            });

            this.$carousel.editorials.slick({
                prevArrow: this.arrows.editorials.prev,
                nextArrow: this.arrows.editorials.next,

                responsive: [{
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            });

            this.$carousel.localNews.slick({
                prevArrow: this.arrows.localNews.prev,
                nextArrow: this.arrows.localNews.next,

                responsive: [{
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2
                    }
                }]
            });
        },

        setActiveThumbnail: function() {
            var that   = this;
            var active = 'gallery__thumb-active';
            this.$carousel.thumbWrapper.eq(0).addClass(active);

            this.$carousel.gallery.on('beforeChange', function(event, slick, curr, next) {
                that.$carousel.thumbWrapper.removeClass(active);
                that.$carousel.thumbWrapper.eq(next).addClass(active);
            });
        },

        init: function() {
            this.cacheElem();
            this.setArrows();
            this.startCarousels();
            this.setActiveThumbnail();
        }
    };

    return carousels;

});