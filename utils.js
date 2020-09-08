  const tileSize = (rows, columns) => {
    return {rowSize: windowHeight / rows, columnSize: windowWidth / columns}
  }
  const upperLeftPixel = (rows, columns, row, column) => {
    return {x: column * tileSize(rows, columns).columnSize, y: row * tileSize(rows, columns).rowSize} 
  }