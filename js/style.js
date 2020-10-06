class Style {
    #fonts = {};

    #fontSizes = {
        xxs: 12,
        xs: 14,
        s: 16,
        m: 20,
        l: 26,
        xl: 32,
        xxl: 42,
        default: 60
    }
    constructor() {
        this.#fonts.roboto = loadFont("fonts/Roboto-Regular.ttf");
        this.#fonts.fa = loadFont("fonts/fa.otf");
    }

    getBackgroundColor() {
        return color("#041c3c")
    }

    getFont(isIcon) {
        return isIcon
            ? this.#fonts.fa
            : this.#fonts.roboto
    }

    getFontSize(fontSize) {
        return this.#fontSizes[fontSize]
            ? this.#fontSizes[fontSize]
            : this.#fontSizes.default
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
                return color(1, 255, 255)
            default:
                return color(255, 251, 0)
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


