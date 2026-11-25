const SPRITE="<svg width=\"0\" height=\"0\" style=\"position:absolute\" aria-hidden=\"true\">\n<symbol id=\"shield\" viewBox=\"0 0 24 24\"><path d=\"M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z\"/><path d=\"M9 12l2 2 4-4\"/></symbol>\n<symbol id=\"clock\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></symbol>\n<symbol id=\"eye\" viewBox=\"0 0 24 24\"><path d=\"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></symbol>\n<symbol id=\"lock\" viewBox=\"0 0 24 24\"><rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"2\"/><path d=\"M8 11V8a4 4 0 018 0v3\"/></symbol>\n<symbol id=\"ring\" viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"15\" r=\"6\"/><path d=\"M8 4l2-2h4l2 2-4 4z\"/></symbol>\n<symbol id=\"heart\" viewBox=\"0 0 24 24\"><path d=\"M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z\"/></symbol>\n<symbol id=\"users\" viewBox=\"0 0 24 24\"><circle cx=\"9\" cy=\"8\" r=\"3\"/><circle cx=\"17\" cy=\"9\" r=\"2.5\"/><path d=\"M3 20c0-4 3-6 6-6s6 2 6 6M15 14c3 0 6 1.5 6 5\"/></symbol>\n</svg>";
const $=s=>document.querySelector(s),all=s=>document.querySelectorAll(s),F=n=>Number(n).toLocaleString("en-US"),
C={marriage:"#f5c542",couple:"#ff5c8a",friendship:"#22d3ee"},PR={unlock:1500,whatsapp:2000},
P=[["Amina","w","marriage",165,30000],["Neema","w","marriage",172,40000],["Zawadi","w","couple",168,25000],["Rehema","w","friendship",160,20000],["Juma","m","marriage",180,35000],["Baraka","m","couple",178,30000],["Idrisa","m","friendship",175,20000]];
let S={it:"marriage",lf:"w",bd:50000,nm:"",un:[],wa:[],cur:null,t0:0};
try{Object.assign(S,JSON.parse(localStorage.getItem("gd")||"{}"))}catch(e){}
const save=()=>{try{localStorage.setItem("gd",JSON.stringify(S))}catch(e){}},
gid=p=>"Ghost-"+(1000+(p[0].length*137+p[3]*7)%9000),
list=()=>P.map((p,i)=>[p,i]).filter(([p])=>p[2]==S.it&&(S.lf=="a"||p[1]==S.lf));
function pick(p){S.it=p;save();all(".path").forEach(x=>x.classList.toggle("on",x.dataset.p==p));document.documentElement.style.setProperty("--acc",C[p]);window.setPath&&setPath(C[p])}
function av(n){let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))>>>0;const k=h%360,r=()=>(h=(h*1103515245+12345)>>>0)%100/100,q=[];
for(let i=0;i<6;i++){const a=i*1.047,d=9+r()*11;q.push([24+Math.cos(a)*d|0,24+Math.sin(a)*d|0])}
return `<svg width="52" height="52" viewBox="0 0 48 48" style="flex:none"><polygon points="${q.join(" ")}" fill="hsl(${k} 80% 60%/.25)" stroke="hsl(${k} 80% 65%)" stroke-width="1.4"/>${q.map(p=>`<line x1="24" y1="24" x2="${p[0]}" y2="${p[1]}" stroke="hsl(${k} 80% 65%/.5)"/>`).join("")}</svg>`}

{const n=+document.body.dataset.step||0;
document.body.insertAdjacentHTML("afterbegin",SPRITE+'<canvas id="bg" aria-hidden="true"></canvas><nav><a class="logo" href="index.html" style="color:inherit;text-decoration:none"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="#7c5cff" stroke-width="1.6"><path d="M13 2l10 6v10l-10 6L3 18V8z"/><path d="M13 2v22M3 8l20 10M23 8L3 18" stroke="#22d3ee" stroke-opacity=".6"/></svg>Ghost Date</a><a class="btn sm ghost" href="path.html">Start</a></nav>'+(n?'<div class="crumbs">'+[1,2,3,4].map(i=>'<i class="'+(i<=n?"on":"")+'"></i>').join("")+'</div>':""))}
pick(S.it);addEventListener("load",()=>window.setPath&&setPath(C[S.it]));
