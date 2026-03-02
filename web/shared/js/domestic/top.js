
/*
Chart Class
 */

(function() {
  var Chart;

  Chart = (function() {
    var makeImage, makeOptions, onCreate;

    Chart.prototype.image_width = 230;

    Chart.prototype.image_height = 130;

    Chart.prototype.index = 0;

    function Chart(object) {
      this.params = object;
      onCreate.call(this);
      return;
    }

    Chart.prototype.change = function(number, per) {
      this.index = number;
      this.param = this.params[this.index];
      this.param.per = this.select_per.val();
      makeImage.call(this);
    };

    onCreate = function() {
      this.region = $('#chart-image');
      this.select_ric = $('#chart-select-ric');
      this.select_per = $('#chart-select-per');
      makeOptions.call(this);
      this.select_ric.change((function(_this) {
        return function() {
          return _this.change(_this.select_ric.get(0).selectedIndex);
        };
      })(this));
      this.select_per.change((function(_this) {
        return function() {
          return _this.change(_this.index);
        };
      })(this));
      this.change(this.index);
    };

    makeOptions = function() {
      var fragment, item, option, _i, _len, _ref;
      fragment = document.createDocumentFragment();
      _ref = this.params;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        option = document.createElement('option');
        option.value = item.ric;
        option.appendChild(document.createTextNode(item.label));
        fragment.appendChild(option);
      }
      this.select_ric.append(fragment);
    };

    makeImage = function() {
      if (this.image) {
        this.image.parentElement.removeChild(this.image);
      }
      if (this.anchor) {
        this.anchor.parentElement.removeChild(this.anchor);
      }
      this.image = null;
      this.anchor = null;
      this.anchor = document.createElement('a');
      this.anchor.target = '_top';
      this.anchor.href = this.param.url;
      this.image = new Image();
      this.image.width = this.image_width;
      this.image.height = this.image_height;
      this.image.src = "https://www.trkd-asia.com/rakutensec/common/analytic.jsp?ric=" + this.param.ric + "&per=" + this.param.per + "&width=" + this.image_width + "&height=" + this.image_height + "&tp=0&sma=0&vol=0&mode=0";
      this.anchor.appendChild(this.image);
      this.region.append(this.anchor);
updateData();
    };

    return Chart;

  })();

  window.Chart = Chart;

  return;

}).call(this);
