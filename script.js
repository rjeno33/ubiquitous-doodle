// =========================
// Variables
// =========================

let perfectTenUnlocked = false;
let championUnlocked = false;
let score = 0;
let completedTasks = 0;
let waterUnlocked = false;
let sennaUnlocked = false;
let dietUnlocked = false;
let prepUnlocked = false;
let fastUnlocked = false;


let rating = 0;

const achievementPopup = document.getElementById("achievementPopup");
const achievementTitle = document.getElementById("achievementTitle");
const achievementText = document.getElementById("achievementText");
const achievementIcon = document.getElementById("achievementIcon");
const scoreDisplay = document.getElementById("score");
const createPlanButton = document.getElementById("createPlanButton");
const appointmentDate = document.getElementById("appointmentDate");
const clearDateButton = document.getElementById("clearDateButton");
const plan = document.getElementById("plan");
const progressFill = document.getElementById("progressFill");
const faqHeader = document.getElementById("faqHeader");
const faqContent = document.getElementById("faqContent");
const faqArrow = document.getElementById("faqArrow");
const ratingText = document.getElementById("ratingText");

const achievementHeader =
document.getElementById("achievementHeader");

const achievementCabinet =
document.getElementById("achievementCabinet");

const achievementArrow =
document.getElementById("achievementArrow");

const achievementCount =
document.getElementById("achievementCount");

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", function(){

    document.getElementById("welcomeScreen")
        .style.display = "none";

    document.getElementById("mainApp")
        .style.display = "block";

    localStorage.setItem("welcomeSeen","true");

});


const taskProgress = {
    water: 0,
    senna: 0,
    diet: 0,
    prep: 0,
    fast: 0,
    end: 0
};
const taskTotals = {
    water: 0,
    senna: 0,
    diet: 0,
    prep: 0,
    fast: 0,
    end: 0
};


// =========================
// Functions
// =========================


// Text rating //

function updateRatingText(value){

    switch(value){

        case 1:
            ratingText.innerHTML ="<p> Needs Improvement</p>";
            break;

        case 2:
            ratingText.innerHTML = "Fair 🙂";
            break;

        case 3:
            ratingText.innerHTML = "Good 👍";
            break;

        case 4:
            ratingText.innerHTML = "Very Good 😄";
            break;

        case 5:
            ratingText.innerHTML = "Excellent! 🌟";
            break;

        default:
            ratingText.textContent = "Tap a star to rate the app";

    }

}

//Star Rating //

function initialiseStarRating() {

    const stars = document.querySelectorAll(".star");

    stars.forEach(function(star) {

        // Hover preview
        star.addEventListener("mouseenter", function() {

            const hoverValue = Number(star.dataset.value);
            updateRatingText(hoverValue);

            stars.forEach(function(s) {

                if (Number(s.dataset.value) <= hoverValue) {

                    s.innerHTML = "<i class='fa-solid fa-star'></i>";

                } else {

                    s.innerHTML = "<i class='fa-regular fa-star'></i>";

                }

            });

        });

        // Save rating
        star.addEventListener("click", function() {

            rating = Number(star.dataset.value);
            updateRatingText(rating);

        });

    });

    // Restore saved rating when leaving the star area
    document.getElementById("starRating")
        .addEventListener("mouseleave", function() {
            
            updateRatingText(rating);
            stars.forEach(function(s) {

                if (Number(s.dataset.value) <= rating) {

                    s.innerHTML = "<i class='fa-solid fa-star'></i>";

                } else {

                    s.innerHTML = "<i class='fa-regular fa-star'></i>";

                }

            });

        });

}

// Submit Feedback //

