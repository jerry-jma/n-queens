// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //get specific row and assign to a new variable
      var currentRow = rowIndex;
      //add a counter
      var counter = 0;
      //iterate over this specific array
      for (var i = 0; i < currentRow.length; i++) {
        //if value is equal to 1, increase the counter by 1
        var currentElement = currentRow[i];
        if (currentElement === 1) {
          counter++;
        }
      }
      //return counter greater than 1
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //iterate throught the board;
      for (var i = 0; i < this.rows().length; i++) {
        //invoke the callback function hasRowConflictAt on each row
        var currentRow = this.hasRowConflictAt(this.rows()[i]);
        if (currentRow) {
          return true;
        }
      }
      return false; // fixme
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //create a variable board and assign this.row().
      var board = this.rows();
      //add a counter
      var counter = 0;
      //iterate over the board
      for (var i = 0; i < board.length; i++) {
        //create a variable referencing this.row()[i][colIndex];
        var currentElement = board[i][colIndex];
        //if the variable is equal to 1;
        if (currentElement === 1) {
          //increment the counter
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //iterate through the board
      for (var i = 0; i < this.rows().length; i++) {
        //at each row, were are going to call the callback with argument(board[0][i]);
        var currentColumn = this.hasColConflictAt(i);
        if (currentColumn) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      // create a counter;
      var counter = 0;
      // iteater over the inputs
      for (var i = 0; i < majorDiagonalColumnIndexAtFirstRow.length; i++) {
        //   check if the the element in the iteration is equal to 1
        //     increment the counter
        if (majorDiagonalColumnIndexAtFirstRow[i] === 1) {
          counter ++;
        }
      }
      // return counter > 1;
      return counter > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {

      // create an new empty array
      var newArray = [];
      // iterate through the board,
      for (var i = 0; i < this.rows().length; i++) {
        //   push the indices of first elements into a new array
        newArray.push([this.rows()[0][i]]);
      }
      for (var i = 0; i < this.rows().length - 1; i++) {
        newArray.push([]);
      }
      // iterate over througth the board but make the i= 1
      for (var i = 1; i < this.rows().length; i++) {
        //   iterate over this.row()[i] each element
        for (var j = 0; j < this.rows()[i].length; j++) {
          //     create a new variable to represent the current item
          var currentItem = this.rows()[i][j];
          //     _getthemajordiagonalindex() and assign to a variable
          var majorDiagonalIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
          //     check the major diagonal  >= 0
          if (majorDiagonalIndex >= 0) {
            //       push to the new array [major diagonal index], the current element
            newArray[majorDiagonalIndex].push(currentItem);
          } else if (majorDiagonalIndex < 0) {
            newArray[this.rows().length - majorDiagonalIndex - 1].push(currentItem);
          }
        }
      }
      // console.log(newArray);
      // create a flag = false
      var hasConflict = false;
      // iterate over the new array
      for (var i = 0; i < newArray.length; i++) {
        //   invoke the callback hasMajorDiagonalConflictAt(new array [i])
        hasConflict = this.hasMajorDiagonalConflictAt(newArray[i]);
        //   if (hasConflict)
        //     return true
        if (hasConflict) {
          return true;
        }
      }
      // return the flag; // fixme
      return hasConflict;


    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // create a counter;
      var counter = 0;
      // iteater over the inputs
      for (var i = 0; i < minorDiagonalColumnIndexAtFirstRow.length; i++) {
        //   check if the the element in the iteration is equal to 1
        //     increment the counter
        if (minorDiagonalColumnIndexAtFirstRow[i] === 1) {
          counter ++;
        }
      }
      // return counter > 1;
      return counter > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // create an new empty array
      var newArray = [];
      // iterate through the board,
      for (var i = 0; i < this.rows().length; i++) {
        //   push the indices of first elements into a new array
        newArray.push([this.rows()[0][i]]);
      }
      for (var i = 0; i < this.rows().length - 1; i++) {
        newArray.push([]);
      }
      // iterate over througth the board but make the i= 1
      for (var i = 1; i < this.rows().length; i++) {
        //   iterate over this.row()[i] each element
        for (var j = 0; j < this.rows()[i].length; j++) {
          //     create a new variable to represent the current item
          var currentItem = this.rows()[i][j];
          //     _getthemajordiagonalindex() and assign to a variable
          var minorDiagonalIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
          //       push to the new array [major diagonal index], the current element
          newArray[minorDiagonalIndex].push(currentItem);
        }
      }
      // create a flag = false
      var hasConflict = false;
      // iterate over the new array
      for (var i = 0; i < newArray.length; i++) {
        //   invoke the callback hasMajorDiagonalConflictAt(new array [i])
        hasConflict = this.hasMinorDiagonalConflictAt(newArray[i]);
        //   if (hasConflict)
        //     return true
        if (hasConflict) {
          return true;
        }
      }
      // return the flag; // fixme
      return hasConflict;
    }
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
