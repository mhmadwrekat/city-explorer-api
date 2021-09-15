'use strict';

class MoviesModel {
    constructor(title, release, vote, image) {
        this.title = title;
        this.vote = vote;
        this.release = release;
        this.image = image;
    }
}

module.exports = MoviesModel;