class ZoneView extends Element {
    #width;
    #height;

    constructor(width, height, title) {
        super();
        this.#width = width;
        this.#height = height;
        this.title = title ? Utils.buildDisplayableTitle(title, width) :  "No title";
    }

    /**
     * @override
     */
    render() {
        this.#renderBackground()
        this.#renderTitle();
    }

    #renderBackground() {
        strokeWeight(1)
        stroke(255)
        fill([0, 0])
        rect(0, 0, this.#width, this.#height);
    }

    #renderTitle() {
        noStroke()
        fill(style.getTextFill())
        textSize(style.getFontSize("xl"))
        textFont(style.getFont(false))
        textAlign(CENTER);
        text( this.title, 0, textAscent() + 15, this.#width);
        //--- underline
        stroke(255)
        line(this.#width / 4, textAscent() + textDescent() + 20, this.#width * 3 / 4, textAscent() + textDescent() + 20)
    }
}