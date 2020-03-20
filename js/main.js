window.onload = () => {
  'use strict';

var checkConnection=location.protocol;
if (checkConnection=="https:" || location.hostname === "localhost")
{
document.querySelector('.alert').style.display = 'block';

let newWorker;

document.getElementById('reload').addEventListener('click', function(){
newWorker.postMessage({ action: 'skipWaiting' });
});


if ('serviceWorker' in navigator) {
// Register the service worker
navigator.serviceWorker.register('../sw.js').then(reg => {
  reg.addEventListener('updatefound', () => {

    // An updated service worker has appeared in reg.installing!
    newWorker = reg.installing;

    newWorker.addEventListener('statechange', () => {

      // Has service worker state changed?
      switch (newWorker.state) {
        case 'installed':

// There is a new service worker available, show the notification
          if (navigator.serviceWorker.controller) {
            let notification = document.getElementById('snackbar');
			notification.className ='show';
          }

          break;
      }
    });
  });
});

}

let refreshing;
// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', function () {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});


let deferredPrompt;
const addBtn = document.querySelector('.add-button');
const alertBox = document.querySelector('.alert');
alertBox.style.display = 'none';
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  alertBox.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    alertBox.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});


}
}

