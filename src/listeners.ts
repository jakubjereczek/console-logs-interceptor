import { state } from './_state';
import { Command, Message } from './structures';

type EventPayload = Message;
type EventMap = {
  /**
   * For all other types besides onPush, an array with a single element will be returned.
   * For the type onPush, the current array containing all the latest messages (taking into account the maxCache value) will be returned.
   */
  [Key in `on${Command | 'All' | 'Push'}`]: EventPayload[];
};
type EventName = keyof EventMap & string;
type EventListener = (params: EventPayload[]) => void;

const listeners: {
  [K in EventName]?: Array<EventListener>;
} = {};

/**
 * Triggers an event for all currently registered listeners.
 *
 * @returns void
 */
export function call(name: EventName, params: EventPayload) {
  listeners[name]?.forEach((listener) => {
    if (name === 'onPush') {
      listener([...state.messages, params]);
    }
    listener([params]);
  });
}

/**
 * Listen for a specific event and register a callback function to be invoked when the event occurs.
 *
 * @returns { function } unsubscribe()
 */
export function subscribe(name: EventName, fn: EventListener) {
  if (!listeners[name]) {
    listeners[name] = [];
  }
  listeners[name]!.push(fn);

  return () => {
    unsubscribe(name, fn);
  };
}

/**
 * Unsubscribe from listening to a specific event.
 *
 * @returns void
 */
function unsubscribe(name: EventName, fn: EventListener) {
  if (listeners[name]) {
    listeners[name] = listeners[name]!.filter((listener) => listener !== fn);
  }
}
