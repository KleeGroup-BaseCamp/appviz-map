import {ModelRepository} from "../model/index";
import {Layer} from "../core/index"
import {Layout} from "../types/index"

export interface View {

    provideLayers(modelRepository?: ModelRepository, layout?: Layout): Layer[]

}  