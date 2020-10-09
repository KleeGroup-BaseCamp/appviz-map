class ProgressBar {
    #value
    #maxValue
    #width
    #color
    #title

    constructor(value, maxValue, width, color /* p5 Color*/) {
        this.#value = value
        this.#maxValue = maxValue
        this.#width = width
        this.#color = color
        this.#title = new VText("0", style.text.font, style.text.size.s)
        const size = (value / this.#maxValue) * this.#width
        ProgressBar.#move(0, size,s => this.#value = s)
    }

    render() {
        const weight = 10
        this.#title.render() 
        this.#title.setText(Math.floor(this.#value * this.#maxValue / this.#width))
        push()
        translate(20, (-textAscent() + weight) / 2)
        this.#renderBar(weight);
        pop()
    }

    #renderBar(weight){
        strokeJoin(ROUND)
        strokeWeight(weight)
        
        this.#color.setAlpha(100)
        stroke(this.#color)
        line(0, 0, this.#width, 0)
        
        this.#color.setAlpha(255)
        stroke(this.#color)
        line(0, 0, this.#value, 0)
    
    }
    static #move(from, to, callBack) {
        const duration = 300 /*ms*/
        const interval = 10 /*ms*/

        let value = from
        const id = setInterval(animate, interval)
        const step = (to - from) * interval / duration 
        callBack(from)

        function animate() {
            value+= step
            if (value > to){
                clearInterval(id)
                value = to;
            }
            callBack(value);
        }
      }
}