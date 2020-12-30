# Core

== Map ==
The map is the core of n3on. All you can see is a map.
A *map* is composed of *layers*. (As you can figure with openStreetMap, Leaflet, openLayers or google Maps)
You can interact with the map

== Layer ==
The layers are stacked from the background layer to the top layer
Each *layer* is composed of *components*

== View ==
A *view* provides a set of *layers*

==Component==
The leaf of the model
A component is contained in a box and has a width and a height
You can interact with a component
Each interaction sends an *event*.

==Event==
You can interact with the components
This can
    - mute the stete of the component
    - mute the global state
    - change the current "view"

As an effect, the map is rendered