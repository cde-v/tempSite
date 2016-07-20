
  var width = 1024,
    height = 100;

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(10, 25)");

  var bst_tree = {};

  function bstInsert(item) {
    var path = [];
    _bstInsert(item, bst_tree, path, 'o');
    return path;
  }

  function _bstInsert(item, root, path, o) {
    path.push(root);
    console.log(item, root, root.data);
    if (!root.data) {
      root.data = item;
      root.o = o
      if (root.id === undefined)
        root.id = _id++;
    } else if (parseFloat(item) > parseFloat(root.data)) {
      _bstInsert(item, root.right || (root.right = {}), path, 'r')
    } else {
      _bstInsert(item, root.left || (root.left = {}), path, 'l')
    }

  }

  function bstDelete(item) {
    _bstDelete(item, bst_tree);
  }

  function _bstDelete(item, data) {
    if (!data || !data.data)
      return;

    if (parseFloat(item) < parseFloat(data.data))
      _bstDelete(item, data.left);
    else if (parseFloat(item) > parseFloat(data.data))
      _bstDelete(item, data.right);
    else {
      if (!data.left || !data.left.data) {
        var t = data.right || {};
        data.data = t.data;
        data.right = t.right;
        data.left = t.left;
        data.o = 'r'
      } else if (!data.right || !data.right.data) {
        var t = data.left || {};
        data.data = t.data;
        data.right = t.right;
        data.left = t.left;
        data.o = 'l';
      } else {
        var t = data.right;
        while (t.left && t.left.data) {
          t = t.left;
        }

        data.data = t.data;
        data.o = t.o;
        _bstDelete(data.data, t);
      }

    }

    if (!((data.left && data.left.data) || (data.right && data.right.data)))
      data.left = data.right = undefined;

  }

  var tree = d3.layout.tree()
    .size([width - 10, height - 70])
    .children(function(d) {
      if (!d.left && !d.right)
        return null;

      return [
        d.left !== undefined ? d.left : d.left = {},
        d.right !== undefined ? d.right : d.right = {}
      ];
    });

  var diag = d3.svg.diagonal();

  var _id = 1;

  update(bst_tree);


  function textClicked() {
    bstDelete($(this).text());
    update(bst_tree);
  }

  var DURATION = 500;

  function update(data) {
    var t_nodes = tree(data);
    var nodes = svg.selectAll("g.node")
      .data(t_nodes,
        function(d) {
          console.log("d", d)
          return d.id || (d.id = _id++)
        });

    var texts = svg.selectAll("g.node text")
      .text(function(d) {
        return d.data
      })
      .attr("dx", function(d) {
        return d.data ? -(d.data.length * 5) : 0;
      })
      .attr("dy", 5)
      .style("fill", "black");

    svg.selectAll("g.node circle")
      .attr("r", function(d) {
        return Math.max(d.data ? d.data.length * 6 : 15, 15);
      })
      .style("stroke", function(d) {
        return d.data ? "#000" : "white";
      }).style("stroke-width", 1);


    var g = nodes.enter().append("svg:g")
      .attr("class", function(d) {
        return "node nd_" + d.id;
      })
      .attr("transform", function(d) {
        var x = d.x;
        var y = d.y;
        if (d.parent) {
          x = d.parent.x;
          y = d.parent.y;
        }
        return "translate(" + x + ", " + y + ")";
      });
    nodes.transition().duration(DURATION).attr("transform", function(d) {
      return "translate(" + d.x + ", " + d.y + ")";
    });

    g.append("svg:circle")
      .attr("r", function(d) {
        return Math.max(d.data ? d.data.length * 6 : 15, 15);
      })
      .style("stroke", function(d) {
        return d.data ? "#000" : "white";
      });


    g.append("svg:text")
      .text(function(d) {
        return d.data
      })
      .attr("dx", function(d) {
        return d.data ? -(d.data.length * 5) : 0;
      })
      .attr("dy", 5).on("click", textClicked);

    var links = svg.selectAll("path.link")
      .data(tree.links(t_nodes), function(d) {
        return d.source.id + "-" + d.target.id;
      });

    links.style("stroke", function(d) {
      return d.target.data ? "black" : "white";
    }).style("stroke-width", 1);

    links.enter()
      .insert("svg:path", "g")
      .attr("class", function(d) {
        return "link ld_" + (d.source.id + "-" + d.target.id);
      })
      .style("stroke", function(d) {
        return d.target.data ? "black" : "white";
      }).attr("d", function(d) {
        var o = { x: d.source.x, y: d.source.y };
        return diag({ source: o, target: o });
      })
      .transition()
      .duration(DURATION)
      .attr("d", diag);

    links.transition()
      .duration(DURATION)
      .attr("d", diag);

    links.exit().transition().duration(DURATION)
      .style("stroke", "white")
      .attr("d", function(d) {
        var o = { x: d.source.x, y: d.source.y };
        var w = d.source.right == d.target ? width : 0;
        return diag({
          source: o,
          target: { x: w, y: height }
        })
      })
      .remove();

    nodes.exit().transition().duration(DURATION)
      .style("fill", "white")
      .attr("transform", function(d) {
        if (!d.o || d.o == "o")
          return "translate(" + d.x + ", " + height + ")";
        var w = d.o == "l" ? 0 : width;
        return "translate(" + w + ", " + height + ")"
      })
      .remove();

  }

  function find(item) {
    update(bst_tree);
    color(bst_tree.id);
    _find(item, bst_tree);
  }

  function color(id, id2) {
    svg.selectAll("g.nd_" + id + " circle").transition().delay(500).style("stroke", "red").style("stroke-width", 3);
    if (id2)
      svg.selectAll("path.ld_" + id + "-" + id2).transition().delay(500).style("stroke", "red").style("stroke-width", 3);
  }

  function _find(item, root) {
    if (!root || !root.data) {
      alert("Not found, here's the path I tried.");
      return;
    }

    if (root.data < item) {
      color(root.id, root.right ? root.right.id : 0);
      _find(item, root.right)

    } else if (root.data > item) {
      color(root.id, root.left ? root.left.id : 0);
      _find(item, root.left)

    } else {
      color(root.id);
      svg.selectAll("g.nd_" + root.id + " text").transition().delay(500).style("fill", "red");
      console.log("Found!");
    }

  }

  $(function() {
    $("#add_form").submit(function() {
      console.log("sta", scope.to_append, typeof scope.to_append);
      var to_append = $("#to_append");
      // var items = to_append.val().split(",");
      var item = to_append.val();
      // var ids = [];
      var id;
      // var i;

      // for (i in items) {
      // if (item = $.trim(items[i])) {
      if (item) {
        var path = bstInsert(item);
        // ids.push(path[path.length - 1].id);
        id = path[path.length - 1].id;
      }
      // }
      update(bst_tree);
      // for (i in ids) {
        svg.selectAll("g.nd_" + id + " text").style("fill", "red");
      // }
      to_append.select();
      return false;
    });
    $("#find").click(function() {
      var item = $("#to_append").val();
      if (item) find(item);
    });
    $("#clear").click(function() {
      bst_tree = {};
      update(bst_tree);
    });
    $("#delete").click(function() {
      var item = $("#to_append").val();
      if (item) {
        bstDelete(item);
        update(bst_tree);
      } else {
        var ts = svg.selectAll("text:not(:empty)")[0];
        if (ts.length) {
          var td = $(ts[~~(Math.random() * ts.length)]).text();
          bstDelete(td);
          update(bst_tree);
        }
      }
    });
    $("#speed").change(function() {
      DURATION = parseInt($(this).val());
      $("#speed_val").text($(this).val());
    }).val(DURATION);
  })








