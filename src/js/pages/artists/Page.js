var Artists = require('../../models/artist').Collection;
var artists = new Artists({});
var template = require('./layout.html');
var $ = require('jquery');
var TopArtistsWidget = require('../../widgets/top-artists/View');

module.exports = {
    slug: 'artists',
    name: 'Artists',
    layout: {
        options: {
            template: template,
            views: {
                '#top-artists': {
                    constructor: TopArtistsWidget,
                    options: {
                        collection: artists 
                    }
                }
            }
        }
    }
};
