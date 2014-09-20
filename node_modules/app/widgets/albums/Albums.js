var template = require('./albums.html');
var Album = require('./Album');
var View = require('buratino').Views.List;
var _ = require('underscore');

module.exports = View.extend({
    toString: function () {
        return 'albums widget';
    },

    containerSelector: '.grid',

    itemView: Album,

    initialize: function () {
        this.listenTo(this.collection, 'reset sync', this.render);
    },

    template: template,

    getItems: function () {
        var albums = this.collection.filter(function(album){
            return album.get('mbid'); 
        });

        return albums;
    }
});
