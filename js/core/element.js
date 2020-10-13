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
 */
class Element {
  #id
  #width
  #height
 
  constuctor (id, width, height){
    this.#id = id
    this.#width = width
    this.#height = height
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
    return false
  }
}
