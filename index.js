
document.getElementById('butbut').addEventListener('click', function () {
  if (navigator.usb) {
    console.log('web USB supported.');
  } else {
    console.log('WebUSB not supported.');
  }
  console.log("01");
  navigator.usb.getDevices().then(devices => {
    console.log("02");
  devices.map(device => {
    console.log("03");
    console.log(device.productName);      // "Arduino Micro"
    console.log(device.manufacturerName); // "Arduino LLC"
  });
})
});
