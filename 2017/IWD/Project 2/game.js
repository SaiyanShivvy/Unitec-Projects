(function () {
    //canvas variables
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    // game variables
    var startingScore = 0;
    var continueAnimating = false;
    var score;
    // Chara variables
    var blockWidth = 90;
    var blockHeight = 160;
    var blockSpeed = 30;
    var block = {
        x: 0,
        y: canvas.height - blockHeight,
        width: blockWidth,
        height: blockHeight,
        blockSpeed: blockSpeed
    }

    //Block Image
    var bReady = false;
    var bImage = new Image();
    bImage.onload = function () {
        bReady = true;
    }
    bImage.src = "images/0.png";

    // item variables
    var itemWidth = 30;
    var itemHeight = 30;
    var totalItems = 5;
    var items = [];
    for (var i = 0; i < totalItems; i++) {
        addItem();
    }

    //itemImage
    var iReady = false;
    var iImage = new Image();
    iImage.onload = function () {
        iReady = true;
    }
    iImage.src = "images/itemO.png";
    
    //Sounds, sounds from freesound.org
    var press_start = new Audio("sounds/start_sound.wav");
    var collect_item = new Audio("sounds/item_collect.wav");
    var miss_item = new Audio("sounds/item_miss.wav");
    var game_over = new Audio("sounds/game_over.wav");

    // Try to mute all video and audio elements on the page
    function mutePage() {
        var videos = document.querySelectorAll("video"),
            audios = document.querySelectorAll("audio");

        [].forEach.call(videos, function(video) { muteMe(video); });
        [].forEach.call(audios, function(audio) { muteMe(audio); });
    }

    function renderItem(item) {
        if (iReady == true) {
            ctx.drawImage(iImage, item.x, item.y, itemWidth, itemHeight);
        }
    }

    function renderChar() {
        if (bReady == true) {
            ctx.drawImage(bImage, block.x, block.y, blockWidth, blockHeight);
        }
    }


    function addItem() {
        var item = {
            width: itemWidth,
            height: itemHeight
        }
        resetItem(item);
        items.push(item);
    }

    // move the item to a random position near the top-of-canvas
    // assign the item a random speed
    function resetItem(item) {
        item.x = Math.random() * (canvas.width - itemWidth) - 50;
        item.y = 15 + Math.random() * 30;
        item.speed = 1 + Math.random() * 0.4;        
    }

    //left and right keypush event handlers
    document.onkeydown = function (event) {
        if (event.keyCode == 39) {
            block.x += block.blockSpeed;
            if (block.x >= canvas.width - block.width) {
                //Should stop user from leaving canvas
                block.x = canvas.width - block.width;
            }
        } else if (event.keyCode == 37) {
            block.x -= block.blockSpeed;
            if (block.x <= 0) {
                block.x = 0;
            }
        }
    }

    function animate() {
        // request another animation frame
        if (continueAnimating) {
            requestAnimationFrame(animate);
        }
        // for each item
        // (1) check for collisions
        // (2) advance the item
        // (3) if the item falls below the canvas, reset that item
        
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            // advance the items
            item.y += item.speed;
            // test for item-block collision
            // Increase score
            if (isColliding(item, block)) {
                score++;
                document.getElementById('score').innerText = score;
                collect_item.play();
                resetItem(item);
                //add sounds before item is reset
            }
            // if the item is below the canvas,
            if (item.y > canvas.height) {
                miss_item.play();
                resetItem(item);
            }
        }
        // redraw everything
        drawAll();
    }

    function isColliding(a, b) {
        return !(b.x > a.x + a.width || b.x + b.width < a.x || b.y > a.y + a.height || b.y + b.height < a.y);
    }

    function drawAll() {
        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw the block
        renderChar();
        // draw all items
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            renderItem(item);
        }

    }

    function clearCanvas() {
        //Clears the canvas, used as final clear after timer is done
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function startTimer() {
        var presentTime = document.getElementById('timer').innerHTML;
        var timeArray = presentTime.split(/[:]+/);
        var m = timeArray[0];
        var s = checkSecond((timeArray[1] - 1));
        if (s == 59) {
            m = m - 1;
        }
        if (m < 0) {
            clearCanvas();
            game_over.play();
            alert("Time's Up! Your Score was: " + score);
            continueAnimating = false;
            stopTimer();
        }
        document.getElementById('timer').innerHTML = m + ":" + s;
        var timeOut = setTimeout(startTimer, 1000);
    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) {
            sec = "0" + sec
        } // add zero in front of numbers < 10
        if (sec < 0) {
            sec = "59"
        }
        return sec;
    }

    function stopTimer() {
        clearTimeout(timeOut);
    }

    // button to start the game
    $("#start").click(function () {
        press_start.play();
        score = startingScore;
        document.getElementById('score').innerText = score;
        document.getElementById('timer').innerHTML = 07 + ":" + 00;
        block.x = 0;
        for (var i = 0; i < items.length; i++) {
            resetItem(items[i]);
        }
        if (!continueAnimating) {
            continueAnimating = true;
            animate();
        }
        startTimer();
    });

    $("#mute").click(function () {
        press_start.muted = true;
        collect_item.muted = true;
        miss_item.muted = true;
        game_over.muted = true;
    });
    
    $("#unmute").click(function () {
        press_start.muted = false;
        collect_item.muted = false;
        miss_item.muted = false;
        game_over.muted = false;
    });
})();