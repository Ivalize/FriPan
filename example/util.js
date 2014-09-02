// Generated by CoffeeScript 1.7.1
(function() {
  var SVG, html_warning, log_msg;

  this.our_log = function(o) {
    if ((typeof console !== "undefined" && console !== null) && (console.log != null)) {
      return console.log.apply(console, !!arguments.length ? arguments : [this]);
    } else if ((typeof opera !== "undefined" && opera !== null) && (opera.postError != null)) {
      return opera.postError(o || this);
    }
  };

  this.log_info = function(o) {
    return log_msg("INFO", arguments);
  };

  this.log_warn = function(o) {
    return log_msg("WARN", arguments);
  };

  this.log_error = function(o) {
    return log_msg("ERROR", arguments);
  };

  this.log_debug = function(o) {
    if (window.debug != null) {
      return log_msg("DEBUG", arguments);
    }
  };

  log_msg = function(msg, rest) {
    var args, r;
    args = Array.prototype.slice.call(rest);
    r = [msg].concat(args);
    return window.our_log.apply(window, r);
  };

  html_warning = "<div class='browser-warning'>\n  <button type=\"button\" class=\"close\" onclick=\"$('.browser-warning').hide();\">x</button>\n  <h1>Internet Explorer is not supported</h1>\n  <p>Please use <a href='http://www.mozilla.org/en-US/firefox/new/'>Firefox</a> or <a href='http://www.google.com/chrome/'>Chrome</a></p>\n</div>";

  this.add_browser_warning = function() {
    var outer;
    if (window.navigator.userAgent.indexOf("MSIE ") >= 0) {
      outer = $('.browser-warning-outer');
      if (outer.length === 0) {
        $('body').prepend('<div class="warning-popover browser-warning-outer"></div>');
        outer = $('.browser-warning-outer');
      }
      return outer.append(html_warning);
    }
  };

  this.get_url_params = function() {
    var hash;
    hash = window.location.search;
    return hash.substring(1);
  };

  SVG = (function() {
    function SVG() {}

    SVG.copyStyleDeep = function(src, dest) {
      var dChildren, i, sChildren, _i, _ref, _results;
      SVG.copyStyle(src, dest);
      sChildren = src.node().childNodes;
      dChildren = dest.node().childNodes;
      if (sChildren.length !== dChildren.length) {
        console.log("Mismatch number of children!");
      }
      _results = [];
      for (i = _i = 0, _ref = sChildren.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (sChildren[i].nodeType === Node.ELEMENT_NODE) {
          _results.push(SVG.copyStyleDeep(d3.select(sChildren[i]), d3.select(dChildren[i])));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    SVG.copyStyle = function(src, dest) {
      var _ref;
      if (src.style('visibility') === 'hidden') {
        return dest.style('display', 'none');
      } else if (src.node().tagName === 'text') {
        ['font-size', 'font-family'].forEach(function(a) {
          return dest.style(a, src.style(a));
        });
        return ['dx', 'dy'].forEach(function(a) {
          var m;
          if ((m = /(.*)em/.exec(dest.attr(a)))) {
            return dest.attr(a, m[1] * 10);
          }
        });
      } else if ((_ref = src.node().tagName) === 'rect' || _ref === 'line' || _ref === 'path') {
        return ['fill', 'stroke', 'fill-opacity'].forEach(function(a) {
          return dest.style(a, src.style(a));
        });
      }
    };

    SVG.download_svg = function(e) {
      var html, node, svg_elem, wrapper;
      svg_elem = d3.select(d3.select(e).attr('data-for'));
      node = svg_elem.node().cloneNode(true);
      SVG.copyStyleDeep(svg_elem, d3.select(node));
      d3.select(node).attr("version", 1.1).attr("xmlns", "http://www.w3.org/2000/svg");
      wrapper = document.createElement('div');
      wrapper.appendChild(node);
      html = wrapper.innerHTML;
      return d3.select(e).attr("href-lang", "image/svg+xml").attr("href", "data:image/svg+xml;base64,\n" + btoa(html));
    };

    return SVG;

  })();

  this.download_svg = SVG.download_svg;

}).call(this);
