window.addEventListener('click', function (e) {
    console.log('click', e.target)
    if (e.target.matches('.nf-player-container *') &&
        !e.target.matches('.PlayerControls--main-controls *') &&
        !e.target.matches('.skip-credits *') &&
        document.querySelector('video').offsetWidth >= window.innerWidth
    ) {
        var button = document.querySelector('.button-nfplayerPause') || document.querySelector('.button-nfplayerPlay')
        button.click()
    }
})