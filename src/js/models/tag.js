var Backbone = require('backbone');
var apiEndpoint = require('../settings').lastfmApiEndpoint;

var Tag = Backbone.Model.extend({
    url: function () {
        return apiEndpoint + '/boards/' + this.get('id');
    }
});

var Tags = Backbone.Collection.extend({
    url: function () {
        return apiEndpoint + '?method=tag.getTopTags';
    },

    parse: function(raw){
        // console.log('tags', raw)
        return raw.toptags.tag; 
    }
});

module.exports = {
    Model: Tag,
    Collection: Tags
};
