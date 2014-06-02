var shared = require('../../shared');
var cart = shared.cart;
var FullCartWidget = require('../../widgets/full-cart/Cart');

var template = require('./layout.html');

module.exports = {
    slug: 'cart',
    name: 'cart',
    layout: {
        options: {
            template: template,
            views: {
                '#full-cart': {
                    constructor: FullCartWidget,
                    options: {
                        collection: cart
                    }
                }
            }
        }
    }
};
