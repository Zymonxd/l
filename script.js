/* ==========================================
   INSIDE MY MIND
   SCRIPT.JS
========================================== */

// ==========================
// ELEMENTS
// ==========================

const intro = document.getElementById("intro");
const brainSection = document.getElementById("brainSection");

const achievement = document.getElementById("achievement");
const challenge = document.getElementById("challenge");
const relationship = document.getElementById("relationship");
const ending = document.getElementById("ending");

const enterButton = document.getElementById("enterButton");

const achievementBtn = document.getElementById("achievementBtn");
const challengeBtn = document.getElementById("challengeBtn");
const relationshipBtn = document.getElementById("relationshipBtn");

const backButtons = document.querySelectorAll(".backButton");

const restartButton = document.getElementById("restartButton");

const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

const loadingScreen = document.getElementById("loadingScreen");

// ==========================
// LOADING SCREEN
// ==========================

window.addEventListener("load", () => {
    
    setTimeout(() => {
        
        loadingScreen.style.display = "none";
        
    }, 1500);
    
});

// ==========================
// MUSIC
// ==========================

let musicPlaying = false;

music.volume = 0.4;

musicButton.textContent = "🔇";

function playMusic() {
    
    music.play().catch(() => {});
    
    musicPlaying = true;
    
    musicButton.textContent = "🔊";
    
}

function pauseMusic() {
    
    music.pause();
    
    musicPlaying = false;
    
    musicButton.textContent = "🔇";
    
}

musicButton.addEventListener("click", () => {
    
    if (musicPlaying) {
        
        pauseMusic();
        
    } else {
        
        playMusic();
        
    }
    
});

// ==========================
// ENTER BUTTON
// ==========================

enterButton.addEventListener("click", () => {
    
    intro.style.display = "none";
    
    brainSection.style.display = "block";
    
    playMusic();
    
});

// ==========================
// MEMORY STATUS
// ==========================

const viewed = {
    
    achievement: false,
    
    challenge: false,
    
    relationship: false
    
};

// ==========================
// HIDE ALL PAGES
// ==========================

function hideAllPages() {
    
    achievement.style.display = "none";
    
    challenge.style.display = "none";
    
    relationship.style.display = "none";
    
    ending.style.display = "none";
    
}

// ==========================
// OPEN MEMORY
// ==========================

function openMemory(page, name) {
    
    hideAllPages();
    
    brainSection.style.display = "none";
    
    page.style.display = "block";
    
    viewed[name] = true;
    
}

// ==========================
// MEMORY BUTTONS
// ==========================

achievementBtn.addEventListener("click", () => {
    
    openMemory(
        
        achievement,
        
        "achievement"
        
    );
    
});

challengeBtn.addEventListener("click", () => {
    
    openMemory(
        
        challenge,
        
        "challenge"
        
    );
    
});

relationshipBtn.addEventListener("click", () => {
    
    openMemory(
        
        relationship,
        
        "relationship"
        
    );
    
});

// ==========================
// BACK BUTTONS
// ==========================

backButtons.forEach(button => {
    
    button.addEventListener("click", () => {
        
        hideAllPages();
        
        brainSection.style.display = "block";
        
    });
    
});

// ==========================
// RESTART
// ==========================

restartButton.addEventListener("click", () => {
    
    viewed.achievement = false;
    
    viewed.challenge = false;
    
    viewed.relationship = false;
    
    ending.style.display = "none";
    
    brainSection.style.display = "block";
    
});
/* ==========================================
   PART 2
   AI VOICE
   TYPEWRITER
   PARTICLES
========================================== */

// ==========================
// AI VOICE
// ==========================

function speak(text){

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 0.95;
    speech.pitch = 1;
    speech.volume = 1;

    speechSynthesis.speak(speech);

}

// ==========================
// TYPEWRITER EFFECT
// ==========================

