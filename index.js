let randY = () => Math.floor(Math.random() * window.innerHeight);
let randX = () => Math.floor(Math.random() * window.innerWidth);
let snake = {
    x:randX(),
    y:randY(),
    length: 1,
    speed: 1,
    direction: "^",
    height: 10,
    width:10
};

let food = {
    width: 10,
    height: 10,
    x: randX(),
    y: randY()
};

let traps = {
    x: [],
    y: [],
    width: 10,
    height: 10
};

let user = {
    score: 0
};

document.addEventListener("keydown", (a) => {
    if (a.key == "ArrowUp" || a.key == "w") {
        snake.direction = "^"
    };
    if (a.key == "ArrowDown" || a.key == "s") {
        snake.direction = "v"
    };
    if (a.key == "ArrowLeft" || a.key == "a") {
        snake.direction = "<"
    };
    if (a.key == "ArrowRight" || a.key == "d") {

        snake.direction = ">"
    };
});

let clearTraps = () => {
    $(".trap").remove()
};

let setTraps = (amount) => {
    for (let i = 0; i < amount; i++) {
        traps.x.push(randX());
        traps.y.push(randY());
    }
    for (let i in traps.x) {
    
        $("#root")
            .append("<div class = 'trap' id = '"+i+"-trap'>");

        $("#"+i+"-trap")
            .css("left", traps.x[i] + "px")
            .css("top", traps.y[i] + "px");
    };
    $(".trap")
        .css("width", traps.width + "px")
        .css("height", traps.height + "px")
        .css("position", "fixed")
        .css("background-color", "green")
}

let setSnake = () => {
    snake.x = randX();
    snake.y = randY();
    snake.speed = 1
};

let areTouching = (x1, y1, w1, h1, x2, y2, w2, h2) => x1 >= (x2 - w1) && x1 <= (x2 + w2) && y1 >= (y2 - h1) && y1 <= (y2 + h2)

let createFood = () => {
    food.x= Math.floor(Math.random() * window.innerWidth);
    food.y= Math.floor(Math.random() * window.innerHeight);
    user.score += 1
    $("#score")
        .text(user.score);
};

$(document).ready(() => {
    $("body")
        .append("<div id = 'root'>")
        .append("<div id = 'score'>");

    $("#root")
        .css("width", `100%`)
        .css("height", `100%`)
        .css("height", `100%`)
        .css("background-color", `black`)
        .css("margin", `0px`)
        .append("<div id = 'snake'>")
        .append("<div id = 'food'>");
    $("#snake")
        .css("width", snake.width + "px")
        .css("height", snake.height + "px")
        .css("position", "fixed")
        .css("left", snake.x + "px")
        .css("top", snake.y + "px")
        .css("background-color", "white");
    $("#food")
        .css("width", food.width + "px")
        .css("height", food.height + "px")
        .css("position", "fixed")
        .css("left", food.x + "px")
        .css("top", food.y + "px")
        .css("background-color", "red");
    $("#score")
        .text(user.score)
        .css("position", "fixed")
        .css("color", "black")
        .css("background-color", "white")
        .css("border-radius", "2px")
        .css("padding", "2px")
        .css("left", 10 + "px")
        .css("top", 10 + "px")
        .append("<input id = 'speed' placeholder = '" + 1+ "' type = 'text'>")
    $("#speed")
        .change(a => {snake.speed = parseInt(a.target.value)})
        .css("width", "10px")
        .css("margin", "2px")
    
    setTraps(10);

    let pit = 0;

    setInterval(() => {
        pit += 1;

        if (pit % 200 == 0 && traps.x.length < 100) setTraps(2);
        if (snake.speed < 10) snake.speed += 0.001
        if (snake.direction == "^") {
            snake.y -= 1 * snake.speed;
            if (snake.y < 0) {
                snake.y = 0
                snake.direction = "v"
            };
        }
        else if (snake.direction == "v") {
            snake.y += 1 * snake.speed;
            if (snake.y >= window.innerHeight - snake.height) {
                snake.y = window.innerHeight - snake.height
                snake.direction = "^"
            };
        }
        else if (snake.direction == "<") {
            snake.x -= 1 * snake.speed;
            if (snake.x <= 0) {
                snake.x = 0
                console.log(snake.x)
                snake.direction = ">"
            };
        }
        else if (snake.direction == ">") {
            snake.x += 1 * snake.speed;
            if (snake.x >= window.innerWidth - snake.width) {
                snake.x = window.innerWidth - snake.width
                snake.direction = "<"
            };
        };
        
        if (areTouching(snake.x, snake.y, snake.width, snake.height, food.x, food.y, food.width, food.height)) {
            createFood();
        };
        for (let i in traps.x) {
            let x = traps.x[i]
            let y = traps.y[i]
        if (areTouching(snake.x, snake.y, snake.width, snake.height, x, y, traps.width, traps.height)) {
            alert("Game over\nScore: " + user.score);
            traps.x = [];
            traps.y = [];
            user.score = 0;
            $("#score").text(user.score)
            clearTraps();
            setTraps(10);
            setSnake();
        }};

        $("#snake")
            .css("left", snake.x + "px")
            .css("top", snake.y + "px");            
        $("#food")
            .css("left", food.x + "px")
            .css("top", food.y + "px");
    }, 10);
});
