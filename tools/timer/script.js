const blinkstart = 0.07;
let t_pre = false;
let interval_pre;
let t_que = false;
let interval_que;

document.getElementById("percent_blink").innerHTML = String((1 - blinkstart) * 100);

async function pre_pip()
{
    if(documentPictureInPicture.window) documentPictureInPicture.window.close();

    let box = document.getElementById("timer_presentation");
    let box_clone = await box.cloneNode(true);

    let parameter_element = document.getElementById("parameter_box");
    let parameter_clone = await parameter_element.cloneNode(true);

    parameter_clone.getElementsByTagName("div").param_que.remove()

    let btn_pip = box_clone.getElementsByClassName("pip_btn");
    btn_pip[0].remove();

    let pipWindow = await documentPictureInPicture.requestWindow({
        width: 400,
        height: 320
    });

    let css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "styles.css";

    await pipWindow.document.head.appendChild(css);

    let script = document.createElement("script");
    script.src = "script.js";

    pipWindow.document.body.appendChild(parameter_clone);
    pipWindow.document.body.appendChild(box_clone);

    await pipWindow.document.body.appendChild(script);
}

async function que_pip()
{
    if(documentPictureInPicture.window) documentPictureInPicture.window.close();
    let box = document.getElementById("timer_questionnaire");
    let box_clone = await box.cloneNode(true);

    let parameter_element = document.getElementById("parameter_box");
    let parameter_clone = await parameter_element.cloneNode(true);

    parameter_clone.getElementsByTagName("div").param_pre.remove()

    let btn_pip = box_clone.getElementsByClassName("pip_btn");
    btn_pip[0].remove();

    let pipWindow = await documentPictureInPicture.requestWindow({
        width: 400,
        height: 320
    });

    let css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "styles.css";

    pipWindow.document.head.appendChild(css);

    let script = document.createElement("script");
    script.src = "script.js";

    pipWindow.document.body.appendChild(parameter_clone);
    pipWindow.document.body.appendChild(box_clone);

    pipWindow.document.body.appendChild(script);
}

function togglePresentation() {
    if(!t_pre){
        let minutes = document.getElementById("time_presentation").value;

        let box = document.getElementById("timer_presentation");
        box.classList.remove("green");
        box.classList.remove("yellow");
        box.classList.remove("red");
        box.classList.add("green");

        const startTime = Date.now();
        const targetTime = startTime + (minutes * 60 * 1000); // Convert seconds to milliseconds

        interval_pre = setInterval(function() {
            let elapsedTime = (targetTime - Date.now()) / 1000;
            if (elapsedTime > 0) {
                let elap_minutes = parseInt(elapsedTime / 60);
                let elap_seconds = parseInt(elapsedTime % 60);
                document.getElementById('timer_presentation_minutes').textContent = `${String(elap_minutes).padStart(2, '0')}:${String(elap_seconds).padStart(2, '0')}`;
            } else {
                clearInterval(interval_pre);
                t_pre = false;

                box.classList.remove("yellow");
                box.classList.remove("green");
                box.classList.add("red");

                document.getElementById("btn_pre").innerText = "Start";
                document.getElementById('timer_presentation_minutes').textContent = "00:00";
                console.log("Countdown finished!");
                return;
            }

            let timer_percent = (elapsedTime/60) / minutes;
            if(timer_percent < blinkstart)
            {
                if(box.classList.contains("green")) box.classList.remove("green");
                if(!box.classList.contains("yellow")) box.classList.add("yellow");
            }

        }, 100);

        t_pre = true;
        document.getElementById("btn_pre").innerText = "Stop";
    }
    else
    {
        clearInterval(interval_pre);
        document.getElementById("btn_pre").innerText = "Start";
        t_pre = false;
    }
}

function toggleQuestionnaire() {
    if(!t_que){
        let minutes = document.getElementById("time_questionnaire").value;

        let box = document.getElementById("timer_questionnaire");
        box.classList.remove("green");
        box.classList.remove("yellow");
        box.classList.remove("red");
        box.classList.add("green");

        const startTime = Date.now();
        const targetTime = startTime + (minutes * 60 * 1000); // Convert seconds to milliseconds


        interval_que = setInterval(function() {
            let elapsedTime = (targetTime - Date.now()) / 1000;
            if (elapsedTime > 0) {
                let elap_minutes = parseInt(elapsedTime / 60);
                let elap_seconds = parseInt(elapsedTime % 60);
                document.getElementById('timer_questionnaire_minutes').textContent = `${String(elap_minutes).padStart(2, '0')}:${String(elap_seconds).padStart(2, '0')}`;
            } else {
                clearInterval(interval_que);
                t_que = false;

                box.classList.remove("yellow");
                box.classList.remove("green");
                box.classList.add("red");

                document.getElementById("btn_que").innerText = "Start";
                document.getElementById('timer_questionnaire_minutes').textContent = "00:00";
                console.log("Countdown finished!");
                return;
            }

            let timer_percent = (elapsedTime/60) / minutes;
            if(timer_percent < blinkstart)
            {
                if(box.classList.contains("green")) box.classList.remove("green");
                if(!box.classList.contains("yellow")) box.classList.add("yellow");
            }

        }, 100);

        t_que = true;
        document.getElementById("btn_que").innerText = "Stop";
    }
    else
    {
        clearInterval(interval_que);
        document.getElementById("btn_que").innerText = "Start";
        t_que = false;
    }
}