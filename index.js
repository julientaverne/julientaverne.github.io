
function requestDevice() {
  /*
  navigator.usb.requestDevice({ filters: [{ }] })
    .then(showDevices)
    .catch(usbError)
  */
  document.addEventListener('DOMContentLoaded', async () => {
  let devices = await navigator.hid.getDevices();
  devices.forEach(device => {
    console.log('HID: ${device.productName}');
  });
});
  /*
   navigator.hid.addEventListener('connect', async () => {
  console.log('HID connected: ${device.productName}');
});

navigator.hid.addEventListener('disconnect', async () => {
  console.log('HID disconnected: ${device.productName}');
});
*/

}

let requestButton = document.getElementById('request-hid-device');
requestButton.addEventListener('click', async () => {
  let device;
  try {
    device = await navigator.hid.requestDevice(
     /*
      { filters: [{
        vendorId: 0xABCD,
        productId: 0x1234,
        usagePage: 0x0C,
        usage: 0x01
    }]}
    */
      { filters: [{ }] }
    );
  } catch (error) {
    console.log('No device was selected 2.');
  }

  if (device !== undefined) {
    console.log('HID: ${device.productName} 2');
  }
});





var classes = {
  [0x00]: "Unknown",
  [0x01]: "Audio",
  [0x02]: "Communications and CDC Control",
  [0x03]: "Human Interface Device (HID)",
  [0x05]: "Physical",
  [0x06]: "Image",
  [0x07]: "Printer",
  [0x08]: "Mass Storage (MSD)",
  [0x09]: "Hub",
  [0x0A]: "CDC-Data",
  [0x0B]: "Smart Card",
  [0x0D]: "Content Security",
  [0x0E]: "Video",
  [0x0F]: "Personal Healthcare",
  [0x10]: "Audio/Video Devices",
  [0x11]: "Billboard Device",
  [0xDC]: "Diagnostic Device",
  [0xE0]: "Wireless Controller",
  [0xEF]: "Miscellaneous",
  [0xFE]: "Application Specific",
  [0xFF]: "Vendor Specific",
}

function showDevices(d) {
  console.log('devices:', d)
  var info = document.getElementById('info')
  info.innerHTML = `<ul>
    <li>${d.manufacturerName} ${d.productName}</li>
    <li>vendorId: 0x${d.vendorId.toString(16)}</li>
    <li>vendorId JTA: ${d.vendorId}</li>
    <li>class: ${classes[d.deviceClass]}</li>
  </ul>`
}

function usbError(e) {
  console.log('usb error:', e)
}
