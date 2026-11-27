/* Erudite Academy · js-corrections.js · Review & Corrections screen (Newton look); classes start with rcs- */
let corJ=0;/* 1 = "jump to question" sheet is open */
const corIc=(d,n)=>XI(d,n||16),CK='<path d="M5 12.5l4.5 4.5L19 7"/>',CX='<path d="M6 6l12 12M18 6L6 18"/>',CD='<path d="M6 12h12"/>',
CBK='<path d="M7 3h10a1 1 0 0 1 1 1v17l-6-4-6 4V4a1 1 0 0 1 1-1z"/>',
CCP='<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
CBU='<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
CGR='<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
CBO='<path d="M5 4h14v16H5zM9 4v16M12 9h4"/>';
/* status of question k: g = correct, r = wrong, s = skipped */
const corSt=k=>A[k]===null||A[k]===undefined?"s":A[k]===Q[k].a?"g":"r";
/* keep the current dot in view when there are many questions */
function corFx(){const d=document.querySelector(".rcs-dots"),c=d&&d.querySelector(".cur");if(d&&c)d.scrollLeft=Math.max(0,c.offsetLeft-(d.clientWidth-c.offsetWidth)/2)}
function corSheet(n){return `<button class="rcs-jb" data-a="cjx" aria-label="Close"></button><div class="rcs-js"><div class="rcs-jh"><b>Jump to question</b><small>${n.g} correct · ${n.r} wrong · ${n.s} skipped</small></div><div class="rcs-jg">${Q.map((q,k)=>`<button data-a="cjgo" data-k="${k}" class="${corSt(k)}${k==ci?" cur":""}">${k+1}</button>`).join("")}</div><button class="rcs-xb" data-a="cjx">Close</button></div>`}
function cor(){const x=Q[ci];
if(!x)return `<div class="rcs"><div class="rcs-top"><button class="rcs-ic" data-a="res" aria-label="Close">${corIc(CX,20)}</button></div></div>`;
const t=corSt(ci),n={g:0,r:0,s:0};Q.forEach((q,k)=>n[corSt(k)]++);
const M=rsltMk(),sv=SV.includes(ci),ex=x.x==null?"":String(x.x).trim(),
sj=QD.subs&&QD.subs.length>1?(x.s||"Quiz"):((QZ.find(q=>q.id==cur)||{}).s||"Quiz").split(" · ")[0],
st={g:["g",CK,"You got this right"],r:["r",CX,"You got this wrong"],s:["s",CD,"You skipped this"]}[t],
opt=(o,j)=>{const ok=j==x.a,my=A[ci]===j,lb=ok?(my?"Correct answer · Your answer":"Correct answer"):my?"Your answer":"";return `<div class="rcs-o${ok?" ok":my?" bad":""}"><span class="rcs-l">${"ABCDE"[j]}</span><span><b>${o}</b>${lb?`<small>${lb}</small>`:""}</span>${ok?`<span class="rcs-ci">${corIc(CK,22)}</span>`:my?`<span class="rcs-ci">${corIc(CX,22)}</span>`:""}</div>`};
return `<div class="rcs"><div class="rcs-top"><button class="rcs-ic" data-a="res" aria-label="Back to results">${corIc(CX,22)}</button><div class="rcs-ttl">${corIc(CBO,18)}<span>Review &amp; Corrections</span></div><button class="rcs-ic${sv?" on":""}" data-a="cbk" aria-label="Bookmark this question">${corIc(CBK,20)}</button></div>
<div class="rcs-cs"><span class="rcs-c g">${corIc(CK,14)}${n.g} Correct</span><span class="rcs-c r">${corIc(CX,14)}${n.r} Wrong</span><span class="rcs-c s">${corIc(CD,14)}${n.s} Skipped</span><b class="rcs-pc">${M.p}%</b></div>
<div class="rcs-qr"><span>Question <b>${ci+1}</b> of ${N}</span><span class="rcs-st ${st[0]}">${corIc(st[1],14)}${st[2]}</span></div>
<div class="rcs-dots">${Q.map((q,k)=>`<button data-a="cp" data-k="${k}" class="${corSt(k)}${k==ci?" cur":""}" aria-label="Question ${k+1}"></button>`).join("")}</div>
<div class="rcs-sj">${esc(sj)}</div><p class="rcs-q">${x.q}</p>${x.d?`<div class="dg">${x.d}</div>`:x.img?`<div class="dg"><img src="${x.img}" alt="" style="max-width:100%;height:auto"></div>`:""}
<div class="rcs-os">${x.o.map(opt).join("")}</div>
${ex?`<div class="rcs-ex"><div class="rcs-eh">${corIc(CBU,22)}<b>EXPLANATION</b><button class="rcs-cp" data-a="ccpy" aria-label="Copy explanation">${corIc(CCP,20)}</button></div><div class="rcs-et">${ex}</div></div>`:""}
</div><div class="rcs-bar"><div class="rcs-bi"><button class="rcs-pv" data-a="cprev" ${ci?"":"disabled"}>${corIc('<path d="M15 18l-6-6 6-6"/>',20)}Prev</button><button class="rcs-jm" data-a="cjmp">${corIc(CGR,22)}<span><b>${ci+1} / ${N}</b><small>Tap to jump</small></span></button>${ci<N-1?`<button class="rcs-nx" data-a="cnext">Next${corIc('<path d="M9 18l6-6-6-6"/>',20)}</button>`:`<button class="rcs-nx dn" data-a="res">Done${corIc(CK,18)}</button>`}</div></div>${corJ?corSheet(n):""}`}
