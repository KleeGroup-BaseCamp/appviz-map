import {Easings} from "./Easings"

export class AnimationUtils {
    private static animations:number = 0;
    private static readonly easings = new Easings()

    public static isActive ():  boolean{
        return AnimationUtils.animations > 0
    }    

    private static setInterval(fun: (...args: any[]) => void, interval: number) : any{
        AnimationUtils.animations ++
        return setInterval(fun, interval)
    }
    
    private static clearInterval(id: any): void{
        AnimationUtils.animations --
        clearInterval(id)
    }

    public static animate(from: number, to: number, duration: number, callBack: (v:number) => void): void  {
        callBack(from)
        if (from ===to) return //When from===to there is no animaation

        const interval = 20 /*ms*/
        const id = AnimationUtils.setInterval(animate, interval)
        const easing : ((r:number)=> number) = AnimationUtils.easings.easeOutSine
        const maxStep = duration / interval

        let step = 0 // from 0 to maxStep (+ margin)
        function animate() {
            step++
            let value = from
            if ( step > (maxStep+10)){
                value = to
                AnimationUtils.clearInterval(id)
            }
            let r = step / maxStep
            if (r >=1) {
                value = to
            }else{
                value = from + (to-from)* easing(r)
            }    
            callBack(value)
        }
      }
}