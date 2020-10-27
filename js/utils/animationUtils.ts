export class AnimationUtils {
    private static animations:number = 0;

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