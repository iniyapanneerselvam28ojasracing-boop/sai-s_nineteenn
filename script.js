const bootOutput = document.getElementById("boot-output");
const commandLine = document.getElementById("command-line");
const commandInput = document.getElementById("command-input");
const prompt = document.querySelector(".prompt");

let notesUnlocked = false;
// FINAL BIRTHDAY MESSAGE

let awaitingDecryptionKey = false;

const DECRYPTION_KEY = "1922";

// Replace this with your actual birthday message later.
const birthdayMessage = `HAPPY BIRTHDAY, SAI.

Nineteen. Damn. So old. I can't ever imagine being that old. Take care of your knees. 
But on a nicer note, you're truly a December night hot coffee brew.
So, to the warmest, coziest, affable friend ever, and the nicest, cheery, truly admirable person ever, 
Happy nineteen. 
I'm certainly glad I met you. And even more so that I could keep. ly always `;

const finalSystemLog = `========================================
             FINAL SYSTEM LOG
========================================

USER             : SAI
MEMORY ARCHIVE   : PRESERVED
MOVIES WATCHED   : 11
FRIENDSHIP       : 2 years and counting
BUGS DETECTED    : you have no idea how much i had to edit
REGRETS          : noneeeeee except for the popcorn :(

ALL SYSTEMS OPERATIONAL.

HAPPY BIRTHDAY, SAI.

========================================

[ SYSTEM SHUTDOWN INITIATED ]`;

// MOVIE VIEWER ELEMENTS

const movieViewer = document.getElementById("movie-viewer");
const backButton = document.getElementById("back-to-terminal");
const movieTitle = document.getElementById("movie-title");
const movieYear = document.getElementById("movie-year");
const movieGenre = document.getElementById("movie-genre");
const movieHeroBackdrop = document.getElementById("movie-hero-backdrop");
const posterCarousel = document.getElementById("poster-carousel");
const movieDescription = document.getElementById("movie-description");
const lockedNote = document.getElementById("locked-note");
const unlockedNote = document.getElementById("unlocked-note");
const movieNote = document.getElementById("movie-note");

// FILE SYSTEM

const fileSystem = {
    home: {
        Sai: {
            year_in_movies: {
                movies: {
                    "movie_01.txt": {
                        title: "Parasakthi",
                        year: "2026",
                        genre: "Political Action Drama",
                        note: "Our first movieee together in theatreeee. It really is a great movie, idk why ppl didn't like it."
                    },
                    "movie_02.txt": {
                        title: "Karuppu",
                        year: "2026",
                        genre: "Fantasy Action Drama",
                        note: "Surya is greattt, iSai is goated. wait, lmao you guys share a name hehe"
                    },
                    "movie_03.txt": {
                        title: "Backrooms",
                        year: "2026",
                        genre: "Sci-Fi Horror",
                        note: "Being with you is like backrooms, without the scary stuff obv, just the time bending parts"
                    },
                    "movie_04.txt": {
                        title: "Idhayam Murali",
                        year: "2026",
                        genre: "Romantic Drama",
                        note: "Istg i feel like they shot that film for me. Never related to a character more than Idhaya. smth is wrong w me T-T"
                    },
                    "movie_05.txt": {
                        title: "The Odyssey",
                        year: "2026",
                        genre: "Action Fantasy",
                        note: "May you find your way back to your love too my child"
                    },
                    "movie_06.txt": {
                        title: "Jana Nayagan",
                        year: "2026",
                        genre: "Political Action Thriller",
                        note: "I mean, Thalapathy padam, what else to say"
                    },
                    "movie_07.txt": {
                        title: "Spider-Man: Brand New Day",
                        year: "2026",
                        genre: "Superhero",
                        note: "You're Spiderman. You're Peter."
                    },
                    "movie_08.txt": {
                        title: "Vishwanath and Sons",
                        year: "2026",
                        genre: "Romantic Family Drama",
                        note: "You took me to that movie and didn't get me popcorn T-T T-T."
                    },
                    "movie_09.txt": {
                        title: "Bethlehem Kudumba Unit",
                        year: "2026",
                        genre: "Romantic Comedy Drama",
                        note: "Mamithaaaa supremacy. Could you pls find her number for me, i wanna propose"
                    },
                    "movie_10.txt": {
                        title: "Baththa",
                        year: "2026",
                        genre: "Comedy Drama",
                        note: "i'm gonna lock you up for a week and feed you just rusk too. idk, sounds nice"
                    },
                    "movie_11.txt": {
                        title: "Scene",
                        year: "2026",
                        genre: "Action Comedy",
                        note: "Surya was awesomeeee. 3/3 for him this yr. we'll go to some movie of his again"
                    }
                },

                stats: {
                    "total_movies.json": `{
    "total_movies": 11,
    "average_rating": "yo i'm way too tired to calculate sowwyyy",
    "favourite_genre": "Anything with Mamitha",
    "most_active_month": "July? but you did watch 11 movies in theatre in 11 months of the year"
}`,
                    "genres.js": `Drama          : 6
Action         : 5
Comedy         : 2
Fantasy        : 2
Political      : 2
Romantic       : 2
Sci-Fi          : 1
Horror         : 1
Thriller       : 1
Superhero      : 1
Family         : 1`
                },

                "favourites.txt": `YOUR FAVOURITE MOVIES OF 2026

1. BETHLEHEM KUDUMBA UNIT  (pls stop watching it a lot)

2. Vishwanath and Sons  (You don't have a choice, you watched it w me, so that's your top 3. It's already decided)

3. Scene  (I hope it's your top 3, it was a reallllyyy good movie though)

More favourites loading soon...`,

                "system.log": `2026 — A year of stories.

Movie database initialized.

Birthday project running normally.`,

                secret: {
                    "birthday_message.enc": `ERROR: FILE ENCRYPTED

Access denied.
This file requires a decryption key.`
                }
            }
        }
    }
};