////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////








  var update = function() {

    var text = svg.selectAll("text").data(data.nodes);
    var node = svg.selectAll("circle").data(data.nodes);
    var link = svg.selectAll("line").data(data.links);

    text.enter()
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("fill", "black");

    text.text(function(d) {
        return d.value;
      })
      .attr("font-size", "20px");

    text.exit().remove();

    node.enter()
      .append("circle")
      .attr("r", 20)
      .attr("x", 0)
      .attr("y", 500)
      .attr("stroke", function(d) {
        return d.color;
      })
      .attr("stroke-width", 4)
      .attr("fill", "transparent");

    node.attr("stroke", function(d) {
      return d.color;
    });

    node.exit().remove();

    link.enter()
      .append("line")
      .style("stroke", "black");

    link.exit().remove();

    // force.nodes(data.nodes)
    //   .links(data.links)
    //   .start();

    // force.on("tick", function() {
    //   link.attr("x1", function(d) {
    //       return d.source.x + (22 / 80) * (d.target.x - d.source.x);
    //     })
    //     .attr("y1", function(d) {
    //       return d.source.y + (22 / 80) * (d.target.y - d.source.y);
    //     })
    //     .attr("x2", function(d) {
    //       return d.target.x + (22 / 80) * (d.source.x - d.target.x);
    //     })
    //     .attr("y2", function(d) {
    //       return d.target.y + (22 / 80) * (d.source.y - d.target.y);
    //     });
    //   node.attr("cx", function(d) {
    //       if (!d.parent) {
    //         d.x = width / 2;
    //       }
    //       return d.x;
    //     })
    //     .attr("cy", function(d) {
    //       d.y = 30 + 70 * d.depth;
    //       return d.y;
    //     });
    //   text.attr("x", function(d) {
    //       return d.x - 5 * d.value.toString().length;
    //     })
    //     .attr("y", function(d) {
    //       return d.y + 8;
    //     });
    // });

    // node.call(force.drag);

  };





//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// coloredPings();



// function coloredPings() {
//   var mainnav = d3.select("#mainnav");
//   var width = mainnav[0][0].clientWidth;
//   var height = mainnav[0][0].clientHeight;

//   var i = 0;

//   var svg2 = mainnav.append("svg")
//     .attr("id", "navbarOverlaySVG")
//     .style("pointer-events", "none")
//     .attr("width", width)
//     .attr("height", height);

//   mainnav
//     .on("mouseover" in document ? "touchmove" : "mousemove", particle);

//   function particle() {
//     var m = d3.mouse(this);

//     svg2.insert("circle", "rect")
//       // svg.insert("circle")
//       .attr("cx", m[0])
//       .attr("cy", m[1])
//       .attr("r", 1e-6)
//       .style("stroke", d3.hsl((i = (i + 1) % 360), 1, 0.5))
//       .style("stroke-opacity", 1)
//       .transition()
//       .duration(2000)
//       .ease(Math.sqrt)
//       .attr("r", 100)
//       .style("stroke-opacity", 1e-6)
//       .style("pointer-events", "none")
//       .remove();
//   }
// }