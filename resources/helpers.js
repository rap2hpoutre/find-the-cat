// Source: https://gist.github.com/smutnyleszek/1ca053ca9e52a37d1ece

// generate random positions
function generatePositionsArray(maxX, maxY, safeRadius, irregularity) {
    // declarations
    var positionsArray = [];
    var r, c;
    var rows;
    var columns;
    // count the amount of rows and columns
    rows = Math.floor(maxY / safeRadius);
    columns = Math.floor(maxX / safeRadius);
    // loop through rows
    for (r = 1; r <= rows; r += 1) {
        // loop through columns
        for (c = 1; c <= columns; c += 1) {
            // populate array with point object
            positionsArray.push({
                x: Math.round(maxX * c / columns) + _.random(irregularity * -1, irregularity),
                y: Math.round(maxY * r / rows) + _.random(irregularity * -1, irregularity)
            });
        }
    }
    // return array
    return positionsArray;
}

// get random position from positions array
function getRandomPosition(array, removeTaken) {
    // declarations
    var randomIndex;
    var coordinates;
    // get random index
    randomIndex = _.random(0, array.length - 1);
    // get random item from array
    coordinates = array[randomIndex];
    // check if remove taken
    if (removeTaken) {
        // remove element from array
        array.splice(randomIndex, 1);
    }
    // return position
    return coordinates;
}