// TERMINAL STATE

let currentPath = ["home", "Sai", "year_in_movies"];
let started = false;
let commandHistory = [];
let historyIndex = 0;
let initialBootContent = "";

const bootLines = [
    "$ ./birthday_project",
    "",
    "initializing...",
    "loading movie_database...",
    "retrieving watch_history...",
    "",
    "checking user status...",
    "",
    "✓ USER FOUND.",
    "✓ BIRTHDAY DETECTED.",
    "",
    "Welcome, Sai.",
    "",
    "> Type 'start' to begin."
];

// HELPER FUNCTIONS

function getCurrentDirectory() {
    let directory = fileSystem;

    for (const folder of currentPath) {
        directory = directory[folder];
    }

    return directory;
}

function getPath() {
    return "/" + currentPath.join("/");
}

function print(text = "", className = "") {
    const line = document.createElement("div");
    line.textContent = text;
    line.className = `terminal-line ${className}`;
    bootOutput.appendChild(line);
}

function updatePrompt() {
    prompt.textContent =
        `user@Sai:~/${currentPath.slice(2).join("/")}$`;
}

function showInput() {
    commandLine.classList.add("active");
    commandInput.disabled = false;
    commandInput.value = "";

    if (awaitingDecryptionKey) {
        commandInput.type = "password";
        commandInput.placeholder = "Enter decryption key...";
        prompt.textContent = "DECRYPTION KEY:";
    } else {
        commandInput.type = "text";
        commandInput.placeholder = "";
        updatePrompt();
    }

    commandInput.focus();
    updateBlockCursor();
}

// POSTER DATA + MOVIE VIEWER

let currentMovieNumber = 1;
let currentPosterIndex = 0;

function getMoviePosterPaths(movieNumber) {
    // Movie 01 uses PNG. Movies 02–11 use JPG.
    const extension = movieNumber === 1 ? "png" : "jpg";

    return Array.from({ length: 5 }, (_, index) => {
        const posterNumber = index + 1;

        return `assets/posters/movie_${String(movieNumber).padStart(2, "0")}/${movieNumber}_${posterNumber}.${extension}`;
    });
}

// Change the fixed background poster

function showMainPoster(index) {
    const posterPaths = getMoviePosterPaths(currentMovieNumber);

    if (index < 0 || index >= posterPaths.length) return;

    currentPosterIndex = index;
    movieHeroBackdrop.src = posterPaths[index];
    movieHeroBackdrop.alt = "";

    // Highlight both copies of the selected poster.
    posterCarousel.querySelectorAll(".poster-card").forEach(card => {
        card.classList.toggle(
            "active",
            Number(card.dataset.posterIndex) === index
        );
    });
}

// Build the automatic, seamless carousel

