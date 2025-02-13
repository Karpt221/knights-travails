## knights-travails

In this project I solved graphs point to point search problem using BFS traversal.
Task was to build a function knightMoves that shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way.

## Vertices and Edges
The vertices in this graph are each of the possible positions on the chessboard, represented by a pair of coordinates like [x, y], where x and y are between 0 and 7. The edges are the valid knight moves between vertices. For example, from [0,0], a knight can move to [2,1], [1,2], and so on. Each of these moves represents a connection between the vertex [0,0] and the other reachable vertices.

## Graph Representation
Graph is implicit. The knight starts on a specific vertex, and the algorithm will dynamically explore all possible moves (edges) to other vertices (positions on the board) as it traverses the board.

   knightMoves([3,3],[4,3])
   You made it in 3 moves!  Here's your path:
    [3,3]
    [4,5]
    [2,4]
    [4,3]