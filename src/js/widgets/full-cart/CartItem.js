var template = require('./cart-item.html');
var View = require('buratino').Views.View;

module.exports = View.extend({
    toString: function () {
        return 'cart widget item';
    },

    tagName: 'tr',

    initialize: function () {
        this.listenTo(this.model, 'change sync', this.render);
    },

    events: {
        'click .delete': 'deleteItem',
        'click .inc': 'increaseQuantity',
        'click .decr': 'decreaseQuantity',
    },

    template: template,

    deleteItem: function () {
        this.model.collection.remove([this.model]);
    },

    increaseQuantity: function () {
        this.model.increaseQuantity();
    },

    decreaseQuantity: function () {
        this.model.decreaseQuantity();
    },

    data: function () {
        var data = {
            item: this.model.toJSON()
        };

        return data;
    }
});