function buildPosterCarousel(movieNumber) {
    currentMovieNumber = movieNumber;
    posterCarousel.innerHTML = "";

    const posterPaths = getMoviePosterPaths(movieNumber);
    const alternatePosters = posterPaths.slice(1);

    // Two identical sets create the seamless marquee loop.
    [0, 1].forEach(copyNumber => {
        alternatePosters.forEach((path, index) => {
            const posterIndex = index + 1;

            const card = document.createElement("button");
            card.className = "poster-card";
            card.type = "button";
            card.dataset.posterIndex = String(posterIndex);
            card.setAttribute(
                "aria-label",
                `Show poster ${posterIndex + 1}`
            );

            const image = document.createElement("img");
            image.src = path;
            image.alt = `Alternate poster ${posterIndex + 1}`;
            image.loading = copyNumber === 0 ? "eager" : "lazy";

            card.appendChild(image);

            card.addEventListener("click", () => {
                showMainPoster(posterIndex);
            });

            posterCarousel.appendChild(card);
        });
    });

    // Poster 1 is the background when the movie first opens.
    showMainPoster(0);
}

// Open a movie

function openMovie(movie, filename) {
    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;
    movieGenre.textContent = movie.genre;

    movieDescription.textContent =
        movie.description || "A story worth remembering.";

    // Get the movie number from its filename.
    const movieNumber = Number(
        filename.match(/movie_(\d+)\.txt/)?.[1]
    );

    if (
        Number.isInteger(movieNumber) &&
        movieNumber >= 1 &&
        movieNumber <= 11
    ) {
        buildPosterCarousel(movieNumber);
    } else {
        movieHeroBackdrop.removeAttribute("src");
        posterCarousel.innerHTML = "";
    }

    // Personal note visibility.
    if (notesUnlocked) {
        lockedNote.classList.add("hidden");
        unlockedNote.classList.remove("hidden");
        movieNote.textContent = movie.note;
    } else {
        lockedNote.classList.remove("hidden");
        unlockedNote.classList.add("hidden");
    }

    // Open viewer at the top.
     movieViewer.scrollTop = 0;
    commandInput.blur();
    movieViewer.classList.remove("hidden");

    requestAnimationFrame(() => {
        updateBackdropFade();
    });
}


// Close movie viewer

function closeMovieViewer() {
    movieViewer.classList.add("hidden");

    if (!commandInput.disabled) {
        commandInput.focus();
    }
}

// MOVIE VIEWER NAVIGATION + BACKGROUND FADE

backButton.addEventListener("click", closeMovieViewer);

function updateBackdropFade() {
    const posterSection = document.querySelector(".poster-section");
    const noteSection = document.getElementById("personal-note");

    if (!posterSection || !noteSection) return;

    const scrollTop = movieViewer.scrollTop;

    const fadeStart = Math.max(
        0,
        posterSection.offsetTop - movieViewer.clientHeight * 0.72
    );

    const fadeEnd = Math.max(
        fadeStart + 1,
        noteSection.offsetTop - movieViewer.clientHeight * 0.25
    );

    const progress = Math.min(
        1,
        Math.max(
            0,
            (scrollTop - fadeStart) / (fadeEnd - fadeStart)
        )
    );

    movieHeroBackdrop.style.opacity = String(1 - progress);
}

movieViewer.addEventListener(
    "scroll",
    updateBackdropFade,
    { passive: true }
);

// BOOT SEQUENCE

let lineIndex = 0;

function typeBoot() {
    if (started) return;

    if (lineIndex < bootLines.length) {
        const line = document.createElement("div");
        bootOutput.appendChild(line);

        let charIndex = 0;

        const typing = setInterval(() => {
            line.textContent +=
                bootLines[lineIndex].charAt(charIndex);

            charIndex++;

            if (charIndex >= bootLines[lineIndex].length) {
                clearInterval(typing);
                lineIndex++;
                setTimeout(typeBoot, 300);
            }
        }, 30);
    } else {
        showInput();
    }
}

// COMMAND HANDLER

