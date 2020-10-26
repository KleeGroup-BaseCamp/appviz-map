export default class AnimationUtils {
    private static animations = 0;

    static isActive (){
        return AnimationUtils.animations > 0
    }    

    private static setInterval(fun: (...args: any[]) => void, interval: number){
        AnimationUtils.animations ++
        return setInterval(fun, interval)
    }
    
    private static clearInterval(id: NodeJS.Timeout){
        AnimationUtils.animations --
        clearInterval(id)
    }

    static animate(from: number, to: number, duration: number, callBack: (v:number) => void) {
        callBack(from)
        if (from ===to) return 
        const interval = 10 /*ms*/
        let value = from
        const id = AnimationUtils.setInterval(animate, interval)
        const step = (to - from) * interval / duration 

        function animate() {
            value+= step
            if ((step > 0 && value > to)
                || (step < 0 && value < to)){
                AnimationUtils.clearInterval(id)
                value = to
            }
            callBack(value);
        }
      }

}