import {Easings} from "./easings"

type Ease = (r:number) => number
export class AnimationUtils {
    private static animations:number = 0;
    private static readonly easings = new Easings()

    public static isActive ():  boolean{
        return AnimationUtils.animations > 0
    }    

    public static count ():  number{
        return AnimationUtils.animations
    }    

    private static setInterval(fun: (...args: any[]) => void, interval: number) : any{
        AnimationUtils.animations ++
        return setInterval(fun, interval)
    }
    
    private static clearInterval(id: any): void{
        AnimationUtils.animations --
        clearInterval(id)
    }
    
    /**
     * 
     * @param from 
     * @param to 
     * @param duration 
     * @param callBack 
     * @param ease Easing or easeout function
     */
    public static animate(from: number, to: number, duration: number, callBack: (v:number) => void, ease?: Ease): void  {
        callBack(from)
        if (from ===to) return //When from===to there is no animaation

        const interval = 20 /*ms*/
        const id = AnimationUtils.setInterval(animate, interval)
        const e: Ease = ease ?? AnimationUtils.easings.easeOutSine
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
                value = from + (to-from)* e(r)
            }    
            callBack(value)
        }
      }
}