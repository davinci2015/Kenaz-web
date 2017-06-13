define(function () {
    var facebook = {
        startFacebook: function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/hr_HR/sdk.js#xfbml=1&version=v2.5&appId=967327336654590";
            fjs.parentNode.insertBefore(js, fjs);
        },

        init: function () {
            this.startFacebook(document, 'script', 'facebook-jssdk');
        }
    }

    return facebook;
});