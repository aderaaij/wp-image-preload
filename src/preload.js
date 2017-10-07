import pWaitFor from 'p-wait-for';

const defaultConfig = {
    rootMargin: '0px',
    threshold: 0,
    load(element) {
        if (element.tagName === 'IMG') {
            if (element.dataset.src) {
                element.src = element.dataset.src;
            }
            if (element.dataset.srcset) {
                element.srcset = element.dataset.srcset;
            }
        } else {
            element.style.backgroundImage = `url(${element.dataset.src})`;
        }
    },
};

function markAsLoaded(element) {
    if (element.dataset.srcset) {
        pWaitFor(() => {            
            if (element.currentSrc !== '' && !element.currentSrc.includes('1x1')) {
                console.log('passed', element.currentSrc);
                return true;
            }
            return false;
        }).then(() => {
            const imgLoad = new Image();
            imgLoad.onload = () => {
                element.classList.add('b-loaded');
                element.parentNode.classList.add('is-loaded');
                element.dataset.loaded = true;
            };
            imgLoad.src = element.currentSrc;
            console.log(element.currentSrc);
        });
    } else {
        const imgLoad = new Image();
        imgLoad.onload = () => {
            element.classList.add('b-loaded');
            element.parentNode.classList.add('is-loaded');
            element.dataset.loaded = true;
        };
        imgLoad.src = element.dataset.src;
    }
}

const isLoaded = element => element.dataset.loaded === 'true';

const onIntersection = load => (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
            observer.unobserve(entry.target);
            load(entry.target);
            markAsLoaded(entry.target);
        }
    });
};

function preLoad(selector = 'img[data-src]', options = {}) {
    const { rootMargin, threshold, load } = { ...defaultConfig, ...options };
    let observer;

    if (window.IntersectionObserver) {
        observer = new IntersectionObserver(onIntersection(load), {
            rootMargin,
            threshold,
        });
    }

    return {
        observe() {
            const elements = document.querySelectorAll(selector);
            for (let i = 0; i < elements.length; i++) {
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
        },
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const observer = preLoad('img[data-src]', {
        threshold: 0.1,
        rootMargin: '0px',
    });
    observer.observe();
});
