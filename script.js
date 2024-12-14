import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://we-are-the-champions-4d7e5-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsListInDB = ref(database, "endorsements");

const textareaEl = document.getElementById("textarea");
const publishBtn = document.getElementById("publish-btn");
const endorsementsListEl = document.getElementById("endorsements-list");


publishBtn.addEventListener("click", function() {
    let textareaValue = textareaEl.value;
    push(endorsementsListInDB,textareaValue);
    clearTexareaEl();
})

function clearTexareaEl() {
    textareaEl.value = "";
}