function submitFeedback() {

    const helpful =
        document.querySelector("input[name='helpful']:checked");

    const firstTime =
        document.querySelector("input[name='firstTime']:checked");

    const anxiety =
        document.querySelector("input[name='anxiety']:checked");

    const recommend =
        document.querySelector("input[name='recommend']:checked");

    fetch("https://script.google.com/macros/s/AKfycby4FTW3-gXQSFUCASoA3NftFtT62LwO5gQgGBjBSjUy_Cp-JuHXGJXbf1fxPdSTFqDR/exec", {

        method: "POST",

        body: JSON.stringify({

            ageGroup: document.getElementById("ageGroup").value,

            gender: document.getElementById("gender").value,

            firstTime: firstTime ? firstTime.value : "",

            rating: rating,

            helpful: helpful ? helpful.value : "",

            anxiety: anxiety ? anxiety.value : "",

            recommend: recommend ? recommend.value : "",

            device: document.getElementById("device").value,

            comments: document.getElementById("comments").value

        })

    })

    .then(function() {

        document.getElementById("feedbackForm").innerHTML =

            "<h2>❤️ Thank You!</h2>" +

            "<p>Your feedback has been submitted.</p>";

    });

}

// Feedback Form //

function showFeedback(){

    document.getElementById("completion").style.display = "none";

    document.getElementById("feedbackForm").style.display = "block";

}

// Show Completion page //

function checkCompletion() {

    const totalTasks =
        document.querySelectorAll("input[type='checkbox']").length;

    if (completedTasks === totalTasks) {

        showCompletionPage();

    }

}

// Competion Page //

function showCompletionPage() {

    const completion = document.getElementById("completion");

    completion.innerHTML =

    "<h2><i class='fa-solid fa-trophy'></i> Congratulations!</h2>" +

    "<p>You have completed every preparation task.</p>" +

    "<p>Good luck with your procedure.</p>" +

    "<hr>" +

    "<h3>Remember to:</h3>" +

    "<p>✔ Bring your appointment letter</p>" +

    "<p>✔ Bring your medication list</p>" +

    "<p>✔ Arrange transport home if you're having sedation</p>" +

    "<p>✔ Arrive a little early</p>" +

    "<br>" +

    "<button id='feedbackButton'>Leave Feedback</button>";

    document
        .getElementById("feedbackButton")
        .addEventListener("click",showFeedback);

}

// Update level //

function updateLevel(){

let level="Prep Padawan";

if(score>=30){
level="Colon Cadet";
}

if(score>=90){
level="Bowel Baron";
}

if(score>=150){
level="Prep Paladin";
}

if(score>=230){
level="Grand Poobah of Prep";
}


document.getElementById("level").textContent=level;

}

function toggleAchievements(){

    achievementCabinet.classList.toggle("closed");

    if(achievementCabinet.classList.contains("closed")){

        achievementArrow.innerHTML="<i class='fa-regular fa-square-caret-down'></i>";

    }else{

        achievementArrow.innerHTML="<i class='fa-regular fa-square-caret-up'></i>";

    }

}

function saveAchievements(){

localStorage.setItem("perfectTenUnlocked", perfectTenUnlocked);
localStorage.setItem("championUnlocked", championUnlocked);
localStorage.setItem("waterUnlocked", waterUnlocked);
localStorage.setItem("sennaUnlocked", sennaUnlocked);
localStorage.setItem("dietUnlocked", dietUnlocked);
localStorage.setItem("prepUnlocked", prepUnlocked);
localStorage.setItem("fastUnlocked", fastUnlocked);

}

// Load Achievements //

function loadAchievements(){

perfectTenUnlocked = localStorage.getItem("perfectTenUnlocked") === "true";
championUnlocked = localStorage.getItem("championUnlocked") === "true";
waterUnlocked = localStorage.getItem("waterUnlocked") === "true";
sennaUnlocked = localStorage.getItem("sennaUnlocked") === "true";
dietUnlocked = localStorage.getItem("dietUnlocked") === "true";
prepUnlocked = localStorage.getItem("prepUnlocked") === "true";
fastUnlocked = localStorage.getItem("fastUnlocked") === "true";

}

// Render Achievements //

