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

}

function resetPlan() {

    score = 0;
    completedTasks = 0;

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

    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(function(checkbox) {

        const taskId = checkbox.dataset.id;

        if (localStorage.getItem(taskId) === "completed") {

            checkbox.checked = true;

            const taskType = checkbox.dataset.type;

            completedTasks++;
            taskProgress[taskType]++;

            score += 10;

        }

    });
   

    scoreDisplay.textContent = score;

    const percentage = (completedTasks / checkboxes.length) * 100;
    progressFill.style.width = percentage + "%";

}




function addCheckboxListeners() {

    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    checkboxes.forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            const taskType = checkbox.dataset.type;
            const taskId = checkbox.dataset.id;

            if (checkbox.checked) {

                score += 10;
                completedTasks++;
                taskProgress[taskType]++;
                localStorage.setItem(taskId, "completed");

            } else {

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

    achievementPopup.classList.remove("hidden");
    achievementPopup.classList.add("show");


    setTimeout(function(){

        achievementPopup.classList.remove("show");
        achievementPopup.classList.add("hidden");

    },4000);

}

// Add Task //

function addTask(task) {
    plan.innerHTML +=
        "<p>" +
        "<input type='checkbox' data-id='" + task.id +
        "' data-type='" + task.type + "'>" +
        task.text +
        "</p>";
}

function addTaskList(tasks) {
     tasks.forEach(function(task) {
            addTask(task);
                 });
}

function addStandardDay(date) {

const dayId =
    date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0");
    plan.innerHTML += "<h3>" + date.toDateString() + "</h3>";
    if(date.toDateString() === new Date().toDateString()){

plan.innerHTML += "<h2>â­ TODAY â­</h2>";

}

 const tasks = [
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
                text: "Follow a low residue diet",
                type: "diet"
}
              ];

addTaskList(tasks);

    plan.innerHTML += "<hr>";

}

function addDayBefore(date, appointmentHour) {

     const dayId =
    date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0");

    plan.innerHTML += "<h3>" + date.toDateString() + "</h3>";
if(date.toDateString() === new Date().toDateString()){

plan.innerHTML += "<h2>â­ TODAY â­</h2>";

}
    // Daytime appointment (08:00â€“16:59)
    if (appointmentHour >= 8 && appointmentHour < 17) {

    const tasks = [
{              
              id: dayId + "-diet",  
              text: "Low residue diet until 15:00",
              type: "diet"
},
{
                   id: dayId + "-fast",
                   text:"15:00 No further food or milky drinks. Only drink clear fluids",
                    type:"fast"
},
{
                    id: dayId + "-prep",
                   text: "19:00 Mix and start drinking your first dose of Plenvu",
                   type: "prep"
}
                  ];
          addTaskList(tasks);
    }

    // Evening appointment (17:00 onwards)
    else {

         const tasks = [
{                       
                 id: dayId + "-senna",
                 text: "Take Senna (2 tablets at night)",
                 type: "senna"
},
{
                         id: dayId + "-water",
                        text: "Drink at least 1L of water", 
                        type:"water"
},
{
                         id: dayId + "-diet",
                        text:"Low residue diet until 21:00",
                        type:"diet"
},
{
                         id: dayId + "-fast",
                         text:"21:00 No further food or milky drinks. Only drink clear fluids",
                         type:"fast"
}
                         ];
               addTaskList(tasks);
    }

    plan.innerHTML += "<hr>";

}

function addAppointmentDay(date, appointmentHour) {

    const dayId =
    date.getFullYear() + "-" +
    String(date.getMonth() + 1).padStart(2, "0") + "-" +
    String(date.getDate()).padStart(2, "0");

    const secondDose = new Date(date);
    secondDose.setHours(appointmentHour - 5);

    const stopDrinking = new Date(date);
    stopDrinking.setHours(appointmentHour - 2);

    
    plan.innerHTML += "<h3>" + date.toDateString() + "</h3>";
 if(date.toDateString() === new Date().toDateString()){

plan.innerHTML += "<h2>â­ TODAY</h2>";

}

    // Evening appointments get an extra first dose

 const tasks = [];
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
addTaskList(tasks);
    plan.innerHTML += "<hr>";

}


// Create Plan //

function createPlan() {

    const appointment = new Date(appointmentDate.value);
    const appointmentHour = appointment.getHours();

    resetPlan();

    plan.innerHTML = "<h2>Your 7 Day Plan</h2>";

    for (let day = 7; day >= 0; day--) {

        const currentDate = new Date(appointment);
        currentDate.setDate(currentDate.getDate() - day);

        if (day > 1) {

            addStandardDay(currentDate);

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

    loadProgress();

    addCheckboxListeners();

    checkAchievements();

    renderAchievements();
}


// =========================
// Create Plan Button
// =========================

createPlanButton.addEventListener("click", function () {

    if (appointmentDate.value === "") {

        alert("Please select an appointment date.");
        return;
    }


localStorage.setItem("appointmentDate", appointmentDate.value);
createPlan();
});

    

   

// =========================
// Clear Date Button
// =========================

clearDateButton.addEventListener("click", function () {

    if (confirm("Are you sure you want to clear the appointment date?")) {

        appointmentDate.value = "";
        plan.innerHTML = "";

        resetPlan(); 
        renderAchievements();
       localStorage.clear();
        


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
