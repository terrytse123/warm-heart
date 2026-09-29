(function(){
  var songs={
    tired:[{title:"旅行的意義",artist:"陳绮貞",why:"慢慢走就好。",url:"https://www.youtube.com/watch?v=tv95k0zqnaA"}],
    sad:[{title:"批星戴月的想你",artist:"告五人",why:"難過時，讓旋律先替你走一段。",url:"https://www.youtube.com/watch?v=VpwAq7hiij0"}],
    anxious:[{title:"知足",artist:"五月天",why:"先把世界縮小一點。",url:"https://www.youtube.com/watch?v=_o0oeyCtoFA"}],
    lonely:[{title:"最寂寞的時候",artist:"盧廣仲",why:"孤單被唱出來，房間會小一點。",url:"https://www.youtube.com/watch?v=vjybouULctM"}],
    angry:[{title:"太陽與地球",artist:"盧廣仲",why:"火還在時，先聽一首溫的。",url:"https://www.youtube.com/watch?v=i5YRIjxyJP8"}],
    lost:[{title:"小情歌",artist:"蘇打綠",why:"方向還沒來以前，先被一首歌接住。",url:"https://www.youtube.com/watch?v=in8NNzwFa-s"}],
    ok:[{title:"太陽與地球",artist:"盧廣仲",why:"還好的日子也值得溫柔。",url:"https://www.youtube.com/watch?v=i5YRIjxyJP8"}]
  };
  var moods={tired:{open:["累，是身體在替你說話。"],mid:["休息是維修。"],fol:["我還在。"]},
    sad:{open:["這份沉，我聽見了。"],mid:["不必今天就好起來。"],fol:["我接著聽。"]},
    anxious:{open:["你不是失控。"],mid:["先把世界縮小成這一口氣。"],fol:["一次只看一件。"]},
    lonely:{open:["孤單是感覺沒被接住。"],mid:["這段對話陪你坐一會兒。"],fol:["我還在。"]},
    angry:{open:["你的感受有位置。"],mid:["先承認這不公平。"],fol:["氣還在就讓它在。"]},
    lost:{open:["看不清不代表走錯。"],mid:["停在路口是被允許的。"],fol:["不用一次看完地圖。"]},
    ok:{open:["你來了，我在。"],mid:["願你被善待。"],fol:["想聊就繼續。"]}};
  function pick(a){return a[Math.floor(Math.random()*a.length)]}
  function detect(t,s){if(s&&moods[s])return s;t=t||"";if(/累|疲/.test(t))return"tired";if(/難過|哭/.test(t))return"sad";if(/焦|擔/.test(t))return"anxious";if(/孤|寂/.test(t))return"lonely";if(/委屈|生氣/.test(t))return"angry";if(/迷|不知道/.test(t))return"lost";return"ok"}
  function compose(mood,turn){var m=moods[mood]||moods.ok;return turn===0?pick(m.open)+"\n\n"+pick(m.mid):pick(m.fol)+"\n\n"+pick(m.mid)}
  var thread=document.getElementById("thread"),feel=document.getElementById("feel"),mood=null,turns=0;
  function add(role,text,html){if(!thread)return;var el=document.createElement("div");el.className="bubble "+role;if(html)el.innerHTML=html;else el.textContent=text;thread.appendChild(el);thread.scrollTop=thread.scrollHeight}
  function song(md){var s=pick(songs[md]||songs.ok);add("bot",s.artist+"〈"+s.title+"〉","<div class=song-card>若要一首歌陪著：<br><strong>"+s.artist+"〈"+s.title+"〉</strong><br>"+s.why+"<br><a href='"+s.url+"' target=_blank rel=noopener>在 YouTube 打開</a></div>")}
  function send(text,hint){text=(text||"").trim();if(!text)return;turns++;add("me",text);if(feel)feel.value="";mood=detect(text,hint||mood);setTimeout(function(){add("bot",compose(mood,turns===1?0:turns));if(turns===1||turns===3)song(mood)},400)}
  document.addEventListener("click",function(e){
    var tab=e.target.closest(".tab");if(tab&&tab.getAttribute("data-view")){document.querySelectorAll(".tab").forEach(function(b){b.classList.remove("is-on")});document.querySelectorAll(".view").forEach(function(v){v.classList.remove("is-on")});tab.classList.add("is-on");var v=document.getElementById("view-"+tab.getAttribute("data-view"));if(v)v.classList.add("is-on");return}
    var chip=e.target.closest(".chip");if(chip){mood=chip.getAttribute("data-mood");send(chip.getAttribute("data-seed")||chip.textContent,mood);return}
    if(e.target.closest("#new-chat")){turns=0;mood=null;if(thread)thread.innerHTML="";add("bot","嗨，我在。");return}
    if(e.target.closest("#next-soup")){soupI++;paint();return}
    if(e.target.closest("#breath-toggle")){breathing=!breathing;var t=document.getElementById("breath-toggle"),w=document.getElementById("orb-word"),o=document.getElementById("orb");if(t)t.textContent=breathing?"暫停":"開始呼吸";if(!breathing){if(w)w.textContent="準備";if(o)o.className="orb"}if(breathing)cycle()}
  });
  var form=document.getElementById("talk-form");if(form)form.addEventListener("submit",function(e){e.preventDefault();send(feel&&feel.value)});
  if(feel)feel.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(feel.value)}});
  var soups=[{t:"你遲到的春天，仍然是春天。",c:"暖心語"},{t:"你可以休息。",c:"暖心語"}],soupI=0;
  function paint(){var s=soups[soupI%soups.length],a=document.getElementById("soup-text"),b=document.getElementById("soup-cite");if(a)a.textContent=s.t;if(b)b.textContent="\u2014 "+s.c}
  var breathing=false;
  function cycle(){if(!breathing)return;var w=document.getElementById("orb-word"),o=document.getElementById("orb");if(w)w.textContent="吸氣";if(o)o.className="orb in";setTimeout(function(){if(w)w.textContent="呼氣";if(o)o.className="orb out";setTimeout(cycle,6000)},4000)}
  add("bot","嗨，我在。不必一次說完。");paint();
})();
