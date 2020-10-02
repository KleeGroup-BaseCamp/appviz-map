class GroupView extends Rectangle {
    
    constructor(width, height, title) {
        super(width, height);
        this.title = title;
    }

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
        text(
            this.title ? this.#getDisplayableTitle() : "No title",
            0,
            textAscent() + 15,
            this._width
        );
    }

    #renderBar() {
        stroke(255)
        line(this._width / 4, textAscent() + textDescent() + 20, this._width * 3 / 4, textAscent() + textDescent() + 20)
    }

    #getMaxCharacters() {
        let numOfCharacters = 1;
        while (
            numOfCharacters < this.title.length &&
            textWidth(this.title.slice(0, numOfCharacters)) <
            this._width - textWidth("m")
        ) {
            numOfCharacters++;
        }
        return numOfCharacters;
    }

    #getDisplayableTitle() {
        const numOfCharacters = this.#getMaxCharacters();
        return numOfCharacters == this.title.length ?
            this.title :
            this.title.slice(0, numOfCharacters - 3) + "...";
    }
}