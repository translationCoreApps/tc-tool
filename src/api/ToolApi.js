/**
 * This class represents a tool's api methods.
 * These api methods will be available to tC and other tools.
 */
export default class ToolApi {

  constructor() {
    this.props = {};
    this.context = {};
    this._toolListeners = [];
  }

  toString() {
    throw new Error(
      'ToolApi.toString was not overridden. This is likely an issue with tc-tool.');
  }

  /**
   * Subscribes listeners to receive update events
   * @param {function} listener
   * @return {Function}
   */
  subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function');
    }

    let isSubscribed = true;
    this._toolListeners.push(listener);

    // unsubscribe
    return () => {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;
      const index = this._toolListeners.indexOf(listener);
      this._toolListeners.splice(index, 1);
    };
  }

  /**
   * Notifies listeners that the tool has been updated.
   */
  toolDidUpdate() {
    for (let i = 0; i < this._toolListeners.length; i++) {
      const listener = this._toolListeners[i];
      listener();
    }
  }
}
