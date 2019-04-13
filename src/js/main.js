import module from '../crate/Cargo.toml'
import PromiseWorker from 'promise-worker';

module.run();

const worker = new Worker('worker.js');
(new Promise((resolve, reject) => {
    // must wait for the service worker to be alive before sending messages
    // therefore we wait for it to send an message first
    worker.onmessage = (event) => resolve(event.data);
    worker.onerror = reject;
})).then(() => {
    console.log('initialized');
    const promiseWorker = new PromiseWorker(worker);
    return promiseWorker.postMessage({ method: 'add', args: [1, 2]});
}).then(res => {
    console.log(res);
})

