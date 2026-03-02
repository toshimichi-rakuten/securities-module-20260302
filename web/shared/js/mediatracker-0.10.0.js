(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var HELPER = {},
    _W = window,
    _D = document,
    _N = navigator,
    _L = location;

HELPER.getFilename = function(element) {
  if (!this.filename) {
    var filename,
        arr;

    if (element.currentSrc) {
        arr = element.currentSrc.split('/');
        if (arr) {
          var _filename = arr[arr.length - 1].split('.')[0];
          if (_filename) filename = _filename;
        }
    }

    if (!filename) filename = "undefined";

    this.filename = filename;
  }

  return this.filename;
};

HELPER.getExtension = function (element) {
  if (!this.extension) {
    var ext,
        arr;

    if (element.currentSrc) {
        arr = element.currentSrc.split('/');
        if (arr) {
          var _ext = arr[arr.length - 1].split('.')[1];
          if (_ext) ext = _ext;
        }
    }

    if (!ext) ext = "undefined";

    this.extension = ext;
  }

  return this.extension;
};

// IE polyfill for Number.parseInt & Number.isInteger
HELPER.parseInt = Number.parseInt || parseInt;

HELPER.isInteger = function (num) {
  if (Number.isInteger) {
    return Number.isInteger(num);
  }else{
    return (num ^ 0) === num;
  }
};

module.exports = HELPER;

},{}],2:[function(require,module,exports){
'use strict';

var MediaTracker = require('./module.js');

MediaTracker.pageLoad(MediaTracker.init); // Or if you want to run on SPA load
                                          // start on custom event accordingly

require('./polyfill.js');

// Single Page Application Tracking
try {
  document.addEventListener(new CustomEvent("SINGLE_PAGE_APPLICATION_LOAD"), function (e) {
    MediaTracker.init();
  });
} catch (e) {
  return;
}

},{"./module.js":3,"./polyfill.js":4}],3:[function(require,module,exports){
/*
 * MediaTracker v0.10.0
 * Author: Vincent Graziano, Marklester Ghany, Zhen Tian
 * Reference Page: https://confluence.rakuten-it.com/confluence/display/SNSCT/06.+HTML5+Media+Tracking
 */

'use strict';

var mt = (function() {
    var HELPER = require('./helper.js'),
        SENDER = require('./sender.js');
    var log = function () {};

    /*
     * @name tracker
     * @description Tracks media
     * @class
     * @namespace
     */
    var tracker = function(element, options) {
      var _W = window,
          _D = document,
          _N = navigator,
          _L = location,
          self;
      if (!element.addEventListener) return;

      /*
       * Default Variables
       */
      this.mediaId = "";
      this.extension;
      this.filename;
      this.ignoreSegment;
      this.completedSegment;
      this.mediaLoaded    = element.loadeddata;
      this.currentlyEnded = element.ended;
      this.replayed       = false;
      this.resumed        = false;
      this.justSentReplay = false;
      this.prefix         = _W.location.hostname + "|" + _W.location.pathname;
      this.type           = element.tagName.toLowerCase();

      // CONSTANTS
      this.TIMEOUT      = options.timeout || 1000; // 1 second timeout between actions.

      /*
       * Helper functions
       */
      this.getFilename  = HELPER.getFilename;
      this.getExtension = HELPER.getExtension;

      self = this;

      // DEFAULT CONFIG FOR SEGMENTS
      var defaultSegment = {
        "size":0.20, // size in % of media to measure as a "segment"
        "inprogress": true,  // whether we have a segment in progress (default: true, set FALSE on skip)
        "segments":   {}
      };

      /*
       * Default Option Overrides
       */
      if(typeof options.trackSegments !== 'string' || options.trackSegments === '') options.trackSegments = 'off';
      if (options.trackSegments !== 'off') {
          if (options.trackSegments !== 'on') {
            var num = HELPER.parseInt(options.trackSegments);
            // if (Number.isInteger(num) && 1 <= num && num <= 100) this.segment.size = options.trackSegments / 100; // Percentage: leave here in case some developer wants to test
            if (HELPER.isInteger(num) && 1 <= num && num <= 100) defaultSegment.size = (1 / options.trackSegments); // # of segments;
            else log("[Options] Unspecified segment size OR invalid segment size detected:", num, "Using default value of 20%");
          }
          this.segment = defaultSegment;
          log("[Options] Segment size",this.segment.size);
      }
      if (options.trackResume !== true) options.trackResume = false;
      if (options.trackReplay !== true) options.trackReplay = false;

      if (options.trackSeconds) {
          this.seconds = options.trackSeconds.split(',');
      }
      /*
       * Functions
       */

      /**
       * @name getId
       * @function
       * @description Returns the ID of the current media
       * @returns {String}
       * @memberof tracker
       */
      this.getId = function () {
        if (this.mediaId) {
          log("Filename acquired, it was saved");
          return this.mediaId;
        }

        // else

        var buildstring = "";

        // get hostname & pathname
        buildstring += self.prefix + "|";

        if (element.getAttribute(options.mediaId)) {
          buildstring += element.getAttribute(options.mediaId); // User-specified
        } else if (element.getAttribute(options.BRIGHTCOVE_MEDIA_ID)) {
          buildstring += element.getAttribute(options.BRIGHTCOVE_MEDIA_ID); // "Brightcove" default media ID
        } else {
          buildstring += self.getFilename(element);
        }

        log("Filename acquired: " + buildstring + " -- don't do this each time, expensive!!!");

        return buildstring;
      };

      if (!self.mediaId) self.mediaId = self.getId();

      /**
       * @name playEventHandler
       * @function
       * @memberof tracker
       */
      this.playEventHandler = function() {
        if (!self.justSentReplay) { // Proceed if we didn't just send a "replay" (a "seek" to beginning); Necessary because IE behavior will not reach here, but other browsers will.
          /*
           * Checking: Type of Play
           */
          // If the media has previously ended, then this is a replay.
          if (self.currentlyEnded) {
            self.replayed = true;
            //Set currently ended back to false.
            self.currentlyEnded = false;
          }

          // Is a resume? Set it as a replay if the flag in settings is set
          if (options.trackResume !== false && self.resumed) {
            self.event = "resumed";
          }

          // Is this a replay? Count replays
          if (options.trackReplay && self.replayed) {
            self.event = "replayed";
            self.replayed = false; // disable it again after so any "play" after initial "replay" is measured as "play" or "resume"
          }

          // 4.) Now build the object.

          var eventDetails = {
              "event": self.event ? self.event : "play",
              "muted": element.muted,
              "autoplay": element.autoplay,
              "replayed": self.replayed,
              "resumed": self.resumed,
              "element": element,
              "medianame": self.mediaId,
              "extension": self.getExtension(element) || "undefined",
              "time": element.currentTime,
              "type": self.type
          };
          if (self.segment && Object.keys(self.segment.segments).length > 0) eventDetails.segments = self.segment.segments;

          // 5. Callback for Tracking
          if (self.resumed) {
            // [FIREFOX]
            // Ignore any "restart" that occurs @ time 0
            // Firefox seems to call "play" at 0 before "seek"
            // Handle any "replay" event only in "Seek" since that is common across all browsers
            if (eventDetails.startTime != 0 && options.trackResume) self.playCallback(eventDetails); // don't send the callback if we turned the option off, obviously
          } else {
            self.playCallback(eventDetails);
          }

          // 6. Now, debounce to avoid spamming
          self.debounceHandler("play", self.playEventHandler);

          // 7. Set self.resumed = true so that every subsequent play will be marked "resumed"
          self.resumed = true;

          // 8. Pause cancels out any "justSentReplay"
          if (self.justSentReplay) self.justSentReplay = false;
        } else {
          // We just sent a replay, so to make sure the NEXT "play" works, set the flag = false
          self.justSentReplay = false;
        }
      };

      /**
       * @name pauseEventHandler
       * @function
       * @memberof tracker
       */
      this.pauseEventHandler = function() {
        if (options.trackPause) { // Not documented on purpose, useless analytics-wise so we don't want people to use. Kept here for debugging purposes
          // 1. Handling
          var eventType = "pause";

          if (element.ended) { // [Chrome] On end, Pause -> End will be fired.
              eventType = "ended";
          }

          //2.) Build the object.
          var eventDetails = {
              "event": eventType,
              "muted": element.muted,
              "autoplay": element.autoplay,
              "element": element,
              "duration": element.duration,
              "medianame": self.mediaId,
              "extension": self.getExtension(element) || "undefined",
              "time": element.currentTime,
              "type": self.type
          };
          if (self.segment && Object.keys(self.segment.segments).length > 0) eventDetails.segments = self.segment.segments;

          //3. Callback for Tracking
          if (eventDetails.event == "pause") {
              self.pauseCallback(eventDetails);
              //4. Now, debounce to avoid spamming
              self.debounceHandler("pause", self.pauseEventHandler);
          }
          // else [Chrome] Chrome & other browsers trying to send Pause before Ended; ignoring this case
        }

        // 5. Now that we paused, set self.resumed = true so that any subsequent "play" will report "resumed"
        self.resumed = true; // do we need this?
      };

      /**
       * @name debounceHandler
       * @function
       * @memberof tracker
       */
      this.debounceHandler = function(eventType, eventHandler) {
          /*
           * REMOVE EVENT LISTENER
           */
          element.removeEventListener(eventType, eventHandler);

          /*
           * RE-ADD EVENT LISTENER AFTER 1 SECOND. *** RISK OF LOSING TRACKING DATA??
           */
          setTimeout(function() {
              element.addEventListener(eventType, eventHandler);
          }, self.TIMEOUT);
      };

      /**
       * @name seekEventHandler
       * @function
       * @memberof tracker
       */
      this.seekEventHandler = function() {
          var eventType,
              eventDetails;

          eventType = "seek";

          self.ignoreSegment = "";  // on seek, clear ignoreSegment (in case the user
                                    // seeks, wanting to see the same segment again)

          // If the media has previously ended, then this is a replay.
          if (self.currentlyEnded) {
              self.replayed = true;
              //Set currently ended back to false.
              self.currentlyEnded = false;

              if (self.resumed) self.resumed = false; // So that the next "play" does not get recognized as a "resume," but a "replay" instead

              // should be a "replayed" instead of "seek"
              eventType = "replayed";
          }

          eventDetails = {
            "event": eventType,
            "muted": element.muted,
            "autoplay": element.autoplay,
            "element": element,
            "duration": element.duration,
            "medianame": self.mediaId,
            "extension": self.getExtension(element) || "undefined",
            "time": element.currentTime,
            "type": self.type
          };

          if (self.segment && Object.keys(self.segment.segments).length > 0) eventDetails.segments = self.segment.segments;

          // inprogress = true if we seeked to beginning
          //   (this means the user started viewing the initial segment)
          // inprogress = false in any other case
          //   (segments are OFF or seeked to non-beginning,
          //   cancel any segment in progress)
          if (self.segment) {
            if (element.currentTime < 1) {
              self.segment.inprogress = true;
            } else {
              self.segment.inprogress = false;
            }
          }

          // This "seek" is treated as a "replay" as long as we're at time < 1
          // and we are not seeking at nonzero times (seeking backwards, etc. cases)
          if (self.replayed && element.currentTime < 1) {
              self.currentlyEnded = true;
              // This is actually a replay, skipping to beginning. Ignore the skip, set self.currentlyEnded = true
              // that way Play event acknowledges that the video was Ended before the Play occurred
              self.playCallback(eventDetails);
              self.currentlyEnded = false;
              self.justSentReplay = true;
          } else { // treat it as a regular seek
              self.seekCallback(eventDetails);
              self.debounceHandler("seek", self.playEventHandler);
          }

          // In case this "seek" was caused by a replay seeking to the beginning, make sure the next (normal) "seek" doesn't get measured as "replayed"
          self.replayed = false;
      };

      /**
       * @name timeUpdateEventHandler
       * @function
       * @memberof tracker
       */
      this.timeUpdateEventHandler = function() {
        if (options.trackSegments !== 'off') {

          if (element.seeking) self.segment.inprogress = false;

          if (!element.seeking && !element.paused) {
            var res,
                curTime = element.currentTime.toFixed(0),
                segSize = (element.duration * self.segment.size).toFixed(0);

            // If we hit a segment border
            if (curTime % segSize == 0) {
              if (curTime != 0) { // ignore when time is 0
                var buildstring,
                    eventDetails;

                var segNum = (1/self.segment.size);
                var segNow = (curTime/segSize) + "/" + segNum;
                buildstring = Math.max(curTime - segSize,0) + "-" + curTime + "|" + segNow;

                log("[Segment] Hit a segment border. Inprogress:", self.segment.inprogress);

                // If a segment is in progress
                if (self.segment.inprogress) {
                  // If it is a segment we haven't pushed, or not one we should ignore
                  if (self.ignoreSegment != buildstring) { // (to avoid sequential pushing since seek time granularity is inconsistent)

                    self.completedSegment = buildstring;
                    self.ignoreSegment = buildstring; // Just pushed it, don't push it again during the same second

                    if (self.segment.segments[buildstring]) self.segment.segments[buildstring]++;
                    else self.segment.segments[buildstring] = 1;

                    log("[Segment] Pushed segment:", buildstring);
                    log("[Segment] self.segment.segments:",self.segment.segments);

                    eventDetails = {
                      "event": "segment_complete",
                      "muted": element.muted,
                      "autoplay": element.autoplay,
                      "element": element,
                      "duration": element.duration,
                      "medianame": self.mediaId,
                      "extension": self.getExtension(element) || "undefined",
                      "time": element.currentTime,
                      "type": self.type
                    };
                    if (self.segment && Object.keys(self.segment.segments).length > 0) eventDetails.segments = self.segment.segments;
                    if (self.completedSegment) eventDetails.completedSegment = self.completedSegment;

                    self.segmentCompleteCallback(eventDetails);
                  }
                } else {
                  self.segment.inprogress = true;
                  self.ignoreSegment = buildstring; // to avoid it being added again during the same second
                }
              }
            }
          }
        }
        if(options.trackSeconds) {
            if (!element.seeking && !element.paused) {
                var curTime = element.currentTime.toFixed(0);
                var eventDetails;
                for(var i = 0; i < self.seconds.length; i ++) {
                    if(curTime === self.seconds[i]) {
                        self.completedSegment = self.seconds[i];
                        eventDetails = {
                          "event": "second_complete",
                          "muted": element.muted,
                          "autoplay": element.autoplay,
                          "element": element,
                          "duration": element.duration,
                          "medianame": self.mediaId,
                          "extension": self.getExtension(element) || "undefined",
                          "time": element.currentTime,
                          "type": self.type
                        };
                        if (self.completedSegment) eventDetails.completedSegment = self.completedSegment;
                        self.segmentCompleteCallback(eventDetails);
                        self.seconds.splice(i,1);
                        return;
                    }
                }
            }
        }
      };

      /**
       * @name endedEventHandler
       * @function
       * @memberof tracker
       */
      this.endedEventHandler = function() {
        var eventType,
            eventDetails;

        log("[Ended] Media ended:", element);

        self.currentlyEnded = true;
        self.resumed = false;

        eventType = "complete";

        eventDetails = {
          "event": eventType,
          "muted": element.muted,
          "autoplay": element.autoplay,
          "element": element,
          "duration": element.duration,
          "medianame": self.mediaId,
          "extension": self.getExtension(element) || "undefined",
          "type": self.type
        };

        if (self.segment && Object.keys(self.segment.segments).length > 0) {
          eventDetails.segments = self.segment.segments;
        }

        self.endedCallback(eventDetails);

        if (options.trackReplay === false) {
          log("[Options] Replay tracking off: remove event handlers:", element);
          element.removeEventListener("play",       self.playEventHandler);
          element.removeEventListener("pause",      self.pauseEventHandler);
          element.removeEventListener("ended",      self.endedEventHandler);
          element.removeEventListener("seeking",    self.seekEventHandler);
          element.removeEventListener("timeupdate", self.timeUpdateEventHandler);
          setTimeout(function() {
              element.removeEventListener("play", self.playEventHandler);
              element.removeEventListener("pause", self.pauseEventHandler);
          }, self.TIMEOUT);
        }
      };

      /*
       * Event listeners
       */
      element.addEventListener("play",        self.playEventHandler);
      element.addEventListener("pause",       self.pauseEventHandler); //When a media is paused, push the start and end of the segment played.
      element.addEventListener("seeking",     self.seekEventHandler);
      element.addEventListener("timeupdate",  self.timeUpdateEventHandler); //While the media is playing always track the last time as the segment's end.
      element.addEventListener("ended",       self.endedEventHandler);

      /*
       * Sender functions
       */
      this.send         = SENDER.send;

      /*
       * Event Callbacks
       */

      /**
       * @name: playCallback
       * @description: Callback for Play
       */
      this.playCallback = function(eventDetails) {
        log("[playCallback] reached playcallback");
        this.send(eventDetails, options);
        document.dispatchEvent(new CustomEvent('mediaTracker', {
          'detail': eventDetails
        }));
      };

      /**
       * @name: pauseCallback
       * @description: Callback for Pause
       */
      this.pauseCallback = function(eventDetails) {
        this.send(eventDetails, options);
        document.dispatchEvent(new CustomEvent('mediaTracker', {
          'detail': eventDetails
        }));
      };

      /**
       * @name: playCallback
       * @description: Callback for Play
       */
      this.endedCallback = function(eventDetails) {
        this.send(eventDetails, options);
        document.dispatchEvent(new CustomEvent('mediaTracker', {
          'detail': eventDetails
        }));
      };

      /**
       * @name: seekCallback
       * @description: Callback for Seek event; debugging purposes only!
       */
      this.seekCallback = function(eventDetails) {
        // Unused
      };

      /**
       * @name: segmentCompleteCallback
       * @description: Callback for Segment Completion
       */
      this.segmentCompleteCallback = function (eventDetails) {
        log("[Segment] Completed a segment. Sending.");

        this.send(eventDetails, options);

        document.dispatchEvent(new CustomEvent('mediaTracker', {
          'detail': eventDetails
        }));

        self.completedSegment = ""; // so that it doesn't get counted again after sending
      };

      //   for autoplay video tracking play event
      if(element.played && element.played.length > 0) {
          self.playEventHandler();
      }
    };
    return {
      pageLoad: function(callback) {
        window.addEventListener("load", function load (e) {
          window.removeEventListener("load", load, false); //remove listener, no longer needed
          callback();
        }, false);

        if (document.addEventListener) {
          document.addEventListener("SINGLE_PAGE_APPLICATION_LOAD", callback, false);
        }
      },
      init: function() {
        // Variable Declaration
        var _W = window,
            _D = document,
            _N = navigator,
            _L = location;
        var CONFIG;

        // Polyfill
        require('./polyfill.js');

        // Get configuration
        try {
          var _tag = document.getElementById('ratMediaTrack');
          var _CONFIG = JSON.parse(_tag.value);
          if (_CONFIG) CONFIG = _CONFIG;
        } catch (e) {
          // MediaTracker present but no configuration available
          return; // graceful failure
        }

        // Default Options

        var BRIGHTCOVE_MEDIA_ID = "data-video-id",
            OPTIONS_DEFAULT = require('./variables.js');

        CONFIG.BRIGHTCOVE_MEDIA_ID = BRIGHTCOVE_MEDIA_ID;
        CONFIG.OPTIONS_DEFAULT = OPTIONS_DEFAULT;

        var trackSetting = {
            settingInterval: CONFIG.settingInterval || 1000,
            settingIntervalCount: CONFIG.settingIntervalCount || 5
        };

        /*
         * Initialize Based on Configuration
         */

        // Set up log
        if (CONFIG.debug) log = window.log=function(){log.history=log.history||[];log.history.push(arguments);if(window.console){console.log(Array.prototype.slice.call(arguments))}};

        // Do we have a config to measure
        if (CONFIG.measure === true) {
          var mediaTimeInterval;
          var trackInterval = 0;

          var addMedia = function(type) {
              log("[addMedia] is starting");
              var _type = type;
              var media = document.querySelectorAll(_type);
              var count = 0;
              for (var i = 0, len = media.length; i < len; i++) {
                if(media[i].currentSrc && (media[i].getAttribute("trackDone")!=="true")) {
                    count++;
                    var _CONFIG = CONFIG;
                    new tracker(media[i], _CONFIG);
                    media[i].setAttribute("trackDone", "true");
                } else if(media[i].getAttribute("trackDone")==="true") {
                    count++;
                }
              }
              if(count === media.length) {
                  window.clearInterval(mediaTimeInterval);
                  return;
              }
              trackInterval++;
          };

          if (CONFIG.trackMedia === "all" || !CONFIG.trackMedia) CONFIG.trackMedia = "video, audio";
          mediaTimeInterval = window.setInterval(function(){
              addMedia(CONFIG.trackMedia);
              if(trackInterval > trackSetting.settingIntervalCount){
                  window.clearInterval(mediaTimeInterval);
              }
          }, trackSetting.settingInterval);

        }
        // else MediaTracker present but measure is false
      }
    };
}());

module.exports = mt;

},{"./helper.js":1,"./polyfill.js":4,"./sender.js":5,"./variables.js":7}],4:[function(require,module,exports){
'use strict';

var _W = window,
    _D = document,
    _N = navigator,
    _L = location;

// IE9 < Edge Custom Event Polyfill
if (!_W.customEvent) { // standalone.js already did this
  (function() {
    var CustomEvent;
    CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    }

    CustomEvent.prototype = _W.Event.prototype;

    _W.CustomEvent = CustomEvent;
  }());
}

},{}],5:[function(require,module,exports){
'use strict';

var SENDER = {},
    _W  = window,
    _D  = document,
    _N  = navigator,
    _L  = location,
    log = function () {};

/**
 * @function
 * @name SENDER.send
 * @description Modifiable function to send to your API (e.g. analytics API, DB).
 * @param {Object} _OPTIONS     - Contains a copy of the settings/option parameters
 * @param {Object} eventDetails - Contains the MediaTracker event details
 */
SENDER.send = function(eventDetails, _OPTIONS) {
  if (_OPTIONS.debug) log = window.log=function(){log.history=log.history||[];log.history.push(arguments);if(window.console){console.log(Array.prototype.slice.call(arguments))}};

  // CUSTOM CODE BEGINS HERE

  /*
   * Sending Logic
   */

  var obj = {},
      key = _OPTIONS.eventData,
      val = eventDetails.filename + "_" + eventDetails.event,
      self;

  self = this;

  obj[key] = val;

  try {
    /*
     * Adobe Analytics Sending
     */
    if (_OPTIONS.trackSC === true) {
      var scSegments;
      var scNameVar              = _OPTIONS.scNameVar              || _OPTIONS.OPTIONS_DEFAULT.scNameVar,
          scPauseEvent           = _OPTIONS.scPauseEvent           || _OPTIONS.OPTIONS_DEFAULT.scPauseEvent,
          scPlayEvent            = _OPTIONS.scPlayEvent            || _OPTIONS.OPTIONS_DEFAULT.scPlayEvent,
          scResumeEvent          = _OPTIONS.scResumeEvent          || _OPTIONS.OPTIONS_DEFAULT.scResumeEvent,
          scCompleteEvent        = _OPTIONS.scCompleteEvent        || _OPTIONS.OPTIONS_DEFAULT.scCompleteEvent,
          scSegmentCompleteEvent = _OPTIONS.scSegmentCompleteEvent || _OPTIONS.OPTIONS_DEFAULT.scSegmentCompleteEvent,
          scSecondCompleteEvent  = _OPTIONS.scSecondCompleteEvent  || _OPTIONS.OPTIONS_DEFAULT.scSecondCompleteEvent,
          scReplayedEvent        = _OPTIONS.scReplayedEvent        || _OPTIONS.OPTIONS_DEFAULT.scReplayedEvent;

      // Prepare object to send to Adobe Analytics (SiteCatalyst)
      var o = {};
      o[scNameVar] = eventDetails.medianame;
      // 'event41': eventDetails.startTime || 0, // we don't need this
      o['events'] = '';

      if (eventDetails.event === 'play') {
        o.events += scPlayEvent;
      } else if (eventDetails.event === 'pause') {
        o.events += scPauseEvent;
      } else if (eventDetails.event === 'resumed') {
        o.events += scResumeEvent;
      } else if (eventDetails.event === 'complete') {
        o.events += scCompleteEvent;
      } else if (eventDetails.event === 'replayed') {
        o.events += scReplayedEvent;
      } else if (eventDetails.event === 'segment_complete') {
        o.events += scSegmentCompleteEvent;
      } else if (eventDetails.event === 'second_complete') {
        o.events += scSecondCompleteEvent;
      }

      // Configure Segments to go to eVar50 by default
      if (self.segment && Object.keys(self.segment.segments).length > 0) {
        scSegments = _OPTIONS.scSegments || _OPTIONS.OPTIONS_DEFAULT.scSegments;
      }

      var segmentBuildString = "";

      if(self.seconds) {
          scSegments = _OPTIONS.scSegments || _OPTIONS.OPTIONS_DEFAULT.scSegments;
      }

      if (self.completedSegment) o[scSegments] = eventDetails.medianame + "|" + self.completedSegment;

      SENDER.sendSTL(o);
    }

    /*
     * RAT Sending
     */
    if (_OPTIONS.trackRAT === true) {
      // Prepare object to send to RAT
      var o = {
        'name':     eventDetails.medianame.split('|')[2],
        'event':    eventDetails.event,
        'seg':      eventDetails.completedSegment,
        'type':     eventDetails.type,
        'ext':       eventDetails.extension
      };

      if(eventDetails.duration) {
          o.length = eventDetails.duration.toFixed(2);
      }

      if(eventDetails.muted === true) {
          o.muted = 1;
      } else if(eventDetails.muted === false) {
          o.muted = 0;
      }

      if(eventDetails.autoplay === true) {
          o.autoplay = 1;
      } else if(eventDetails.autoplay === false) {
          o.autoplay = 0;
      }

      if(eventDetails.event == 'pause' || eventDetails.event == 'resumed') {
          o.time = eventDetails.time.toFixed(2);
      }

      var media = {'media' : o};

      SENDER.sendRAT(media);
    }
  } catch (e) {
    log("[mediaTracker] Error: No callback configured to send the media data", e);
    return;
  }

  // CUSTOM CODE ENDS HERE
};

// Custom Methods Start

SENDER.appendEvent = function(_event) {
    _W.s.events = _event;
};

SENDER.sendSTL = function(o, pev2, linktype) {
  log("[SiteCatalyst] Sending:",o);

  try {
   var s = _W.s,
        parameter;

    s.linkTrackVars = 'None';
    s.trackExternalLinks = false;
    var overrideGVS = s.getVisitStart;
    //override v51 logic to avoid error when scid contains we_
    s.getVisitStart = function() {
        return false;
    };
    for (parameter in o) {
      if (parameter == 'events') {
        if (s.linkTrackVars == 'None') {
            s.linkTrackVars = 'events';
        } else {
            s.linkTrackVars += ',events';
        }
        this.appendEvent(o[parameter]);
        s.linkTrackEvents = o[parameter];
      } else if (o.hasOwnProperty(parameter)) {
        if (s.linkTrackVars === 'None') {
            s.linkTrackVars = parameter;
        } else {
            s.linkTrackVars += ',' + parameter;
        }
        s[parameter] = o[parameter];
      }
    }
    pev2 = pev2 || 'MediaTracker_CustomSTL';
    linktype = linktype || 'o';

    s.tl(this, linktype, pev2);

    s.getVisitStart = overrideGVS;
  } catch (e) {
    log("[SiteCatalyst] No s_code?", e);
    return;
  }
};

var RAT_VIDEO_SENDING = false;

SENDER.sendRAT = function (o, debug_flag) {
  log("[RAT] Sending", o);

  if (!debug_flag) {
    if(typeof RAT == 'undefined' || typeof RAT.addCustomEvent != 'function') {
        return;
        setTimeout(function() {
            SENDER.sendRAT(o, debug_flag);
        }, 500);
    } else if(!RAT_VIDEO_SENDING) {
        RAT_VIDEO_SENDING = true;
        try {
          RAT.addCustomEvent({pData: o, eventType: 'video', options:['ua','url']});
        } catch (e) {
          log(e);
          return;
        }
        setTimeout(function() {
            RAT_VIDEO_SENDING = false;
        }, 500);
    } else {
        setTimeout(function() {
            SENDER.sendRAT(o, debug_flag);
        }, 500);
    }



  }
};

// Custom Methods End

/********** Export **********/
module.exports = SENDER;

},{}],6:[function(require,module,exports){
// app.js
// @description: test file to include your module. "gulp build" will compile into test/bundle.js
'use strict';

/**************************************************
 * Module Instantiation
 **************************************************/

 require('./index.js');

//
// /**************************************************
//  * Testing Area
//  **************************************************/
// var expect = chai.expect;
// var assert = chai.assert;
// var chaiAsPromised = require("chai-as-promised");
//
// chai.use(chaiAsPromised);
// chai.should();
// console.log(chaiAsPromised);
//
// /*
//  * Helper Functions
//  */
//
// // If you need to add any general utility functions, keep them here
//
// /*
//  * Test Descriptions
//  */
//
// // 0. Add event listener for "mediaTracker"
// // 1. Push the play button: document.getElementById("testmedia").play()
// // 2. Listen to the event:
// // 3. 50ms after the event, check v39
//
// // Spy on v39; the last split of it on _ will be the event:
// // ex:  v39:NGT48_0616_vol23_play
// var lastevent = "";
//
// document.addEventListener("mediaTracker", function (data) {
//     if (typeof(data.detail.event) != undefined) {
//       console.log("EVENT",data.detail.event);
//       lastevent = data.detail.event;
//     }
// });
//
// describe('Media functionality reports correctly', function (done) {
//   it('Will detect play', function (done) {
//     var $mp = document.getElementById("testmedia");
//
//     setTimeout(function () {
//       $mp.play();
//     }, 25);
//
//     setTimeout(function () {
//       if (lastevent === "play") {
//         console.log("lastevent",lastevent);
//         done();
//       } else {
//         done(new Error("Last event is not play"));
//       }
//     }, 50);
//   });
//
//   it('Will detect play', function (done) {
//     var $mp = document.getElementById("testmedia");
//
//     setTimeout(function () {
//       $mp.pause();
//     }, 100);
//
//     setTimeout(function () {
//       if (lastevent === "pause") {
//         console.log("lastevent",lastevent);
//         done();
//       } else {
//         done(new Error("Last event is not pause"));
//       }
//     }, 125);
//   });
//
//   it('Seek to the end', function (done) {
//     var $mp = document.getElementById("testmedia");
//
//     setTimeout(function () {
//       $mp.currentTime = 1000*60*60; // duration only chnaged on event;
//                                     // since we can't grab it during this test,
//                                     // just skip to 1 hour
//       console.log("$mp.currentTime:",$mp.currentTime);
//     }, 200);
//
//     setTimeout(function () {
//       if ($mp.currentTime > 100 && lastevent === "pause") {
//         console.log("Our current time", $mp.currentTime);
//         done();
//       } else {
//         done(new Error("Didn't skip to the end"));
//       }
//     }, 225);
//   });
//
//   // RESTART
//   it('Event is "replay" after ending', function (done) {
//     var $mp = document.getElementById("testmedia");
//
//     setTimeout(function () {
//       $mp.play();
//     }, 1000);
//
//     setTimeout(function () {
//       if (lastevent === "replayed") {
//         done();
//       } else {
//         done(new Error("Didn't end"));
//       }
//     },1050);
//   });
//
//   // Play again
//   it('Event is "restart" after a pause', function (done) {
//     var $mp = document.getElementById("testmedia");
//
//     setTimeout(function () {
//       console.log("PAUSE NOW");
//       $mp.pause();
//     }, 1100);
//     setTimeout(function () {
//       console.log("PLAY NOW");
//       $mp.play();
//     }, 1150);
//
//     setTimeout(function () {
//       if (lastevent === "restart") {
//         done();
//       } else {
//         done(new Error("Didn't restart"));
//       }
//     }, 1200);
//   });
//
//
// });
//
// // describe('Example Test', function () {
// //   it('Will pass by simply calling "Done"', function (done) {
// //     done();
// //   });
// //
// //   it('Will fail', function (done) {
// //     done(new Error("There was an error."));
// //   });
// // });

},{"./index.js":2}],7:[function(require,module,exports){
// Default variables for SiteCatalyst

var variables = {
  'scNameVar':              'eVar49',
  'scPlayEvent':            'event42',
  'scPauseEvent':           'event61',
  'scResumeEvent':          'event62',
  'scCompleteEvent':        'event43',
  'scReplayedEvent':        'event63',
  'scSegmentCompleteEvent': 'event64',
  'scSecondCompleteEvent':  'event65',
  'scSegments':             'eVar50'
};

module.exports = variables;

},{}]},{},[6]);
