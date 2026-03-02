var sentinel = new Sentinel({
  elements: function elements() {
    if (typeof jQuery === 'undefined')
    { return; }
    var elems = jQuery('[data-sentinel]');
    return elems;
  },
  appear: function sendData(el, data) {
    //dont try to send the data if there is no SiteCatalyst code in the page
    if (typeof s === 'undefined'){ return; }
    var _data = el.getAttribute('data-sentinel');
    //set your SiteCatalyst variables to track
    s.linkTrackVars='eVar74';
    if (_data)
    { s.eVar74 = _data; }
    s.tl(this,'o','sentinel');
  }
});