(function () {
  const moods = {
    tired: { openings: ["聽得出來，你已經撐很久了。"], middles: ["休息不是獎賞，是維修。"], follows: ["我還在。累的時候，話短一點也沒關係。"] },
    sad: { openings: ["這份沉，我聽見了。"], middles: ["不必今天就好起來。"], follows: ["我接著聽。"] },
    anxious: { openings: ["你不是失控，是太用力地想保護自己。"], middles: ["先把世界縮小成這一口氣。"], follows: ["我們一次只看一件。"] },
    lonely: { openings: ["孤單不是沒有人，是感覺沒有被接住。"], middles: ["今晚這段對話陪你坐一會兒。"], follows: ["我還在這條對話裡。"] },
    angry: { openings: ["你的感受有位置，不必先道歉。"], middles: ["先承認「這不公平」比急著原諒更誠實。"], follows: ["氣還在的話，就讓它在。"] },
    lost: { openings: ["看不清下一步，不代表你走錯了路。"], middles: ["停在路口喘口氣，是被允許的。"], follows: ["我們不用一次看完整張地圖。"] },
    ok: { openings: ["你來了，我在。"], middles: ["願你被善待，包括被你自己善待。"], follows: ["想聊下去的話，從一件小事開始就好。"] }
  };
  const greetings = ["嗨，我在。不必一次說完，從任何一句開始都可以。"];
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  function detectMood(text, selected) {
    if (selected && moods[selected]) return selected;
    const s = text || "";
    if (/累|疲/.test(s)) return "tired";
    if (/難過|傷心|哭/.test(s)) return "sad";
    if (/焦|慌|擔心/.test(s)) return "anxious";
    if (/孤|寂/.test(s)) return "lonely";
    if (/委屈|生氣/.test(s)) return "angry";
    if (/迷|不知道/.test(s)) return "lost";
    return "ok";
  }
  function compose(text, mood, turn) {
    const m = moods[mood] || moods.ok;
    if (turn === 0) return [pick(m.openings), pick(m.middles)].join("\n\n");
    return [pick(m.follows), pick(m.middles)].join("\n\n");
  }
  const CHAT_KEY = "warm-heart-chat";
  const NOTE_KEY = "warm-heart-notes";
  const thread = document.getElementById("thread");
  const feel = document.getElementById("feel");
  let currentMood = null, userTurns = 0;
  function loadChat() { try { return JSON.parse(localStorage.getItem(CHAT_KEY) || "[]"); } catch(e) { return []; } }
  function saveChat(list) { localStorage.setItem(CHAT_KEY, JSON.stringify(list)); }
  function addBubble(role, text, persist) {
    if (!thread) return;
    const el = document.createElement("div");
    el.className = "bubble " + role;
    el.textContent = text;
    thread.appendChild(el);
    thread.scrollTop = thread.scrollHeight;
    if (persist !== false) {
      const list = loadChat();
      list.push({ role: role, text: text });
      saveChat(list);
    }
  }
  function sendMessage(text, moodHint) {
    const msg = (text || "").trim();
    if (!msg) return;
    userTurns += 1;
    addBubble("me", msg, true);
    if (feel) feel.value = "";
    const mood = detectMood(msg, moodHint || currentMood);
    currentMood = mood;
    setTimeout(function () {
      addBubble("bot", compose(msg, mood, userTurns === 1 ? 0 : userTurns), true);
    }, 400);
  }
  document.addEventListener("click", function (e) {
    var tab = e.target.closest(".tab");
    if (tab && tab.getAttribute("data-view")) {
      document.querySelectorAll(".tab").forEach(function (b) { b.classList.remove("is-on"); });
      document.querySelectorAll(".view").forEach(function (v) { v.classList.remove("is-on"); });
      tab.classList.add("is-on");
      var view = document.getElementById("view-" + tab.getAttribute("data-view"));
      if (view) view.classList.add("is-on");
      return;
    }
    var chip = e.target.closest(".chip");
    if (chip) {
      currentMood = chip.getAttribute("data-mood");
      sendMessage(chip.getAttribute("data-seed") || chip.textContent, currentMood);
      return;
    }
    if (e.target.closest("#new-chat")) {
      localStorage.removeItem(CHAT_KEY);
      currentMood = null;
      userTurns = 0;
      if (thread) thread.innerHTML = "";
      addBubble("bot", pick(greetings), true);
      return;
    }
    if (e.target.closest("#next-soup")) {
      soupI += 1;
      paintSoup();
      return;
    }
    if (e.target.closest("#breath-toggle")) {
      breathing = !breathing;
      var t = document.getElementById("breath-toggle");
      var word = document.getElementById("orb-word");
      var orb = document.getElementById("orb");
      if (t) t.textContent = breathing ? "暫停" : "開始呼吸";
      if (!breathing && word) word.textContent = "準備";
      if (!breathing && orb) orb.className = "orb";
      if (breathing) cycle();
    }
  });
  var form = document.getElementById("talk-form");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    sendMessage(feel ? feel.value : "");
  });
  if (feel) feel.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(feel.value);
    }
  });
  var soups = [
    { t: "你遲到的春天，仍然是春天。", c: "暖心語" },
    { t: "你可以休息，世界不會因此塌下來。", c: "暖心語" }
  ];
  var soupI = 0;
  function paintSoup() {
    var s = soups[soupI % soups.length];
    var a = document.getElementById("soup-text");
    var b = document.getElementById("soup-cite");
    if (a) a.textContent = s.t;
    if (b) b.textContent = "\u2014 " + s.c;
  }
  var breathing = false, timer = null;
  function cycle() {
    if (!breathing) return;
    var word = document.getElementById("orb-word");
    var orb = document.getElementById("orb");
    if (word) word.textContent = "吸氣";
    if (orb) orb.className = "orb in";
    timer = setTimeout(function () {
      if (word) word.textContent = "呼氣";
      if (orb) orb.className = "orb out";
      timer = setTimeout(cycle, 6000);
    }, 4000);
  }
  if (thread && loadChat().length) {
    loadChat().forEach(function (m) { addBubble(m.role, m.text, false); });
  } else {
    addBubble("bot", pick(greetings), true);
  }
  paintSoup();
})();
