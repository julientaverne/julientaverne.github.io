document.getElementById('arduinoButton').addEventListener('click', function () {
  if (navigator.usb) {
    talkToArduino();
  } else {
    console.log('WebUSB not supported.');
  }
});

async function talkToArduino() {
  try {
    navigator.usb.getDevices()
    .then(devices => {
      console.log("Total devices: " + devices.length);
      devices.forEach(device => {
        console.log("Product name: " + device.productName + ", serial number " + device.serialNumber);
      });
    });
  } catch (error) {
    document.getElementById('target').innerHTML = error;
  }
}
