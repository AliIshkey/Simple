$(function() {
    // Script
    window.pfh = 100;
    window.psh = 100;
    window.match = [0, 0];
    
    const start = $(".start-button"), start_torunament = $(".start-torunament-button"), 
    title = $(".title"), pfh = $(".pfh"), psh = $(".psh");

    $.fn.attack = function() {
        pfh.removeClass("text-danger");
        psh.removeClass("text-danger");
        const random = Math.floor(Math.random() * (2 - 1 + 1)) + 1;
        const player_selector = random === 1 ? ".sp" : ".fp";
        $(player_selector).children(".fire").removeClass("d-none").delay(1000).queue(function() {
            $(this).addClass("d-none").dequeue();
        });
        random === 1 ? window.pfh = window.pfh - 10 : window.psh = window.psh - 10;
        if (window.pfh <= 20) {
            pfh.addClass("text-danger");
        } else if (window.psh <= 20) {
            psh.addClass("text-danger");
        }
        random === 1 ? pfh.text(`${window.pfh}%`) : psh.text(`${window.psh}%`);
    };


    start.on("click", function(e) {
        e.preventDefault();
        $(this).addClass("animate__heartBeat").delay(1000).queue(function() {
            $(this).removeClass("animate__heartBeat").dequeue();
        });
        $(title).text("Single Match");
        $(this).attack();
        if (window.pfh <= 0 || window.psh <= 0) {
            $(start).attr("disabled", true);
        }
    });

    start_torunament.on("click", function(e) {
        e.preventDefault();
        
        $(this).addClass("animate__heartBeat").delay(1000).queue(function() {
            $(this).removeClass("animate__heartBeat").dequeue();
        });

        $(title).text("Tourament Mode BO5");
        $(start).attr("disabled", true);
        $(start_torunament).attr("disabled", true);

        function run() {
            var j = 1;
            console.log("Started");
            var is_ended = false;
            function fight() {
                const x = window.match[0], y = window.match[1];
                const z = x + y;
                if (!is_ended) {
                    $(this).attack();
                    is_ended = window.pfh <= 0 || window.psh <= 0;
                    if (window.pfh == 0) { 
                        window.match[1] = window.match[1] + 1;
                    } else if (window.psh == 0) { 
                        window.match[0] = window.match[0] + 1;
                    }
                    if (window.pfh <= 0 || window.psh <= 0) { 
                        $(title).text(`Match ${j + 1} Ended. [${window.match[0]} / ${window.match[1]}] Next Game ..`);
                        setTimeout(function() {
                            console.log("Preparing Next Game..");
                            $(title).text(`Tourament Mode BO5 [${window.match[0]} / ${window.match[1]}] (Match ${j + 1})`);
                            // Reseting Health
                            window.pfh = 100;
                            window.psh = 100;
                            pfh.text(`${window.pfh}%`);
                            psh.text(`${window.psh}%`);
                            is_ended = window.match[0] == 3 || window.match[1] == 3;
                            j++;
                        }, 1000);
                    }
                    setTimeout(fight, 1000);
                } else {
                    $(title).text(`${window.match[0] < window.match[1] ? "Player 2" : "Player 1"} Won the Tourament`);
                }
                console.log("Attacking ......");
            }
            fight();
        }
        run();
    });
});