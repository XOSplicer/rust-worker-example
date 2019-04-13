import { add } from '../crate/Cargo.toml';
import registerPromiseWorker from 'promise-worker/register';

registerPromiseWorker((message) => {
    return 'pong';
});

// run after initalization
setTimeout(() => postMessage('READY'), 0);

