import * as wasm from '../crate/Cargo.toml';
import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker(({ method, args }) => {
    return wasm[method](...args);
});

// run after initalization
setTimeout(() => postMessage('READY'), 0);

