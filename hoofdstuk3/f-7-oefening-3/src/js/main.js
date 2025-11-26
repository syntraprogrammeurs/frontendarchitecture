// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

//eigen js
/*
* Je maakt een Singleton die sessie-informatie van de gebruiker bewaart:
•	loggedIn (true/false)
•	username
Met methodes:
•	login(name)
•	logout()
•	isLoggedIn()
•	getUsername()
* */

class SessionStoreSingleton {
    static instance;

    constructor() {
        if (SessionStoreSingleton.instance) {
            return SessionStoreSingleton.instance;
        }
        this.loggedIn = false;
        this.username = null;

        SessionStoreSingleton.instance = this;
    }

    login(name) {
        if (name.trim() === "") return;
        this.loggedIn = true;
        this.username = name;
    }

    logout() {
        this.loggedIn = false;
        this.username = null;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getUsername() {
        return this.username;
    }
}

const SessionStore = new SessionStoreSingleton();

// UI-functies
function refreshSessionUI() {
    document.querySelector("#sess_out_status").textContent =
        SessionStore.isLoggedIn() ? "Ingelogd" : "Niet ingelogd";

    document.querySelector("#sess_out_user").textContent =
        SessionStore.getUsername() ?? "-";
}

// events
document.querySelector("#sess_btn_login").addEventListener("click", () => {
    const name = document.querySelector("#sess_username").value;
    SessionStore.login(name);
    refreshSessionUI();
});

document.querySelector("#sess_btn_logout").addEventListener("click", () => {
    SessionStore.logout();
    refreshSessionUI();
});

document.querySelector("#sess_btn_refresh").addEventListener("click", () => {
    refreshSessionUI();
});

// initial
refreshSessionUI();


