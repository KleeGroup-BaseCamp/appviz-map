import * as p5 from "p5"

export type RadarData2 = {[label: string]: number}

export class RadarDataSystem2 {
    public readonly  points :p5.Vector[]= []
    
    constructor(radarData : RadarData2, radius: number){
        const keys = Object.keys(radarData)
        const angleStep = TWO_PI / keys.length

        for(let i = 0; i < keys.length; i++){
            const r = radius * (radarData[keys[i]] / 100)     
            const alpha = - HALF_PI + angleStep * i 
            this.points.push(createVector(r * cos(alpha), r * sin(alpha)))
        }
    }

    /*
    * Computes a tangent vector.
    * its mag is the mag of the vector point
    */ 
    public tangent(i:number):p5.Vector{
        const prevPoint = this.getPoint(i-1)
        const point = this.getPoint(i)
        const nextPoint = this.getPoint(i+1)
        
        const  norm =  p5.Vector.sub(nextPoint, prevPoint).normalize()
        return norm.mult(point.mag())
    }

    public getPoint(i:number):p5.Vector{
        //we add the modulo length to avoid a neg number when calculating a modulo
        return  this.points[(i+this.points.length)%this.points.length]
    }
}
