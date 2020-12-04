import {ModelRepository} from "../model";
import {Layer} from "../neon"
import {Layout} from "../types"

export interface View {

    provideLayers(modelRepository?: ModelRepository, layout?: Layout): Layer[]

}  