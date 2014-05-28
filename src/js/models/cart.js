var Backbone = require('backbone');
var mediator = require('buratino').mediator;
var Cookies = require('cookies-js');

var CartItem = Backbone.Model.extend({
    idAttribute: "mbid",

    initialize: function () {
        //перерасчёт суммы при изменении количества товара
        this.on('change:quantity', this.calculateSum, this);
        this.calculateSum();
    },

    //перерасчёт суммы
    calculateSum: function () {
        var sum = this.get('price') * this.get('quantity');
        this.set('sum', sum);
    },

    //увелечение количества товара
    increaseQuantity: function () {
        this.set('quantity', this.get('quantity') + 1);
    },

    //уменьшение количества товара
    decreaseQuantity: function () {
        if (this.get('quantity') > 1) {
            this.set('quantity', this.get('quantity') - 1);
        }
    }
});

var Cart = Backbone.Collection.extend({
    model: CartItem,

    initialize: function () {
        this.loadFromCookies();

        mediator.on('cart:add', this.addItem, this);

        this.on('add remove change reset', this.saveToCookies, this);
    },

    //сохранение корзины в куки
    saveToCookies: function () {
        Cookies.set('cart', JSON.stringify(this.toJSON()));
    },

    //загрузка корзины из куков
    loadFromCookies: function () {
        var cart = [];

        if(Cookies.get('cart')){
            cart = JSON.parse(Cookies.get('cart'));
        }

        this.reset(cart);
    },

    //сохранение колекции на сервер
    save: function (options) {
        Backbone.sync('create', this, options);
    },
 
    url: function(){
        return 'some/url'; 
    },

    //добавление товара в корзину
    addItem: function (item) {
        var mbid = item.get('mbid');

        var model = this.get(mbid);

        if (model) {//если такой товар уже есть в корзине то увеличиваем его количество
            model.increaseQuantity();
        } else {//добавляем товар в корзину

            this.add({
                mbid: item.get('mbid'),
                album: item.get('name'),
                artist: item.get('artist').name,
                price: item.get('price'),
                quantity: 1
            });

        }

    },

    //общая стоимость
    getTotalSum: function () {
        var sum = this.reduce(function (memo, model) {
            return memo + (model.get('price') * model.get('quantity'));
        }, 0);

        return sum;
    },

    //общее количество товара в корзине
    getTotalQuantity: function () {
        var quantity = this.reduce(function (memo, model) {
            return memo + model.get('quantity');
        }, 0);

        return quantity;
    },


    toString: function () {
        var string = '';
        if (this.length) {
            string = this.getTotalQuantity() + ' шт., $' + this.getTotalSum();
        }

        return string;
    }
});

module.exports = {
    Model: CartItem,
    Collection: Cart
};
