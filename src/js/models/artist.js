var Backbone = require('backbone');
var apiEndpoint = require('../settings').lastfmApiEndpoint;

var Artist = Backbone.Model.extend({
    url: function () {
        return apiEndpoint + '?method=artist.getinfo&mbid=' + this.get('mbid');
    },
    parse: function (raw) {
        var artist = raw.artist || raw;
        artist.largeImg = artist.image[3]['#text'];

        return artist;
    }
});

var Artists = Backbone.Collection.extend({
    model: Artist,
    url: function () {
        return apiEndpoint + '?method=chart.gettopartists';
    },
    parse: function (raw) {
        return raw.artists.artist;
    }
});

module.exports = {
    Model: Artist,
    Collection: Artists
};
