class AnimationUtils {
    static #animations = 0;

    static isActive (){
        return AnimationUtils.#animations > 0
    }    

    static #setInterval(fun, interval){
        AnimationUtils.#animations ++
        return setInterval(fun, interval)
    }
    
    static #clearInterval(id){
        AnimationUtils.#animations --
        clearInterval(id)
    }

    static animate(from, to, duration, callBack) {
        callBack(from)
        if (from ===to) return 
        const interval = 10 /*ms*/
        let value = from
        const id = AnimationUtils.#setInterval(animate, interval)
        const step = (to - from) * interval / duration 

        function animate() {
            value+= step
            if ((step > 0 && value > to)
                || (step < 0 && value < to)){
                AnimationUtils.#clearInterval(id)
                value = to
            }
            callBack(value);
        }
      }

}