import { state } from './_state';
import { Command, Message } from './structures';

type EventPayload = Message;
type EventMap = {
  /**
   * For all other types besides onMessageUpdate, an array with a single element will be returned.
   * For the type onMessageUpdate, the current array containing all the latest messages (taking into account the maxCache value) will be returned.
   */
  [Key in `on${Command | 'All' | 'MessageUpdate'}`]: EventPayload[];
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
    if (name === 'onMessageUpdate') {
      listener([...state.messages, params]);
    }
    listener([params]);
  });
}

/**
 * Listen for a specific event and register a callback function to be invoked when the event occurs.
 *
 * @returns void
 */
export function subscribe(name: EventName, fn: EventListener) {
  if (!listeners[name]) {
    listeners[name] = [];
  }
  listeners[name]!.push(fn);
}

/**
 * Unsubscribe from listening to a specific event.
 *
 * @returns void
 */
export function unsubscribe(name: EventName, fn: EventListener) {
  if (listeners[name]) {
    listeners[name] = listeners[name]!.filter((listener) => listener !== fn);
  }
}
