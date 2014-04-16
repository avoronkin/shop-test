var ModalView = require('../../views/ModalView');
var template = require('./success-modal.html');
var _ = require('underscore');

module.exports = ModalView.extend({
    contentTemplate: template,
    contentData: function () {
        return {};
    },

    events: _.extend(ModalView.prototype.events,{
        'click .close-button': 'onClose' 
    }),

    onClose: function(){
        this.$el.modal('hide');
        this.remove(); 
    },
});
