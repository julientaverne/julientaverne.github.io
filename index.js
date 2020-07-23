document.getElementById('arduinoButton').addEventListener('click', function () {
  if (navigator.usb) {
    talkToArduino();
  } else {
    console.log('WebUSB not supported.');
  }
});

function talkToArduino(){
  console.log ('WebUSB OK! ');
}
