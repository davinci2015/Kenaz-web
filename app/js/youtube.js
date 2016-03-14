define(function() {

    var youtube = {

        height    : '150',
        width     : '100%',
        APIkey    : 'AIzaSyDLvyMHjOqhQFLQtdaPuksbArSp8rf8TIM',
        videoId   : 'HSs6iQwTTcY',
        url       : 'https://www.googleapis.com/youtube/v3/search',
        pause     : 'kenazTV__pause',
        player    : '',
        playlist  : ['HSs6iQwTTcY'],

        cacheElem: function() {
            this.$controls = {
                next: $('.kenazTV__next'),
                prev: $('.kenazTV__prev'),
                play: $('.kenazTV__play')
            }
        },

        loadPlayer: function() {
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

        onPlayerReady: function() {
            this.cacheElem();
            this.fetchPlaylist();
            this.setControls();
        },

        setControls: function() {
            var that = this;
            var state;

            this.$controls.next.on('click', function() {
                that.$controls.play.addClass(that.pause);
                that.player.nextVideo();
            });

            this.$controls.prev.on('click', function() {
                that.$controls.play.addClass(that.pause);
                that.player.previousVideo();
            });

            this.$controls.play.on('click', function() {
                state = that.player.getPlayerState();
                if (state == 5 || state == 2)
                    that.player.playVideo();
                else
                    that.player.pauseVideo();
            });
        },

        onStateChange: function() {
            var state = this.player.getPlayerState();
            if(state == 1)
                this.$controls.play.addClass(this.pause);
            if(state == 2)
                this.$controls.play.removeClass(this.pause);
        },

        fetchPlaylist: function() {
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
            })
                .done(function(data) {
                    for (var i = 0; i < data.items.length; i++)
                        that.playlist.push(data.items[i].id.videoId);
                    that.player.cuePlaylist(that.playlist);
                })
                .fail(function(err) {
                    console.log(err);
                });
        },

        init: function() {
            var that = this;

            if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                window.onYouTubeIframeAPIReady = function() {
                    that.loadPlayer();
                };
                $.getScript('//www.youtube.com/iframe_api');
            } else
                this.loadPlayer();

        },
    }

    return youtube;

});