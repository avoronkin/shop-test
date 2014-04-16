var template = require('./template.html');
var View = require('buratino').Views.View;

module.exports = View.extend({
    toString: function () {
        return 'cart widget';
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset sync change add remove', this.render);
    },

    template: template,

    data: function () {
        var data = {
            cart: this.collection.toString()
        };

        return data;
    }
});
