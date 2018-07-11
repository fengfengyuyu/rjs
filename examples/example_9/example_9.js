var dists;
var tsne;
var min_x = 0, min_y = 0, max_x = 0, max_y = 0;
var train = false;
var eps = 10, perp = 30;
var timer, framerate = 10;
var step_display = document.getElementById("my_counter");

ws.onopen = function() {
  ws.send(JSON.stringify({status: 'initialising'}));
};
ws.onmessage = function(msg) {
  var data0 = JSON.parse(msg.data);
  dists = data0.r_dist_matrix;
  setup_tsne();
  timer = setInterval(run_tsne, 100);
};

setup_tsne = function() {
  var opt = {};
  opt.epsilon = eps;     // epsilon is learning rate
  opt.perplexity = perp; // roughly how many neighbors each point influences
  opt.dim = 2;           // dimensionality of the embedding (2 = default)
  tsne = new tsnejs.tSNE(opt); // create a tSNE instance
  tsne.initDataDist(dists);
};
run_tsne = function() {
  if (train) {
    tsne.step(); // every time you call this, solution gets better
    plot_ly(tsne.getSolution());
    document.getElementById("my_counter").innerHTML++;
  }
};
plot_ly = function(data0) {
  var x = data0.map(x => x[0]);
  var y = data0.map(x => x[1]);
  min_x = Math.min(min_x, Math.min(...x));
  max_x = Math.max(max_x, Math.max(...x));
  min_y = Math.min(min_y, Math.min(...y));
  max_y = Math.max(max_y, Math.max(...y));
  var trace1 = {x: x, y: y, mode: 'markers', type: 'scatter'};
  var layout = {
    height: 460, width: 460,
    xaxis: {range: [min_x, max_x], showticklabels: false},
    yaxis: {range: [min_y, max_y], showticklabels: false},
    margin: {t:10, b:10, l:10, r:10}
  };
  Plotly.newPlot('plotly_plot', [trace1], layout, {staticPlot: true});
};

function start_pause() {
  train = !train;
}
function restart() {
  document.getElementById("my_counter").innerHTML = 0;
  min_x = 0, min_y = 0, max_x = 0, max_y = 0;
  clearInterval(timer);
  setup_tsne();
  timer = setInterval(run_tsne, 1000 / framerate);
}

function fast_forward() {
  clearInterval(timer);
  framerate = framerate * 1.5;
  timer = setInterval(run_tsne, 1000 / framerate);
}
function fast_rewind() {
  clearInterval(timer);
  framerate = framerate * 0.8;
  timer = setInterval(run_tsne, 1000 / framerate);
}

update_perp = function(value) { perp = value; restart(); };
update_eps = function(value) { eps = value; restart(); };
