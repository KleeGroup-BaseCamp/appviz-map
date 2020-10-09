class Style {
    #icons = {
        dt: "\uf15b",
        tk: "\uf085"
    }

    constructor() {
    }

    icon = {
        font : undefined, 
        size : {
            s: 16
        }    
    }    

    text = {
        font : undefined,
        size : {
            xxs: 12,
            xs: 14,
            s: 16,
            m: 20,
            l: 26,
            xl: 32,
            xxl: 42,
            default: 60
        },
        color : 255
    }

    getIcon(itemPrefix) {
        return this.#icons[itemPrefix]
    }

    load() {
        this.text.font = loadFont("fonts/Roboto-Regular.ttf")
        this.icon.font = loadFont("fonts/fa.otf")
    }

    color = {
        background : "#041c3c"

        //to be continued .......
    }

    getPrimaryBorderColor(type, zone = null) {
        switch (type) {
            case "zoneTitle":
                return color(255)
            case "zone":
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
}
