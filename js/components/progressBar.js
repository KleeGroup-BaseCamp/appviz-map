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
        this.#title = new VText("", style.text.font, style.text.size.s)
        ProgressBar.#move(0, value, s => this.#value = s)
    }

    render() {
        const weight = 10
        this.#title.setText(Math.floor(this.#value))
        this.#title.render() 
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
        const size = this.#value * this.#width / this.#maxValue  
        line(0, 0, size, 0)
    
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