function loadImages() {
    //player,virus image,zem image
    enemy_image = new Image;
    enemy_image.src = "Assets/virus2.png";
    player_image = new Image;
    player_image.src = "Assets/super.png";
    zem_image = new Image;
    zem_image.src = "Assets/zem.jfif";

}

function init() {
    canvas = document.getElementById("mycanvas");
    pen = canvas.getContext('2d');
    canvas.width = w = 800;
    canvas.height = h = 450;
    game_over = "false";


    box1 = {
        x: 150,
        y: 50,
        w: 50,
        h: 50,
        speed: 20,
    };
    box2 = {
        x: 300,
        y: 150,
        w: 50,
        h: 50,
        speed: 30,
    };
    box3 = {
        x: 450,
        y: 20,
        w: 50,
        h: 50,
        speed: 40,
    };
    enemy = [box1, box2, box3];
    player = {
        x: 20,
        y: h / 2,
        w: 60,
        h: 60,
        speed: 20,
        moving: "false",
        health: 100,
    };

    zem = {
        x: w - 100,
        y: h / 2,
        w: 60,
        h: 60,
    };

    canvas.addEventListener('mousedown', function () {
        console.log("mouse key pressed");
        player.moving = "true";
    });
    canvas.addEventListener('mouseup', function () {
        console.log("mouse key released");
        player.moving = "false";
    });

}

function isOverlap(rect1, rect2) {
    if (rect1.x  < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        // collision detected!
        return true;
    }
    else return false;
}

function draw() {
    pen.clearRect(0, 0, w, h);
    pen.drawImage(player_image, player.x, player.y, player.w, player.h);
    pen.drawImage(zem_image, zem.x, zem.y, zem.w, zem.h);
    for (var i = 0; i < enemy.length; i++)
        pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
        pen.fillStyle="red";
        pen.font="20px roboto";
        pen.fillText("Health "+player.health,10,20);
}

function update() {
    if (isOverlap(player, zem)) {
        console.log("you won");
        alert("Congratulation! You Won");
        game_over = "true";
        return;
    }
    for (var i = 0; i < enemy.length; i++) {
        if (isOverlap(player,enemy[i])) {
            player.health -= 50;
            if (player.health <= 0) {
                game_over = "true";
                alert("Game over");
            }
        }
    }

    if (player.moving == "true") {
        player.x += player.speed;
        player.health += 30;
    }
    for (var i = 0; i < enemy.length; i++) {
        if (enemy[i].y > (h - enemy[i].h) || enemy[i].y < 0)
            enemy[i].speed = -enemy[i].speed;
        enemy[i].y += enemy[i].speed;
    }
}
function gameLoop() {
    if (game_over == "true")
        clearInterval(f);
    draw();
    update();
    console.log("In game loop");
}
loadImages();
init();

var f = setInterval(gameLoop, 200);