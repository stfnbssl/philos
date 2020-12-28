/*!
  Copyright (c) 2018 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

    var hasOwn = {}.hasOwnProperty;
    
    function toVal(mix) {
        var k, y, str='';
    
        if (typeof mix === 'string' || typeof mix === 'number') {
            str += mix;
        } else if (typeof mix === 'object') {
            if (Array.isArray(mix)) {
                for (k=0; k < mix.length; k++) {
                    if (mix[k]) {
                        if (y = toVal(mix[k])) {
                            str && (str += ' ');
                            str += y;
                        }
                    }
                }
            } else {
                for (k in mix) {
                    if (mix[k]) {
                        str && (str += ' ');
                        str += k;
                    }
                }
            }
        }
    
        return str;
    }
    
	function classNames () {
        var i=0, tmp, x, str='';
        while (i < arguments.length) {
            if (tmp = arguments[i++]) {
                if (x = toVal(tmp)) {
                    str && (str += ' ');
                    str += x
                }
            }
        }
        return str;
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());