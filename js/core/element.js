class Element {

  /**
   * This method MUST be overridden
   */
  render() {
    throw 'render method MUST be overridden'
  }

  /**
   * This method CAN be overridden
   */
  contains(x, y) {
    return false;
  }
}
