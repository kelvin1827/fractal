var numberOfWorkers = 8;
var workers = [];

window.onload = init;

function init() {
  setupGraphics();

  for (let i = 0; i < numberOfWorkers; i++) {
    var worker = new Worker("worker.js");
    worker.onmessage = function(event) {
      processWork(event.target, event.data);
    }
    worker.idle = true;
    workers.push(worker);
  }

  startWorkers();
}

var nextRow = 0;
var generation = 0;

function startWorkers() {
  generation++;
  nextRow = 0;

  for (let i = 0; i < workers.length; i++) {
    var worker = workers[i];
    
    if (worker.idle) {
      var task = createTask(nextRow);

      worker.idle = false;
      worker.postMessage(task);

      nextRow++;
    }
  }
}

function processWork(worker, workerResults) {
  drawRow(workerResults);
  reassignWorker(worker);
}

function reassignWorker(worker) {
  var row = nextRow++;

  if (row >= canvas.height) {
    worker.idle = true;
  } else {
    var task = createTask(row);
    worker.idle = false;
    worker.postMessage(task);
  }
}