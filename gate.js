// gate.js
// Front-end gate (works well for MVP on static sites).
// Not a high-security solution.

function pcaNormalizeKey(key) {
  return String(key || "").trim().toLowerCase();
}

function pcaIsUnlocked(gateKey) {
  const k = pcaNormalizeKey(gateKey);
  return localStorage.getItem("pca_gate_" + k) === "1";
}

function pcaUnlock(gateKey) {
  const k = pcaNormalizeKey(gateKey);
  localStorage.setItem("pca_gate_" + k, "1");
}

function pcaLock(gateKey) {
  const k = pcaNormalizeKey(gateKey);
  localStorage.removeItem("pca_gate_" + k);
}

/**
 * Protects the current page with a single password.
 * - gateKey: unique id for the protected area (e.g. "p1" for Program 1)
 * - password: the password string you share with subscribers
 */
function pcaProtectPage({ gateKey, password, title }) {
  const KEY = pcaNormalizeKey(gateKey);
  const PASS = String(password || "");

  // If already unlocked, do nothing
  if (pcaIsUnlocked(KEY)) return;

  // Minimal CSS injected
  const style = document.createElement("style");
  style.textContent = `
    .pcaOverlay{
      position:fixed;inset:0;z-index:99999;
      background:rgba(0,0,0,.72);backdrop-filter:blur(8px);
      display:flex;align-items:center;justify-content:center;padding:18px;
      font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
    }
    .pcaCard{
      width:min(560px, 100%);
      border-radius:18px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(20,20,24,.92);
      color:#fff;
      padding:16px;
      box-shadow:0 12px 40px rgba(0,0,0,.45);
      direction:rtl;
    }
    .pcaTitle{font-size:20px;font-weight:800;margin:0 0 8px}
    .pcaDesc{opacity:.88;line-height:1.8;margin:0 0 12px}
    .pcaRow{display:flex;gap:10px;flex-wrap:wrap;align-items:center}
    .pcaInput{
      flex:1;
      padding:12px;border-radius:12px;
      border:1px solid rgba(255,255,255,.18);
      background:rgba(255,255,255,.06);
      color:#fff;outline:none;
    }
    .pcaBtn{
      padding:12px 14px;border-radius:12px;border:0;
      background:#22c55e;color:#07130b;font-weight:800;cursor:pointer;
    }
    .pcaBtn2{
      padding:12px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.2);
      background:transparent;color:#fff;font-weight:700;cursor:pointer;
    }
    .pcaErr{margin-top:10px;color:#fecaca;display:none}
    .pcaSmall{margin-top:10px;opacity:.75;font-size:12.5px;line-height:1.7}
    a.pcaLink{color:#fff;text-decoration:underline}
  `;
  document.head.appendChild(style);

  // Build overlay
  const overlay = document.createElement("div");
  overlay.className = "pcaOverlay";
  overlay.innerHTML = `
    <div class="pcaCard">
      <div class="pcaTitle">${title || "محتوى خاص بالمشتركين"}</div>
      <p class="pcaDesc">ادخل كلمة السر للوصول للمحتوى.</p>

      <div class="pcaRow">
        <input class="pcaInput" id="pcaPass" type="password" placeholder="كلمة السر" />
        <button class="pcaBtn" id="pcaGo">دخول</button>
      </div>

      <div class="pcaErr" id="pcaErr">كلمة السر غير صحيحة.</div>

      <div class="pcaRow" style="margin-top:12px">
        <button class="pcaBtn2" id="pcaBack">رجوع للموقع</button>
        <a class="pcaLink" href="contact.html">محتاج كلمة السر؟ تواصل معنا</a>
      </div>

      <div class="pcaSmall">
        *بعد إدخال كلمة السر مرة واحدة، هتفضل الصفحات مفتوحة على نفس الجهاز/المتصفح.*
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const passEl = overlay.querySelector("#pcaPass");
  const errEl  = overlay.querySelector("#pcaErr");
  const goBtn  = overlay.querySelector("#pcaGo");
  const backBtn= overlay.querySelector("#pcaBack");

  function tryLogin() {
    const entered = (passEl.value || "").trim();
    if (entered === PASS) {
      pcaUnlock(KEY);
      overlay.remove();
      return;
    }
    errEl.style.display = "block";
  }

  goBtn.addEventListener("click", tryLogin);
  passEl.addEventListener("keydown", (e)=>{ if (e.key === "Enter") tryLogin(); });
  backBtn.addEventListener("click", ()=>{ window.location.href="index.html"; });

  // focus input
  setTimeout(()=>passEl.focus(), 50);
}
