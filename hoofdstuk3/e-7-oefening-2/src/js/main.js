// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

/*
* Je maakt een Singleton die nieuwe notificaties telt. Verschillende modules sturen notificaties,
*  maar er is één centrale teller.
De Singleton:
•	bewaart count
•	heeft addNotification()
•	heeft reset()
•	heeft render() om de badge te updaten

* */
class NotificationCounterSingleton {
    static instance;

    constructor() {
        if (NotificationCounterSingleton.instance) {
            return NotificationCounterSingleton.instance;
        }
        this.count = 0;
        NotificationCounterSingleton.instance = this;
    }

    addNotification() {
        this.count++;
        this.render();
    }

    reset() {
        this.count = 0;
        this.render();
    }

    render() {
        const badge = document.querySelector("#notif_badge");
        if (badge) {
            badge.textContent = this.count;
        }
    }
}

const NotifCounter = new NotificationCounterSingleton();

// “modules”
const ModuleA = {
    notify() {
        NotifCounter.addNotification();
    }
};
const ModuleB = { notify() { NotifCounter.addNotification(); }};

// events
document.querySelector("#notif_btn_a")
    .addEventListener("click", () => ModuleA.notify());

document.querySelector("#notif_btn_b")
    .addEventListener("click", () => ModuleB.notify());

document.querySelector("#notif_btn_reset")
    .addEventListener("click", () => NotifCounter.reset());

// eerste render
NotifCounter.render();
