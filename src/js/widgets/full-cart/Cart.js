var template = require('./cart.html');
var View = require('buratino').Views.List;
var CartItem = require('./CartItem');
var SuccessModal = require('./SuccessModal');
var shared = require('../../shared');


module.exports = View.extend({
    toString: function () {
        return 'cart widget';
    },

    events: {
        'click .save-error': 'newOrderError',
        'click .save': 'newOrder'
    },

    newOrderError: function () {
        var self = this;

        this.collection.save({
            success: function () {
                self.showAlert('Получилось!');
            },
            error: function () {
                self.showAlert('Ошибка при создании нового заказа.', 'danger');
            }
        });
    },

    newOrder: function () {
        this.collection.reset([]);

        shared.router.navigate('home');

        var modal = new SuccessModal({
            title: 'Заказ успешно оформлен' 
        }); 

        modal.show();
    },

    showAlert: function (text, type) {
        type = type || 'info';
        this.$el.find('.msg').html('<div class="alert alert-' + type + '">' + text + '</div>');
    },

    itemView: CartItem,

    containerSelector: 'tbody',

    initialize: function () {
        this.listenTo(this.collection, 'reset sync add remove', this.render);
    },

    template: template,

    data: function () {
        var data = {
            totalPrice: this.collection.getTotalSum(),
            total: this.collection.length
        };

        return data;
    }
});
