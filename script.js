import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
    push(endorsementsListInDB, textareaValue);
    clearTexareaEl();
})

onValue(endorsementsListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val())

        clearEndorsementsListEl();

        for (let i=0; i<endorsementsArray.length; i++) {
            let currentEndorsement = endorsementsArray[i];
            let currentEndorsementID = currentEndorsement[0];
            let currentEndorsementValue = currentEndorsement[1];

            appendEndorsementToListEl(currentEndorsement);
        }
    } else {
        endorsementsListEl.innerHTML = `<p>No kudos here... yet</p>`;
    }
})

function clearTexareaEl() {
    textareaEl.value = "";
}

function clearEndorsementsListEl() {
    endorsementsListEl.innerHTML = "";
}

function appendEndorsementToListEl(endorsement) {
    let endorsementID = endorsement[0];
    let endorsementValue = endorsement[1];

    // create the container div
    let endorsementContainer = document.createElement("div");
    endorsementContainer.classList.add("endorsement-container");

    // create p element for endorsement text
    let endorsementText = document.createElement("p");
    endorsementText.textContent = endorsementValue;
    endorsementText.classList.add("endorsement");

    // create the img element for the remove button
    let removeBtn = document.createElement("img");
    removeBtn.src = "./images/cross.png";
    removeBtn.alt = "x button to remove endorsement";
    removeBtn.classList.add("remove-btn");

    // event listener to remove button
    removeBtn.addEventListener("click", function() {
        endorsementContainer.remove();
        let exactLocationInDB = ref(database, `endorsements/${endorsementID}`);
        remove(exactLocationInDB);
    });

    // append the text and remove button to the container
    endorsementContainer.appendChild(endorsementText);
    endorsementContainer.appendChild(removeBtn);

    // prepend the container to the endorsements list
    endorsementsListEl.prepend(endorsementContainer);

}