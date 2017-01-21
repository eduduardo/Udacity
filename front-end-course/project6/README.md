# Website Performance Optimization portfolio project

This repository is a challenge for make this portfolio project optimize by applying the techniques for optimize the critical rendering path and make page render as quickly as possible.

## Install the project

1. Clone this repo into your machine
2. Run on terminal: ``npm install`` and ``gulp``
3. The files builded will be place at `dist/`
4. Start `dist/index.html` to see the results or run you local server:
```
cd dist
php -S localhost:8080
```
or deploy on an external server.
5. Analyses the performance with Chrome Dev Tools or using SpeedTest.

## Portifolio
- Basics optimizations in html structure (comments are in the file)
- Moved js for the end of the .html
- Downloaded images of projects into img for can be optimize by gulp
- Added bootstrap grid for it be responsible
- Added gulp tasks for minify:
  - HTML
  - CSS
  - JavaScript
  - Images
- Added gulp task for make css inline

## Pizza page
- Fixed some missing html tags, ex.: charset, title, alts
- Added gulp tasks also for this folder
- Capitalize pizza moved to CSS (text-transform)
- Debouncing scroll event with requestAnimationFrame
- Changed `querySelectors` to specifics like `getElementById`, `getElementsByClassName`
- Optimize `changePizzaSizes` loop
- Optimze `updatePositions` loop with css transform (translateX)
- Added logic for get the number of pizzas based on the width / height of the window

## References used
- <https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/>
- <https://gist.github.com/Warry/4254579>
- <http://www.html5rocks.com/en/tutorials/speed/animations/>
- <https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight>
