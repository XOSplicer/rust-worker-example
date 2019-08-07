import module from '../crate/Cargo.toml'
import PromiseWorker from 'promise-worker';

module.run();

async function loadWorker() {
    const worker = new Worker('worker.js');
    await new Promise((resolve, reject) => {
        // must wait for the service worker to be alive before sending messages
        // therefore we wait for it to send an message first
        worker.onmessage = (event) => resolve(event.data);
        worker.onerror = reject;
    });
    const promiseWorker = new PromiseWorker(worker);
    return promiseWorker;
}

(async () => {
    const worker = await loadWorker();
    // const res = await worker.postMessage({ method: 'add', args: [1, 4]});
    // console.log(res);
    document.getElementById('btn-strip').onclick = async () => {
        const input = document.getElementById('text-input').value || '';
        const res = await worker.postMessage({
            method: 'strip_comments',
            args: [input.trim()]
        });
        document.getElementById('text-output').innerText = res;
    };
})();


