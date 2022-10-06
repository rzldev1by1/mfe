/*
* required polyfills
*/
import "core-js";
import 'core-js/features/set/map';
/** IE10 and IE11 requires the following for the Reflect API. */

/* Evergreen browsers require these. */
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
// import 'core-js/es7/reflect'

// CustomEvent() constructor functionality in IE9, IE10, IE11
(() => {

  if (typeof window.CustomEvent === "function") return false

  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: undefined }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  CustomEvent.prototype = window.Event.prototype

  window.CustomEvent = CustomEvent
  return false
})()
