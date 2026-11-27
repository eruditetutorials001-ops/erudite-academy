/* Erudite Academy · js-results.js · saving the score, attempt history and the Results screen */
async function loadHist(){try{const{data}=await sb.from("results").select("quiz,score,total,points,created_at").order("created_at",{ascending:false}).limit(5);hist=(data||[]).filter(r=>!held((QZ.find(q=>q.id==r.quiz)||{}).hold))}catch(_){hist=[]}}
let svst=0,svid=0;
const svq=[],svh=()=>svst==1?'<span class="sv1">Saving your score…</span>':svst==2?'<span class="sv2">✓ Score saved</span>':'',svshow=()=>{const e=$("#sv");if(e)e.innerHTML=svh()};
async function save(){if(!sb||!me)return;const id=++svid,s=A.filter((a,k)=>a===Q[k].a).length,row={quiz:cur,score:s,total:N,points:Math.round(ptsOf())},secs=TL-left,one=async()=>{try{let r=await sb.from("results").insert({...row,seconds:secs});if(r.error)r=await sb.from("results").insert(row);return!r.error}catch(_){return false}},done=()=>{if(id==svid){svst=2;svshow();if(v=="lb"&&FIN&&!FIN.synced)refLb()}};svst=1;svshow();for(const d of[0,1500,4000,9000]){if(d)await new Promise(r=>setTimeout(r,d));if(await one())return done()}if(id==svid){svst=0;svshow()}svq.push(()=>one().then(ok=>{if(ok)done();return ok}))}

/* ---- Results screen (v=="res"): shown right after submitting, before the leaderboard ---- */
function rsltOrd(n){const m=n%100,t=n%10;return n+(m>10&&m<14?"th":t==1?"st":t==2?"nd":t==3?"rd":"th")}
/* attempt number of the exam just finished: same counting as the My Attempts row on the leaderboard */
function rsltAtt(){const L=att.map(x=>({pt:+x.points||0,sec:x.seconds==null?null:+x.seconds,at:x.created_at}));if(FIN&&FIN.q==lbq&&!FIN.synced&&!L.some(x=>x.pt==FIN.pt&&x.sec==FIN.sec&&Math.abs(new Date(x.at)-FIN.at)<864e5))L.push(0);return Math.max(1,L.length)}
function rsltShare(){const z=QZ.find(q=>q.id==cur)||{},c=A.filter((a,k)=>Q[k]&&a===Q[k].a).length,p=N?Math.round(c/N*100):0,u=location.href.split("#")[0]+"#"+cur,x="I scored "+c+"/"+N+" ("+p+"%) on "+(z.t||"a quiz")+" on Erudite Academy 🏆 Can you beat me?";
if(navigator.share)navigator.share({title:"Erudite Academy",text:x,url:u}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(x+" "+u).then(()=>toast("Result copied"),()=>toast(u));else toast(u)}
function rsltView(){
const z=QZ.find(q=>q.id==cur)||{},c=A.filter((a,k)=>Q[k]&&a===Q[k].a).length,s=A.filter(a=>a===null).length,w=Math.max(0,N-c-s),p=N?Math.round(c/N*100):0,
b=p>=70?["Great Job","g","#5fe0a4"]:p>=40?["Keep Going","a","#ffcb6b"]:["Needs Work","r","#ff8f8f"],
R=46,C=2*Math.PI*R,t=FIN&&FIN.sec!=null?mT(FIN.sec):"",ic=(d,n)=>XI(d,n||24),
st=(n,l,k)=>`<div class="rsx-st"><b>${n}</b><i class="${k}"></i><span>${l}</span></div>`,
sun=ic('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',20),
moon=ic('<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',20);
return `<div class="rsx"><div class="rsx-top"><button class="rsx-back" data-a="home">← Back to My Academy</button><h1>Results</h1><button class="rsx-th" data-a="dark" aria-label="Switch theme">${DK?moon:sun}</button></div>
<div class="rsx-hero"><div class="rsx-ring"><svg viewBox="0 0 106 106" aria-hidden="true"><circle class="t" cx="53" cy="53" r="${R}"/><circle class="a" cx="53" cy="53" r="${R}" stroke="${b[2]}" stroke-dasharray="${(C*p/100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 53 53)"/></svg><b>${p}%</b></div>
<div class="rsx-inf"><b class="rsx-sc">${c}/${N}</b><span class="rsx-sl">questions correct</span><div class="rsx-ch m">${esc(kindWord(z).toUpperCase())} MODE</div><div class="rsx-ch"><i class="${b[1]}"></i>${b[0]}</div><div class="rsx-r2"><div class="rsx-ch">${rsltOrd(rsltAtt())} Attempt</div>${t?`<div class="rsx-ch">${ic('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',15)}${t}</div>`:""}</div></div></div>
<div class="rsx-stats">${st(c,"Correct","g")}${st(w,"Wrong","r")}${st(s,"Skipped","a")}</div>
<div class="rsx-sv" id="sv">${svh()}</div>
<div class="rsx-bot"><div class="rsx-acts"><button data-a="lb">${ic('<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 5H5v1a3 3 0 0 0 3 3M16 5h3v1a3 3 0 0 1-3 3M12 13v4M9 20h6M10 17h4"/>')}<span>Leaderboard</span></button><button class="ok" data-a="cor">${ic('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.2l2.4 2.4 4.6-5"/>')}<span>Corrections</span></button></div>
<button class="rsx-retry" data-a="start">Retry Same Mode</button><div class="rsx-r3"><button data-a="rshare">Share My Result</button></div></div></div>`}
