# TODO


- API for easy midi binding / unbinding

- flesh out temporal api with the functions in my notes

- make the threejs api more ergonomic
    - Start with spawning / manipulating objects
    - Work out the best way to make mutable changes to the render loop.
    - Think about camera manipulation

- fix temporal features
    - ?think these are actually working now and it's the api that's a bit wonky.

- Replace all url imports with npm ones or download them into lib folder

## Wishlist

- A way that makes managing the threejs scene more ergonomic
- Shouldn't have to worry about assigning / keeping track of things in the graph
- This is the same for the temporal stuff
- Maybe some kind of HUD for these things where they get assigned a name that's easy to copy (i.e one click)
- You can just push these objects to an array with a callback function that gets rid of them.
- When you click the button the callback function is run and then they remove themselves from the array.


- Work out how you want to do history / rollback
    - This should be easy until you want to add section evaluation (Then you need a working file that has commands appended to it)