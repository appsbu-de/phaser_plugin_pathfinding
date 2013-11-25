Phaser.Plugin.PathFinderPlugin = function (parent) {

    if (typeof EasyStar !== 'object') {
        throw new Error("Easystar is not defined!");
    }

    this.parent = parent;
    this._easyStar = new EasyStar.js();
    this._grid = null;
    this._callback = null;
    this._prepared = false;
    this._walkables = [0];

};

Phaser.Plugin.PathFinderPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.PathFinderPlugin.prototype.constructor = Phaser.Plugin.PathFinderPlugin;

Phaser.Plugin.PathFinderPlugin.prototype.setGrid = function (grid, walkables, iterationsPerCount) {
    iterationsPerCount = iterationsPerCount || null;

    this._grid = grid;
    this._walkables = walkables;

    this._easyStar.setGrid(this._grid);
    this._easyStar.setAcceptableTiles(this._walkables);

    if (iterationsPerCount !== null) {
        this._easyStar.setIterationsPerCalculation(iterationsPerCount);
    }
};

Phaser.Plugin.PathFinderPlugin.prototype.setCallbackFunction = function (callback) {
    this._callback = callback;
};

Phaser.Plugin.PathFinderPlugin.prototype.preparePathCalculation = function (from, to) {
    if (this._callback === null || typeof this._callback !== "function") {
        throw new Error("No Callback set!");
    }

    var startX = from[0],
        startY = from[1],
        destinationX = to[0],
        destinationY = to[1];

    this._easyStar.findPath(startX, startY, destinationX, destinationY, this._callback);
    this._prepared = true;
};

Phaser.Plugin.PathFinderPlugin.prototype.calculatePath = function () {
    if (this._prepared === null) {
        throw new Error("no Calculation prepared!");
    }

    this._easyStar.calculate();
};
