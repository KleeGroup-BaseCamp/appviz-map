class TextBox extends Rectangle {

    constructor(width, height, text) {
        super(width, height);
        this.text = text ? Utils.buildDisplayableTitle(text, width) : "No title";
    }

    render() {
        rect(0, 0, this._width, this._height)
        fill(255)
        textSize(style.getFontSize("s"))
        textAlign(CENTER, CENTER);

        text(this.text, 0, 0, this._width, this._height);
    }
}