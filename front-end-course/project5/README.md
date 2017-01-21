# CrossJSGame
Project made for the front-end nanodegree of Udacity. It consists in a simple crossing road game, which the player need to cross the road without coliding with the bugs and finish it at the water.

**Demo:** https://www.youtube.com/watch?v=SxeHV1kt7iU&feature=youtu.be

## Install
1. Donwload or clone the project code source.
2. Run the `index.html` or include the follwing HTML code to your page:
```
<div class="over">
    <h1>CrossJSGame</h1>
    <div id="score"></div>
    <p>Tip: press CTRL for change the player char</p>
</div>
<script src="js/resources.js"></script>
<script src="js/app.js"></script>
<script src="js/engine.js"></script>
```
3. The div "over" is optional
4. Run the game and enjoy :)

## How to play
Use the arrow keys for move the character around, the goal is to reach the water, once there you gain 1 point. :)

## Structure
- resources.js - libary from udacity for load sprites
- engine.js - libary from udacity for the game core
- app.js - the game itself with all the logic.
