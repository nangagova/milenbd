let currentPage = 1;

function playBackgroundMusic() {
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.play().catch((error) => {
        console.error("Error playing audio:", error);
    });
}

function playMouseClickSound() {
    const sound = document.getElementById("mouseClick");
    sound.currentTime = 0;
    sound.play();
}

function loadPage(page) {
    const content = document.getElementById("content");

    content.classList.add('fade-out');
    setTimeout(() => {
        content.innerHTML = getPageContent(page);
        content.classList.remove('fade-out');
        content.classList.add('fade-in');
    }, 300);
}

function getPageContent(page) {
    switch (page) {
        // Your case structure as in the code you provided
        // Return your HTML content as in the JS code you shared earlier
    }
}

function goNext() {
    if (currentPage <= 6) {
        currentPage++;
        loadPage(currentPage);
        playMouseClickSound();
    }
}

function goBack() {
    currentPage = 2;
    loadPage(currentPage);
    playMouseClickSound();
}

function goToPage(page) {
    currentPage = page;
    loadPage(page);
    playMouseClickSound();
}

function checkPassword() {
    const password = prompt("Enter Password:");
    if (password === "bonbon") {
        goToPage(6);
    } else {
        alert("Wrong Password!");
    }
}

function startGame() {
    let claw = document.getElementById("claw");

    let rightBtn = document.getElementById("right-btn");
    let upBtn = document.getElementById("up-btn");

    let clawX = 10, clawY = 18, holding = null, pickedItems = 0;
    let items = document.querySelectorAll(".game-item");

    function moveRight() {
        clawX += 2;
        if (clawX > 85) clawX = 85;
        claw.style.left = clawX + "%";
        clawStick.style.left = clawX + "%";
    }

    function moveUp() {
        clawY -= 2;
        if (clawY < 10) clawY = 10;
        claw.style.top = clawY + "%";
        clawStick.style.height = (parseInt(clawStick.style.height) + 2) + "px";
    }

    function moveDown() {
        clawY += 2;
        claw.style.top = clawY + "%";
        clawStick.style.height = (parseInt(clawStick.style.height) - 2) + "px";
    }

    let moveRightInterval, moveUpInterval;

    rightBtn.addEventListener("mousedown", () => {
        moveRightInterval = setInterval(moveRight, 50);
    });

    rightBtn.addEventListener("mouseup", () => {
        clearInterval(moveRightInterval);
    });

    upBtn.addEventListener("mousedown", () => {
        moveUpInterval = setInterval(moveUp, 50);
    });

    upBtn.addEventListener("mouseup", () => {
        clearInterval(moveUpInterval);
        moveDown();

        let targetItem = Array.from(items).find(item =>
            Math.abs(parseInt(item.style.left) - clawX) < 5 &&
            Math.abs(parseInt(item.style.top) - clawY) < 5
        );

        if (targetItem) {
            holding = targetItem;
            targetItem.style.display = "none"; // Hide the item after picking pls
            pickedItems++;
            setTimeout(() => {
                targetItem.style.left = "85%"; // Reposition the item at the bottom
                targetItem.style.top = "85%";
                targetItem.style.display = "block"; // Show the item again at the bottom
                holding = null;

                if (pickedItems === items.length) {
                    setTimeout(() => alert("You picked all items! The password is: bonbon"), 500);
                }
            }, 500);
        }
    });
}

function closeSite() {
    window.close();
}

loadPage(currentPage);
