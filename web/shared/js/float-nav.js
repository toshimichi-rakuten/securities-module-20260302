/*!
Rakuten Securities Section Nav in Header
 */
(function($){
    var Header = (function(){
        var delayTime = 400;
        var floatPoint = 850;

        var _Class = function() {
            this.$window = $(window);
            this.$header = $('div.rc-h-standard');
            this.$navs   = this.$header.find('ul.rc-h-section-nav,ul.rc-h-float-nav').find('a,b');
            this.$panels = this.$header.find('div.rc-h-dropdown-panel');
            this.timer   = null;
            this.tapFlag = false;
            this.tapEvent= null;
            setEvents.call(this);
        };

        _Class.prototype.showDropdown = function() {
            var that = this;

            if(that.category) {
                that.$navs.filter('[data-h-dropdown=' + that.category + ']').addClass('rc-h-hover');
                that.$panels.each(function(){
                    var $panel = $(this), $inner;

                    if($panel.hasClass('rc-h-panel-' + that.category)){
                        $panel.css({
                            width: 0,
                            height: 0
                        });
                        $panel.show();
                        $inner = $panel.children();
                        $panel.css({
                            width: $inner.outerWidth(),
                            height: $inner.outerHeight()
                        });
                    }
                });
            }
        };

        _Class.prototype.hideDropdown = function() {
            this.$navs.removeClass('rc-h-hover');
            this.$panels.hide();
            this.category = void 0;
        };

        var setEvents = function() {
            this.$navs
                .bind('mouseenter', onEnterNav.call(this))
                .bind('mouseleave', onLeaveNav.call(this))
                .filter('b')
                .bind('touchstart', onTouchStartNav.call(this))
                .bind('touchmove',  onTouchMoveNav.call(this))
                .bind('touchend',   onTouchEndNav.call(this));

            this.$panels
                .bind('mouseenter', onEnterDropdown.call(this))
                .bind('mouseleave', onLeaveDropdown.call(this));

            this.$window
                .bind('touchstart', onTouchStartDoc.call(this));

            if(this.$header.find('.rc-h-float-bar').length > 0){
                this.$window
                    .bind('scroll', onScroll.call(this));
            }
        };

        var onScroll = function() {
            return (function(_this) {
                return function() {
                    var scrollY = document.documentElement.scrollTop || document.body.scrollTop;

                    if(scrollY > floatPoint) {
                        _this.$header.addClass('rc-h-floating');
                    } else {
                        _this.$header.removeClass('rc-h-floating');
                    }
                };
            })(this);
        };

        var onTouchStartDoc = function() {
            return (function(_this) {
                return function() {
                    onLeaveNav.call(_this)();
                };
            })(this);
        };

        var onTouchStartNav = function() {
            return (function(_this) {
                return function(e) {
                    _this.tapFlag = true;
                    _this.tapEvent = e;
                    e.stopPropagation();
                    e.preventDefault();
                };
            })(this);
        };

        var onTouchMoveNav = function() {
            return (function(_this) {
                return function() {
                    _this.tapFlag = false;
                    _this.tapEvent = null;
                };
            })(this);
        };

        var onTouchEndNav = function() {
            return (function(_this) {
                return function() {
                    var currentTarget;

                    if(_this.tapFlag) {
                        currentTarget = _this.tapEvent.currentTarget;

                        // if(_this.category === $(currentTarget).data('h-dropdown')) {
                        if(_this.category === $(currentTarget).attr('data-h-dropdown')) {
                            _this.hideDropdown();
                        } else {
                            onEnterNav.call(_this).call(currentTarget);
                        }
                    }
                    _this.tapFlag = false;
                    _this.tapEvent = null;
                };
            })(this);
        };

        var onEnterNav = function() {
            return (function(_this) {
                return function() {
                    // var category = $(this).data('h-dropdown');
                    var category = $(this).attr('data-h-dropdown');
                    clearTimeout(_this.timer);

                    if(category !== _this.category) {
                        _this.hideDropdown();
                        // _this.category = $(this).data('h-dropdown');
                        _this.category = $(this).attr('data-h-dropdown');
                        _this.showDropdown();
                    }
                };
            })(this);
        };

        var onLeaveNav = function() {
            return (function(_this) {
                return function() {
                    _this.timer = setTimeout(function() {
                        _this.hideDropdown();
                    }, delayTime);
                };
            })(this);
        };

        var onEnterDropdown = function() {
            return (function(_this) {
                return function() {
                    clearTimeout(_this.timer);
                };
            })(this);
        };

        var onLeaveDropdown = function() {
            return (function(_this) {
                return function() {
                    _this.timer = setTimeout(function() {
                        _this.hideDropdown();
                    }, delayTime);
                };
            })(this);
        };

        return _Class;
    })();

    $(function() {
        new Header();
    });

})(window.jqBase || jQuery);