function renderAchievements() {

const cabinet = document.getElementById("achievementCabinet");

cabinet.innerHTML =
        "<p>" + (perfectTenUnlocked ? "<i class='fa-solid fa-star'></i>" : "<i class='fa-solid fa-lock'></i>") + " Perfect Ten</p>" +
        "<p>" + (championUnlocked ? "<i class='fa-solid fa-trophy'></i>" : "<i class='fa-solid fa-lock'></i>") + " Colonoscopy Champion</p>" +
        "<p>" + (waterUnlocked ? "<i class='fa-solid fa-droplet'></i>" : "<i class='fa-solid fa-lock'></i>") + " Hydration Hero</p>" +
        "<p>" + (sennaUnlocked ? "<i class='fa-solid fa-pills'></i>" : "<i class='fa-solid fa-lock'></i>") + " Senna Superstar</p>" +
        "<p>" + (dietUnlocked ? "<i class='fa-solid fa-utensils'></i>" : "<i class='fa-solid fa-lock'></i>") + " Low Residue Legend</p>" +
        "<p>" + (prepUnlocked ? "<i class='fa-solid fa-flask'></i>" : "<i class='fa-solid fa-lock'></i>") + " Prep Professional</p>" +
        "<p>" + (fastUnlocked ? "<i class='fa-solid fa-truck-fast'></i>" : "<i class='fa-solid fa-lock'></i>") + " The Fasting and the Furious</p>";

let unlocked = 0;

if(perfectTenUnlocked) unlocked++;
if(championUnlocked) unlocked++;
if(waterUnlocked) unlocked++;
if(sennaUnlocked) unlocked++;
if(dietUnlocked) unlocked++;
if(prepUnlocked) unlocked++;
if(fastUnlocked) unlocked++;

achievementCount.textContent =
"(" + unlocked + "/7)";

}

function resetPlan() {

    score = 0;
    completedTasks = 0;

    updateLevel();

    perfectTenUnlocked = false;
    championUnlocked = false;
    waterUnlocked = false;
    sennaUnlocked = false;
    dietUnlocked = false;
    prepUnlocked = false;
    fastUnlocked = false;
 

    Object.keys(taskProgress).forEach(function(key) {
        taskProgress[key] = 0;
    });

    Object.keys(taskTotals).forEach(function(key) {
        taskTotals[key] = 0;
    });

    scoreDisplay.textContent = score;
    progressFill.style.width = "0%";
    

}


function loadProgress() {

    // Start fresh
    score = 0;
    completedTasks = 0;

    Object.keys(taskProgress).forEach(function(key) {
        taskProgress[key] = 0;
    });

    achievementCabinet.classList.add("closed");

    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(function(checkbox) {

        const taskId = checkbox.dataset.id;

        if (localStorage.getItem(taskId) === "completed") {

            checkbox.checked = true;
            checkbox.parentElement.classList.add("completed");

            const taskType = checkbox.dataset.type;

            completedTasks++;
            taskProgress[taskType]++;
            score += 10;

        } else {

            checkbox.checked = false;
            checkbox.parentElement.classList.remove("completed");

        }

    });

    scoreDisplay.textContent = score;
    updateLevel();

    const percentage = checkboxes.length > 0
        ? (completedTasks / checkboxes.length) * 100
        : 0;

    progressFill.style.width = percentage + "%";

    if (localStorage.getItem("welcomeSeen") === "true") {

        document.getElementById("welcomeScreen").style.display = "none";
        document.getElementById("mainApp").style.display = "block";

    } else {

        document.getElementById("welcomeScreen").style.display = "block";
        document.getElementById("mainApp").style.display = "none";

    }

}




function addCheckboxListeners() {

    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            const taskType = checkbox.dataset.type;
            const taskId = checkbox.dataset.id;

            if (checkbox.checked) {

                checkbox.parentElement.classList.add("completed");
                score += 10;
                completedTasks++;
                taskProgress[taskType]++;
                localStorage.setItem(taskId, "completed");

            } else {
 
                checkbox.parentElement.classList.remove("completed");
                score -= 10;
                completedTasks--;
                taskProgress[taskType]--;
                localStorage.removeItem(taskId);

            }

            scoreDisplay.textContent = score;

            const percentage = (completedTasks / checkboxes.length) * 100;
            progressFill.style.width = percentage + "%";

            checkAchievements();
            updateLevel();
            checkCompletion();
           completion.style.display="block";
        });

    });

}





