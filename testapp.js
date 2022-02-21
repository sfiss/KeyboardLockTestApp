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
  const keyboardButton = document.querySelector("#keyboard");
  const mouseButton = document.querySelector("#mouse");
  const body = document.body;
  const info = document.querySelector(".info");
  
  const ENTER_FULLSCREEN = "Enter full screen";
  const LEAVE_FULLSCREEN = "Leave full screen";
  const ACTIVATE_KEYBOARD_LOCK = "Activate keyboard lock";
  const DEACTIVATE_KEYBOARD_LOCK = "Dectivate keyboard lock";
  const ACTIVATE_MOUSE_LOCK = "Activate mouse lock";
  const DEACTIVATE_MOUSE_LOCK = "Dectivate mouse lock";
  
  let fullscreen = false;
  let keyboardLock = false;
  let mouseLock = false;
  
  fullscreenButton.addEventListener("click", async () => {
    console.log('fullscreen: ' + fullscreen + ' -> ' + !fullscreen);
    if (window.self !== window.top) {
      window.open(location.href, '', 'noopener,noreferrer');
      return;
    }

    try {
      if (!document.fullscreen) {
        await document.documentElement.requestFullscreen();
        fullscreenButton.textContent = LEAVE_FULLSCREEN;
        fullscreen = true;
      } else {
        await document.exitFullscreen();
        fullscreenButton.textContent = ENTER_FULLSCREEN;
        fullscreen = false;
      }
    } catch (err) {
      fullscreenButton.textContent = ENTER_FULLSCREEN;
      alert(`${err.name}: ${err.message}`);
    }
  });
  
  // https://developer.mozilla.org/en-US/docs/Web/API/Keyboard/lock
  keyboardButton.addEventListener("click", async () => {
    console.log('mouse lock: ' + keyboardLock + ' -> ' + !keyboardLock);
    try {
      if (!keyboardLock) {
        await navigator.keyboard.lock();
        keyboardLock = true;
        keyboardButton.textContent = DEACTIVATE_KEYBOARD_LOCK;
      } else {
        navigator.keyboard.unlock();
        keyboardLock = false;
        keyboardButton.textContent = ACTIVATE_KEYBOARD_LOCK;
      }
    } catch (err) {
      keyboardLock = false;
      keyboardButton.textContent = ACTIVATE_KEYBOARD_LOCK;
      alert(`${err.name}: ${err.message}`);
    }
  });

  // https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
  mouseButton.addEventListener("click", async () => {
    console.log('mouse lock: ' + mouseLock + ' -> ' + !mouseLock);
    try {
      if (!mouseLock) {
        document.requestPointerLock();
        mouseLock = true;
        mouseButton.textContent = DEACTIVATE_MOUSE_LOCK;
      } else {
        document.exitPointerLock();
        mouseLock = false;
        mouseButton.textContent = ACTIVATE_MOUSE_LOCK;
      }
    } catch (err) {
      mouseLock = false;
      mouseButton.textContent = ACTIVATE_MOUSE_LOCK;
      alert(`${err.name}: ${err.message}`);
    }
  });

  document.addEventListener("pointerlockchange", () => {
    console.log('pointerlockchange');
  });

  document.addEventListener("pointerlockerror", () => {
    console.log('pointerlockerror');
  });
  
  document.addEventListener("fullscreenchange", () => {
    console.log('fullscreenchange');
    keyboardButton.textContent = ACTIVATE_KEYBOARD_LOCK;
    mouseButton.textContent = ACTIVATE_MOUSE_LOCK;
    keyboardLock = false;
    mouseLock = false;
    if (document.fullscreen) {
      fullscreenButton.textContent = LEAVE_FULLSCREEN;
      fullscreen = true;
    } else {
      fullscreenButton.textContent = ENTER_FULLSCREEN;
      fullscreen = false;
    }
  });
  
  document.addEventListener('keydown', (e) => {
    console.log('keydown');
    info.textContent = `${e.code} captured with ctrl=${e.ctrlKey} meta=${e.metaKey} shift=${e.shiftKey} alt=${e.altKey}`
        + '\n'
        + info.textContent;
  });
  