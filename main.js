/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var ws;
function element(selector) {
    return document.querySelector(selector);
}
function connect() {
    log('Connecting', 'info');
    ws = new WebSocket(element('#address').value);
    ws.addEventListener('open', function(event) {
        element('.disconnect').style.display = 'inline';
        element('.connect').style.display = 'none';
        element('.send').disabled = false;
        log('Connected', 'success');
    });
    ws.addEventListener('message', function(event) {
        log(event.data.slice(1, -1), 'in');
    });
}
function disconnect() {
    log('Disconnecting', 'info');
    ws.close();
    element('.disconnect').style.display = 'none';
    element('.connect').style.display = 'inline';
    element('.send').disabled = true;
    log('Disconnected', 'success');
}
function log(text, type) {
    let line = document.createElement('div');
    line.innerText = text;
    if (type === 'in') {
        line.style.color = 'white';
        if (text == '') {
            line.innerHTML = '> <i style="color: #8c8c8c">EMPTY STRING</i>';
        } else {
            line.innerText = '> ' + text;
        }
    } else if (type === 'out') {
        line.style.color = 'white';
        if (text == '') {
            line.innerHTML = '< <i style="color: #8c8c8c">EMPTY STRING</i>';
        } else {
            line.innerText = '< ' + text;
        }
    } else if (type === 'info') {
        line.style.color = 'blue';
    } else if (type === 'error') {
        line.style.color = 'red';
    } else if (type === 'success') {
        line.style.color = 'green';
    }
    element('#log').appendChild(line);
}
function send() {
    let msg = element('#message').value;
    ws.send(msg);
    log(msg, 'out');
}
function clearLog() {
    element('#log').innerHTML = `<strong
            style="text-align: center; display: inline-block; width: 100%;"
        >
            WebSocket Client v1.0 by Matthew_Cash</strong
        >
        <hr />`;
}
