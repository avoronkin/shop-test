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

    data: function () {
        var data = {
            albums: this.collection.toJSON()
        };

        return data;
    }
});
