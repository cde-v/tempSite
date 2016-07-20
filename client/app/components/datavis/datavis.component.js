import template from './datavis.html';
import controller from './datavis.controller';
import './datavis.scss';

let datavisComponent = function() {
  return {
    restrict: 'E',
    template,
    controller,
    controllerAs: 'vm',
    link: datavisLink
  };
};

function datavisLink(scope, el, attr) {
  drawTree();
}

function RBTree(value, parent) {
  // value = key
  this.value = value;

  // start off as red unless root node
  if (parent) this.color = "red";
  else this.color = "black";

  // init left/right
  this.left = null;
  this.right = null;

  // set parent
  this.parent = parent || null;
}

RBTree.prototype.insert = function(value, atRoot) {
  atRoot = atRoot || false;

  if (!atRoot && this.parent) {
    return this.parent.insert(value);
  } else {
    atRoot = true;
  }
  if (this.contains(value)) {
    return "Value already inserted";
  }
  if (value < this.value) {
    if (this.left === null) {
      this.left = new RBTree(value, this);
      this.left.rebalance();
    } else {
      this.left.insert(value, atRoot);
    }
  } else {
    if (this.right === null) {
      this.right = new RBTree(value, this);
      this.right.rebalance();
    } else {
      this.right.insert(value, atRoot);
    }
  }
};

RBTree.prototype.contains = function(value, atRoot) {
  atRoot = atRoot || false;
  if (!atRoot && this.parent) {
    return this.parent.contains(value);
  } else {
    atRoot = true;
  }
  if (this.value === value) {
    return true;
  } else if (value < this.value && this.left !== null) {
    return this.left.contains(value, atRoot);
  } else if (value > this.value && this.right !== null) {
    return this.right.contains(value, atRoot);
  }
  return false;
};

RBTree.prototype.rebalance = function() {

  // refactor (TOO MUCH THIS)

  if (!this.parent) {
    this.color = "black";
  }

  if (this.color === "red") {

    if (this.parent && this.parent.color === "red" && this.getParentSibling() && this.getParentSibling().color === "red") {
      this.getGrandParent().toggleColor();
      this.parent.toggleColor();
      this.getParentSibling().toggleColor();
    }

    if (this.parent && this.parent.color === "red" && (this.getParentSibling() === null || this.getParentSibling().color === "black") && this.parent.right === this && this.getGrandParent() && this.getGrandParent().right === this.parent) {
      let greatGP;
      if (this.getGrandParent().parent && this.getGrandParent().parent.left === this.getGrandParent()) {
        greatGP = 'right';
      } else if (this.getGrandParent().parent && this.getGrandParent().parent.right === this.getGrandParent()) {
        greatGP = 'left';
      }
      this.getGrandParent().right = null;
      if (this.parent.left) {
        this.parent.left.parent = this.getGrandParent();
        this.getGrandParent().right = this.parent.left;
      }
      let temp = this.getGrandParent();
      this.parent.parent = this.getGrandParent().parent;
      temp.parent = this.parent;

      this.parent.left = temp;
      if (this.getGrandParent() && greatGP === 'right') {
        this.getGrandParent().left = this.parent;
      } else if (this.getGrandParent() && greatGP === 'left') {
        this.getGrandParent().right = this.parent;
      }
      this.parent.left.toggleColor();
      this.parent.toggleColor();
    }

    if (this.parent && this.parent.color === "red" && (this.getParentSibling() === null || this.getParentSibling().color === "black") && this.parent.left === this && this.getGrandParent() && this.getGrandParent().right === this.parent) {
      if (this.getGrandParent().parent && this.getGrandParent().parent.right === this.getGrandParent()) {
        this.getGrandParent().parent.right = this;
      } else if (this.getGrandParent().parent && this.getGrandParent().parent.left === this.getGrandParent()) {
        this.getGrandParent().parent.left = this;
      }
      this.getGrandParent().right = null;
      if (this.left) {
        this.getGrandParent().right = this.left;
      }
      this.parent.left = null;
      if (this.right) {
        this.parent.left = this.right;
      }
      this.left = this.getGrandParent();
      this.right = this.parent;
      this.parent = this.getGrandParent().parent;
      this.left.parent = this;
      this.right.parent = this;
      if (this.left.right) {
        this.left.right.parent = this.left;
      }
      if (this.right.left) {
        this.right.left.parent = this.right;
      }
      this.toggleColor();
      this.left.toggleColor();
    }

    if (this.parent && this.parent.color === "red" && (this.getParentSibling() === null || this.getParentSibling().color === "black") && this.parent.left === this && this.getGrandParent() && this.getGrandParent().left === this.parent) {
      let greatGP;
      if (this.getGrandParent().parent && this.getGrandParent().parent.right === this.getGrandParent()) {
        greatGP = 'left';
      } else if (this.getGrandParent().parent && this.getGrandParent().parent.left === this.getGrandParent()) {
        greatGP = 'right';
      }
      this.getGrandParent().left = null;
      if (this.parent.right) {
        this.parent.right.parent = this.getGrandParent();
        this.getGrandParent().left = this.parent.right;
      }
      let temp = this.getGrandParent();
      this.parent.parent = this.getGrandParent().parent;
      temp.parent = this.parent;

      this.parent.right = temp;
      if (this.getGrandParent() && greatGP === 'left') {
        this.getGrandParent().right = this.parent;
      } else if (this.getGrandParent() && greatGP === 'right') {
        this.getGrandParent().left = this.parent;
      }
      this.parent.right.toggleColor();
      this.parent.toggleColor();
    }

    if (this.parent && this.parent.color === "red" && (this.getParentSibling() === null || this.getParentSibling().color === "black") && this.parent.right === this && this.getGrandParent() && this.getGrandParent().left === this.parent) {
      if (this.getGrandParent().parent && this.getGrandParent().parent.right === this.getGrandParent()) {
        this.getGrandParent().parent.right = this;
      } else if (this.getGrandParent().parent && this.getGrandParent().parent.left === this.getGrandParent()) {
        this.getGrandParent().parent.left = this;
      }
      this.getGrandParent().left = null;
      if (this.right) {
        this.getGrandParent().left = this.right;
      }
      this.parent.right = null;
      if (this.left) {
        this.parent.right = this.left;
      }
      this.right = this.getGrandParent();
      this.left = this.parent;
      this.parent = this.getGrandParent().parent;
      this.left.parent = this;
      this.right.parent = this;
      if (this.right.left) {
        this.right.left.parent = this.right;
      }
      if (this.left.right) {
        this.left.right.parent = this.left;
      }
      this.toggleColor();
      this.right.toggleColor();
    }
  }
  if (this.parent) {
    this.parent.rebalance();
  }
};

