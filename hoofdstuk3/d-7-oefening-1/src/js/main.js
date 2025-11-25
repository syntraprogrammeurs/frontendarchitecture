// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js
//Doel Je bouwt een Singleton voor audiovoorkeuren. De Singleton beheert:
// •	volume (0–100)
// •	muted (true/false)
// Met methodes:
// •	setVolume(value)
// •	toggleMute()
// •	getVolume()
// •	isMuted()

class AudioSettingsSingleton {
    static instance;

    constructor() {
        if (AudioSettingsSingleton.instance) {
            return AudioSettingsSingleton.instance;
        }
        this.volume = 50;
        this.muted = false;

        AudioSettingsSingleton.instance = this;
    }

    setVolume(v) {
        this.volume = Math.max(0, Math.min(100, v));
    }

    toggleMute() {
        this.muted = !this.muted;
    }

    getVolume() {
        return this.volume;
    }

    isMuted() {
        return this.muted;
    }
}

// centrale instantie
const AudioSettings = new AudioSettingsSingleton();

// UI helper
function updateUI() {
    document.querySelector("#aud_out_volume").textContent = AudioSettings.getVolume();
    document.querySelector("#aud_out_muted").textContent = AudioSettings.isMuted();
}

// events
document.querySelector("#aud_volume").addEventListener("input", (e) => {
    AudioSettings.setVolume(e.target.value);
    updateUI();            // meteen tonen
});

document.querySelector("#aud_btn_mute").addEventListener("click", () => {
    AudioSettings.toggleMute();
    updateUI();            // meteen tonen
});

document.querySelector("#aud_btn_show").addEventListener("click", () => {
    updateUI();            // blijft ook werken
});

// eventueel: initiale waarden tonen bij start
updateUI();
