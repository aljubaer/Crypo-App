const electron = require('electron')
const path = require('path')
const app = electron.app
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer


const notifyBtn = document.getElementById('notifyBtn')
const contactBtn = document.getElementById('contactBtn')
var price = document.querySelector('h1')
var targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notification = {
    title: 'BTC Alert',
    body: 'BTC just beat your target'
}

function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {
            const cryptos = res.data.BTC.USD
            price.innerHTML = '$' + cryptos.toLocaleString('en')

            if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD){
                console.log(targetPriceVal);
                const myNotification = new Notification(notification.title, notification);
            }
        })
}

getBTC()
setInterval(getBTC, 5000);

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({
        frame: false,
        alwaysOnTop: true,
        width: 400,
        height: 200
    })
    win.on('close', function () {
        win = null
    })
    win.loadURL(modalPath)
    win.show()
})

contactBtn.addEventListener('click', function (event) {
    const modalPath1 = path.join('file://', __dirname, 'message-box.html')
    let win = new BrowserWindow({
        frame: false,
        alwaysOnTop: true,
        width: 800,
        height: 500
    })

    win.loadURL(modalPath1)
    //win.webContents.openDevTools()
    win.show()
})


ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg);
    targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
})