//self explanatory
RBTree.prototype.getGrandParent = function() {
  if (this.parent) {
    return this.parent.parent;
  }
  return null;
};

//self explanatory
RBTree.prototype.getParentSibling = function() {
  if (this.getGrandParent()) {
    if (this.getGrandParent().right === this.parent) {
      return this.getGrandParent().left;
    }
    if (this.getGrandParent().left === this.parent) {
      return this.getGrandParent().right;
    }
  }
  return null;
};

//self explanatory
RBTree.prototype.toggleColor = function() {
  if (this.color === "red") this.color = "black";
  else this.color = "red";
};

//traversal method
RBTree.prototype.depthFirst = function(callback, atRoot) {
  atRoot = atRoot || false;
  if (!atRoot && this.parent) {
    this.parent.depthFirst(callback);
  } else {
    atRoot = true;
    callback(this);
    if (this.left !== null) {
      this.left.depthFirst(callback, atRoot);
    }
    if (this.right !== null) {
      this.right.depthFirst(callback, atRoot);
    }
  }
};

function drawTree() {
  let container = d3.select("#container");

  let width = container[0][0].clientWidth;
  let height = container[0][0].clientHeight;

  let tree = null;

  let data = { "nodes": [], "links": [] };

  $(document).ready(function() {
    $("#insert").keypress(function(e) {
      if (e.which == 13) {
        let value = parseFloat($("#insert").val());
        if (!isNaN(value)) {
          if (tree) tree.insert(value);
          else tree = new RBTree(value);
          data.nodes = [];
          data.links = [];
          tree.depthFirst(function(node) {
            if (node.parent) {
              node.depth = node.parent.depth + 1;
              data.links.push({ "source": node, "target": node.parent });
            } else {
              node.depth = 0;
            }
            data.nodes.push(node);
          });
          data.nodes.sort((a, b) => a - b);
          update();
        }
        $("#insert").val('');
      }
    });
  });

  let svg = container
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  let force = d3.layout.force()
    .charge(-1000)
    .gravity(0.05)
    .size([width, height])
    .linkDistance((d) => 200 / (Math.log(d.source.depth) + 1))
    .friction(0.5);

  function update() {
    let text = svg.selectAll("text").data(data.nodes);
    let node = svg.selectAll("circle").data(data.nodes);
    let link = svg.selectAll("line").data(data.links);

    text.enter()
      .append("text")
      .attr("fill", "black");

    text.text((d) => d.value)
      .attr("font-size", "20px");

    text.exit().remove();

    node.enter()
      .append("circle")
      .attr("r", 20)
      .attr("x", 0)
      .attr("y", (d) => d.y = 30 + 70 * d.depth)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 4)
      .attr("fill", "transparent");

    node.attr("stroke", (d) => d.color);

    node.exit().remove();

    link.enter()
      .append("line")
      .style("stroke", "black");

    link.exit().remove();

    force.nodes(data.nodes)
      .links(data.links)
      .start();

    force.on("tick", tick);

    node.call(force.drag);

    function tick() {
      link.attr("x1", (d) => d.source.x + 0.25 * (d.target.x - d.source.x))
        .attr("y1", (d) => d.source.y + 0.25 * (d.target.y - d.source.y))
        .attr("x2", (d) => d.target.x + 0.25 * (d.source.x - d.target.x))
        .attr("y2", (d) => d.target.y + 0.25 * (d.source.y - d.target.y));

      node.attr("cx", (d) => {
          if (!d.parent) d.x = width / 2;
          else if (d.value < d.parent.value) d.x = d.parent.x - (width) / (Math.pow(d.depth + 1, 2));
          else d.x = d.parent.x + (width) / (Math.pow(d.depth + 1, 2));
          return d.x;
        })
        .attr("cy", (d) => d.y = 30 + 70 * d.depth);

      text.attr("x", (d) => d.x - 5 * d.value.toString().length)
        .attr("y", (d) => d.y + 8);
    }

  }
}

export default datavisComponent;
