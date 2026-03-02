
/*!
Rakuten Common Header
@copyright Rakuten, inc.
@version 0.1.4
 */

(function() {
  // 'use strict';

  /*
  Shorthand Base Class
   */
  var R, RCombobox, RCommonHeader, RDropdown, r,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  r = function(element) {
    var item, list, _i, _len;
    if (typeof element === 'string') {
      return r(document).findAll(element);
    } else if (element instanceof Array) {
      list = [];
      for (_i = 0, _len = element.length; _i < _len; _i++) {
        item = element[_i];
        list.push(r(item));
      }
      return list;
    } else {
      return new R(element);
    }
  };


  /*
  Base Class
   */

  R = (function() {
    var eventListeners;

    eventListeners = [];

    function _Class(element) {
      if (element instanceof R) {
        this.element = element.element;
      } else {
        this.element = element;
      }
      return;
    }

    _Class.trim = function(str) {
      return str.replace(/^[\f\n\r\t\v\u0020\u00a0\u2000-\u200b\u2028-\u3000]+|[\f\n\r\t\v\u0020\u00a0\u2000-\u200b\u2028-\u3000]+$/g, '');
    };

    _Class.prototype.find = (function() {
      if (!document.querySelector) {
        return function(query) {
          var elements;
          elements = this.findAll(query);
          if (elements.length > 0) {
            return elements[0];
          } else {
            return null;
          }
        };
      } else {
        return function(query) {
          return this.element.querySelector(query);
        };
      }
    })();

    _Class.prototype.findAll = (function() {
      if (!document.querySelectorAll) {
        return function(query) {
          var element, elements, list, _i, _len;
          list = [];
          elements = R.query.selectorAll(this.element, query);
          for (_i = 0, _len = elements.length; _i < _len; _i++) {
            element = elements[_i];
            list.push(r(element));
          }
          return list;
        };
      } else {
        return function(query) {
          var element, elements, list, _i, _len;
          list = [];
          elements = this.element.querySelectorAll(query);
          for (_i = 0, _len = elements.length; _i < _len; _i++) {
            element = elements[_i];
            list.push(r(element));
          }
          return list;
        };
      }
    })();

    _Class.prototype.children = function() {
      var list, node, _i, _len, _ref;
      list = [];
      _ref = this.element.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.nodeType === 1) {
          list.push(r(node));
        }
      }
      return list;
    };

    _Class.prototype.siblings = function() {
      var list, node, _i, _len, _ref;
      list = [];
      _ref = this.element.parentNode.childNodes;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if (node.nodeType === 1 && node !== this.element) {
          list.push(r(node));
        }
      }
      return list;
    };

    _Class.prototype.prop = function(key, value) {
      if (value === void 0) {
        return this.element[key];
      } else {
        this.element[key] = value;
      }
    };

    _Class.prototype.attr = function(key, value) {
      if (value === void 0) {
        return this.element.getAttribute(key);
      } else {
        this.element.setAttribute(key, value);
      }
    };

    _Class.prototype.css = function(key, value) {
      if (value === void 0) {
        return this.element.style[key];
      } else {
        this.element.style[key] = value;
      }
    };

    _Class.prototype.html = function(string) {
      if (string === void 0) {
        return this.element.innerHTML;
      } else {
        this.element.innerHTML = string;
      }
    };

    _Class.prototype.append = function(element) {
      if (element instanceof R) {
        element = element.element;
      }
      this.element.appendChild(element);
    };

    _Class.prototype.prepend = function(element) {
      if (element instanceof R) {
        element = element.element;
      }
      return this.element.insertBefore(element, this.element.firstChild);
    };

    _Class.prototype.after = function(element) {
      if (element instanceof R) {
        element = element.element;
      }
      this.element.parentNode.insertBefore(element, this.element.nextSibling);
    };

    _Class.prototype.before = function(element) {
      if (element instanceof R) {
        element = element.element;
      }
      this.element.parentNode.insertBefore(element, this.element);
    };

    _Class.prototype.addClass = function(classStr) {
      var classNames;
      if (typeof this.element.className === 'string') {
        classNames = this.element.className.split(' ');
        if (__indexOf.call(classNames, classStr) < 0) {
          classNames.push(classStr);
        }
        this.element.className = R.trim(classNames.join(' '));
      }
    };

    _Class.prototype.removeClass = function(classStr) {
      var className, classNames, index, _i, _len;
      if (typeof this.element.className === 'string') {
        classNames = this.element.className.split(' ');
        for (index = _i = 0, _len = classNames.length; _i < _len; index = ++_i) {
          className = classNames[index];
          if (className === classStr) {
            classNames.splice(index, 1);
            break;
          }
        }
        this.element.className = R.trim(classNames.join(' '));
      }
    };

    _Class.prototype.hasClass = function(classStr) {
      var classNames, existence;
      existence = false;
      if (typeof this.element.className === 'string') {
        classNames = this.element.className.split(' ');
        if (__indexOf.call(classNames, classStr) >= 0) {
          existence = true;
        }
      }
      return existence;
    };

    _Class.prototype.addEvent = (function() {
      if (!document.addEventListener) {
        return function(type, listener) {
          var e, wrapper, wrapper2;
          wrapper = (function(_this) {
            return function(e) {
              e.target = e.srcElement;
              e.currentTarget = _this.element;
              e.preventDefault = function() {
                this.returnValue = false;
              };
              e.stopPropagation = function() {
                this.cancelBubble = true;
              };
              if (listener.handleEvent) {
                return listener.handleEvent(e);
              } else {
                return listener.call(_this.element, e);
              }
            };
          })(this);
          if (type === 'DOMContentLoaded') {
            wrapper2 = function(e) {
              if (document.readyState === 'complete') {
                return wrapper(e);
              }
            };
            document.attachEvent('onreadystatechange', wrapper2);
            eventListeners.push({
              object: this.element,
              type: type,
              listener: listener,
              wrapper: wrapper2
            });
            if (document.readyState === 'complete') {
              e = new Event();
              e.srcElement = window;
              wrapper2(e);
            }
          } else {
            this.element.attachEvent('on' + type, wrapper);
            eventListeners.push({
              object: this.element,
              type: type,
              listener: listener,
              wrapper: wrapper
            });
          }
        };
      } else {
        return function(type, listener) {
          this.element.addEventListener(type, listener);
        };
      }
    })();

    _Class.prototype.removeEvent = (function() {
      if (!document.removeEventListener) {
        return function(type, listener) {
          var eventListener, _i, _len;
          for (_i = 0, _len = eventListeners.length; _i < _len; _i++) {
            eventListener = eventListeners[_i];
            if (eventListener.object === this.element && eventListener.type === type && eventListener.listener === listener) {
              if (type === 'DOMContentLoaded') {
                this.element.detachEvent('onreadystatechange', eventListener.wrapper);
              } else {
                this.element.detachEvent('on' + type, eventListener.wrapper);
              }
              break;
            }
          }
        };
      } else {
        return function(type, listener) {
          this.element.removeEventListener(type, listener);
        };
      }
    })();

    return _Class;

  })();


  /*
  Query Selector Polyfill Class
   */

  R.query = (function() {
    function _Class() {}

    _Class.hasTag = function(str) {
      var pattern;
      pattern = new RegExp('^([a-zA-Z1-6]+)');
      return pattern.test(str);
    };

    _Class.hasClass = function(str) {
      var pattern;
      pattern = new RegExp('\\.([\\w-]+)');
      return pattern.test(str);
    };

    _Class.hasId = function(str) {
      var pattern;
      pattern = new RegExp('#([\\w-]+)');
      return pattern.test(str);
    };

    _Class.filterByTag = function(elements, tagName) {
      var element, list, _i, _len;
      list = [];
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        if (tagName === '*') {
          list.push(element);
        } else if (tagName === element.tagName.toLowerCase()) {
          list.push(element);
        }
      }
      return list;
    };

    _Class.filterByClass = function(elements, classStr) {
      var element, list, pattern, _i, _len;
      list = [];
      pattern = new RegExp('(^|\\s)' + classStr + '(\\s|$)');
      for (_i = 0, _len = elements.length; _i < _len; _i++) {
        element = elements[_i];
        if (pattern.test(element.className)) {
          list.push(element);
        }
      }
      return list;
    };

    _Class.getNextAdjacent = function(nodes, tagName) {
      var elements, list, node, _i, _len;
      list = [];
      elements = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        elements.push(R.query.getNextSiblings(nodes, '*')[0]);
      }
      list = R.query.filterByTag(elements, tagName);
      return list;
    };

    _Class.getNextSiblings = function(nodes, tagName) {
      var elements, flag, list, node, sibling, _i, _j, _len, _len1, _ref;
      list = [];
      elements = [];
      flag = false;
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        _ref = node.parentNode.childNodes;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          sibling = _ref[_j];
          if (sibling.nodeType === 1 && flag) {
            elements.push(sibling);
          }
          if (sibling === node) {
            flag = true;
          }
        }
      }
      list = R.query.filterByTag(elements, tagName);
      return list;
    };

    _Class.getChildren = function(nodes, tagName) {
      var child, elements, list, node, _i, _j, _len, _len1, _ref;
      list = [];
      elements = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        _ref = node.childNodes;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          child = _ref[_j];
          if (child.nodeType === 1) {
            elements.push(child);
          }
        }
      }
      list = R.query.filterByTag(elements, tagName);
      return list;
    };

    _Class.getDescendants = function(nodes, tagName) {
      var element, elements, list, node, _i, _j, _len, _len1;
      list = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        elements = node.getElementsByTagName(tagName);
        for (_j = 0, _len1 = elements.length; _j < _len1; _j++) {
          element = elements[_j];
          list.push(element);
        }
      }
      return list;
    };

    _Class.crawl = function(nodes, chanks) {
      var chank, classStr, element, list, tagName;
      chank = chanks.shift();
      if (R.query.hasId(chank)) {
        element = document.getElementById(RegExp.$1);
        if (element !== null) {
          list = [element];
        }
      } else {
        if (!(nodes instanceof Array)) {
          nodes = [nodes];
        }
        tagName = '*';
        if (R.query.hasTag(chank)) {
          tagName = RegExp.$1.toLowerCase();
        }
        switch (chank) {
          case '+':
            chank = chanks.shift();
            list = R.query.getNextAdjacent(nodes, tagName);
            break;
          case '~':
            chank = chanks.shift();
            list = R.query.getNextSiblings(nodes, tagName);
            break;
          case '>':
            chank = chanks.shift();
            list = R.query.getChildren(nodes, tagName);
            break;
          default:
            list = R.query.getDescendants(nodes, tagName);
        }
        if (R.query.hasClass(chank)) {
          classStr = RegExp.$1;
          list = R.query.filterByClass(list, classStr);
        }
      }
      if (chanks.length > 0) {
        list = R.query.crawl(list, chanks);
      }
      return list;
    };

    _Class.selectorAll = function(root, query) {
      var chanks, results, selector, selectors, _i, _len;
      results = [];
      selectors = query.split(',');
      for (_i = 0, _len = selectors.length; _i < _len; _i++) {
        selector = selectors[_i];
        selector = selector.replace(/([>+~])/g, ' $1 ').replace(/[ ]+/g, ' ');
        chanks = R.trim(selector).split(' ');
        results = results.concat(R.query.crawl(root, chanks));
      }
      return results;
    };

    return _Class;

  })();


  /*
  Dropdown Class
   */

  RDropdown = (function(_super) {
    var hoverClass, onMouseenter, onMouseleave, setEvents;

    __extends(_Class, _super);

    hoverClass = 'rc-h-hover';

    function _Class(element) {
      _Class.__super__.constructor.call(this, element);
      setEvents.call(this);
      return;
    }

    setEvents = function() {
      this.addEvent('mouseenter', onMouseenter.call(this));
      this.addEvent('mouseleave', onMouseleave.call(this));
    };

    onMouseenter = function() {
      return (function(_this) {
        return function() {
          var item, itemChild, _i, _j, _len, _len1, _ref, _ref1;
          clearTimeout(_this.timer);
          _ref = _this.siblings();
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            item.removeClass(hoverClass);
            _ref1 = item.findAll('li');
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              itemChild = _ref1[_j];
              itemChild.removeClass(hoverClass);
            }
          }
          _this.addClass(hoverClass);
        };
      })(this);
    };

    onMouseleave = function() {
      return (function(_this) {
        return function() {
          _this.timer = setTimeout(function() {
            return _this.removeClass(hoverClass);
          }, 3e2);
        };
      })(this);
    };

    return _Class;

  })(R);


  /*
  Rakuten Common Header Class
   */

  RCommonHeader = (function(_super) {
    __extends(_Class, _super);

    function _Class(element) {
      var combobox, comboboxs, component, dropdown, dropdowns, _len1, _ref, _ref1;
      _Class.__super__.constructor.call(this, element);
      this.component = component = r(element);
      this.dropdowns = dropdowns = [];
      _ref1 = component.findAll('.rc-h-dropdown,.rc-h-dropdown li');
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        dropdown = _ref1[_j];
        dropdowns.push(new RDropdown(dropdown));
      }
      return;
    }

    return _Class;

  })(R);


  /*
  Instantiate Components
   */

  r(window).addEvent('DOMContentLoaded', function() {
    var header;
    header = new RCommonHeader(r('div.rc-h-standard')[0]);
  });

}).call(this);
