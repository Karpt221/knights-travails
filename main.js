function knightMoves(start, end) {
  if (start[0] === end[0] && start[1] === end[1]) {
    return{ route: [], len: 0 };
  }
  let routesData = new Map();
  let queue = [];
  let startIndex = 0;

  routesData.set(`${start[0]}:${start[1]}`, { prev: null, len: 0 });

  let initialAdjacentVertices = getAdjacentVertices(start[0], start[1]);
  for (const vertex of initialAdjacentVertices) {
    queue.push({
      curr: [vertex[0], vertex[1]],
      prev: [start[0], start[1]],
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
        let iVertex = [end[0], end[1]];
        let iVertexPrev = routesData.get(`${iVertex[0]}:${iVertex[1]}`).prev;
        while (iVertex !== null) {
          route.push([iVertex[0], iVertex[1]]);
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
            curr: [vertex[0], vertex[1]],
            prev: [qVertex.curr[0], qVertex.curr[1]],
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
  let ones = [-1, 1];
  let twos = [-2, 2];
  let adjacentVertices = [];

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (
        x + ones[i] >= 0 &&
        x + ones[i] < 8 &&
        y + twos[j] >= 0 &&
        y + twos[j] < 8
      ) {
        adjacentVertices.push([x + ones[i], y + twos[j]]);
      }
    }
  }

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      if (
        x + twos[i] >= 0 &&
        x + twos[i] < 8 &&
        y + ones[j] >= 0 &&
        y + ones[j] < 8
      ) {
        adjacentVertices.push([x + twos[i], y + ones[j]]);
      }
    }
  }

  return adjacentVertices;
}

let routeData = knightMoves([3, 3], [7, 0]);

console.log(`You made it in ${routeData.len} moves! Here's your path:`);
for (const vertex of routeData.route) {
  console.log(vertex);
}
