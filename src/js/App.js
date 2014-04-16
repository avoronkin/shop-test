var Structure = require('buratino').Structure;
var App = require('buratino').App;
var mediator = require('buratino').mediator;
var shared = require('./shared');
var Layout = require('buratino').Views.Layout;

var Router = require('buratino').Router;
var $ = require('jquery');
var _ = require('underscore');

var router = shared.router = new Router();
var structure = new Structure();

//модель данных корзины
var Cart = require('./models/cart').Collection;
shared.cart = new Cart();

//вью верхнего меню
var TopNav = require('./widgets/top-nav/View');
var topNav = new TopNav({
    cart: shared.cart 
});

//страницы 
var mainPage = require('./pages/main/Page');
var cartPage = require('./pages/cart/Page');
var artistsPage = require('./pages/artists/Page');
var artistPage = require('./pages/artist/Page');

//приложение
var mainApp = new App({
    name: 'mainApp',
    slug: '',
    structure: structure,
    pages: [mainPage, artistsPage, artistPage, cartPage]
});



$(document).ready(function () {

    topNav.setElement('#top-nav');
    topNav.render();

    var layout;
    var $el = $('#main');

    //layout manager
    mediator.on('page:change', function (page) {

        if (layout && layout.remove) {
            layout.remove();
        }

        var LayoutView = Layout;
        var options = page.get('layout').options;

        layout = new LayoutView(options);
        layout.setElement($el);
        if (options.template) {
            layout.template = options.template;
        }

        if (_.isFunction(page.get('onOpen'))) {
            page.get('onOpen').call(page, function () {
                layout.render();
            });
        } else {
            layout.render();
        }
    });

    mediator.on('router:start', function () {
        //обработка кликов по ссылкам
        $('body')
            .on('click', 'a[href^="/"]', function (event) {
                if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                    var path = $(event.currentTarget).attr('href');
                    event.preventDefault();
                    router.goToUrl(path);
                }
            });
    });


    router.start();
});

module.exports.structure = structure;
module.exports.init = function () {
    mainApp.start();
};
