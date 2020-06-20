importScripts("workerlib.js");

onmessage = function (task) {
  var workerResult = computeRow(task.data);

  postMessage(workerResult);
}

readmsgs = functino(){
	// doing something here.
}
