(function(){
  var qmap={tired:"療癒 慢歌 華語",sad:"難過 安慰 華語",anxious:"平靜 放鬆 華語",lonely:"寂寞 溫柔 華語",angry:"溫柔 華語",lost:"迷惱 華語",ok:"溫暖 療癒 華語"};
  var fb={tired:{t:"旅行的意義",a:"陳绮貞",u:"https://www.youtube.com/watch?v=tv95k0zqnaA"},sad:{t:"批星戴月的想你",a:"告五人",u:"https://www.youtube.com/watch?v=VpwAq7hiij0"},anxious:{t:"知足",a:"五月天",u:"https://www.youtube.com/watch?v=_o0oeyCtoFA"},lonely:{t:"最寂寞的時候",a:"盧廣仲",u:"https://www.youtube.com/watch?v=vjybouULctM"},angry:{t:"太陽與地球",a:"盧廣仲",u:"https://www.youtube.com/watch?v=i5YRIjxyJP8"},lost:{t:"小情歌",a:"蘇打綠",u:"https://www.youtube.com/watch?v=in8NNzwFa-s"},ok:{t:"太陽與地球",a:"盧廣仲",u:"https://www.youtube.com/watch?v=i5YRIjxyJP8"}};
  function yt(q){return "https://www.youtube.com/results?search_query="+encodeURIComponent(q)}
  function detect(t,s){if(s)return s;t=t||"";if(/累/.test(t))return"tired";if(/難過|哭/.test(t))return"sad";if(/焦|擔/.test(t))return"anxious";if(/孤/.test(t))return"lonely";if(/委屈/.test(t))return"angry";if(/迷/.test(t))return"lost";return"ok"}
  var thread=document.getElementById("thread"),feel=document.getElementById("feel"),mood=null,turns=0;
  function add(role,text,html){if(!thread)return;var el=document.createElement("div");el.className="bubble "+role;if(html)el.innerHTML=html;else el.textContent=text;thread.appendChild(el);thread.scrollTop=thread.scrollHeight}
  async function suggest(md){
    add("bot","我幫你找幾首現在適合的歌…");
    try{
      var r=await fetch("https://itunes.apple.com/search?term="+encodeURIComponent(qmap[md]||qmap.ok)+"&media=music&entity=song&limit=3&country=TW");
      var d=await r.json();
      var hits=(d.results||[]).map(function(t){return {a:t.artistName,t:t.trackName,u:yt(t.artistName+" "+t.trackName)}});
      if(!hits.length)throw 0;
      add("bot","","<div class=song-card>剛搜到：<br>"+hits.map(function(s){return "• <strong>"+s.a+"〈"+s.t+"〉</strong><br><a href='"+s.u+"' target=_blank rel=noopener>在 YouTube 搜這首</a>"}).join("<br>")+"</div>");
    }catch(e){
      var s=fb[md]||fb.ok;
      add("bot","","<div class=song-card>先聽這首：<strong>"+s.a+"〈"+s.t+"〉</strong><br><a href='"+s.u+"' target=_blank>打開 YouTube</a></div>");
    }
  }
  function send(text,hint){text=(text||"").trim();if(!text)return;turns++;add("me",text);if(feel)feel.value="";mood=detect(text,hint||mood);setTimeout(function(){add("bot","我聽見了。");if(turns===1||turns===3||/歌|音樂/.test(text))suggest(mood)},400)}
  document.addEventListener("click",function(e){
    var tab=e.target.closest(".tab");if(tab&&tab.getAttribute("data-view")){document.querySelectorAll(".tab").forEach(function(b){b.classList.remove("is-on")});document.querySelectorAll(".view").forEach(function(v){v.classList.remove("is-on")});tab.classList.add("is-on");var v=document.getElementById("view-"+tab.getAttribute("data-view"));if(v)v.classList.add("is-on");return}
    var chip=e.target.closest(".chip");if(chip){mood=chip.getAttribute("data-mood");send(chip.getAttribute("data-seed")||chip.textContent,mood);return}
    if(e.target.closest("#find-song")){suggest(mood||"ok");return}
    if(e.target.closest("#new-chat")){turns=0;mood=null;if(thread)thread.innerHTML="";add("bot","嗨，我在。");return}
    if(e.target.closest("#breath-toggle")){breathing=!breathing;var t=document.getElementById("breath-toggle"),w=document.getElementById("orb-word"),o=document.getElementById("orb");if(t)t.textContent=breathing?"暫停":"開始呼吸";if(!breathing&&w)w.textContent="準備";if(!breathing&&o)o.className="orb";if(breathing)cycle()}
    if(e.target.closest("#next-soup")){var a=document.getElementById("soup-text");if(a)a.textContent="你可以休息。"}
  });
  var form=document.getElementById("talk-form");if(form)form.addEventListener("submit",function(e){e.preventDefault();send(feel&&feel.value)});
  if(feel)feel.addEventListener("keydown",function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(feel.value)}});
  var breathing=false;function cycle(){if(!breathing)return;var w=document.getElementById("orb-word"),o=document.getElementById("orb");if(w)w.textContent="吸氣";if(o)o.className="orb in";setTimeout(function(){if(w)w.textContent="呼氣";if(o)o.className="orb out";setTimeout(cycle,6000)},4000)}
  add("bot","嗨，我在。");
})();
