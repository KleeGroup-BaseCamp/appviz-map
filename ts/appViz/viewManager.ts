import {View} from "../neon"

/*
ViewHandler is a function that builds a view from a set of params defined in a json object
*/
export type ViewHandler = (params? : {[name:string]: string|number|boolean})=> View


export class ViewManager {
    private viewHandlers : {[viewName:string]:ViewHandler}= {}

    constructor(){}
    
    public register(viewName:string, viewHandler: ViewHandler): void{
        this.viewHandlers[viewName]= viewHandler
    }

    public display (viewName:string,  viewparams? : {[name:string]: string|number|boolean}):View{
        const viewHandler = this.viewHandlers[viewName]
        if (! viewHandler) throw `no view registered for ${viewName}`
        return viewHandler(viewparams)
    }    
}
