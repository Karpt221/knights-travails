function knightMoves(start, end) {
  if (start[0] === end[0] && start[1] === end[1]) {
    return { route: start, len: 0 };
  }
  let routesData = new Map();
  let queue = [];
  let startIndex = 0;

  routesData.set(`${start[0]}:${start[1]}`, { prev: null, len: 0 });

  let initialAdjacentVertices = getAdjacentVertices(start[0], start[1]);
  for (const vertex of initialAdjacentVertices) {
    queue.push({
      curr: vertex,
      prev: start,
      len: 1,
    });
  }

  while (startIndex < queue.length && routesData.size !== 64) {
    let qVertex = queue[startIndex];
    if (!routesData.has(`${qVertex.curr[0]}:${qVertex.curr[1]}`)) {
      routesData.set(`${qVertex.curr[0]}:${qVertex.curr[1]}`, {
        prev: qVertex.prev,
        len: qVertex.len,
      });
      if (qVertex.curr[0] === end[0] && qVertex.curr[1] === end[1]) {
        let route = [];
        let routeLen = routesData.get(`${end[0]}:${end[1]}`).len;
        let iVertex = end;
        let iVertexPrev = routesData.get(`${iVertex[0]}:${iVertex[1]}`).prev;
        while (iVertex !== null) {
          route.push(iVertex);
          iVertex = iVertexPrev;
          if (iVertex !== null) {
            iVertexPrev = routesData.get(`${iVertex[0]}:${iVertex[1]}`).prev;
          }
        }
        return { route: route.reverse(), len: routeLen };
      }
      let adjacentVertices = getAdjacentVertices(
        qVertex.curr[0],
        qVertex.curr[1]
      );
      for (const vertex of adjacentVertices) {
        if (!routesData.has(`${vertex[0]}:${vertex[1]}`)) {
          queue.push({
            curr: vertex,
            prev: qVertex.curr,
            len: qVertex.len + 1,
          });
        }
      }
    }

    startIndex++;
  }

  return routesData;
}

function getAdjacentVertices(x, y) {
  let steps = [
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [-2, -1],
    [-2, 1],
    [2, -1],
    [2, 1],
  ];
  let adjacentVertices = [];
  for (const step of steps) {
    let newX = x + step[0];
    let newY = y + step[1];
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      adjacentVertices.push([newX, newY]);
    }
  }

  return adjacentVertices;
}

let routeData = knightMoves([0, 0], [7, 7]);

console.log(`You made it in ${routeData.len} moves! Here's your path:`);
for (const vertex of routeData.route) {
  console.log(vertex);
}