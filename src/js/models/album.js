var Backbone = require('backbone');
var apiEndpoint = require('../settings').lastfmApiEndpoint;

var Album = Backbone.Model.extend({
    url: function () {
        return apiEndpoint + '?method=album.getInfo&mbid=' + this.mbid;
    },
    parse: function (raw) {
        var album = raw;
        album.largeImg = album.image[3]['#text'];
        album.price = 10 + parseInt(album.playcount.charAt(0), 10);

        return album;
    }
});

var Albums = Backbone.Collection.extend({
    model: Album,
    url: function () {
        return apiEndpoint + '?method=artist.gettopalbums&mbid=' + this.mbid;
    },
    parse: function (raw) {
        return raw.topalbums.album;
    }
});

module.exports = {
    Model: Album,
    Collection: Albums
};
