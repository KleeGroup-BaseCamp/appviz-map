import {VElement} from "../core"
import {PxSize} from "../layout"
import {AnimationUtils} from "../utils"
import * as p5 from "p5"

class Bolt {
    pos: p5.Vector
    vel: p5.Vector
    radius : number

    constructor(radius : number){
        this.radius = radius
        this.pos = this.createPos()
        this.vel = createVector(0, 0)
    }
    
    private createPos(): p5.Vector{
        const rnd = random()
        const x = this.radius * cos(TWO_PI* rnd)*0.6
        const y = this.radius * sin(TWO_PI* rnd)*0.6
        return  createVector(x, y)
    }       

    public tick():void {
        this.pos.add(this.vel)
    
        let rotation = random(TWO_PI);
        this.vel.x += cos(rotation) * 0.1
        this.vel.y += sin(rotation) * 0.1
        
        const norm = mag(this.pos.x, this.pos.y)  
        if (norm  > this.radius || norm < this.radius/3){ 
            this.pos = this.createPos()
            this.vel = createVector(0, 0)
        }
    }
    public render():void {
        line(this.pos.x, 
            this.pos.y, 
            this.pos.x + this.vel.x * 2, 
            this.pos.y + this.vel.y * 2)
    }
}

export class BlackHole2 extends VElement{
    //Inspiration : https://www.openprocessing.org/sketch/1015571
    private readonly radius: number
    private readonly bolts : Bolt[]
 
    constructor(id: any, pxSize: PxSize, percent: number){
        super(id, pxSize, false)
        const duration = 10000 /*ms*/
        this.radius = min (pxSize.getWidth(), pxSize.getHeight())/2
        this.bolts = BlackHole2.createBolts(150, this.radius)
        AnimationUtils.animate(0, 1000, duration, (i)=> {})
    }


    private static createBolts(num : number, _radius : number) : Bolt[] {
        const _bolts = []  
        for (let i = 0; i < num; i++) {
            _bolts.push(new Bolt(_radius))
        }
        return _bolts
    }
    
    public render() : void {
        push()
        translate(this.getWidth()/2, this.getHeight()/2)
        colorMode(HSB);
        stroke(frameCount% 255, 255, 255);
        for (let bolt of this.bolts)  {
            bolt.tick()
            bolt.render()
        }
        pop()
    }    

    public needsClear(): boolean {
        return false
    }
      
}