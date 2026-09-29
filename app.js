(function () {
  const moods = {
    tired: { label: "累", openings: ["聽得出來，你已經撐很久了。","累，其實是身體在替你說話。","你不是懶，是油箱快空了。"], middles: ["人不是機器，不能一直「再撐一下」。允許自己 tonight 什麼都不證明。","把標準暫時放低一格，不是放棄，是保命。","休息不是獎賞，是維修。你值得被維修。"] },
    sad: { label: "難過", openings: ["難過可以不用解釋得清清楚楚。","這份沉，我聽見了。","心酸的時候，最怕有人急著叫你想開。"], middles: ["眼淚或發呆都算數。情緒走完自己的路，才會慢慢讓出空間。","你現在這樣，不是軟弱，是還在愛著某些東西。","不必今天就好起來。只要還願意坐在這裡說一句，就已經很勇敢。"] },
    anxious: { label: "焦慮", openings: ["腦子轉太快的時候，身體會先緊起來。","焦慮喜歡假裝自己是預告片，其實很多畫面不會發生。","你不是失控，是太用力地想保護自己。"], middles: ["先把世界縮小成這一口氣。下一秒的事，等這一秒過完再談。","你沒有義務現在就把所有不確定一次解完。","把手放在心口，數四下呼吸。焦慮可以在，你也可以同時在。"] },
    lonely: { label: "孤單", openings: ["孤單不是沒有人，是感覺沒有被接住。","夜深的時候，房間會特別大。","你願意把孤單說出來，它就不再是秘密。"], middles: ["今晚這段文字陪你坐一會兒。雖然隔著螢幕，心意是真的。","有人懂，不代表立刻有人出現；但你並非不值得被陪伴。","先對自己溫柔一點，像對待一個晚歸的朋友。"] },
    angry: { label: "委屈", openings: ["委屈是一種沒被看見的痛。","生氣往往底下還墊著一句：「我也很努力了。」","你的感受有位置，不必先道歉。"], middles: ["先承認「這不公平」或「我好氣」，比急著原諒更誠實。","邊界被踩到時會發火，說明你還在乎自己。","把火關小一點就好，不必此刻把它滅成聖人。"] },
    lost: { label: "迷惱", openings: ["看不清下一步，不代表你走錯了路。","迷惱常常出現在成長的交界處。","不一定要立刻找到意義，先允許空白存在。"], middles: ["方向感會回來的，通常是在你停止苛責自己之後。","今天只選一件最小的事：喝水、散步、或早點睡。也算前進。","人生不是單線任務。停在路口喘口氣，是被允許的。"] },
    ok: { label: "還好", openings: ["還好也很好。不是每句話都要來自崩潰。","想來聽一句溫柔的話，本身就是一種照顧。","平靜的日子裡，也值得被好好對待。"], middles: ["願你把這一刻的輕，存一點給以後比較沉的晚上。","世界很吵，你還願意停下來聽一句話，這很美。","願你被善待，包括被你自己善待。"] }
  };
  const closings = ["你已經很努力了。今晚，先把自己當成人就好。","我在這裡。你慢慢說，或不說，都沒關係。","把這句話帶去睡覺：你值得被溫柔對待。","先活過今天。明天的自己，會來接你。","若心還很重，記得向真實的人伸手。你不必獨自扛完。"];
  const soups = [
    { t: "人不是為了完美才被愛的。有裂縫的杯子，一樣能盛溫水。", c: "暖心語" },
    { t: "你可以休息，世界不會因此塌下來。塌下來的往往是那個不肯停的自己。", c: "暖心語" },
    { t: "成長有時看起來像退步：睡得更多、說得更少、把一些人放下。那也是整理。", c: "暖心語" },
    { t: "不是所有夜晚都要有答案。有些夜晚只負責讓你活著過去。", c: "暖心語" },
    { t: "被理解是奢侈，先被自己理解，是可以練習的日常。", c: "暖心語" },
    { t: "你遲到的春天，仍然是春天。", c: "暖心語" },
    { t: "把「我應該」換成「我可以」，肩膀會輕一點。", c: "暖心語" },
    { t: "心軟不是缺陷。只是要記得，心軟也要留給自己。", c: "暖心語" },
    { t: "今天沒有很厲害也沒關係。你還在，就已經超過昨天擔心的那個結局。", c: "暖心語" },
    { t: "有些路是走給自己看的，不必直播，不必頒獎。", c: "暖心語" }
  ];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  function detectMood(text, selected) {
    if (selected && moods[selected]) return selected;
    const s = text;
    if (/累|疲憊|撐不|睡不|加班|好倦/.test(s)) return "tired";
    if (/難過|傷心|哭|心酸|失落|憂鬱/.test(s)) return "sad";
    if (/焦|慌|怕|失眠|心跳|擔心|壓力/.test(s)) return "anxious";
    if (/孤|沒人|一個人|寂寞/.test(s)) return "lonely";
    if (/氣|怒|不公|委屈|恨|被傷/.test(s)) return "angry";
    if (/迷|不知道|方向|未來|意義|放棄/.test(s)) return "lost";
    return "ok";
  }
  function echoBit(text) {
    const t = text.trim().replace(/\s+/g, " ");
    if (t.length < 4) return "";
    const clip = t.length > 36 ? t.slice(0, 36) + "……" : t;
    return `你寫道：「${clip}」——這句話裡有重量，我沒有略過。`;
  }
  function compose(text, moodKey) {
    const m = moods[moodKey] || moods.ok;
    const parts = [];
    const echo = echoBit(text);
    if (echo) parts.push(echo);
    parts.push(pick(m.openings));
    parts.push(pick(m.middles));
    parts.push(pick(closings));
    return parts.join("\n\n");
  }
  let currentMood = null;
  let lastReply = "";
  document.querySelectorAll(".tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab").forEach((b) => b.classList.remove("is-on"));
      document.querySelectorAll(".view").forEach((v) => v.classList.remove("is-on"));
      btn.classList.add("is-on");
      document.getElementById("view-" + btn.dataset.view).classList.add("is-on");
    });
  });
  document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-on"));
      chip.classList.add("is-on");
      currentMood = chip.dataset.mood;
    });
  });
  const feel = document.getElementById("feel");
  const count = document.getElementById("count");
  feel.addEventListener("input", () => { count.textContent = feel.value.length + " / 800"; });
  function showReply(text) {
    lastReply = text;
    const box = document.getElementById("reply");
    const body = document.getElementById("reply-body");
    body.innerHTML = text.split("\n\n").map((p) => "<p>" + escapeHtml(p) + "</p>").join("");
    box.hidden = false;
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  document.getElementById("talk-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = feel.value.trim();
    showReply(compose(text, detectMood(text, currentMood)));
  });
  document.getElementById("another").addEventListener("click", () => {
    const text = feel.value.trim();
    showReply(compose(text, detectMood(text, currentMood)));
  });
  const KEY = "warm-heart-notes";
  function loadNotes() { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } }
  function saveNotes(list) { localStorage.setItem(KEY, JSON.stringify(list)); }
  function renderNotes() {
    const list = loadNotes();
    const el = document.getElementById("journal-list");
    const empty = document.getElementById("journal-empty");
    el.innerHTML = "";
    empty.style.display = list.length ? "none" : "block";
    list.slice().reverse().forEach((n) => {
      const d = document.createElement("article");
      d.className = "note";
      d.innerHTML = "<time></time><p></p>";
      d.querySelector("time").textContent = n.at;
      d.querySelector("p").textContent = n.text;
      el.appendChild(d);
    });
  }
  document.getElementById("save-note").addEventListener("click", () => {
    if (!lastReply) return;
    const list = loadNotes();
    list.push({ at: new Date().toLocaleString("zh-Hant", { hour12: false }), text: lastReply });
    saveNotes(list);
    renderNotes();
    document.getElementById("save-note").textContent = "已收下";
    setTimeout(() => { document.getElementById("save-note").textContent = "收到小記裡"; }, 1600);
  });
  let soupI = Math.floor(Math.random() * soups.length);
  function paintSoup() {
    const s = soups[soupI % soups.length];
    document.getElementById("soup-text").textContent = s.t;
    document.getElementById("soup-cite").textContent = "— " + s.c;
  }
  document.getElementById("next-soup").addEventListener("click", () => { soupI += 1; paintSoup(); });
  paintSoup();
  renderNotes();
  const orb = document.getElementById("orb");
  const word = document.getElementById("orb-word");
  const toggle = document.getElementById("breath-toggle");
  let breathing = false;
  let timer = null;
  function cycle() {
    if (!breathing) return;
    word.textContent = "吸氣";
    orb.className = "orb in";
    timer = setTimeout(() => {
      if (!breathing) return;
      word.textContent = "停留";
      orb.className = "orb hold";
      timer = setTimeout(() => {
        if (!breathing) return;
        word.textContent = "呼氣";
        orb.className = "orb out";
        timer = setTimeout(cycle, 6000);
      }, 4000);
    }, 4000);
  }
  toggle.addEventListener("click", () => {
    breathing = !breathing;
    toggle.textContent = breathing ? "暫停" : "開始呼吸";
    if (breathing) cycle();
    else { clearTimeout(timer); word.textContent = "準備"; orb.className = "orb"; }
  });
})();
