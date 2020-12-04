import {ItemTypeName} from "../../types"

export class Icons {
    private static icons = {
        data: "\ue0ee", // \uf15b
        task: "\ue566",
    }

    public static getIcon(itemTypeName: ItemTypeName): string {
        return this.icons[itemTypeName]
    }
}