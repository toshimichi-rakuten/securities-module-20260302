var disableSubmit = {
	init : function() {
		this.addEvent(window, 'load', this.set());
	},

	set : function() {
		var self = this;
		return function() {
			for ( var i = 0; i < document.forms.length; ++i) {
				if (document.forms[i].onsubmit) {
					document.forms[i].onsubmit = function() {
						if (document.forms[i].onsubmit() == false) {
							return false;
						}
						self.setDisable(document.getElementsByTagName('input'));
					};
				}

				document.forms[i].onsubmit = function() {
					self.setDisable(document.getElementsByTagName('input'));
				};
			}
		};
	},

	setDisable : function(elms) {
		function Set(button) {
			window.setTimeout( function() {
				button.disabled = true;
			}, 1);
		}
		function unSet(button) {
			window.setTimeout( function() {
				button.disabled = false;
			}, 1000);
		}

		for ( var i = 0, elm; elm = elms[i]; i++) {
			if ((elm.type == 'submit' || elm.type == 'image') && !elm.disabled) {
				Set(elm);
				unSet(elm);
			}
		}
	},

	addEvent : function(elm, type, event) {
		if (elm.addEventListener) {
			elm.addEventListener(type, event, false);
		} else if (elm.attachEvent) {
			elm.attachEvent('on' + type, event);
		} else {
			elm['on' + type] = event;
		}
	}
};

disableSubmit.init();