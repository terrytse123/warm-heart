(function () {
  const moods = {
    tired: {
      openings: ["聽得出來，你已經撐很久了。", "累，其實是身體在替你說話。", "你不是懶，是油箱快空了。"],
      middles: ["人不是機器，不能一直「再撐一下」。", "把標準暫時放低一格，不是放棄，是保命。", "休息不是獎賞，是維修。"],
      follows: ["還是很沉嗎？可以繼續說哪一件最耗你。", "如果今晚只能做一件恢復的事，你會選睡覺、洗澡，還是什麼都不做？", "我還在。累的時候，話短一點也沒關係。"]
    },
    sad: {
      openings: ["難過可以不用解釋得清清楚楚。", "這份沉，我聽見了。", "心酸的時候，最怕有人急著叫你想開。"],
      middles: ["眼淚或發呆都算數。", "你現在這樣，不是軟弱，是還在意某些東西。", "不必今天就好起來。"],
      follows: ["想再說一點發生了什麼，或只是坐一會兒，都可以。", "這份難過有名字嗎？還是暫時沒有也沒關係。", "我接著聽。"]
    },
    anxious: {
      openings: ["腦子轉太快的時候，身體會先緊起來。", "焦慮喜歡假裝自己是預告片。", "你不是失控，是太用力地想保護自己。"],
      middles: ["先把世界縮小成這一口氣。", "你沒有義務現在就把所有不確定一次解完。", "焦慮可以在，你也可以同時在。"],
      follows: ["此刻最吵的那個擔心，要不要點一下名字？", "要不要先去做個呼吸頁的練習，再回來跟我說？", "我們一次只看一件。"]
    },
    lonely: {
      openings: ["孤單不是沒有人，是感覺沒有被接住。", "夜深的時候，房間會特別大。", "你願意把孤單說出來，它就不再是秘密。"],
      middles: ["今晚這段對話陪你坐一會兒。", "你並非不值得被陪伴。", "先對自己溫柔一點，像對待晚歸的朋友。"],
      follows: ["是想被理解，還是想有人在旁邊就好？", "如果你願意，說一個你希望有人知道的小事。", "我還在這條對話裡。"]
    },
    angry: {
      openings: ["委屈是一種沒被看見的痛。", "生氣底下常常墊著一句：我也很努力了。", "你的感受有位置，不必先道歉。"],
      middles: ["先承認「這不公平」，比急著原諒更誠實。", "邊界被踩到時會發火，說明你還在乎自己。", "把火關小一點就好，不必此刻當聖人。"],
      follows: ["最讓你卡住的，是那句話、那件事，還是沒被看見？", "氣還在的話，就讓它在。我們慢慢拆。", "你想被聽完，還是想找下一步？"]
    },
    lost: {
      openings: ["看不清下一步，不代表你走錯了路。", "迷惱常常出現在成長的交界處。", "不一定要立刻找到意義。"],
      middles: ["方向感通常在停止苛責自己之後回來。", "今天只選一件最小的事，也算前進。", "停在路口喘口氣，是被允許的。"],
      follows: ["現在最模糊的是工作、關係，還是對自己的感覺？", "若明天什麼都不必決定，你會先讓自己怎樣？", "我們不用一次看完整張地圖。"]
    },
    ok: {
      openings: ["還好也很好。不是每句話都要來自崩潰。", "想來聽一句溫柔的話，本身就是一種照顧。", "平靜的日子裡，也值得被好好對待。"],
      middles: ["願你把這一刻的輕，存一點給以後比較沉的晚上。", "世界很吵，你還願意停下來，這很美。", "願你被善待，包括被你自己善待。"],
      follows: ["想聊下去的話，從一件小事開始就好。", "今天有沒有什麼小小的、還算溫暖的瞬間？", "我在這裡陪著。"]
    }
  };
  const greetings = ["嗨，我在。不必一次說完，從任何一句開始都可以。", "你來了。今天心裡是輕的、沉的，還是說不上來？", "這是一段不會催你的對話。你想說多少，就說多少。"];
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  function detectMood(text, selected) {
    if (selected && moods[selected]) return selected;
    const s = text || "";
    if (/累|疲憊|撐不|睡不|加班|好倦/.test(s)) return "tired";
    if (/難過|傷心|哭|心酸|失落|憂鬱/.test(s)) return "sad";
    if (/焦|慌|怕|失眠|心跳|擔心|壓力/.test(s)) return "anxious";
    if (/孤|沒人|一個人|寂寞/.test(s)) return "lonely";
    if (/氣|怒|不公|委屈|恨|被傷/.test(s)) return "angry";
    if (/迷|不知道|方向|未來|意義|放棄/.test(s)) return "lost";
    return "ok";
  }
  function compose(text, moodKey, turn) {
    const m = moods[moodKey] || moods.ok;
    if (turn === 0) {
      const echo = (text && text.trim().length > 3) ? "你剛說的，我記住了。" : "";
      return [echo, pick(m.openings), pick(m.middles)].filter(Boolean).join("\n\n");
    }
    if (/謝謝|感謝/.test(text || "")) return "不客氣。你願意說出來，已經很溫柔地對待自己了。還想繼續的話，我都在。";
    if (/呼吸|好緊張|心跳/.test(text || "")) return "若身體也跟著緊，可以點上面的「呼吸」，跟著圓圈走一輪，再回到這裡跟我說。";
    return [pick(m.follows), pick(m.middles)].join("\n\n");
  }
  const CHAT_KEY = "warm-heart-chat";
  const NOTE_KEY = "warm-heart-notes";
  const thread = document.getElementById("thread");
  const feel = document.getElementById("feel");
  let currentMood = null;
  let userTurns = 0;
  function loadChat() { try { return JSON.parse(localStorage.getItem(CHAT_KEY) || "[]"); } catch { return []; } }
  function saveChat(list) { localStorage.setItem(CHAT_KEY, JSON.stringify(list)); }
  function addBubble(role, text, persist) {
    const el = document.createElement("div");
    el.className = "bubble " + role;
    el.textContent = text;
    thread.appendChild(el);
    if (role === "bot" && persist !== false && !el.classList.contains("typing")) {
      const act = document.createElement("div");
      act.className = "bubble-actions";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "text-btn";
      btn.textContent = "收下這句";
      btn.addEventListener("click", () => {
        const notes = loadNotes();
        notes.push({ at: new Date().toLocaleString("zh-Hant", { hour12: false }), text: text });
        saveNotes(notes);
        renderNotes();
        btn.textContent = "已收下";
      });
      act.appendChild(btn);
      thread.appendChild(act);
    }
    thread.scrollTop = thread.scrollHeight;
    if (persist !== false) {
      const list = loadChat();
      list.push({ role: role, text: text, at: Date.now() });
      saveChat(list);
    }
    return el;
  }
  function renderChat() {
    thread.innerHTML = "";
    const list = loadChat();
    userTurns = list.filter((m) => m.role === "me").length;
    if (!list.length) { addBubble("bot", pick(greetings), true); return; }
    const line = document.createElement("div");
    line.className = "dayline";
    line.textContent = "對話還在，你可以接著說";
    thread.appendChild(line);
    list.forEach((m) => addBubble(m.role, m.text, false));
  }
  function replyTo(text, moodHint) {
    const mood = detectMood(text, moodHint || currentMood);
    currentMood = mood;
    const typing = document.createElement("div");
    typing.className = "bubble bot typing";
    typing.textContent = "我在想怎麼接住這句……";
    thread.appendChild(typing);
    thread.scrollTop = thread.scrollHeight;
    setTimeout(() => {
      typing.remove();
      addBubble("bot", compose(text, mood, userTurns === 1 ? 0 : userTurns), true);
    }, 550 + Math.min(800, (text || "").length * 8));
  }
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
      if (chip.dataset.seed) { feel.value = chip.dataset.seed; feel.focus(); }
    });
  });
  document.getElementById("talk-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const text = feel.value.trim();
    if (!text) return;
    userTurns += 1;
    addBubble("me", text, true);
    feel.value = "";
    feel.style.height = "auto";
    replyTo(text, currentMood);
  });
  feel.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("talk-form").requestSubmit();
    }
  });
  feel.addEventListener("input", () => {
    feel.style.height = "auto";
    feel.style.height = Math.min(140, feel.scrollHeight) + "px";
  });
  document.getElementById("new-chat").addEventListener("click", () => {
    localStorage.removeItem(CHAT_KEY);
    currentMood = null;
    userTurns = 0;
    renderChat();
  });
  function loadNotes() { try { return JSON.parse(localStorage.getItem(NOTE_KEY) || "[]"); } catch { return []; } }
  function saveNotes(list) { localStorage.setItem(NOTE_KEY, JSON.stringify(list)); }
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
  const soups = [
    { t: "人不是為了完美才被愛的。有裂縫的杯子，一樣能盛溫水。", c: "暖心語" },
    { t: "你可以休息，世界不會因此塌下來。", c: "暖心語" },
    { t: "不是所有夜晚都要有答案。有些夜晚只負責讓你活著過去。", c: "暖心語" },
    { t: "你遲到的春天，仍然是春天。", c: "暖心語" },
    { t: "把「我應該」換成「我可以」，肩膀會輕一點。", c: "暖心語" },
    { t: "心軟不是缺陷。只是要記得，心軟也要留給自己。", c: "暖心語" }
  ];
  let soupI = Math.floor(Math.random() * soups.length);
  function paintSoup() {
    const s = soups[soupI % soups.length];
    document.getElementById("soup-text").textContent = s.t;
    document.getElementById("soup-cite").textContent = "\u2014 " + s.c;
  }
  document.getElementById("next-soup").addEventListener("click", () => { soupI += 1; paintSoup(); });
  const orb = document.getElementById("orb");
  const word = document.getElementById("orb-word");
  const toggle = document.getElementById("breath-toggle");
  let breathing = false, timer = null;
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
  renderChat();
  renderNotes();
  paintSoup();
})();
