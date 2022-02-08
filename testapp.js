if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/serviceworker.js')
    .then(_ => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}
  
  if (window.self === window.top) {
    if (!("keyboard" in navigator)) {
      alert("Your browser does not support the Keyboard Lock API.");
    }
  } 
  
  const fullscreenButton = document.querySelector("#fullscreen");
  const lockButton = document.querySelector("#lock");
  const body = document.body;
  const info = document.querySelector(".info");
  
  const ENTER_FULLSCREEN = "Enter full screen";
  const LEAVE_FULLSCREEN = "Leave full screen";
  const ACTIVATE_KEYBOARD_LOCK = "Activate keyboard lock";
  const DEACTIVATE_KEYBOARD_LOCK = "Dectivate keyboard lock";
  
  const LOCKED_KEYS = ["MetaLeft", "MetaRight", "Tab", "KeyN", "KeyT"];
  
  let lock = false;
  
  fullscreenButton.addEventListener("click", async () => {
    if (window.self !== window.top) {
      window.open(location.href, '', 'noopener,noreferrer');
      return;
    }

    try {
      if (!document.fullscreen) {
        await document.documentElement.requestFullscreen();
        fullscreenButton.textContent = LEAVE_FULLSCREEN;
      } else {
        await document.exitFullscreen();
        fullscreenButton.textContent = ENTER_FULLSCREEN;
      }
    } catch (err) {
      fullscreenButton.textContent = ENTER_FULLSCREEN;
      alert(`${err.name}: ${err.message}`);
    }
  });
  
  lockButton.addEventListener("click", async () => {
    try {
      if (!lock) {
        await navigator.keyboard.lock();
        lock = true;
        lockButton.textContent = DEACTIVATE_KEYBOARD_LOCK;
      } else {
        navigator.keyboard.unlock();
        lock = false;
        lockButton.textContent = ACTIVATE_KEYBOARD_LOCK;
      }
    } catch (err) {
      lock = false;
      lockButton.textContent = ACTIVATE_KEYBOARD_LOCK;
      alert(`${err.name}: ${err.message}`);
    }
  });
  
  document.addEventListener("fullscreenchange", () => {
      // TODO find out if exiting disables keyboard lock
    lockButton.textContent = ACTIVATE_KEYBOARD_LOCK;
    lock = false;
    if (document.fullscreen) {
      fullscreenButton.textContent = LEAVE_FULLSCREEN;
    } else {
        fullscreenButton.textContent = ENTER_FULLSCREEN;
    }
  });
  
  document.addEventListener('keydown', (e) => {
    info.textContent = `${e.code} captured with ctrl=${e.ctrlKey} meta=${e.metaKey} shift=${e.shiftKey} alt=${e.altKey}`
        + '\n'
        + info.textContent;
  });
  