const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const loginScreen = $("#loginScreen");
const app = $("#app");

$("#loginForm").addEventListener("submit", e => {
  e.preventDefault();
  loginScreen.classList.add("hidden");
  app.classList.remove("hidden");
  toast("Welcome to AEROVA City Control Center");
  initMaps();
  drawCharts();
});

function logout(){
  app.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  closeAllWindows();
}
$("#logoutBtn").onclick = logout;
$("#profileLogout").onclick = logout;

function showView(name){
  $$(".view").forEach(v => v.classList.remove("active-view"));
  const target = $("#view-" + name);
  if(target) target.classList.add("active-view");
  $$(".nav-item[data-view]").forEach(b => b.classList.toggle("active", b.dataset.view === name));
  if(name === "energy" || name === "analytics") drawCharts();
}
$$(".nav-item[data-view]").forEach(btn => btn.onclick = () => showView(btn.dataset.view));
$$("[data-view-link]").forEach(btn => btn.onclick = () => { showView(btn.dataset.viewLink); closeAllWindows(); });
$("#menuBtn").onclick = () => document.body.classList.toggle("compact-sidebar");
$("#compactToggle").onchange = e => document.body.classList.toggle("compact-sidebar", e.target.checked);
$("#darkToggle").onchange = e => {
  document.body.classList.toggle("light-mode", !e.target.checked);
  toast(e.target.checked ? "Dark interface enabled" : "Light interface enabled");
};

function clock(){
  $("#clock").textContent = new Date().toLocaleTimeString([], {hour12:false});
}
setInterval(clock,1000); clock();

