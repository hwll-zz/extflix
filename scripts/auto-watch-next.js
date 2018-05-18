(function () {
    'use strict';
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].className && mutation.addedNodes[0].className.toString().match(/ptrack-container/)) {
                var button = $(".WatchNext-still-hover-container").find(".PlayIcon");
                button.click();
            }
        });
    });
    observer.observe(document.querySelector('body'), {
        childList: true,
        subtree: true
    });
})();