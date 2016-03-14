define('carousels', [], function () {
    var carousels = {
        cacheElem: function () {
            this.$carousel = {
                header: $('.header__carousel'),
                gallery: $('.gallery'),
                galleryCarousel: $('.gallery__carousel'),
                thumbnails: $('.gallery__thumbnails'),
                thumbWrapper: $('.gallery__thumb-wrapper'),
                news: $('.news-carousel'),
                editorials: $('.editorials-carousel'),
                localNews: $('.local-news-carousel')
            };
        },
        setArrows: function () {
            this.arrows = {
                header: {
                    prev: '<div class=\'header__prev-arrow\'></div>',
                    next: '<div class=\'header__next-arrow\'></div>'
                },
                gallery: {
                    prev: '<div class=\'gallery__prev-arrow\'></div>',
                    next: '<div class=\'gallery__next-arrow\'></div>'
                },
                news: {
                    prev: $('.news-carousel-prev'),
                    next: $('.news-carousel-next')
                },
                editorials: {
                    prev: $('.editorials-prev'),
                    next: $('.editorials-next')
                },
                localNews: {
                    prev: $('.local-news-prev'),
                    next: $('.local-news-next')
                }
            };
        },
        startCarousels: function () {
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
                nextArrow: this.arrows.news.next
            });
            this.$carousel.editorials.slick({
                prevArrow: this.arrows.editorials.prev,
                nextArrow: this.arrows.editorials.next,
                responsive: [{
                        breakpoint: 640,
                        settings: { slidesToShow: 2 }
                    }]
            });
            this.$carousel.localNews.slick({
                prevArrow: this.arrows.localNews.prev,
                nextArrow: this.arrows.localNews.next,
                responsive: [{
                        breakpoint: 640,
                        settings: { slidesToShow: 2 }
                    }]
            });
        },
        setActiveThumbnail: function () {
            var that = this;
            var active = 'gallery__thumb-active';
            this.$carousel.thumbWrapper.eq(0).addClass(active);
            this.$carousel.gallery.on('beforeChange', function (event, slick, curr, next) {
                that.$carousel.thumbWrapper.removeClass(active);
                that.$carousel.thumbWrapper.eq(next).addClass(active);
            });
        },
        init: function () {
            this.cacheElem();
            this.setArrows();
            this.startCarousels();
            this.setActiveThumbnail();
        }
    };
    return carousels;
});
define('youtube', [], function () {
    var youtube = {
        height: '150',
        width: '100%',
        APIkey: 'AIzaSyDLvyMHjOqhQFLQtdaPuksbArSp8rf8TIM',
        videoId: 'A3ytTKZf344',
        url: 'https://www.googleapis.com/youtube/v3/search',
        pause: 'kenazTV__pause',
        player: '',
        playlist: ['A3ytTKZf344'],
        cacheElem: function () {
            this.$controls = {
                next: $('.kenazTV__next'),
                prev: $('.kenazTV__prev'),
                play: $('.kenazTV__play')
            };
        },
        loadPlayer: function () {
            var that = this;
            this.player = new YT.Player('player', {
                height: this.height,
                width: this.width,
                playerVars: {
                    autoplay: 0,
                    controls: 0
                },
                events: {
                    onReady: this.onPlayerReady.bind(that),
                    onStateChange: this.onStateChange.bind(that)
                }
            });
        },
        onPlayerReady: function () {
            this.cacheElem();
            this.fetchPlaylist();
            this.setControls();
        },
        setControls: function () {
            var that = this;
            var state;
            this.$controls.next.on('click', function () {
                that.$controls.play.addClass(that.pause);
                that.player.nextVideo();
            });
            this.$controls.prev.on('click', function () {
                that.$controls.play.addClass(that.pause);
                that.player.previousVideo();
            });
            this.$controls.play.on('click', function () {
                state = that.player.getPlayerState();
                if (state == 5 || state == 2)
                    that.player.playVideo();
                else
                    that.player.pauseVideo();
            });
        },
        onStateChange: function () {
            var state = this.player.getPlayerState();
            if (state == 1)
                this.$controls.play.addClass(this.pause);
            if (state == 2)
                this.$controls.play.removeClass(this.pause);
        },
        fetchPlaylist: function () {
            var that = this;
            var data = {
                part: 'snippet',
                type: 'video',
                relatedToVideoId: this.videoId,
                key: this.APIkey
            };
            $.get({
                url: that.url,
                data: data
            }).done(function (data) {
                for (var i = 0; i < data.items.length; i++)
                    that.playlist.push(data.items[i].id.videoId);
                that.player.cuePlaylist(that.playlist);
            }).fail(function (err) {
                console.log(err);
            });
        },
        init: function () {
            var that = this;
            if (typeof YT == 'undefined' || typeof YT.Player == 'undefined') {
                window.onYouTubeIframeAPIReady = function () {
                    that.loadPlayer();
                };
                $.getScript('//www.youtube.com/iframe_api');
            } else
                this.loadPlayer();
        }
    };
    return youtube;
});
define('facebook', [], function () {
    var facebook = {
        startFacebook: function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id))
                return;
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/hr_HR/sdk.js#xfbml=1&version=v2.5&appId=967327336654590';
            fjs.parentNode.insertBefore(js, fjs);
        },
        init: function () {
            this.startFacebook(document, 'script', 'facebook-jssdk');
        }
    };
    return facebook;
});
define('navigation', [], function () {
    var nav = {
        colors: {
            blue: '#299ec3',
            red: '#ee6151',
            green: '#84c14f',
            blue: '#299ec3',
            yellow: '#fcc44d',
            brown: '#a99765'
        },
        cacheElem: function () {
            this.$menu = $('.menu'), this.$menuItems = this.$menu.find('ul li');
        },
        setNavigation: function () {
            var that = this;
            this.$menu.slicknav({ label: '' });
            this.$menuItems.first().css('background-color', this.colors.blue);
            this.$menuItems.on('click', function () {
                that.$menuItems.each(function () {
                    $(this).css('background-color', 'transparent');
                });
                $(this).css('background-color', that.colors[$(this).attr('data-color')]);
            });
        },
        init: function () {
            this.cacheElem();
            this.setNavigation();
        }
    };
    return nav;
});
'use strict';
requirejs([
    'carousels',
    'youtube',
    'facebook',
    'navigation'
], function (P, L, A, Y) {
    $(function () {
        P.init();
        L.init();
        A.init();
        Y.init();
    });
    console.log(window.atob('IF8gICBfICAgICAgXyBfICAgICAgICAgXyAgCQkJCQkJCQkJCQkJDQp8IHwgfCB8IF9fX3wgfCB8IF9fXyAgIHwgfF8gX19fICAgICAgIAkJCQkJCQkJCQkNCnwgfF98IHwvIF8gXCB8IHwvIF8gXCAgfCBfXy8gXyBcICAgICAgIAkJCQkJCQkJCQ0KfCAgXyAgfCAgX18vIHwgfCAoXykgfCB8IHx8IChfKSB8ICAgICAgICAgCQkJCQkJCQkJDQp8X3wgfF98XF9fX3xffF98XF9fXy8gICBcX19cX19fLyAgICAgICAgICAgIAkJCQkJCQkJDQogX19fXyAgXyAgICAgICAgICAgICAgICAgICAgXyAgICAgICAgICAgICAgICAgICAgICAgICBfICAgICAgICAgICAgIF9fICAJCQkNCnwgIF8gXHwgfCBfXyBfX18gICBfX19fIF8gIHwgfF9fXyAgIF9fX19fICBfIF9fIF8gX18gKF8pIF9fXyBfXyBfICAgXCBcIAkJDQp8IHxfKSB8IHwvIF9gIFwgXCAvIC8gX2AgfCB8IF9fXCBcIC8gLyBfIFx8ICdfX3wgJ18gXHwgfC8gX18vIF9gIHwgKF8pIHwJCQ0KfCAgX18vfCB8IChffCB8XCBWIC8gKF98IHwgfCB8XyBcIFYgLyAoXykgfCB8ICB8IHwgfCB8IHwgKF98IChffCB8ICBffCB8CQkNCnxffCAgIHxffFxfXyxffCBcXy8gXF9fLF98ICBcX198IFxfLyBcX19fL3xffCAgfF98IHxffF98XF9fX1xfXyxffCAoXykgfAkNCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL18vIAkJCQ0KLi4uIGkgcG96ZHJhdiBGcm9udGVuZGFzdSBrb2ppIHByZWdsZWRhdmEgbW9qZSB6dnJsam90aW5lLCB6aXZpbyEgOkQ='));
});
define('main', [
    'carousels',
    'youtube',
    'facebook',
    'navigation'
], function () {
    return;
});