function typeWriter(page){

    const paragraphs = page.querySelectorAll(".story p");

    paragraphs.forEach((paragraph)=>{

        const text = paragraph.dataset.text || paragraph.innerText;

        paragraph.dataset.text = text;

        paragraph.innerHTML = "";

        let index = 0;

        const timer = setInterval(()=>{

            paragraph.innerHTML += text.charAt(index);

            index++;

            if(index >= text.length){

                clearInterval(timer);

            }

        },15);

    });

}

// ==========================
// STORY NARRATION
// ==========================

const stories = {

achievement:
"One of the greatest achievements in my life was accepting my faith and being baptized as a born again Christian. This moment became a new beginning and changed the way I see life.",

challenge:
"One of the greatest challenges in my life was letting go of the disciples I mentored. Although painful, this experience taught me leadership, patience, sacrifice, and faith.",

relationship:
"My church family became my second family. Through every difficult season, they encouraged me, prayed for me, and reminded me that I was never alone."

};

// ==========================
// UPDATE BUTTONS
// ==========================

achievementBtn.addEventListener("click",()=>{

    typeWriter(achievement);

    speak(stories.achievement);

});

challengeBtn.addEventListener("click",()=>{

    typeWriter(challenge);

    speak(stories.challenge);

});

relationshipBtn.addEventListener("click",()=>{

    typeWriter(relationship);

    speak(stories.relationship);

});

// ==========================
// STOP VOICE ON BACK
// ==========================

backButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        speechSynthesis.cancel();

    });

});

// ==========================
// FLOATING PARTICLES
// ==========================

const particles = document.getElementById("particles");

for(let i=0;i<120;i++){

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = Math.random()*100 + "vw";

    particle.style.top = Math.random()*100 + "vh";

    particle.style.animationDuration =
    (6 + Math.random()*8) + "s";

    particle.style.animationDelay =
    Math.random()*5 + "s";

    particles.appendChild(particle);

}

// ==========================
// CHECK IF ALL MEMORIES
// ARE VIEWED
// ==========================

function checkJourney(){

    if(

        viewed.achievement &&

        viewed.challenge &&

        viewed.relationship

    ){

        setTimeout(()=>{

            hideAllPages();

            ending.style.display = "flex";

            speak(

            "Analysis complete. Every achievement gave you confidence. Every challenge made you stronger. Every meaningful relationship reminded you that you were never alone."

            );

        },1200);

    }

}

// ==========================
// UPDATE OPEN MEMORY
// ==========================

const originalOpenMemory = openMemory;

openMemory = function(page,name){

    originalOpenMemory(page,name);

    checkJourney();

};
/* ==========================================
   PART 3
   IMAGE ZOOM
   SHORTCUTS
   POLISH
========================================== */

// ==========================
// IMAGE ZOOM
// ==========================

const memoryImages = document.querySelectorAll(".memoryImage");

memoryImages.forEach((image)=>{

    image.addEventListener("click",()=>{

        image.classList.toggle("zoom");

    });

});

// ==========================
// ESC KEY
// ==========================

document.addEventListener("keydown",(event)=>{

    if(event.key==="Escape"){

        speechSynthesis.cancel();

        document.querySelectorAll(".memoryImage").forEach(img=>{
            img.classList.remove("zoom");
        });

        hideAllPages();

        brainSection.style.display="block";

    }

});

// ==========================
// RESTART BUTTON
// ==========================

restartButton.addEventListener("click",()=>{

    viewed.achievement=false;
    viewed.challenge=false;
    viewed.relationship=false;

    speechSynthesis.cancel();

    ending.style.display="none";

    brainSection.style.display="block";

});

// ==========================
// BUTTON HOVER SOUND
// ==========================

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("mouseenter",()=>{

        button.style.transform="scale(1.05)";

    });

    button.addEventListener("mouseleave",()=>{

        button.style.transform="";

    });

});

// ==========================
// BRAIN FLOAT
// ==========================

const brainImage=document.getElementById("brainImage");

let t=0;

setInterval(()=>{

    t+=0.03;

    brainImage.style.transform=
    `translateY(${Math.sin(t)*12}px)`;

},30);

// ==========================
// CONSOLE MESSAGE
// ==========================

console.log("Inside My Mind loaded successfully!");