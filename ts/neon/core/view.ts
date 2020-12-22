import {Layer} from ".."

export type ViewParams = {[name:string]:string|number|boolean}

export interface View {
    provideLayers(): Layer[]
}  