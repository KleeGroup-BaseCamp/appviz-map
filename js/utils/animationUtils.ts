import {Tweening} from "./tweening"
import {TweeningFactory} from "./tweeningFactory"

export class AnimationUtils {
    private static animations:number = 0;
    private static readonly tweeningFacory = new TweeningFactory()

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
        let step = 0
        callBack(from)
        if (from ===to) return 
        const interval = 10 /*ms*/
        const id = AnimationUtils.setInterval(animate, interval)
        const tweening : Tweening = AnimationUtils.tweeningFacory.easeOutSine()
        const maxStep = duration/ interval 
        let value :number = from
        function animate() {
            step++
            if ( step > (maxStep+10)){
                value = to
                AnimationUtils.clearInterval(id)
            }
            let r = step / maxStep
            if (r >=1) {
                value = to
            }else{
                value = tweening.do(from, (to-from), r)
            }    
            callBack(value);
        }
      }
}