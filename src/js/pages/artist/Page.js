var template = require('./layout.html');
var $ = require('jquery');

var Artist = require('../../models/artist').Model;
var artist = new Artist();
var ArtistInfoWidget = require('../../widgets/artist-info/View');

var Albums = require('../../models/album').Collection;
var albums = new Albums();
var AlbumsWidget = require('../../widgets/albums/Albums');

module.exports = {
    slug: 'artists/{mbid}',
    name: 'Artist',

    onOpen: function (cb) {
        var mbid = this.params.mbid;

        artist.clear();
        albums.reset();
        artist.set('mbid', mbid);
        albums.mbid = mbid;

        cb();

        artist.fetch({
            cache: true
        });
        albums.fetch({
            cache: true
        });
    },

    layout: {
        options: {
            template: template,
            views: {
                '#artist-info': {
                    constructor: ArtistInfoWidget,
                    options: {
                        model: artist
                    }
                },

                '#artist-albums': {
                    constructor: AlbumsWidget,
                    options: {
                        collection: albums
                    }
                }

            }
        }
    }
};
