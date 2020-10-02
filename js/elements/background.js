class Background extends Element {
  #backgroundColor;

  constructor() {
    super();
  }

  render() {
    background( style.getBackgroundColor());
  }
}
