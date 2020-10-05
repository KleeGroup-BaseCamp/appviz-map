class GroupView extends Rectangle {
    
    constructor(width, height, title) {
        super(width, height);
        this.title = title ? Utils.buildDisplayableTitle(title, width) :  "No title";
    }

    /**
     * @override
     */
    render() {
        this.#renderRectangle()
        this.#renderTitle();
        this.#renderBar()
    }
    #renderRectangle() {
        strokeWeight(1)
        stroke(255)
        fill([0, 0])
        rect(0, 0, this._width, this._height);
    }
    #renderTitle() {
        noStroke()
        fill(style.getTextFill());
        textSize(style.getFontSize("xxl"))
        textFont(style.getFont(false))
        textAlign(CENTER);
        text(this.title, 0, textAscent() + 15, this._width);
    }

    #renderBar() {
        stroke(255)
        line(this._width / 4, textAscent() + textDescent() + 20, this._width * 3 / 4, textAscent() + textDescent() + 20)
    }
}