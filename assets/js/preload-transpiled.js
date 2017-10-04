'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var defaultConfig = {
    rootMargin: '0px',
    threshold: 0,
    load: function load(element) {
        if (element.tagName === 'IMG') {
            if (element.dataset.src) {
                element.src = element.dataset.src;
            }
            if (element.dataset.srcset) {
                element.srcset = element.dataset.srcset;
            }
        } else {
            element.style.backgroundImage = 'url(' + element.dataset.src + ')';
        }
    }
};

function markAsLoaded(element) {
    var imgLoad = new Image();
    imgLoad.onload = function () {
        element.dataset.loaded = true;
    };
    imgLoad.src = element.dataset.src;
}

var isLoaded = function isLoaded(element) {
    return element.dataset.loaded === 'true';
};

var onIntersection = function onIntersection(load) {
    return function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio > 0) {
                observer.unobserve(entry.target);
                load(entry.target);
                markAsLoaded(entry.target);
            }
        });
    };
};

function preLoad() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'img[data-src]';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _defaultConfig$option = _extends({}, defaultConfig, options),
        rootMargin = _defaultConfig$option.rootMargin,
        threshold = _defaultConfig$option.threshold,
        load = _defaultConfig$option.load;

    var observer = void 0;

    if (window.IntersectionObserver) {
        observer = new IntersectionObserver(onIntersection(load), {
            rootMargin: rootMargin,
            threshold: threshold
        });
    }

    return {
        observe: function observe() {
            var elements = document.querySelectorAll(selector);
            // console.log(elements);
            for (var i = 0; i < elements.length; i++) {
                if (isLoaded(elements[i])) {
                    continue;
                }
                if (observer) {
                    observer.observe(elements[i]);
                    continue;
                }
                load(elements[i]);
                markAsLoaded(elements[i]);
            }
        }
    };
}

document.addEventListener('DOMContentLoaded', function () {
    var observer = preLoad('img[data-src]', {
        threshold: 0.1,
        rootMargin: '100%'
    });
    observer.observe();
});