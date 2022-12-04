# ccEdit

A system for browser based live coding. Comprised of an editor layer and a view layer that communicate using a websocket server. This way the editor and view layers can be run in separate browser windows (or potentially on separate machines).

The editor is built with react and codemirror and it allows you to evaluate code line by line.

The view layer is built for a specific performance I had in mind and uses p5.js, hydra and threejs to generate live visuals.

At the moment everything is very specific to how I use code to create visuals and I haven't put in much thought to how someone else might want to use it.

Theres a big refactor that's going to happen when I have more free time so that I can turn this into something that might be useful to other people 

Feel free to have a poke around, here's a bash script `start.sh` for starting everything in the root of the project.

The editor will runn on `http://localhost:3000/`

The view layer will run on `http://localhost:3000/`