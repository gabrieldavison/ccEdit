# TODO

- Replace all url imports with npm ones or download them into lib folder

## Wishlist

- Replace raw 3js with a-frame
    - Need to design a new 3D api arounf this but I think it will be more ergonomic in the long run
- API for easy midi binding / unbinding
    - Havent ended up needing midi much since adding sequencing feature
- A way that makes managing the threejs scene more ergonomic
- Shouldn't have to worry about assigning / keeping track of things in the graph
- This is the same for the temporal stuff
- Maybe some kind of HUD for these things where they get assigned a name that's easy to copy (i.e one click)
- You can just push these objects to an array with a callback function that gets rid of them.
- When you click the button the callback function is run and then they remove themselves from the array.


- Work out how you want to do history / rollback
    - This should be easy until you want to add section evaluation (Then you need a working file that has commands appended to it)