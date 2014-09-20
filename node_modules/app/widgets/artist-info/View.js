var template = require('./template.html');
var View = require('buratino').Views.View;

module.exports = View.extend({
    toString: function () {
        return 'artist info widget';
    },

    initialize: function () {
        this.listenTo(this.model, 'change sync', this.render);
    },

    template: template,

    data: function () {
        var data = {
            artist: this.model.toJSON()
        };

        return data;
    }
});
