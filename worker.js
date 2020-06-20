importScripts("workerlib.js");

onmessage = function (task) {
  var workerResult = computeRow(task.data);

  postMessage(workerResult);
}

readmsgs = function(){
	// doing something here.
}
