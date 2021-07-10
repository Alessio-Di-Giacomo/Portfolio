import { spline } from 'https://cdn.skypack.dev/@georgedoescode/spline@1.0.1';
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@2.4.0';

const simplex = new SimplexNoise();

// how fast we progress through "time"
let noiseStep = 0.00015;

function noise(x, y) {
  // return a value at {x point in time} {y point in time}
  return simplex.noise2D(x, y);
}

let hueNoiseOffset = 0;


const timer = ms => new Promise(res => setTimeout(res, ms))

async function load () { // We need to wrap the loop into an async function for this to work
  for (var i = 0; i < 10; i++) {
    noiseStep += 0.0004;
    await timer(100); // then the created Promise can be awaited
  }
}

async function unload () { // We need to wrap the loop into an async function for this to work
  for (var i = 0; i < 10; i++) {
    noiseStep -= 0.0004;
    await timer(200); // then the created Promise can be awaited
  }
}



document.querySelector('path').addEventListener('mouseover', () => {
  load();
  });
  
  document.querySelector('path').addEventListener('mouseleave', () => {
    unload();
  });


// our <path> element
const path = document.querySelector('path');
// used to set our custom property values
const root = document.documentElement;

function createPoints(){
    const points = [];
    const numPoints = 6;
    const angleStep = (Math.PI*2) / numPoints;
    const rad = 75;

    for (let i = 1; i <=numPoints; i++){
        const theta = i * angleStep;

        const x = 100 + Math.cos(theta) * rad;
        const y = 100 + Math.sin(theta) * rad;

        points.push({
            x:x,
            y:y,
            originX:x,
            originY:y,
            noiseOffsetX:Math.random()*1000,
            noiseOffsetY: Math.random()*1000,
        })

    }

    return points;
}

const points = createPoints();

(function animate() {
    path.setAttribute('d', spline(points, 1, true));
    
    requestAnimationFrame(animate);

      // for every point...
  for (let i = 0; i < points.length; i++) {
    const point = points[i];

    // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
    const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
    const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
    // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
    const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
    const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

    // update the point's current coordinates
    point.x = x;
    point.y = y;

    // progress the point's x, y values through "time"
    point.noiseOffsetX += noiseStep;
    point.noiseOffsetY += noiseStep;
  }
  hueNoiseOffset += noiseStep / 6;
  const hueNoise = noise(hueNoiseOffset, hueNoiseOffset);
  const hue = map(hueNoise, -1, 1, 0, 360);

  // HUE CHANGING
  root.style.setProperty("--startColor", `#34CEFF`);
  root.style.setProperty("--stopColor", `#F26D33`);
  
  
  })();

// map a number from 1 range to another
function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  }


// ------------------------------------------------------------------------------------ BLOTTER TEXT ---------------------------------------------------------------------------------------

let mouseCursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.nav-el');
let skills = document.querySelectorAll('.sliding-section')
let title = document.querySelector('.title')

  window.addEventListener('mousemove', cursor)
  function cursor(e){
      var x = e.pageX;
      var y = e.pageY;
      mouseCursor.style.left = x + 'px';
      mouseCursor.style.top = y + 'px';
  }
  const pointer = document.getElementsByClassName('pointer').innerHTML
  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
      mouseCursor.classList.add('link-grow');
      mouseCursor.classList.add('link-grow::after');
    });
    link.addEventListener('mouseleave', () => {
      mouseCursor.classList.remove('link-grow');
    });
  });

  skills.forEach(link => {
    link.addEventListener('mouseover', () => {
      mouseCursor.classList.add('slide-grow');
    });
    link.addEventListener('mouseleave', () => {
      mouseCursor.classList.remove('slide-grow');
    });
  });