// Check Achievements //

function checkAchievements() {

    // Perfect Ten
    if (completedTasks >= 10 && !perfectTenUnlocked) {

        showAchievement("Perfect 10",
                        "You completed 10 tasks! Keep going!",
                        "<i class ='fa-solid fa-star'></i>");
        perfectTenUnlocked = true;

    }

    // Colonoscopy Champion
    if (completedTasks === document.querySelectorAll("input[type='checkbox']").length &&
        !championUnlocked) {

        showAchievement("Colonoscopy Champion!",
                        "You're Colonoscopy ready! Amazing work!",
                        "<i class ='fa-solid fa-trophy'></i>");
        championUnlocked = true;

    }

    // Water Master
    if (  taskTotals.water > 0 &&
         taskProgress.water === taskTotals.water && !waterUnlocked) {

        showAchievement("Hydration Hero",
                        "You drank every litre",
                         "<i class ='fa-solid fa-droplet'></i>");
         waterUnlocked = true;
    }

    // Senna Success
    if (    taskTotals.senna > 0 &&
            taskProgress.senna === taskTotals.senna && !sennaUnlocked) {

        showAchievement("Senna Success!",
                        "You took all the Senna doses",
                         "<i class ='fa-solid fa-pills'></i>");
        sennaUnlocked = true;
    }

    // Diet Hero
    if (   taskTotals.diet > 0 &&
           taskProgress.diet === taskTotals.diet && !dietUnlocked) {

        showAchievement("Low Residue Legend!",
                        "You followed the low residue diet all week",
                         "<i class ='fa-solid fa-utensils'></i>");
        dietUnlocked = true;
    }

    // Fasting and the furious
if (  taskTotals.fast > 0 &&
      taskProgress.fast === taskTotals.fast && !fastUnlocked) {

    showAchievement(" The Fasting and the Furious!",
                    "You commenced the fast",
                     "<i class='fa-solid fa-truck-fast'></i>");
    fastUnlocked = true;
}

// Prep Professional
if (taskTotals.prep > 0 &&
    taskProgress.prep === taskTotals.prep &&
    !prepUnlocked) {

    showAchievement("Prep Professional!",
                    " You defeated the prep! Well done!",
                    "<i class='fa-solid fa-flask'></i>");
    prepUnlocked = true;


  
}
  renderAchievements();
  saveAchievements();
}


// show Achievement //

function showAchievement(title, text, icon) {

    achievementTitle.textContent = title;
    achievementText.textContent = text;
    achievementIcon.innerHTML = icon;

achievementCabinet.classList.remove("closed");
achievementArrow.innerHTML = "<i class='fa-regular fa-square-caret-up'></i>";
    achievementPopup.classList.remove("hidden");
    achievementPopup.classList.add("show");


    setTimeout(function(){

        achievementPopup.classList.remove("show");
        achievementPopup.classList.add("hidden");

    },4000);

}

// Add Task //

function addTask(task) {

    const icons = {

        senna: "<i class='fa-solid fa-pills'></i>",
        water: "<i class='fa-solid fa-droplet'></i>",
        diet: "<i class='fa-solid fa-utensils'></i>",
        prep: "<i class='fa-solid fa-flask'></i>",
        fast: "<i class='fa-solid fa-hourglass-half'></i>",
        end: "<i class='fa-solid fa-flag-checkered'></i>",
        iron: "<i class='fa-solid fa-prescription-bottle-medical'></i>"

    };

    return `
        <label class="task">
            <input
                type="checkbox"
                data-id="${task.id}"
                data-type="${task.type}">
            ${icons[task.type]}
            <span>${task.text}</span>
        </label>
    `;

}

function addTaskList(tasks){

    let html = "";

    tasks.forEach(function(task){

        html += addTask(task);

    });

    return html;

}

// Standard Day //

