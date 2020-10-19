# layout

A shape is defined in a coordinates system by
- a position
- a size

We have two coordinates systems
- Grid system (rows and columns)
- Px system (x pixels and y pixels)

So We have 4 main classes
- GridPosition
- GridSize
- PxPosition
- PxSize

And we can change the coordinates system ; these changes are all included in the Projection class.
Grid to Px
- gridToPxPosition
- gridToPxSize
Px to Grid
- pxToGridPosition
- pxToGridSize