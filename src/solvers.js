/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n, node, counter, solution) {

  var solution = solution || new Board({n: n}); //fixme
  var counter = counter || 0;
  //assign a variable to solution.rows() to currentBoard;
  var currBoard = node || solution.rows();
  //base case
  //if counter === n
  //return solution;
  if (counter === n) {
    return currBoard;
  }
  //iterate over the rows
  for (var i = 0; i < currBoard.length; i++) {
    // iterate over the columns
    for (var j = 0; j < currBoard[i].length; j++) {
      //if current location === 1, use keyword continue;
      var currLoc = currBoard[i][j];
      if (currLoc === 1) {
        continue;
      }
      //toggle the piece at the specific row and column
      //if(!hasAnyRowConflicts && !hasAnyColConflicts)
        //increment the counter
        //findNRooksSolution(n, currentBoard, counter)
      solution.togglePiece(i, j);
      // currLoc = 1;
      if (!solution.hasAnyRooksConflicts()) {
        counter ++;
        return findNRooksSolution(n, currBoard, counter, solution);
      }
      //if it does have a conflict,toggle it back and continue the loop
      solution.togglePiece(i, j);
      // currLoc = 0;
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme
  //a for loop where we place a rook on each position
    //callback the findNRooksSolution
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// findNQueensSolution
window.findNQueensSolution = function(n) {
  // var solution = undefined; //fixme
  var solution = new Board({n:n});
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      solution.togglePiece(i,j);
      var invokedBoard = innerFunction(n, solution);
      debugger;
      console.log(invokedBoard);
    }
  }

  var innerFunction = function(n, solution, node, counter) {
    var counter = counter || 0;
    var currBoard = node || solution.rows();
    if (counter === n) {
      return currBoard;
    }
    for (var i = 0; i < currBoard.length; i++) {
      for (var j = 0; j < currBoard[i].length; j++) {
        var currLoc = currBoard[i][j];
        if (currLoc === 1) {
          continue;
        }
        solution.togglePiece(i, j);
        if (!solution.hasAnyQueensConflicts()) {
          counter ++;
          return innerFunction(n, soltuion, currBoard, counter);
        }
        // //if(i === 3 && j ===3) {
        //   return innerFunction(n,currBoard, counter,solution, i++)
        // }
        solution.togglePiece(i, j);
      }
    }
    return solution;
  };


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
