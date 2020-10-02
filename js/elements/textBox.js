class TextBox extends Rectangle {

    constructor(width, height, text) {
        super(width, height);
        this.text = text
    }

    render() {
        rect(0, 0, this._width, this._height)
        fill(255)
        textSize(style.getFontSize("s"))
        textAlign(CENTER, CENTER);

        text(
            this.text ? this.text : "No title",
            0,
            0,
            this._width,
            this._height
        )
    }
}