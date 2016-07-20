import template from './snowyvis.html';
import controller from './snowyvis.controller';
import './snowyvis.scss';

const snowyvisComponent = () => ({
  bindToController: true,
  restrict: 'EA',
  template,
  controller,
  controllerAs: 'vm',
  link: snowyvisLink
});

function snowyvisLink(scope, el, attr, vm) {
  let branches = [];
  let section = d3.select("#snowscape");
  let width = section[0][0].clientWidth;
  let height = section[0][0].clientHeight;
  let swayer = 0;
  let seedRound = 0;
  let growthRate = 0.1;
  let daR;
  let numBranches = 2;

  let zoom = d3.behavior.zoom()
    .scaleExtent([1, 5])
    .on("zoom", zooming);

  let svg = section.append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

  let trees = svg.append('g');

  let circles = initCircles();

  let seed = [
    { i: 0, x: (4 * width) / 8, y: height, initAngle: 0, initLength: 90, initDepth: 0, angleDelta: 0.4, lengthDelta: 0.85, randomFactor: 0.3, maxDepth: 8, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (1 * width) / 8, y: height, initAngle: 0, initLength: 40, initDepth: 0, angleDelta: 0.4, lengthDelta: 0.85, randomFactor: 0.4, maxDepth: 6, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (2 * width) / 8, y: height, initAngle: 0, initLength: 30, initDepth: 0, angleDelta: 0.3, lengthDelta: 0.85, randomFactor: 0.5, maxDepth: 6, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (3 * width) / 8, y: height, initAngle: 0, initLength: 60, initDepth: 0, angleDelta: 0.45, lengthDelta: 0.85, randomFactor: 0.3, maxDepth: 6, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (5 * width) / 8, y: height, initAngle: 0, initLength: 40, initDepth: 0, angleDelta: 0.3, lengthDelta: 0.85, randomFactor: 0.4, maxDepth: 6, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (6 * width) / 8, y: height, initAngle: 0, initLength: 30, initDepth: 0, angleDelta: 0.4, lengthDelta: 0.85, randomFactor: 0.3, maxDepth: 6, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (7 * width) / 8, y: height, initAngle: 0, initLength: 50, initDepth: 0, angleDelta: 0.5, lengthDelta: 0.85, randomFactor: 0.3, maxDepth: 6, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (0 * width) / 16, y: height, initAngle: 0, initLength: 10, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (1 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 3, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (2 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (3 * width) / 16, y: height, initAngle: 0, initLength: 10, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (4 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 3, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (5 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (6 * width) / 16, y: height, initAngle: 0, initLength: 10, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (7 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 3, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (8 * width) / 16, y: height, initAngle: 0, initLength: 15, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (9 * width) / 16, y: height, initAngle: 0, initLength: 10, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (10 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 3, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (11 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (12 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (13 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 3, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (14 * width) / 16, y: height, initAngle: 0, initLength: 10, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (15 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 4, h: 0, s: 1, l: 0.5 },
    { i: 0, x: (16 * width) / 16, y: height, initAngle: 0, initLength: 6, initDepth: 0, angleDelta: 0.5, lengthDelta: 1.20, randomFactor: 0.5, maxDepth: 3, h: 0, s: 1, l: 0.5 }
  ];

  function zooming() {
    let e = d3.event;
    let tx = Math.min(0, Math.max(e.translate[0], width - width * e.scale));
    let ty = Math.min(0, Math.max(e.translate[1], height - height * e.scale));

    zoom.translate([tx, ty]);

    trees.attr("transform", ["translate(" + [tx, ty] + ")", "scale(" + e.scale + ")"].join(" "));
    circles.attr("transform", ["translate(" + [tx, ty] + ")", "scale(" + e.scale + ")"].join(" "));
  }

  function initCircles() {
    return svg.append('g')
      .selectAll("circle")
      .data(d3.range(500).map(initParticles))
      .enter()
      .append("circle")
      .attr("opacity", 0.7)
      .attr("r", (d) => d.r)
      .attr("stroke", "white")
      .style("fill", "white");
    // .style("stroke", function(d, i) {
    //   return d3.hsl((i = (i + 1) % 360), 1, 0.5);
    // })
    // .style("fill", function(d, i) {
    //   return d3.hsl((i = (i + 1) % 360), 1, 0.5);
    // });
  }

  function initParticles() {
    return {
      x: width * Math.random(), //starting x position
      y: height * Math.random(), //starting y position
      dx: Math.random() * (1.5 - (-1.5)) + -1.5, // horizontal movement
      dy: -(Math.random() * (2.5 - 2.5) + 2.5), // vertical movement
      r: Math.random() * ((2) - (0.8)) + (0.8) // radius
    };
  }

  function x1(d) {
    return d.x;
  }

  function y1(d) {
    return d.y;
  }

  function x2(d) {
    return endPt(d).x;
  }

  function y2(d) {
    return endPt(d).y;
  }

  function endPt(b) {
    let x = b.x + b.initLength * Math.sin(b.initAngle);
    let y = b.y - b.initLength * Math.cos(b.initAngle);
    return { x: x, y: y };
  }

  // vm.helperFactory.watchWinSize(scope, startVis);
  vm.helperFactory.watchWinSize(scope, updateVis);
  startVis();

  function updateVis() {
    // d3.select('svg').remove();
    d3.selectAll('line').remove();
    // d3.selectAll('circle').remove();
    // console.log(width); // old
    // console.log(section[0][0].clientWidth); // new
    let xRatio = section[0][0].clientWidth / width;
    let yRatio = section[0][0].clientHeight / height;


    trees.selectAll('line')
      .data(branches)
      .enter()
      .append('line')
      .classed('ends', (d) => d.initDepth === d.maxDepth)
      .attr('x1', (d) => d.x1 = x1(d) * xRatio)
      .attr('y1', (d) => d.y1 = y1(d) * yRatio)
      .attr('x2', (d) => d.x2 = x2(d) * xRatio)
      .attr('y2', (d) => d.y2 = y2(d) * yRatio)
      .style('stroke-width', (d) => Math.max(0.6, parseInt(d.maxDepth + 1 - d.initDepth) / 2) + 'px')
      // .style("stroke", 'white')
      // .style("stroke", 'red')
      .style("stroke", (d, i) => d3.hsl(d.h, d.s, d.l));
    // .style("stroke", function(d, i) {
    //   d.l = (d.y / height);
    //   return d3.hsl(d.h, 0, d.l);
    // })

  }

  function startVis() {
    // let circles = svg.append('g')
    //   .selectAll("circle")
    //   .data(d3.range(500).map(initParticles))
    //   .enter()
    //   .append("circle")
    //   .attr("opacity", 0.7)
    //   .attr("r", (d) => d.r)
    //   .attr("stroke", "white")
    //   .style("fill", "white");
    // // .style("stroke", function(d, i) {
    // //   return d3.hsl((i = (i + 1) % 360), 1, 0.5);
    // // })
    // // .style("fill", function(d, i) {
    // //   return d3.hsl((i = (i + 1) % 360), 1, 0.5);
    // // });

    // -----particle movement / boundary wrapping-----

    function particleMovement(d) {
      circles.attr("cx", function(d) {
          d.x += d.dx;
          if (d.x > width) d.x -= width;
          else if (d.x < 0) d.x += width;
          return d.x;
        })
        .attr("cy", function(d) {
          d.y -= d.dy;
          if (d.y > height) d.y -= height;
          return d.y;
        });
      // .attr("r", (d) => d.r * (1 + (Math.random() * ((0.6) - (-0.7)) + (-0.7))));
    }

    function branch(b) {
      if (b.i === Math.pow(2, b.initDepth + 1) - 2) {
        create();
        if (b.i === Math.pow(2, b.maxDepth + 1) - 2 && seedRound < seed.length) {
          generate(seedRound);
        } else if (b.i === Math.pow(2, b.maxDepth + 1) - 2 && seedRound == seed.length) {
          d3.timeout(allBuilt, (growthRate * b.initLength));
        }
      }
      if (b.initDepth < b.maxDepth) {
        d3.timeout(branchOut.bind(null, b), (growthRate * b.initLength));
      }
    }

    function branchOut(b) {
      for (let i = 0; i < 2; i++) {
        let newBranch = Object.assign({}, b);
        let end = endPt(b);
        daR = b.randomFactor * Math.random() - b.randomFactor * 0.5;
        newBranch.p = b.i;
        newBranch.i = b.i * 2 + 1 + (i % 2);
        newBranch.x = end.x;
        newBranch.y = end.y;
        newBranch.initAngle = (i % 2) ? b.initAngle + daR + b.angleDelta : b.initAngle + daR - b.angleDelta;
        newBranch.initLength = b.initLength * b.lengthDelta;
        newBranch.initDepth = b.initDepth + 1;
        branch(newBranch);
        branches.push(newBranch);
        newBranch = Object.assign({}, b);
      }
    }

    function generate(n) {
      branch(seed[n]);
      branches.push(seed[n]);
      seedRound++;
    }

    function create() {
      trees.selectAll('line')
        .data(branches)
        .enter()
        .append('line')
        .classed('ends', (d) => d.initDepth === d.maxDepth)
        .attr('x1', (d) => d.x1 = x1(d))
        .attr('y1', (d) => d.y1 = y1(d))
        .attr('x2', x1)
        .attr('y2', y1)
        .style('stroke-width', (d) => Math.max(0.6, parseInt(d.maxDepth + 1 - d.initDepth) / 2) + 'px')
        // .style("stroke", 'white')
        // .style("stroke", 'red')
        .style("stroke", function(d, i) {
          d.h = (d.initDepth / d.maxDepth) * ((height - d.y) / height) * 360 + Math.random() * (10 - (-10)) + -10;
          return d3.hsl(d.h, 1, 0.5);
        })
        // .style("stroke", function(d, i) {
        //   d.l = (d.y / height);
        //   return d3.hsl(d.h, 0, d.l);
        // })
        .transition()
        .ease("linear")
        .duration((d) => growthRate * d.initLength)
        .attr('x2', (d) => d.x2 = x2(d))
        .attr('y2', (d) => d.y2 = y2(d));

    }

    function allBuilt() {
      // d3.interval(sway, 5000);
      // d3.interval(darkPulse, 1500);
      // d3.interval(darkCycle, 500);
      d3.interval(colorCycle, 100);
      // d3.interval(darkWave, 500);
      // d3.interval(redCycle, 500);
    }

    function darkPulse() {
      d3.selectAll('line')
        .transition()
        .ease('sin')
        .duration(1500)
        .style("stroke", function(d) {
          if (d.l === 0.5) d.l = 0.1;
          else if (d.l === 0.1) d.l = 0.5;
          return d3.hsl(d.h, 1, d.l);
        });
    }

    function colorCycle() {
      d3.selectAll('line')
        .style("stroke", function(d) {
          d.h -= 5;
          return d3.hsl(Math.abs(d.h % 360), 1, 0.5);
        });
    }

    function darkWave() {
      d3.selectAll('line')
        .transition()
        .ease('sin')
        .duration(500)
        .style("stroke", function(d) {
          d.l += 0.4;
          return d3.hsl(d.h, 0, Math.floor(d.l % 0.8));
        });
    }

    function redCycle() {
      d3.selectAll('line')
        .transition()
        .ease('sin')
        .duration(500)
        .style("stroke", function(d) {
          d.l += Math.random() * (1 / 3);
          return d3.hsl(d.h, 1, d.l % 0.3);
        });
    }

    function darkCycle() {
      d3.selectAll('line')
        .transition()
        .ease('sin')
        .duration(500)
        .style("stroke", function(d) {
          d.l += Math.random() * (1 / 3);
          return d3.hsl(d.h, 0, d.l % 0.3);
        });
    }

    function sway() {
      swayer = Math.random() * (1.5 + 1.5) - 1.5;

      d3.selectAll('line')
        .transition()
        .ease('sin')
        .duration(1000)
        .attr("x2", (d) => d.initDepth - 1 && d.maxDepth > 4 ? d.x2 + swayer * d.initDepth * (height - d.y1) / height : d.x2)
        .attr("x1", (d) => d.initDepth - 2 && d.maxDepth > 4 ? d.x1 + swayer * (d.initDepth - 1) * (height - d.y1) / height : d.x1)
        .transition()
        .ease('sin')
        .duration(1000)
        .attr("x2", (d) => d.x2)
        .attr("x1", (d) => d.x1);
    }

    generate(seedRound);
    d3.timer(particleMovement);
  }
}

export default snowyvisComponent;
