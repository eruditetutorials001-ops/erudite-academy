/* Erudite Academy · js-app.js · router (draw), click and key handlers, boot */
let lbFrom="";/* where the leaderboard was opened from: "res" = Results screen, so back returns there */
async function boot(){const t0=Date.now();await loadList();pend=qid();let u=null;if(sb){const{data}=await sb.auth.getSession();u=data&&data.session&&data.session.user}
await new Promise(r=>setTimeout(r,Math.max(0,1100-(Date.now()-t0))));
if(EXP&&!u){teacher=false;mode="in";v="auth";draw();fpOpen("⏱ This reset link has expired or was already used. Enter your email to get a new one.")}else if(REC&&u){me=u;v="newpw";draw()}else if(u){me=u;await after(1)}else if(pend){teacher=false;mode="in";v="auth";draw()}else{v="land";draw()}
const h=REC||EXP?location.pathname+location.search:location.href;history.replaceState(null,"",location.pathname+location.search);history.pushState(null,"",h)}
function draw(kp){const fs=["splash","land","welcome","load","lb","res","cor","sbm","sent","intro"].includes(v)||v=="auth",V={splash,land,welcome,msg,admin,load,auth,home,lb,res:rsltView,intro,exam,sbm,sent,cor,maker,newpw,quiz,learn,profile,qa};document.body.classList.toggle("fs",fs);document.body.classList.toggle("ex",v=="exam");document.body.classList.toggle("nw",["exam","lb","res","cor","load","intro"].includes(v));document.body.classList.toggle("sx",v=="sbm"||v=="sent");document.body.classList.toggle("xd",DK);document.body.classList.toggle("ld",v=="land");const tb=TABS.includes(v);if(tb)lt=v;document.body.classList.toggle("tb",tb);$("#app").innerHTML=fs?V[v]():tb?tbar()+V[v]()+tabs():'<div class="bh"><span>ERUDITE</span> ACADEMY</div>'+V[v]()+'<div class="ft">ERUDITE ACADEMY</div>';if(v!="exam")$("#calc").hidden=true;if(v=="cor")corFx();if(!kp)scrollTo(0,0)}
window.addEventListener("online",()=>{svq.splice(0).forEach(f=>f().then(ok=>{if(!ok)svq.push(f)}))});
$("#app").addEventListener("input",e=>{if(!pe||v!="profile")return;if(e.target.id=="psq"){const q=e.target.value.trim().toLowerCase();document.querySelectorAll(".psr").forEach(r=>r.hidden=!!q&&!r.textContent.toLowerCase().includes(q));return}pdirty()});
document.addEventListener("change",async e=>{const f=e.target;if(!f||f.id!="qfile"||!f.files||!f.files[0])return;try{qimg=await pic(f.files[0]);if(!okImg(qimg))throw 0;$("#qprev").innerHTML=`<div class="qpv"><img src="${qimg}" alt=""><button data-a="qimgx" aria-label="Remove photo">✕</button></div>`}catch(_){qimg="";toast("Could not use that picture")}});
function PA(a,b){if(QP(a,b))return 1;
if(a=="share"){const sid=b.dataset.q||lbq,u=location.href.split("#")[0]+"#"+sid,t=(QZ.find(q=>q.id==sid)||{}).t||"a quiz";if(navigator.share)navigator.share({title:"Erudite Academy",text:"Beat my score on "+t+" 🏆",url:u}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(u).then(()=>toast("Link copied"),()=>toast(u));else toast(u);return 1}
if(a=="outc"){if(confirm("Log out of Erudite Academy?"))sb.auth.signOut().then(()=>{me=null;isAdmin=false;teacher=false;mode="in";v="land";draw()});return 1}
if(a=="tab"||a=="out")pe=0;if(a=="pback"){pe=0;draw();return 1}
if(a=="psub"){const x=b.dataset.q,k=PS.indexOf(x);k<0?PS.push(x):PS.splice(k,1);b.classList.toggle("on",k<0);$("#pcnt").textContent=pcn();pdirty();return 1}
if(a=="psave"){psave();return 1}
if(a=="pimg"){pt=b.dataset.q;const f=$("#pimg");f.value="";f.click();return 1}
if(a=="ptg"){const k=b.dataset.q,m=um();if(k=="show_phone"&&!(m.phone||"").trim()){toast("Add a phone number first");peOpen();return 1}const on=!m[k];me.user_metadata={...m,[k]:on};draw(1);if(sb)sb.auth.updateUser({data:{[k]:on}}).catch(()=>{});return 1}
if(a=="pview"){pview();return 1}if(a=="pedit"){peOpen();return 1}return 0}
document.addEventListener("change",async e=>{const f=e.target;if(!f||f.id!="pimg"||!f.files||!f.files[0])return;const w=pt=="cv"?[900,360]:[320,320];try{const u=await sq(f.files[0],w[0],w[1]);localStorage.setItem("ea_"+pt+":"+me.id,u);draw(1);toast(pt=="cv"?"Cover updated":"Photo updated")}catch(_){toast("Could not use that picture")}});
$("#app").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;const a=b.dataset.a,k=+b.dataset.k;if(a!="sub")armed=0;
if(PA(a,b))return;
if(a=="login"){teacher=false;mode="in";v="auth";return draw()}
if(a=="signup"){teacher=false;mode="up";v="auth";return draw()}
if(a=="teacher"){teacher=true;mode="in";v="auth";return draw()}
if(a=="land"){teacher=false;v="land";return draw()}
if(a=="msg"){msgK=b.dataset.k;msgDone=false;v="msg";return draw()}
if(a=="mback"){msgDone=false;v=me?"home":"land";return draw()}
if(a=="send")return send();
if(a=="admin"){if(v=="maker"&&mkDirty){if(!confirm(LV))return;drPut();mkDirty=0}loadAdmin().then(()=>{v="admin";draw()});return}
if(a=="csv")return csv();
if(a=="clr"){if(confirm("Delete all quiz scores of "+b.dataset.n+"? This cannot be undone.")){sb.rpc("admin_clear_results",{uid:b.dataset.u}).then(()=>loadAdmin()).then(draw)}return}
if(a=="auth")return doAuth();
if(a=="unlock")return unlock();
if(a=="qnew"){ED=newED();mkDirty=0;const g=drGet(ED);if(drOk(g)){if(confirm("You have an unsaved quiz draft from "+new Date(g.t).toLocaleString()+".\n\nOK = continue the draft\nCancel = start a new quiz")){ED=g.ED;mkDirty=1}else drDel(ED)}v="maker";return draw()}
if(a=="qedit"){qLoad(b.dataset.q);return}
if(a=="qdel"){if(confirm("Delete this quiz? Students will no longer see it. This cannot be undone.")){sb.from("quizzes").delete().eq("id",b.dataset.q).then(async()=>{delete QC[b.dataset.q];await loadList();await loadAdmin();draw()})}return}
if(a=="sjadd"){sync();if(ED.subs.length<5)ED.subs.push({n:"",m:100,q:40});draw(1);return}
if(a=="sjrm"){sync();const r=+b.dataset.i;if(ED.subs.length>1){ED.subs.splice(r,1);ED.qs.forEach(x=>{x.si=x.si==r?0:x.si>r?x.si-1:x.si})}draw(1);return}
if(a=="tot"){sync();if(b.dataset.q=="e100")ED.subs.forEach(z=>z.m=100);else{const T=+b.dataset.q,n=ED.subs.length,bs=Math.floor(T/n);ED.subs.forEach((z,j)=>z.m=bs+(j<T-bs*n?1:0))}draw(1);return}
if(a=="qadd"){sync();ED.qs.push({...blank(),si:ED.qs.length?ED.qs[ED.qs.length-1].si||0:0});draw(1);const c=document.querySelectorAll("#qq>.card");c[c.length-1].scrollIntoView();return}
if(a=="qrm"){sync();if(ED.qs.length>1)ED.qs.splice(+b.dataset.i,1);draw(1);return}
if(a=="qimg0"){sync();delete ED.qs[+b.dataset.i].img;draw(1);return}
if(a=="csvsample")return cvSample();if(a=="csvpick"){const f=$("#csvf");if(f)f.click();return}if(a=="cvgo")return cvApply(b.dataset.q);if(a=="cvno"){CV=null;sync();draw(1);return}
if(a=="qsave")return qSave();
if(a=="forgot")return fpOpen();
if(a=="show"){const p=$("#pw");p.type=p.type=="password"?"text":"password";b.textContent=p.type=="password"?"SHOW":"HIDE";return}
if(a=="setpw")return setpw();
if(a=="mode"){mode=mode=="in"?"up":"in";return draw()}
if(a=="open")return openQ(b.dataset.q);
if(a=="share"||a=="copy"){share(a,b.dataset.q);return}if(a=="rshare"){rsltShare();return}
if(a=="lb"||a=="lbq"){lbFrom=a=="lb"?(v=="res"?"res":""):(v=="lb"?lbFrom:"");if(a=="lbq")lbq=b.dataset.q;else if(v=="intro"||v=="res")lbq=cur;return goLb(a=="lbq")}if(a=="retake")return openQ(lbq);if(a=="lbsh"){lbsh=!lbsh;if(!lbsh)lbs="";draw(1);if(lbsh)setTimeout(()=>{const e=$("#lbsi");if(e)e.focus()},50);return}if(a=="mypos"){const e=$("#me-pod")||$("#me-row");if(e){e.scrollIntoView({behavior:"smooth",block:"center"});e.classList.add("fl2");setTimeout(()=>e.classList.remove("fl2"),1500)}else toast("You are not on this leaderboard yet");return}
if(a=="tab0"&&v=="lb"&&lbFrom=="res"){lbFrom="";v="res";return draw()}
if(a=="tab"||a=="tab0"){const w=a=="tab0"?lt||"home":b.dataset.q;history.replaceState(null,"",location.pathname+location.search);(w=="home"?loadHist():Promise.resolve()).then(()=>{v=w;draw()});return}
if(a=="qf"){qf=b.dataset.q;draw(1);return}
if(a=="at"){adT=b.dataset.q;draw(1);return}
if(a=="qm"){qmenu(b.dataset.q);return}
if(a=="home"){history.replaceState(null,"",location.pathname+location.search);loadHist().then(()=>{v="home";draw()});return}
if(a=="inst")return instApp();
if(a=="out"){sb.auth.signOut().then(()=>{me=null;isAdmin=false;teacher=false;mode="in";v="land";draw()});return}
if(a=="start")return start();
if(a=="fdone")return fDone();
if(a=="opt"){A[i]=+b.dataset.j;const n=i;draw();if(n<N-1)setTimeout(()=>{if(v=="exam"&&i==n){i++;draw()}},350);return}
if(a=="calc"){$("#calc").hidden=!$("#calc").hidden;return}
if(a=="sub"){cfm=1;jmp=0;draw(1);return}if(a=="fin"){cfm=0;return finish()}if(a=="keep"){cfm=0;draw(1);return}if(a=="lback"){lv=0;draw(1);return}if(a=="forf"){lv=0;return finish()}if(a=="flag"||a=="svq"){const L=a=="flag"?FL:SV,f=L.indexOf(i);f<0?L.push(i):L.splice(f,1);draw(1);return}if(a=="cpy"){const t=Q[i].q.replace(/<[^>]*>/g,"").trim();if(navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast("Question copied"),()=>toast("Could not copy"));return}if(a=="dark"){DK=!DK;try{localStorage.setItem("ea_xd",DK?"1":"0")}catch(_){}draw(1);return}if(a=="cbk"){const f=SV.indexOf(ci);f<0?SV.push(ci):SV.splice(f,1);draw(1);return}if(a=="ccpy"){const t=String(Q[ci].x||"").replace(/<\/?(br|p|div|li)[^>]*>/gi," ").replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();if(t&&navigator.clipboard)navigator.clipboard.writeText(t).then(()=>toast("Explanation copied"),()=>toast("Could not copy"));return}if(a=="cjmp"||a=="cjx"){corJ=a=="cjmp"?1:0;draw(1);return}if(a=="cjgo"){corJ=0;ci=k;draw();return}
if(a=="jmp"||a=="jx"){jmp=a=="jmp"?1:0;draw(1);return}if(a=="jgo"){jmp=0;i=k;draw();return}
if(a=="pal"||a=="sj")i=k;else if(a=="prev")i--;else if(a=="next")i++;else if(a=="cor"){ci=0;corJ=0;v="cor"}else if(a=="res")v="res";else if(a=="cp")ci=k;else if(a=="cprev")ci--;else if(a=="cnext")ci++;
draw()};
$("#app").oninput=e=>{if(e.target.id=="qsr"){qsr=e.target.value;$("#ql").innerHTML=qlist()}else if(e.target.id=="ssr"){stq=e.target.value;$("#sl").innerHTML=slist()}else if(e.target.id=="lbsi"){lbs=e.target.value;const l=$("#lbl");if(l)l.innerHTML=lbBody()}};
$("#app").addEventListener("input",e=>{const f=e.target.dataset&&e.target.dataset.f;if(v=="maker"&&(f=="sm"||f=="sq"))mkUp()});
$("#app").addEventListener("change",e=>{const f=e.target.dataset&&e.target.dataset.f;if(v!="maker")return;if(f=="sn"){const N=[...document.querySelectorAll('#sjr [data-f="sn"]')];document.querySelectorAll('#qq select[data-f="si"]').forEach(s=>[...s.options].forEach((o,j)=>{if(N[j])o.textContent=N[j].value||"Subject "+(j+1)}))}else if(f=="si"){sync();mkUp()}});
$("#app").onchange=async e=>{const f=e.target;if(f.dataset.k=="img"&&f.files[0]){try{const u=await pic(f.files[0]);sync();ED.qs[+f.dataset.i].img=u;draw(1);mkDirty=1;drPut()}catch(_){toast("Could not read that picture.")}}};
$("#app").onkeydown=e=>{if(e.key=="Enter"&&v=="auth"&&e.target.closest(".gate,.su"))doAuth()};
$("#calc").innerHTML=`<div class="cbox"><div class="cbh"><b>Calculator</b><button class="cx" aria-label="Close">✕</button></div><div id="cd">0</div><div class="ks">${KK.map(([k,c])=>`<button class="${c||""}">${k}</button>`).join("")}</div></div>`;
$("#calc").onclick=e=>{const b=e.target.closest("button");if(e.target.id=="calc"||(b&&b.classList.contains("cx"))){$("#calc").hidden=true;return}if(!b)return;const k=b.textContent;
if(k=="AC")ex="";else if(k=="⌫")ex=ex.slice(0,-1);
else if(k=="="){try{const r=ev(ex.replace(/×/g,"*").replace(/%/g,"/100").replace(/÷/g,"/").replace(/−/g,"-"));ex=isFinite(r)?String(+r.toPrecision(10)):"Error"}catch(_){ex="Error"}}
else{if(ex=="Error")ex="";ex+=k}
$("#cd").textContent=ex||"0"};
window.addEventListener("hashchange",()=>{const id=qid();if(id&&me&&(v=="home"||v=="intro"))openQ(id)});
const act=a=>$("#app").onclick({target:{closest:()=>({dataset:{a}})}}),keep=()=>history.pushState(null,"",location.href);
window.addEventListener("popstate",()=>{const fp=$("#fp");if(fp){fp.remove();return keep()}const x={auth:"land",msg:"mback",intro:"tab0",res:"tab0",cor:"res",lb:lbFrom=="res"?"res":"tab0",admin:"tab0",maker:"admin",quiz:"home",learn:"home",profile:"home"};
if(v=="exam"){if(!confirm("Leave the exam? Your answers will be lost."))return keep();clearInterval(tmr);keep();return act("home")}
if(v=="cor"&&corJ){corJ=0;keep();return draw(1)}
if(x[v]){if(v=="maker"&&mkDirty){if(!confirm(LV))return keep();drPut();mkDirty=0}keep();return act(x[v])}
if(v=="home"||v=="land")return history.back();
keep()});
$("#app").addEventListener("input",mkMark);
$("#app").addEventListener("change",mkMark);
$("#app").addEventListener("change",async e=>{const f=e.target;if(!f||f.id!="csvf"||!f.files||!f.files[0])return;const fl=f.files[0],E0={ok:[],bad:[],warn:[],subs:[]};sync();
if(fl.size>3e6)CV={...E0,err:"That file is too big (3 MB at most)."};
else try{const buf=await fl.arrayBuffer();let txt,ansi=false;try{txt=new TextDecoder("utf-8",{fatal:true}).decode(buf)}catch(_){txt=new TextDecoder("windows-1252").decode(buf);ansi=true}CV=cvBuild(txt,fl.name,ansi)}catch(_){CV={...E0,err:"Could not read that file."}}
draw(1);const bx=$("#cvbox");if(bx)bx.scrollIntoView()});
$("#app").addEventListener("click",e=>{const b=e.target.closest("button");if(v=="maker"&&b&&["qadd","qrm","qimg0","sjadd","sjrm","tot"].includes(b.dataset.a)){mkDirty=1;setTimeout(drPut,60)}});
document.addEventListener("visibilitychange",()=>{if(document.hidden)drPut();else tick()});
window.addEventListener("pagehide",drPut);
window.addEventListener("beforeunload",e=>{if(v=="maker"&&mkDirty){drPut();e.preventDefault();e.returnValue=""}});
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();dip=e});
window.addEventListener("appinstalled",()=>{dip=null;if(v=="profile")draw(1)});
if("serviceWorker" in navigator&&/^https?:/.test(location.protocol))window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
draw();
boot();
document.addEventListener("visibilitychange",()=>{if(v!="exam")return;if(document.hidden){aw=1;return}if(!aw)return;aw=0;if(WN){finish();toast("Exam submitted: you left the screen again")}else{WN=1;lv=1;cfm=0;jmp=0;draw(1)}});
