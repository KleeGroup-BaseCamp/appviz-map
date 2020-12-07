import {VElement2, VElementProps} from "../../core"
import {AnimationUtils} from "../../utils"
import * as p5 from "p5"

class Bolt {
    private pos: p5.Vector
    private vel: p5.Vector
    private radius : number

    constructor(radius : number){
        this.radius = radius
        this.pos = this.createPos()
        this.vel = this.createVel()
    }
    private createVel(): p5.Vector {
        const norm = mag(this.pos.x, this.pos.y)
        return createVector(-this.pos.x/norm, -this.pos.y/norm).mult(random())
    }    
    private createPos(): p5.Vector{
        const rnd = random()
        const x = this.radius * cos(TWO_PI* rnd)
        const y = this.radius * sin(TWO_PI* rnd)
        return  createVector(x, y)
    }       

    public update():void {
        this.pos.add(this.vel)
    
        //let rotation = random(TWO_PI);
        //this.vel.x += cos(rotation) * 0.1
        //this.vel.y += sin(rotation) * 0.1
        
        const norm = mag(this.pos.x, this.pos.y)  
        if (norm  > this.radius || norm < this.radius*0.7){ 
            this.pos = this.createPos()
            this.vel = this.createVel()
        }
    }
    public render():void {
        let c : p5.Color = color('cyan')
        //c.setAlpha( 255* mag(this.pos.x, this.pos.y)/this.radius/4)
        stroke(c);
        strokeWeight(4)
        line(this.pos.x, 
            this.pos.y, 
            this.pos.x + this.vel.x * 20, 
            this.pos.y + this.vel.y * 20)
    }
}

export class BlackHole3 extends VElement2{
    //Inspiration : https://www.openprocessing.org/sketch/1015571
    private readonly radius: number
    private readonly bolts : Bolt[]
 
    constructor(percent: number, props: VElementProps){
        super(props, false)
        const duration = 10000 /*ms*/
        this.radius = min (this.getWidth(), this.getHeight())/2
        this.bolts = BlackHole3.createBolts(250, this.radius)
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
        strokeWeight(2)
        noFill()
        stroke('lemon')
        circle(0,0, 2* this.radius)
        //colorMode(HSB);
//        stroke(frameCount% 255, 255, 255);
        for (let bolt of this.bolts)  {
            bolt.render()
            bolt.update()
        }
        pop()
    }    

    public needsClear(): boolean {
        return true
    }
      
}