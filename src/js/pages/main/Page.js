var Artists = require('../../models/artist').Collection;
var artists = new Artists({});
var TopArtistsWidget = require('../../widgets/top-artists/View');

// var Tags = require('../../models/tag').Collection;
// var tags = new Tags({});
// var TopTagsWidget = require('../../widgets/top-tags/View');

var template = require('./layout.html');
var $ = require('jquery');

module.exports = {
    slug: '',
    name: 'home',
    main: true,
    onOpen: function (cb) {
        artists.fetch({
            cache: true
        });

        // tags.fetch({
        //     cache: true 
        // });

        cb();
    },
    layout: {
        options: {
            template: template,
            views: {
                '#top-artists': {
                    constructor: TopArtistsWidget,
                    options: {
                        collection: artists
                    }
                },
                // '#top-tags': {
                //     constructor: TopTagsWidget,
                //     options: {
                //         collection: tags
                //     }
                // }
            }
        }
    }
};
