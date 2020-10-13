/**
 * Element.
 * An element is displaied in a layer by the 'render' method.
 * Each element has an id.
 * 
 * Elements must not depend each other.
 */
class Element {
  #id
 
  constuctor (id){
    this.#id = id
  }

  getId(){
    return this.#id
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