function executeCommand(input) {
    const parts = input.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const argument = parts.slice(1).join(" ");

    switch (command) {
        case "man":
            print("");
            print("AVAILABLE COMMANDS");
            print("------------------");
            print("ls                  List files and folders");
            print("cd <folder>         Enter a directory");
            print("cd ..               Go back");
            print("pwd                 Show current path");
            print("cat <file>          Read a file");
            print("clear               Clear terminal");
            print("decrypt <file>      Decrypt a protected file");
            print("man                 Show this message");
            print("");
            break;

        case "ls": {
            const directory = getCurrentDirectory();

            print("");

            Object.keys(directory).forEach(item => {
                const isFolder =
                    typeof directory[item] === "object" &&
                    !directory[item].title;

                print(
                    isFolder
                        ? `📁 ${item}/`
                        : `📄 ${item}`
                );
            });

            print("");
            break;
        }

        case "pwd":
            print(getPath());
            break;

        case "cd": {
            if (!argument) {
                print("Usage: cd <folder>");
                break;
            }

            if (argument === "..") {
                if (currentPath.length > 1) {
                    currentPath.pop();
                }
                break;
            }

            if (argument === "/") {
                currentPath = ["home"];
                break;
            }

            const directory = getCurrentDirectory();

            if (
                directory[argument] &&
                typeof directory[argument] === "object"
            ) {
                currentPath.push(argument);
            } else {
                print(`cd: ${argument}: No such directory`);
            }

            break;
        }
        case "decrypt":

    if (argument !== "birthday_message.enc") {
        print("Usage: decrypt birthday_message.enc", "error");
        break;
    }

    if (awaitingDecryptionKey) {
        print("A decryption request is already active.");
        break;
    }

    print("");
    print("[ ENCRYPTION DETECTED ]", "warning");
    print("");
    print("This file contains a protected message.");
    print("");
    print("Enter decryption key:");

    awaitingDecryptionKey = true;
showInput();

break;

        case "cat": {
            if (!argument) {
                print("Usage: cat <file>");
                break;
            }

            const directory = getCurrentDirectory();
            const file = directory[argument];

            if (!file) {
                print(
                    `cat: ${argument}: No such file or directory`,
                    "error"
                );
                break;
            }

            // Movie archive entry.
            if (
                typeof file === "object" &&
                file.title
            ) {
                openMovie(file, argument);
                break;
            }

            // Regular text files.
            print(file);
            break;
        }

        case "whoami":
            print("");
            print("A movie enthusiast.");
            print("A Linux enthusiast.");
            print("A person who deserves a pretty great birthday.");
            print("");
            break;

        case "sudo unlock":
            if (!notesUnlocked) {
                notesUnlocked = true;

                print("");
                print("ACCESS GRANTED.", "success");
                print("Personal notes unlocked.", "highlight");
                print("The archive has revealed its secrets.", "muted");
                print("");
            } else {
                print("Notes are already unlocked.", "success");
            }
            break;

        case "sudo":
            if (argument === "unlock") {
                if (!notesUnlocked) {
                    notesUnlocked = true;

                    print("");
                    print("ACCESS GRANTED.", "success");
                    print("Personal notes unlocked.", "highlight");
                    print("The archive has revealed its secrets.", "muted");
                    print("");
                } else {
                    print("Notes are already unlocked.", "success");
                }
            } else {
                print("");
                print("[sudo] password for Sai:");
                print("");
                print("Nice try.");
                print("Even root can't skip the birthday surprise.");
                print("");
            }
            break;

        case "uname":
            print("BirthdayOS 2026 x86_64");
            break;

        case "date":
            print(new Date().toDateString());
            break;

        case "df": {
            if (argument === "-h") {
                print("");

                print(
                    "Filesystem      Size  Used  Avail  Use%  Mounted on",
                    "muted"
                );

                print(
                    "/dev/theatre    1.0T  1.0T  0.0T   100%  /memories"
                );

                print("");
                print("WARNING: Disk space critically low.", "warning");

                print(
                    "Too much space in pockets as you spent all your money on theatres.",
                    "highlight"
                );

                print("");
            } else {
                print("Usage: df -h");
            }

            break;
        }

        case "coffee":
            print("");
            print("Error: caffeine levels already critical.");
            print("Try tea instead. ☕");
            print("");
            break;

        case "clear":
            bootOutput.innerHTML = initialBootContent;
            break;

        case "":
            break;

        default:
            print(`Command not found: ${command}`);
            print("Type 'man' to see available commands.");
    }
}
function verifyDecryptionKey(key) {

    if (key === DECRYPTION_KEY) {

        awaitingDecryptionKey = false;

        commandInput.disabled = true;
        commandInput.type = "text";
        commandInput.placeholder = "";

        print("");
        print("Verifying credentials...");
        print("");

        setTimeout(() => {
            print("[ OK ] Key recognised.", "success");
            print("[ OK ] Authentication successful.", "success");
            print("[ OK ] Decryption complete.", "success");
            print("");
            print("Message recovered.");
            print("Opening secure file...");

            setTimeout(() => {
                launchFinalReveal();
            }, 1800);

        }, 900);

    } else {

        print("");
        print("[ ERROR ] Invalid decryption key.", "error");
        print("Access denied. Try again.");
        print("");

        showInput();
    }
}
// ==================================
// FINAL CINEMATIC SEQUENCE
// ==================================

