/**
 * Element.
 * An element is displayed in a layer by the 'render' method.
 * 
 * Each element has 
 * - an id
 * - a width
 * - a height
 *  
 * Elements must not depend each other.
 * An elemnt can be a rectangle, an hexagon, a circle or anything
 * BUT each element is defined in a bounding box 
 */
class Element {
  #id
  #width
  #height
  #selectable
 
  constuctor (id, width, height, selectable){
    this.#id = id
    this.#width = width
    this.#height = height
    this.#selectable = selectable
  }

  getId(){
    return this.#id
  }

  getWidth(){
    return this.#width
  }

  getHeight(){
    return this.#height
  }

  isSelectable(){
    return this.#selectable
  }
  /**
   * This method MUST be overridden
   * This defines how the elemnt is rendererd inside a layer.
   */
  render() {
    throw 'render method MUST be overridden'
  }

  /**
   * This method CAN be overridden
   */
  contains(x, y) {
    return x > 0
        && x < this.#width
        && y > 0
        && y < this.#height
  }
}
