(function () {
    var netflix_user = "Jake";
    var nom = document.getElementsByClassName("profile-name");
    var l = nom.length;
    if (l) {
        for (var y = 0; y < l; y++) {
            var x = nom[y];
            if (x.textContent == netflix_user) {
                x.parentElement.click();
            }
        }
    }
})();