function typeText(element, text, speed = 35) {

    return new Promise(resolve => {

        let index = 0;

        function typeCharacter() {

            if (index < text.length) {

                element.textContent += text.charAt(index);
                index++;

                setTimeout(typeCharacter, speed);

            } else {
                resolve();
            }
        }

        typeCharacter();
    });
}


async function launchFinalReveal() {

    const terminal = document.querySelector(".terminal");
    const finalReveal = document.getElementById("final-reveal");

    const personalText = document.getElementById("final-personal-text");
    const systemLog = document.getElementById("final-system-log");
    const cursor = document.getElementById("final-cursor");
    const curtains = document.getElementById("final-curtains");
    const credits = document.getElementById("final-credits");

    // Hide the terminal and movie viewer.
    movieViewer.classList.add("hidden");
    terminal.classList.add("hidden");

    // Show the new birthday screen.
    finalReveal.classList.remove("hidden");

    // Type personal message.
    await typeText(personalText, birthdayMessage, 45);

    await new Promise(resolve => setTimeout(resolve, 1800));

    // Type final system log.
    await typeText(systemLog, finalSystemLog, 25);

    await new Promise(resolve => setTimeout(resolve, 2500));

    // Hide cursor.
    cursor.style.display = "none";

    // Close curtains.
    curtains.classList.add("close");

    await new Promise(resolve => setTimeout(resolve, 3200));

    // Show final credits.
    credits.classList.add("show");
}
// INPUT LISTENER

commandInput.addEventListener("keydown", function(event) {
    // PASSWORD INPUT: do not display or save the password.
    if (awaitingDecryptionKey) {

        if (event.key !== "Enter") {
            if (event.key === "ArrowUp" || event.key === "ArrowDown") {
                event.preventDefault();
            }
            return;
        }

        event.preventDefault();

        const key = commandInput.value.trim();

        if (!key) return;

        verifyDecryptionKey(key);
        return;
    }
    // COMMAND HISTORY

    if (event.key === "ArrowUp") {
        event.preventDefault();

        if (historyIndex > 0) {
            historyIndex--;
            commandInput.value = commandHistory[historyIndex];
        }

        return;
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();

        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            commandInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            commandInput.value = "";
        }

        return;
    }

    if (event.key !== "Enter") return;

    const input = commandInput.value.trim();

    if (!input) {
        showInput();
        return;
    }

    commandHistory.push(input);
    historyIndex = commandHistory.length;

    print(`${prompt.textContent} ${input}`);

    if (!started) {
        if (input.toLowerCase() === "start") {
            started = true;
            commandInput.disabled = true;

            print("");
            print("> Executing command...");
            print("> Loading /home/Sai/year_in_movies...");

            setTimeout(() => {
                bootOutput.innerHTML = "";

                print("Welcome to year_in_movies.", "success");
                print("Type 'man' to explore the system.", "muted");
                print("");

                print(
                    "user@Sai:~/year_in_movies$ ls",
                    "success"
                );

                Object.keys(getCurrentDirectory()).forEach(item => {
                    const isFolder =
                        typeof getCurrentDirectory()[item] === "object" &&
                        !getCurrentDirectory()[item].title;

                    if (isFolder) {
                        print(`📁 ${item}/`, "directory");
                    } else {
                        print(`📄 ${item}`, "muted");
                    }
                });

                print("");

                // Save welcome screen for clear command.
                initialBootContent = bootOutput.innerHTML;

                showInput();
            }, 1200);

        } else {
            print("Please type 'start' to begin.");
            showInput();
        }

        return;
    }

   executeCommand(input);

if (!awaitingDecryptionKey && !commandInput.disabled) {
    showInput();
}
});

// START

typeBoot();