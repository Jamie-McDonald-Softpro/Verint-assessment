// Anything exported from this file is importable by other in-browser modules.
import { Subject } from "rxjs";

const events = new Subject();

const publish = (event) => {
  events.next(event);
};

const subscribe = (cb) => {
  events.subscribe(cb);
};

export { publish, subscribe };
