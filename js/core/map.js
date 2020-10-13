class Map {
  #layers

  constructor(layers) {
    this.#layers = layers
  }

  /**
   * Renders the layers from bottom to up 
   */
  render() {
    this.#layers
      .forEach(layer => layer.render())
  }

  /*
   * Finds the element positionned in x, y
   */
  findElement(x, y) {
    for (const layer of this.#layers.slice().reverse()) {
      const element = layer.findElement(x, y)
      if (element) {
        return element
      }
    }
    return null
  }
}