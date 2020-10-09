class Style {
    #icons = {
        dt: "\uf15b",
        tk: "\uf085"
    }

    #fonts = {}

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
    }

    getIcon(itemPrefix) {
        return this.#icons[itemPrefix]
    }

    load() {
        this.#fonts.roboto = loadFont("fonts/Roboto-Regular.ttf")
        this.#fonts.fa = loadFont("fonts/fa.otf")
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

    getPrimaryBorderColor(type, zone = null) {
        switch (type) {
            case "zoneTitle":
                return color(255)
            case "group":
                switch (zone) {
                    case "pilotage":
                        return color([91, 8, 194])
                    case "operationnel":
                        return color([68, 128, 5])
                    case "referentiel":
                        return color([107, 38, 3])
                    default:
                        return color([255, 251, 0])
                }
            case "itemType":
                return color([1, 255, 255])
            case "groupTitle":
                return color(255)
            case "elementTypeTitle":
                return color(255)
            case "item":
                return color([1, 255, 255])
            default:
                return color([255, 251, 0])
        }
    }

    getSecondaryBorderColor(type) {
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
                return color([0, 0])
            case "group":
                switch (state) {
                    case "default":
                        return color([4, 12, 44])
                    case "hover":
                        return color([4, 82, 134])
                    default:
                        return color([255, 251, 0])
                }
            case "item":
                switch (state) {
                    case "default":
                        return color([4, 54, 95])
                    case "hover":
                        return color([4, 108, 156])
                    default:
                        return color([255, 251, 0])
                }
            case "itemTypeDetail":
                return color([100, 100, 200])
            default:
                color([255, 251, 0])
        }
    }

    getTextColor() {
        return color(255)
    }
}


