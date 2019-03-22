// get elemnts

const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullScreen = player.querySelector('.fullscreen__button')
function togglePlay() {
    const method = video.paused ? 'play' : 'pause'
    video[method]()
    
    // if(video.paused){
    //     video.play()
    // } else {
    //     video.pause()
    // }
}

function updateButton () {
    console.log(this.paused)
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon

}

function skip () {
    console.log(this.dataset)
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value
    console.log('name', this.name)
    console.log(this.value  )
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
    console.log('e', e) 
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
    
}

function toggleFullScreen() {
    if(video.mozRequestFullScreen) {
        video.mozRequestFullScreen()
    } else if ( video.webkitRequestFullScreen){
        video.webkitRequestFullScreen()
    }
}

console.log('skip buttons', skipButtons)
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate))




toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip));


fullScreen.addEventListener('click', toggleFullScreen)


let mouseDown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mousedown', () => mouseDown = false);
