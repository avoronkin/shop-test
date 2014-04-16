var View = require('buratino').Views.View;
var modalTemplate = require('./modal-template.html');
var $ = require('jquery');
require('jquery.bootstrap.modal');


module.exports = View.extend({
    className: 'modal fade',
    template: modalTemplate,

    events: {
        'hidden.bs.modal': 'teardown',
        'click .save': 'onSave'
    },

    initialize: function (options) {
        this.options = options;
    },

    data: function () {
        var data = {};
        data.title = this.options.title || '';
        return data;
    },

    contentData: function () {
        return {};
    },

    contentTemplate: function () {},

    show: function () {
        this.render().renderContent();
        $('body').append(this.$el);

        this.$el.modal('show');
    },

    onSave: function () {
        console.log('on save');
    },

    teardown: function () {
        this.$el.data('modal', null);
        this.remove();
    },
    afterRenderContent: function () {

    },

    renderContent: function (template) {
        this.$el.find('.modal-body').html(this.contentTemplate(this.contentData()));
        this.afterRenderContent();
    }
});