function addStandardDay(date, day) {

    const dayId =
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2,"0") + "-" +
        String(date.getDate()).padStart(2,"0");

    const isToday =
        date.toDateString() === new Date().toDateString();

    let tasks = [];

    // 7 days before
    if (day === 7) {

        tasks.push({
            id: dayId + "-iron",
            text: "Stop taking iron tablets (if prescribed)",
            type: "iron"
        });

    }

    // 5, 4, 3 and 2 days before
    if (day <= 5) {

        tasks.push({
            id: dayId + "-senna",
            text: "Take Senna (2 tablets at night)",
            type: "senna"
        });

        tasks.push({
            id: dayId + "-water",
            text: "Drink at least 1L of water",
            type: "water"
        });

        tasks.push({
            id: dayId + "-diet",
            text: "Follow a low residue diet",
            type: "diet"
        });

    }

    let html = "";

    html += "<div class='daySection";

    if (isToday) {
        html += " todaySection";
    }

    html += "' data-date='" + dayId + "'>";

    html += "<h3>" + date.toDateString() + "</h3>";

    if (isToday) {

        html +=
        "<h2 style='color:#d89b00;'>" +
        "<i class='fa-solid fa-star'></i> TODAY" +
        "</h2>";

    }

    html += addTaskList(tasks);

    html += "</div>";

    plan.innerHTML += html;

}


// Day before //

function addDayBefore(date, appointmentHour) {

    const dayId =
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");

    const isToday =
        date.toDateString() === new Date().toDateString();

    let tasks = [];

    // Daytime appointments
    if (appointmentHour >= 8 && appointmentHour < 17) {

        tasks = [

            {
                id: dayId + "-diet",
                text: "Low residue diet until 15:00",
                type: "diet"
            },

            {
                id: dayId + "-fast",
                text: "15:00 No further food or milky drinks. Only drink clear fluids",
                type: "fast"
            },

            {
                id: dayId + "-prep",
                text: "19:00 Mix and start drinking your first dose of Plenvu",
                type: "prep"
            }

        ];

    }

    // Evening appointments
    else {

        tasks = [

            {
                id: dayId + "-senna",
                text: "Take Senna (2 tablets at night)",
                type: "senna"
            },

            {
                id: dayId + "-water",
                text: "Drink at least 1L of water",
                type: "water"
            },

            {
                id: dayId + "-diet",
                text: "Low residue diet until 21:00",
                type: "diet"
            },

            {
                id: dayId + "-fast",
                text: "21:00 No further food or milky drinks. Only drink clear fluids",
                type: "fast"
            }

        ];

    }

    let html = "";

    html += "<div class='daySection";

    if (isToday) {
        html += " todaySection";
    }

    html += "' data-date='" + dayId + "'>";

    html += "<h3>" + date.toDateString() + "</h3>";

    if (isToday) {
        html += "<h2 style='color:#d89b00;'><i class='fa-solid fa-star'></i> TODAY</h2>";
    }

    html += addTaskList(tasks);

    html += "</div>";

    plan.innerHTML += html;

}

// Appointment day //

function addAppointmentDay(date, appointmentHour) {

    const dayId =
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2, "0") + "-" +
        String(date.getDate()).padStart(2, "0");

    const secondDose = new Date(date);
    secondDose.setHours(appointmentHour - 5);

    const stopDrinking = new Date(date);
    stopDrinking.setHours(appointmentHour - 2);

    const isToday =
        date.toDateString() === new Date().toDateString();

    let tasks = [];

    if (appointmentHour >= 17) {

        tasks.push({

            id: dayId + "-prep1",
            text: "07:00 Mix and start drinking your first dose of Plenvu",
            type: "prep"

        });

    }

    tasks.push({

        id: dayId + "-prep2",
        text:
            secondDose.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }) +
            " Mix and start drinking your second dose of Plenvu",

        type: "prep"

    });

    tasks.push({

        id: dayId + "-final",
        text:
            stopDrinking.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            }) +
            " Stop drinking. Do not eat or drink anything else until your appointment.",

        type: "end"

    });

    let html = "";

    html += "<div class='daySection";

    if (isToday) {
        html += " todaySection";
    }

    html += "' data-date='" + dayId + "'>";

    html += "<h3>" + date.toDateString() + "</h3>";

    if (isToday) {
        html += "<h2 style='color:#d89b00;'><i class='fa-solid fa-star'></i> TODAY</h2>";
    }

    html += addTaskList(tasks);

    html += "</div>";

    plan.innerHTML += html;

}

