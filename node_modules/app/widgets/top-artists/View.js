var template = require('./template.html');
var View = require('buratino').Views.View;

module.exports = View.extend({
    initialize: function () {
        this.listenTo(this.collection, 'reset sync', this.render);
    },

    template: template,

    data: function () {
        var data = {
            artists: this.collection.toJSON()
        };

        return data;
    }
});