function toast(msg){
  const t=$("#toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}

// Windows
let z=120;
function openWindow(id){
  const w=$("#"+id); if(!w) return;
  w.classList.add("show"); w.style.zIndex=++z;
}
function closeAllWindows(){ $$(".floating-window").forEach(w=>w.classList.remove("show")); }
$$("[data-open]").forEach(b=>b.onclick=()=>openWindow(b.dataset.open));
$$(".close-window").forEach(b=>b.onclick=()=>b.closest(".floating-window").classList.remove("show"));
$("#notificationBtn").onclick=()=>openWindow("notificationWindow");
$("#profileBtn").onclick=()=>openWindow("profileWindow");

function makeDraggable(win){
  const head=win.querySelector(".window-head");
  let dragging=false, ox=0, oy=0;
  head.addEventListener("mousedown", e=>{
    dragging=true; win.style.zIndex=++z;
    const r=win.getBoundingClientRect(); ox=e.clientX-r.left; oy=e.clientY-r.top;
    document.body.style.userSelect="none";
  });
  window.addEventListener("mousemove",e=>{
    if(!dragging)return;
    win.style.left=Math.max(8,Math.min(window.innerWidth-win.offsetWidth-8,e.clientX-ox))+"px";
    win.style.top=Math.max(70,Math.min(window.innerHeight-win.offsetHeight-8,e.clientY-oy))+"px";
  });
  window.addEventListener("mouseup",()=>{dragging=false;document.body.style.userSelect="";});
}
$$(".floating-window").forEach(makeDraggable);

// Map
function initMaps(){
  const maps = [$("#homeMap"), $("#mainMap")].filter(Boolean);
  maps.forEach(map=>{
    if(map.dataset.ready)return;
    const markers=[
      ["🚦","32","36","Central Avenue","Traffic 68%"],
      ["⚡","61","24","Solar Plant","286 MW"],
      ["💧","76","66","Reservoir","68%"],
      ["🚌","45","72","Route 19","88 passengers"],
      ["🚨","22","61","West Park","Safe"],
      ["🚦","70","48","Airport Corridor","Traffic 59%"],
      ["🚌","28","25","Central Station","72 passengers"]
    ];
    markers.forEach(([icon,x,y,title,detail])=>{
      const m=document.createElement("button"); m.className="marker"; m.textContent=icon;
      m.style.left=x+"%"; m.style.top=y+"%"; m.title=title;
      m.onclick=()=>toast(`${title}: ${detail}`);
      map.appendChild(m);
    });
    map.dataset.ready="1";
  });
}
$("#zoomIn").onclick=()=>$("#mainMap").style.transform="scale(1.15)";
$("#zoomOut").onclick=()=>$("#mainMap").style.transform="scale(.9)";
$("#resetMap").onclick=()=>$("#mainMap").style.transform="scale(1)";

// Simulations
$("#simulateTraffic").onclick=()=>{
  const val=Math.floor(65+Math.random()*25);
  $("#trafficStat").textContent=val+"%";
  $("#trafficForecast").textContent=val>80?"High":"Moderate";
  $("#congested").textContent=Math.floor(6+Math.random()*5);
  toast("AI traffic prediction completed");
};
$("#windowTrafficBtn").onclick=()=>{
  const val=Math.floor(55+Math.random()*40);
  $("#windowTraffic").textContent=val+"%";
  toast("Traffic simulation updated");
};
$("#optimizeEnergy").onclick=()=>toast("AI grid optimization completed — peak demand reduced by 4.8%");
$("#scanWater").onclick=()=>{
  $("#leaks").textContent=Math.floor(Math.random()*3)+1;
  toast("Water network scan completed");
};
$("#optimizeWaste").onclick=()=>{
  $("#routes").textContent=String(Number($("#routes").textContent)+2);
  toast("Collection routes optimized");
};
$("#refreshFleet").onclick=()=>toast("Fleet telemetry refreshed");
$("#testAlert").onclick=()=>toast("Emergency alert test sent to response teams");
$("#exportData").onclick=()=>{
  const data="AEROVA CITY REPORT\nTraffic Flow: 72%\nEnergy Health: 84%\nWater Reserve: 68%\nAir Quality: AQI 42\nSafety Score: 96%";
  const blob=new Blob([data],{type:"text/plain"});
  const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="aerova-city-report.txt"; a.click();
  URL.revokeObjectURL(a.href); toast("Report exported");
};

// AI
function aiReply(q){
  const s=q.toLowerCase();
  if(s.includes("traffic")) return "Traffic is currently moderate. Central Avenue is at about 68% flow utilization, and the next 15-minute forecast is moderate.";
  if(s.includes("energy")) return "Energy demand is 842 MW. Solar generation is 286 MW, covering about 34% of current demand.";
  if(s.includes("water")) return "Water reserves are at 68%. Two possible leak patterns are being reviewed, with Zone C needing attention.";
  if(s.includes("bus")||s.includes("transport")) return "186 buses are active. On-time performance is 94%, and the EV fleet represents 62% of active vehicles.";
  if(s.includes("safety")) return "The city safety score is 96%. Three incidents are active and the average response time is 4 minutes 12 seconds.";
  return "I can help with traffic, energy, water, waste, transport, safety, analytics and city operations. Try asking about one of those areas.";
}
function addChat(text,type){
  const box=$("#chatMessages"), d=document.createElement("div"); d.className="chat "+type; d.textContent=text; box.appendChild(d); box.scrollTop=box.scrollHeight;
}
$("#sendAi").onclick=()=>{
  const input=$("#aiInput"), q=input.value.trim(); if(!q)return;
  addChat(q,"user"); input.value="";
  setTimeout(()=>addChat(aiReply(q),"ai"),350);
};
$("#aiInput").addEventListener("keydown",e=>{if(e.key==="Enter")$("#sendAi").click()});
$$("[data-ai]").forEach(b=>b.onclick=()=>{showView("ai");addChat(b.dataset.ai,"ai")});

// Charts without external libraries
function drawLine(canvasId, values){
  const c=$("#"+canvasId); if(!c)return;
  const ctx=c.getContext("2d"), w=c.clientWidth||700, h=c.height||220, dpr=devicePixelRatio||1;
  c.width=w*dpr; c.height=h*dpr; ctx.scale(dpr,dpr);
  ctx.clearRect(0,0,w,h);
  ctx.strokeStyle="#20384f"; ctx.lineWidth=1;
  for(let i=1;i<5;i++){const y=i*h/5;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke();}
  ctx.strokeStyle="#55d8ff"; ctx.lineWidth=3; ctx.beginPath();
  values.forEach((v,i)=>{const x=i*(w/(values.length-1));const y=h-(v/100)*h*.82-18;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});
  ctx.stroke();
  ctx.fillStyle="#55d8ff";
  values.forEach((v,i)=>{const x=i*(w/(values.length-1));const y=h-(v/100)*h*.82-18;ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill()});
}
function drawCharts(){
  drawLine("energyChart",[28,24,22,20,25,38,55,72,81,76,70,68,66,64,62,65,70,78,88,82,67,53,42,34]);
  drawLine("analyticsChart",[38,45,42,58,61,57,68,72,70,76,81,88]);
}
window.addEventListener("resize",drawCharts);