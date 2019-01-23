const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeBtn = document.getElementById('closeBtn')
const ipc = electron.ipcRenderer
var request = require("request");

var urlWebHook = "https://hooks.slack.com/services/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"; //the URL you get on your "incoming web hooks" page.
const sendBtn = document.getElementById('sendBtn')
const msgbox = document.getElementById('message-box')

function sendToSlack(s, theUsername, theChannel) {
    console.log('Called')
    var payload = {
        text: s
    };
    if (theUsername !== undefined) {
        payload.username = theUsername;
    }
    // if (theIconUrl !== undefined) {
    //     payload.icon_url = theIconUrl;
    // }
    // if (theIconEmoji !== undefined) {
    //     payload.icon_emoji = theIconEmoji;
    // }
    if (theChannel !== undefined) {
        payload.channel = theChannel;
    }
    var theRequest = {
        url: urlWebHook,
        method: "POST",
        json: payload
    };
    request(theRequest, function (error, response, body) {
        if (!error && (response.statusCode == 200)) {
            console.log("sendToSlack: " + s);
        } else {
            console.log("sendToSlack: error, code == " + response.statusCode + ", " + response.body + ".\n");
        }
    });
}

closeBtn.addEventListener('click', function(enent){
    var window = remote.getCurrentWindow();
    window.close();
})

sendBtn.addEventListener('click', function(enent){
    console.log('Worked..')
    var msg = msgbox.value;
    var window = remote.getCurrentWindow();
    if (msg === undefined) msg = "Empty message";
    sendToSlack(msg, "fighter-jet-message", "#fighter-jet");
    //window.close();
})