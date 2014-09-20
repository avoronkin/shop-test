var template = require('./album.html');
var View = require('buratino').Views.View;
var mediator = require('buratino').mediator;

module.exports = View.extend({
    tagName: 'li',

    toString: function () {
        return 'album';
    },

    events: {
        'click button': 'addToCart'
    },

    initialize: function () {
        this.listenTo(this.model, 'change sync', this.render);
    },

    addToCart: function () {
        mediator.trigger('cart:add', this.model);
    },

    template: template,

    data: function () {
        var data = {
            album: this.model.toJSON()
        };

        return data;
    }
});
