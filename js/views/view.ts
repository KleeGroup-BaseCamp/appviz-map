import ModelRepository from "../model/modelRepository";
import Layer from "../core/layer"
import {Layout} from "../types/types"

export default class View {

    provideLayers(modelRepository?: ModelRepository, layout?: Layout): Layer[] {
        throw 'render method MUST be overridden'
    }    

} 