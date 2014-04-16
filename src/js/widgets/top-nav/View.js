var template = require('./template.html');
var View = require('buratino').Views.Layout;
var CartWidget = require('../cart/View');

module.exports = View.extend({
    toString: function () {
        return 'top nav widget';
    },

    initialize: function (options) {

        this.views = {
            '#cart': {
                constructor: CartWidget,
                options: {
                    collection: options.cart
                }
            },

        };

    },

    template: template,

});