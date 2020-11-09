export interface Tweening {
    /**
     * Function y = f(r)
     *  r in [0, 1]
     *  r = 0 => y = 0
     *  r = 1 => y = 1
     * 
     * WARNING : Some functions are out [0; 1]
     *  
     * @param r : stepRatio in [0;1]
     * @return [0; 1]
     */
    do (r: number):number
}    