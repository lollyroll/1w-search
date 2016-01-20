/*global define*/
define(
    'collections/polls-collection',
    [
    'backbone',
    'models/poll-default'
    ],
    function (Backbone, pollDefault) {
    'use strict';

    var pollsCollection = Backbone.Collection.extend({
        model: pollDefault

    });

    return new pollsCollection();
});