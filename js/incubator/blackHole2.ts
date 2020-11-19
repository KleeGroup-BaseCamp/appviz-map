import {VElement} from "../core"
import {PxPosition, PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import * as p5 from "p5"
import {Easings} from "../utils/easings"

type Bolt = {
    pos: p5.Vector,
    vel: p5.Vector
}

export class BlackHole2 extends VElement{
    //Inspiration : https://www.openprocessing.org/sketch/1015571
    private readonly radius: number
    private readonly bolts : Bolt[]
 
    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        const duration = 10000 /*ms*/
        this.radius = min (pxSize.getWidth(), pxSize.getHeight())/2
        this.bolts = BlackHole2.createBolts(200, this.radius)
        AnimationUtils.animate(0, 1000, duration, (i)=> {})
    }

    private static createBolt(_radius : number):Bolt{
        const rnd = random()
        const x = _radius * cos(TWO_PI* rnd)/2
        const y = _radius * sin(TWO_PI* rnd)/2
        return  { 
            pos :  createVector(x, y),
            vel :  createVector(0, 0)
        }
    }

    private static createBolts(num : number, _radius : number) : Bolt[] {
        const _bolts = []  
        for (let i = 0; i < num; i++) {
            _bolts.push(BlackHole2.createBolt(_radius))
        }
        return _bolts
    }
    
    public render() : void {
        push()
        translate(this.getWidth()/2, this.getHeight()/2)
        colorMode(HSB);
        for (let bolt of this.bolts)  {
            bolt.pos.add(bolt.vel)
    
            let rotation = random(TWO_PI);
            bolt.vel.x += cos(rotation) * 0.1
            bolt.vel.y += sin(rotation) * 0.1
            
            const norm = mag(bolt.pos.x, bolt.pos.y)  
            if (norm  > this.radius || norm < this.radius/3){ 
                const b = BlackHole2.createBolt(this.radius)
                bolt.pos = b.pos
                bolt.vel = b.vel
            }
            stroke(frameCount / 2 % 255, 255, 255);
            line(bolt.pos.x, 
                bolt.pos.y, 
                bolt.pos.x + bolt.vel.x * 2, 
                bolt.pos.y + bolt.vel.y * 2)
        }
        pop()
    }    

    public needsClear(): boolean {
        return false
    }
      
}