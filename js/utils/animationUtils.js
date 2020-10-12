class AnimationUtils {
    static animate(from, to, duration, callBack) {
        const interval = 10 /*ms*/

        let value = from
        const id = setInterval(animate, interval)
        const step = (to - from) * interval / duration 
        callBack(from)

        function animate() {
            value+= step
            if ((step > 0 && value > to)
                || (step < 0 && value < to)){
                clearInterval(id)
                value = to;
            }
            callBack(value);
        }
      }

}