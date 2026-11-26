/* Erudite Academy · js-follow-gate.js · follow-the-channel gate */
let fgT=0,fgL=0,fgW=0;
const fKey=()=>"ea_fol:"+(me&&me.id||"x"),
fMark=()=>{try{localStorage.setItem(fKey(),"1");localStorage.removeItem(fKey()+"p")}catch(_){}},
fol=()=>{if(isAdmin||!WA)return true;try{if(localStorage.getItem(fKey())=="1")return true;const p=+localStorage.getItem(fKey()+"p")||0;if(p&&!fgT&&Date.now()-p>=4000){fMark();fSave();return true}}catch(_){}return !!(me&&me.user_metadata&&me.user_metadata.followed)},
WAI='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4z"/><path d="M9 9.5c.3 2.2 2.3 4.2 4.6 4.8l1.3-1.3-2-1-.9.8c-.9-.4-1.7-1.2-2.1-2.1l.8-.9-1-2z"/></svg>',
fgate=()=>`<div class="fg"><h2>Follow our channel to unlock</h2><p class="fgs">It takes less than 10 seconds.</p><ol>${[["Tap “Follow the Channel”","Open the channel with the green button below."],["Follow in WhatsApp","Complete the follow action there."],["Come back here","Return to this Erudite Academy tab."],["Start your assessment","Start "+kindWord(QZ.find(q=>q.id==cur))+" appears here automatically."]].map((x,k)=>`<li><i>${k+1}</i><div><b>${x[0]}</b><span>${x[1]}</span></div></li>`).join("")}</ol><a class="fgb" id="fga" href="${WA}" target="_blank" rel="noopener">${WAI}Follow the Channel</a><button class="fgm" id="fgm" data-a="fdone" ${fgW?"":"hidden"}>I’ve followed. Unlock now</button></div>`;
async function fSave(){try{if(!sb)return;const r=await sb.auth.updateUser({data:{followed:1}});if(r&&r.data&&r.data.user)me=r.data.user}catch(_){}}
function fGrant(){fMark();fSave();fgT=0;fgL=0;fgW=0;toast("Unlocked ✓ You can start now");if(v=="intro")draw(1)}
function fTap(){fgT=Date.now();fgL=0;fgW=1;try{localStorage.setItem(fKey()+"p",String(fgT))}catch(_){}const m=document.getElementById("fgm");if(m)m.hidden=false}
function fDone(){if(!fgT||Date.now()-fgT<4000)return toast("Open the channel first, then come back");fGrant()}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("#fga"))fTap()});
document.addEventListener("visibilitychange",()=>{if(!fgT)return;if(document.hidden){fgL=1;return}if(fgL&&Date.now()-fgT>=4000)fGrant()});
