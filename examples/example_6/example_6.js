// Helper functions
function uniform_grid(min, max, resolution) {
  var x1 = seq(min, max, null, resolution);
  var grid_data = {'x1': [], 'x2': [], 'y': []};
  for (var i = 0; i < x1.length; i++) {
    grid_data.x1 = grid_data.x1.concat(rep(x1[i], resolution));
    grid_data.x2 = grid_data.x2.concat(x1);
    grid_data.y = grid_data.y.concat(rep(0, resolution));
  }
  return grid_data;
}
function nearest_id(coord) {
  return Math.floor(coord / 15);
}
// Data and reactive behaviour
var pred_data = {'class': [], 'prob': []};
var grid_data = uniform_grid(0, 420 - 15, 28);
ws.onmessage = function(msg) {
  var in_msg = JSON.parse(msg.data).table;
  document.getElementById("result_table").innerHTML = in_msg;
  //pred_data = in_msg.pred;
};
function mouseReleased() {
  ws.send(JSON.stringify(grid_data.y));
}
// Canvas setup
var canvas_width = 420 + 1;
var canvas_height = 420 + 1;
function setup() {
  var my_canvas = createCanvas(canvas_width, canvas_height);
  my_canvas.parent('column_1');
  rect(0, 0, canvas_width+1, canvas_height+1);
  plot_grid();
}
function plot_grid() {
  grid_data = uniform_grid(0, 420 - 15, 28);
  for (var i = 0; i < grid_data.y.length; i++) {
    fill(196, 218, 255);
    rect(grid_data.x1[i], grid_data.x2[i], 15, 15);
  }
}
function draw() {
  if (mouseIsPressed) {
    if (keyIsPressed) {
      update_grid(0);
    } else {
      update_grid(1);
    }
  }
}
// Canvas behaviour
function update_grid(value) {
  var n = grid_data.x1.length;
  var nx = nearest_id(mouseX);
  var ny = nearest_id(mouseY);
  var mod_index = nx * 28 + ny;
  // implementing brush
  var update_data = {nx: [], ny: [], mod_index: []};
  var neighbor = 1;
  for (var i = -neighbor; i <= neighbor; i++) {
    var bdy = neighbor - Math.abs(i);
    for (var j = -bdy; j <= bdy; j++) {
      update_data.nx.push(nx + i);
      update_data.ny.push(ny + j);
      update_data.mod_index.push((nx + i) * 28 + (ny + j));
    }
  }
  console.log(update_data);
  for (var k = 0; k < update_data.nx.length; k++) {
    var mi = update_data.mod_index[k];
    if ((update_data.nx[k] <= 27) & (update_data.ny[k] <= 27)) {
      grid_data.y[mi] = value;
      if (grid_data.y[mi] == 1) {
        fill(255, 255, 255);
      } else {
        fill(196, 218, 255);
      }
      rect(grid_data.x1[mi], grid_data.x2[mi], 15, 15);
    }
  }
}
