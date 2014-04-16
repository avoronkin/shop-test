var template = require('./template.html');
var View = require('buratino').Views.View;
var _ = require('underscore');

module.exports = View.extend({
    initialize: function () {
        this.listenTo(this.collection, 'reset sync', this.render);
    },

    template: template,

    data: function () {
        var data = {
            tags: this.collection.toJSON()
        };

        return data;
    }
});