// Create Plan //


function createPlan() {

    const newDate = appointmentDate.value;
    const savedDate = localStorage.getItem("appointmentDate");

    const isNewAppointment = savedDate !== null && savedDate !== newDate;

    if (isNewAppointment) {
        resetPlan();
        localStorage.clear();
    }

    localStorage.setItem("appointmentDate", newDate);

    const appointment = new Date(newDate);
    const appointmentHour = appointment.getHours();


    plan.innerHTML = "<h2>Your 7 Day Plan</h2>";

    for (let day = 7; day >= 0; day--) {

        const currentDate = new Date(appointment);
        currentDate.setDate(currentDate.getDate() - day);

        if (day > 1) {

            addStandardDay(currentDate, day);

        }
        else if (day === 1) {

            addDayBefore(currentDate, appointmentHour);

        }
        else {

            addAppointmentDay(currentDate, appointmentHour);

        }

    }

    // totals here...

taskTotals.water =
document.querySelectorAll("[data-type='water']").length;

taskTotals.senna =
document.querySelectorAll("[data-type='senna']").length;

taskTotals.diet =
document.querySelectorAll("[data-type='diet']").length;

taskTotals.prep =
document.querySelectorAll("[data-type='prep']").length;

taskTotals.fast =
document.querySelectorAll("[data-type='fast']").length;

    if (!isNewAppointment) {
    loadProgress();
}

    addFAQListeners();

    addCheckboxListeners();

    checkAchievements();

    renderAchievements();
}


//Toggle Faq//

function toggleFAQ(){

    faqContent.classList.toggle("closed");

    if(faqContent.classList.contains("closed")){

        faqArrow.innerHTML="<i class='fa-regular fa-square-caret-down'></i>";

    }else{

        faqArrow.innerHTML="<i class='fa-regular fa-square-caret-up'></i>";

    }

}

function addFAQListeners() {

    const questions = document.querySelectorAll(".faqQuestion");

    questions.forEach(function(question) {

        question.addEventListener("click", function() {

            const answer = question.nextElementSibling;

            // Close every other answer
            document.querySelectorAll(".faqAnswer").forEach(function(item) {

                if (item !== answer) {
                    item.style.display = "none";
                }

            });

            // Toggle the clicked answer
            if (answer.style.display === "block") {

                answer.style.display = "none";

            } else {

                answer.style.display = "block";

            }

        });

    });

}


// FAQ Event Listener //

faqHeader.addEventListener("click",toggleFAQ);

// =========================
// Create Plan Button
// =========================

createPlanButton.addEventListener("click", function () {

    if (appointmentDate.value === "") {

        alert("Please select an appointment date.");
        return;
    }

    createPlan();

});

    
achievementHeader.addEventListener("click",toggleAchievements);
   

// =========================
// Clear Date Button
// =========================

clearDateButton.addEventListener("click", function () {

    if (confirm("Are you sure you want to clear the appointment date?")) {

        appointmentDate.value = "";
        plan.innerHTML = "";


       resetPlan();

localStorage.clear();

renderAchievements();

updateLevel();

scoreDisplay.textContent = score;


    }

});

window.addEventListener("load", function () {

    loadAchievements();
    updateLevel();
    const savedDate = localStorage.getItem("appointmentDate");

    if (savedDate) {

        appointmentDate.value = savedDate;

        createPlan();

    }

});

document.getElementById("submitFeedback")
.addEventListener("click", submitFeedback);

window.addEventListener("load",function(){

    initialiseStarRating();

});
