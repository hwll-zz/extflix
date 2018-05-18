(function () {
    'use strict';
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length > 0 && mutation.addedNodes[0].className && mutation.addedNodes[0].className.toString().match(/skip-credits/)) {
                var innerDiv = $(".skip-credits");
                if (innerDiv.length > 0) {
                    var button = innerDiv.find(".nf-flat-button-text");
                    button.click();
                }
            }
        });
    });
    observer.observe(document.querySelector('body'), {
        childList: true,
        subtree: true
    });
})();