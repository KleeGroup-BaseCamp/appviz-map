class Style {
    constructor() {
    }

    getFont(isIcon) {
        return isIcon ? fonts.fa : fonts.roboto
    }

    getFontSize(fontSize) {
        switch (fontSize) {
            case "xxs":
                return 12
            case "xs":
                return 14
            case "s":
                return 16
            case "l":
                return 26
            case "xl":
                return 32
            case "xxl":
                return 42
            default:
                return 20
        }

    }

    getPrimaryStroke(type, zone = null) {
        switch (type) {
            case "zoneTitle":
                return 255
            case "group":
                switch (zone) {
                    case "pilotage":
                        return [91, 8, 194]
                    case "operationnel":
                        return [68, 128, 5]
                    case "referentiel":
                        return [107, 38, 3]
                    default:
                        return [255, 251, 0]
                }
            case "itemType":
                return [1, 255, 255]
            case "groupTitle":
                return 255
            case "elementTypeTitle":
                return 255
            case "item":
                return [1, 255, 255]
            default:
                return [255, 251, 0]
        }
    }

    getSecondaryStroke(type) {
        switch (type) {
            case "group":
                return [1, 255, 255]
            default:
                return [255, 251, 0]
        }
    }

    getShapeFill(type, state) {
        switch (type) {
            case "zoneTitle":
                return [0, 0]
            case "group":
                switch (state) {
                    case "default":
                        return [4, 12, 44]
                    case "hover":
                        return [4, 82, 134]
                    default:
                        return [255, 251, 0]
                }
            case "itemTypeDetail":
                switch (state) {
                    case "default":
                        return [4, 54, 95]
                    case "hover":
                        return [4, 108, 156]
                    default:
                        return [255, 251, 0]
                }
            default:
                [255, 251, 0]
        }
    }

    getTextFill() {
        return 255
    }

}


