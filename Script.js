function autoDetect() {
  let ram = navigator.deviceMemory || 4;
  let cores = navigator.hardwareConcurrency || 4;

  let start = performance.now();
  let x = 0;

  for (let i = 0; i < 3e6; i++) {
    x += Math.sqrt(i % 100);
  }

  let end = performance.now();

  estimateFPS((fps) => {
    document.getElementById("ram").value = ram;
    document.getElementById("fps").value = fps;

    let type = "mid device";

    if (ram <= 3 || (end - start) > 110) {
      type = "low-end device";
    } else if (ram >= 6 && (end - start) < 70) {
      type = "high-end device";
    }

    document.getElementById("device").value =
      type + " | cores:" + cores;
  });
}

function estimateFPS(cb) {
  let frames = 0;
  let start = performance.now();

  function loop(t) {
    frames++;
    if (t - start >= 1000) {
      cb(frames);
      return;
    }
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

function generateSensi() {
  let device = document.getElementById("device").value.toLowerCase();
  let ram = parseFloat(document.getElementById("ram").value);
  let fps = parseInt(document.getElementById("fps").value);

  let s = [95, 90, 85, 75, 50, 75];

  // FPS ENGINE
  if (fps <= 30) s = s.map(v => v + 5);
  if (fps >= 90) s = s.map(v => v - 5);

  // RAM ENGINE
  if (ram <= 3) s = s.map(v => v + 4);
  if (ram >= 6) s = s.map(v => v - 3);

  // DEVICE BRAND ENGINE
  if (device.includes("iphone")) s = [82,78,74,64,40,70];
  else if (device.includes("samsung")) s = [92,88,84,74,50,75];
  else if (device.includes("redmi") || device.includes("poco")) s = [94,90,86,76,52,75];
  else if (device.includes("vivo")) s = [95,91,87,77,55,75];
  else if (device.includes("oppo")) s = [94,90,86,76,54,75];
  else if (device.includes("realme")) s = [92,88,84,74,50,75];
  else if (device.includes("oneplus")) s = [88,84,80,70,45,75];

  let r = document.getElementById("result");

  r.innerHTML = `
    <h2>🔥 AI GAMING RESULT</h2>
    <p><b>Device:</b> ${device}</p>
    <p><b>RAM:</b> ${ram}</p>
    <p><b>FPS:</b> ${fps}</p>
    <hr>
    <p>General: ${s[0]}</p>
    <p>Red Dot: ${s[1]}</p>
    <p>2X Scope: ${s[2]}</p>
    <p>4X Scope: ${s[3]}</p>
    <p>Sniper: ${s[4]}</p>
    <p>Free Look: ${s[5]}</p>
  `;
           }
