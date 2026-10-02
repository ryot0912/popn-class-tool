(async()=>{
const t=20,e=40,n=150,a="/game/popn/popn29/playdata/mu_top.html",r=1e5,
o={none:0,fail:0,clear:10,fc:14,perfect:17},
p=(t,e,n)=>n<5e4?0:Math.floor(8*t*(1250*(3*t+e-40)+n)/3105),
i=.006,
l={L:"light",N:"normal",H:"hyper",E:"ex"},
c=t=>new Promise(e=>setTimeout(e,t)),
s=t=>(t||"").split("/").pop().replace(/\.png.*$/,""),
d=t=>t?new URL(t,location.href).href:"",
g={s_plus:"S+",s:"S",a3:"AAA",a2_plus:"AA+",a2:"AA",a1_plus:"A+",a1:"A",b_plus:"B+",b:"B",c:"C",d:"D",e:"E",none:"-"},
f={e:1,d:2,c:3,b:4,b_plus:5,a1:6,a1_plus:7,a2:8,a2_plus:9,a3:10,s:11,s_plus:12},
u={a:"パーフェクト ☆",b:"フルコンボ ☆",c:"フルコンボ ◇",d:"フルコンボ ○",e:"クリア ★",f:"クリア ◆",g:"クリア ●",h:"失敗 ★",i:"失敗 ◆",j:"失敗 ●",k:"イージークリア",l:"オレンジ",none:"-"},
us={a:"パーフェクト",b:"FC ☆",c:"FC ◇",d:"FC ○",e:"クリア ★",f:"クリア ◆",g:"クリア ●",h:"失敗 ★",i:"失敗 ◆",j:"失敗 ●",k:"イージー",l:"オレンジ"},
h={j:1,i:2,h:3,k:4,l:5,g:6,f:7,e:8,d:9,c:10,b:11,a:12},
x=["失敗","イージークリア","クリア","フルコンボ","パーフェクト"],
b=[0,10,10,14,17],
m=t=>(t||"").replace("rank_",""),
v=t=>(t||"").replace("meda_",""),
y=t=>{const e={h:0,i:0,j:0,k:1,l:1,g:2,f:2,e:2,d:3,c:3,b:3,a:4}[t];return void 0===e?-1:e},
w=async t=>{const e=await t.arrayBuffer(),n=t.headers.get("Content-Type")||"";return new TextDecoder(/UTF-8/i.test(n)?"utf-8":"shift_jis").decode(e)},
k=async t=>{const e=await fetch(t,{credentials:"same-origin"});if(!e.ok)throw new Error("HTTP "+e.status);return(new DOMParser).parseFromString(await w(e),"text/html")},
C=t=>String(t).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[t])),
S=(t,e,n,a)=>{const r=document.createElement(t);return e&&e.appendChild(r),null!=n&&""!==n&&(r.textContent=n),a&&(r.className=a),r},
E={get(t){try{return localStorage.getItem(t)}catch(t){return null}},set(t,e){try{localStorage.setItem(t,e)}catch(t){}}},
L=t=>{try{return new URL(t,location.href).searchParams.get("no")||""}catch(t){return""}},
A="--bg:#12112a;--panel:#1d1c38;--ink:#f3f2ff;--sub:#cdcae8;--line:#3d3a68;--accent:#ff7aa8;--accent-soft:#4d2243;--on-accent:#1b1033;--c-new:#ff7aa8;--c-old:#4fd0e3;\n--c-perfect:#ffd04d;--c-fc:#ff7aa8;--c-clear:#4fd0e3;--c-easy:#6fd88a;--c-fail:#8581b3;--track:#33305c;--hover:#2b2956;--top:#4a4016;--input:#15142b;color-scheme:dark;",
F=`
:host{all:initial}
#pp-root{--bg:#f4f3fa;--panel:#fff;--ink:#1f1d3a;--sub:#6a6786;--line:#e4e2ef;--accent:#e8337a;--accent-soft:#ffe6f0;--on-accent:#fff;--c-new:#e8337a;--c-old:#139fb3;
--c-perfect:#f5b800;--c-fc:#e8337a;--c-clear:#139fb3;--c-easy:#4caf62;--c-fail:#a6a3bd;--track:#ebeaf4;--hover:#f0eef9;--top:#fff3c2;--input:#fff;color-scheme:light;position:fixed;inset:0;z-index:99999;overflow:auto;background:var(--bg);color:var(--ink);
font:14px/1.55 "Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic UI","Yu Gothic",Meiryo,system-ui,sans-serif;-webkit-text-size-adjust:100%}
#pp-root[data-theme=dark]{${A}}
@media (prefers-color-scheme:dark){#pp-root[data-theme=auto]{${A}}}
#pp-root *{box-sizing:border-box}
#pp-root button,#pp-root select,#pp-root input{font:inherit;color:inherit}
#pp-root :focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.pp-wrap{max-width:1180px;margin:0 auto;padding:20px 16px 48px;display:grid;gap:14px}
.pp-panel{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:16px 18px}
.pp-btn{border:1px solid var(--line);background:var(--panel);border-radius:999px;padding:6px 14px;cursor:pointer}
.pp-btn:hover:not(:disabled){background:var(--hover);border-color:var(--accent)}
.pp-btn:disabled{opacity:.6;cursor:default}
.pp-btn.pri{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.pp-load{min-height:100vh;display:grid;place-content:center;gap:14px;text-align:center}
.pp-load b{font-size:44px;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.pp-prog{width:min(420px,80vw);height:10px;border-radius:999px;background:var(--track);overflow:hidden;margin:0 auto}
.pp-prog i{display:block;height:100%;width:0;background:var(--accent);border-radius:inherit}
.pp-head{display:grid;grid-template-columns:auto 1fr;gap:10px 28px;align-items:end}
.pp-class small{display:block;color:var(--sub)}
.pp-who{display:flex;gap:6px 12px;flex-wrap:wrap;align-items:baseline;margin-bottom:6px;font-size:13px;color:var(--sub)}
.pp-who b{color:var(--ink);font-size:16px}
.pp-id{cursor:pointer;font-variant-numeric:tabular-nums}
.pp-id.blur{filter:blur(5px)}
.pp-class strong{display:block;font-size:clamp(30px,5vw,44px);line-height:1.1;letter-spacing:-.04em;font-variant-numeric:tabular-nums;color:var(--accent)}
.pp-split{display:flex;gap:16px;flex-wrap:wrap;margin-top:6px;color:var(--sub);font-size:13px;font-variant-numeric:tabular-nums}
.pp-split span::before{content:"";display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;background:var(--c)}
.pp-spark{display:flex;align-items:flex-end;gap:2px;height:56px;min-width:0}
.pp-spark i{flex:1;min-width:2px;border-radius:3px 3px 0 0;background:var(--c)}
.pp-acc{grid-column:1/-1;display:flex;gap:10px;flex-wrap:wrap;align-items:center;padding:10px 12px;border-radius:10px;background:var(--hover);font-size:13px}
.pp-acc span{color:var(--sub)}
.pp-warn{grid-column:1/-1;background:var(--accent-soft);border:1px solid var(--accent);border-radius:10px;padding:8px 12px;font-size:13px}
.pp-note{grid-column:1/-1;color:var(--sub);font-size:12px;display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end;align-items:center}
.pp-actions{display:flex;gap:8px;flex-wrap:wrap}
.pp-lvhead{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px}
.pp-legend{display:flex;gap:12px;flex-wrap:wrap;color:var(--sub);font-size:12px}
.pp-legend span::before{content:"";display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:5px;background:var(--c);vertical-align:-1px}
.pp-lvs{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:6px 18px}
.pp-lv{display:grid;grid-template-columns:48px 1fr auto;align-items:center;gap:10px;padding:6px 10px;border-radius:10px;border:1px solid transparent;background:none;cursor:pointer;text-align:left}
.pp-lv:hover{background:var(--hover)}
.pp-lv.on{background:var(--accent-soft);border-color:var(--accent)}
.pp-lv b{font-variant-numeric:tabular-nums}
.pp-bar{display:flex;height:12px;border-radius:999px;overflow:hidden;background:var(--track)}
.pp-bar i{display:block;height:100%;background:var(--c)}
.pp-lv em{font-style:normal;color:var(--sub);font-size:12px;font-variant-numeric:tabular-nums;white-space:nowrap}
.pp-tool{position:sticky;top:0;z-index:5;display:flex;gap:8px;flex-wrap:wrap;align-items:center;padding:10px 12px;background:var(--panel);border:1px solid var(--line);border-radius:14px}
.pp-tool label{display:flex;align-items:center;gap:6px;color:var(--sub);font-size:12px}
.pp-tool select,.pp-tool input[type=search]{border:1px solid var(--line);background:var(--input);border-radius:8px;padding:5px 8px;color:var(--ink)}
.pp-tool input[type=search]{flex:1;min-width:140px}
.pp-chip{border:1px solid var(--line);background:none;border-radius:999px;padding:4px 12px;cursor:pointer}
.pp-chip[aria-pressed=true]{background:var(--accent);border-color:var(--accent);color:var(--on-accent)}
.pp-info{color:var(--sub);font-size:12px;margin-left:auto}
.pp-tablewrap{overflow-x:auto;border:1px solid var(--line);border-radius:14px;background:var(--panel)}
.pp-table{width:100%;border-collapse:collapse;min-width:620px}
.pp-table th{background:var(--panel);text-align:left;font-weight:600;font-size:12px;color:var(--sub);padding:9px 12px;border-bottom:1px solid var(--line);white-space:nowrap;user-select:none}
.pp-table th[data-k]{cursor:pointer}
.pp-table th[data-k]:hover{color:var(--ink)}
.pp-table th.asc::after{content:" ▲";color:var(--accent)}
.pp-table th.desc::after{content:" ▼";color:var(--accent)}
.pp-table th.asc2::after{content:" ▲2";color:var(--sub);font-size:11px}
.pp-table th.desc2::after{content:" ▼2";color:var(--sub);font-size:11px}
.pp-table td{padding:7px 12px;border-bottom:1px solid var(--line);vertical-align:middle}
.pp-table tbody tr:hover td{background:var(--hover)}
.pp-table.hl tr.top td{background:var(--top)}
.pp-table.hl tr.top td:first-child{box-shadow:inset 4px 0 0 var(--c-perfect)}
.pp-table td.n{text-align:right;font-variant-numeric:tabular-nums}
.pp-title{font-weight:600}
.pp-new{display:inline-block;margin-left:6px;padding:0 6px;border-radius:999px;background:var(--accent);color:var(--on-accent);font-size:10px;font-weight:600;line-height:16px;vertical-align:1px}
.pp-genre{display:block;color:var(--sub);font-size:12px;font-weight:400}
.pp-ic{display:inline-flex;align-items:center;gap:6px;white-space:nowrap}
.pp-ic img{height:24px;width:auto}
.pp-ic small{color:var(--ink);font-size:13px}
.pp-cp{display:inline-grid;grid-template-columns:48px 80px;align-items:center;gap:8px}
.pp-cp i{display:block;height:6px;border-radius:999px;background:var(--track);overflow:hidden}
.pp-cp i b{display:block;height:100%;background:var(--accent)}
.pp-more{padding:12px;text-align:center}
.pp-empty{padding:40px 12px;text-align:center;color:var(--sub)}
.pp-vbar{display:flex;gap:8px}
.pp-cards{display:grid;gap:12px}
.pp-ch{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap;margin-top:4px}
.pp-ch span{color:var(--sub);font-size:12px;font-variant-numeric:tabular-nums}
.pp-cg{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:10px}
.pp-card{position:relative;background:var(--panel);border:1px solid var(--line);border-left:4px solid var(--c);border-radius:12px;padding:10px 12px;display:grid;gap:4px;min-width:0;align-content:start}
.pp-card .no{position:absolute;top:8px;right:10px;color:var(--sub);font-size:11px;font-variant-numeric:tabular-nums}
.pp-card .t{font-weight:600;line-height:1.35;padding-right:26px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.pp-card .g{color:var(--sub);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pp-card .m{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:4px}
.pp-card .s{font-variant-numeric:tabular-nums;font-size:13px}
.pp-card .p{display:flex;justify-content:space-between;align-items:baseline;margin-top:2px}
.pp-card .p b{font-size:20px;color:var(--c);font-variant-numeric:tabular-nums}
.pp-card .p small{color:var(--sub);font-size:11px}
.pp-diff{display:inline-block;padding:0 7px;border-radius:999px;font-size:11px;font-weight:700;line-height:18px;color:#fff;background:var(--dc)}
.pp-mdt th,.pp-mdt td{text-align:center;padding:7px 8px}
.pp-mdt th:first-child,.pp-mdt td:first-child{text-align:left;font-weight:600}
.pp-mdt th{white-space:normal;line-height:1.3;padding:7px 4px}
.pp-mdt th img{height:24px;width:auto;display:block;margin:0 auto}
.pp-mdt td{font-variant-numeric:tabular-nums}
.pp-mdt td.z{opacity:.35}
.pp-mdt td.c{cursor:pointer}
.pp-mdt td.c:hover{background:var(--hover)}
.pp-mdt td.sel,.pp-mdt tbody tr:hover td.sel{background:var(--accent-soft);box-shadow:inset 0 0 0 2px var(--accent)}
#pp-root[data-theme=site]{--bg:#ffeeb0;--panel:#fffdec;--ink:#333;--sub:#5d5a8e;--line:#6561b8;--accent:#f86d72;--accent-soft:#ffe1e2;--on-accent:#fff;--c-new:#f86d72;--c-old:#2f8fd8;--c-perfect:#f5a800;--c-fc:#f86d72;--c-clear:#2f8fd8;--c-easy:#3fae5a;--c-fail:#a9a6cf;--track:#e8e2c4;--hover:#fff0b3;--top:#ffe58a;--input:#fff;color-scheme:light;background:var(--bg) url("https://eacache.s.konaminet.jp/game/popn/popn29/images/p/common/bg_top2.jpg") top center repeat;font-family:"メイリオ",Meiryo,"ヒラギノ角ゴ ProN W3","Hiragino Kaku Gothic ProN",sans-serif}
#pp-root[data-theme=site] .pp-wrap::before{content:"pop'n music High☆Cheers!!  曲データ集計";display:block;padding:14px 20px;font-size:18px;font-weight:700;color:#1f2858;background:linear-gradient(180deg,#ffd552 50%,#ffa6a8 51%);border:4px solid #6561b8;border-radius:0 20px 0 20px;box-shadow:0 6px #adcae4}
#pp-root[data-theme=site] .pp-panel{border:4px solid #6561b8;outline:4px solid #f86d72;outline-offset:-8px;border-radius:0 20px 0 20px;box-shadow:0 6px #adcae4;padding:22px 24px}
#pp-root[data-theme=site] .pp-lvhead{padding:8px 14px;border-radius:0 12px 0 12px;background:linear-gradient(180deg,#ffd552 50%,#ffa6a8 51%);color:#1f2858}
#pp-root[data-theme=site] .pp-lvhead b,#pp-root[data-theme=site] .pp-legend{color:#1f2858}
#pp-root[data-theme=site] .pp-class strong{text-shadow:2px 2px 0 #fff}
#pp-root[data-theme=site] .pp-btn{background:#d8f1f6;border:2px solid #44c0dd;border-radius:5px;color:#044960;font-weight:700;padding:4px 14px}
#pp-root[data-theme=site] .pp-btn:hover:not(:disabled){background:#89d0e3;border-color:#2b8195;color:#fff}
#pp-root[data-theme=site] .pp-btn.pri{background:#f86d72;border-color:#c6454b;color:#fff}
#pp-root[data-theme=site] .pp-btn.pri:hover:not(:disabled){background:#e45a60;border-color:#a8343a}
#pp-root[data-theme=site] .pp-chip{background:#fff;border:2px solid #6561b8;color:#1f2858;font-weight:700}
#pp-root[data-theme=site] .pp-chip[aria-pressed=true]{background:#f86d72;border-color:#c6454b;color:#fff}
#pp-root[data-theme=site] .pp-tool{border:3px solid #6561b8;border-radius:0 16px 0 16px;box-shadow:0 4px #adcae4;background:#fffdec}
#pp-root[data-theme=site] .pp-tool select,#pp-root[data-theme=site] .pp-tool input[type=search]{border:1px solid #000;outline:2px solid #ffd85c;outline-offset:-3px;border-radius:25px;padding:4px 12px;background:#fff;color:#333}
#pp-root[data-theme=site] .pp-tool select:focus-visible,#pp-root[data-theme=site] .pp-tool input[type=search]:focus-visible{outline-color:#f86d72}
#pp-root[data-theme=site] .pp-lv{border-radius:0 10px 0 10px}
#pp-root[data-theme=site] .pp-lv.on{background:#ffe1e2;border-color:#f86d72}
#pp-root[data-theme=site] .pp-wrap>.pp-tablewrap{border:4px solid #6561b8;border-radius:0 20px 0 20px;box-shadow:0 6px #adcae4}
#pp-root[data-theme=site] .pp-table th{background:#ffe58a;color:#1f2858;border-bottom:2px solid #6561b8}
#pp-root[data-theme=site] .pp-card{border:2px solid #6561b8;border-left:5px solid var(--c);border-radius:0 12px 0 12px}
#pp-root[data-theme=sdvx]{--bg:#000;--panel:#eaf2e5;--ink:#1c2d2a;--sub:#4b6b47;--line:#a7d782;--accent:#118e2e;--accent-soft:#daf3c1;--on-accent:#fff;--c-new:#ed1e79;--c-old:#0b8aa0;--c-perfect:#f0a800;--c-fc:#ed1e79;--c-clear:#118e2e;--c-easy:#8ad004;--c-fail:#9db596;--track:#cfe3c4;--hover:#daf3c1;--top:#ffffb1;--input:#daf3c1;color-scheme:light;background:#000 url("https://eacache.s.konaminet.jp/game/sdvx/vii/images/common/bg.jpg") top center/cover no-repeat fixed;font-family:"Noto Sans JP","メイリオ",Meiryo,"Hiragino Kaku Gothic ProN",sans-serif}
#pp-root[data-theme=sdvx] .pp-load{color:#fff}
#pp-root[data-theme=sdvx] .pp-load div{color:#c6fe87!important}
#pp-root[data-theme=sdvx] .pp-wrap{gap:56px;padding:48px 44px 72px}
#pp-root[data-theme=sdvx] .pp-wrap::before{content:"pop'n music  曲データ集計";display:flex;align-items:center;height:60px;padding:0 50px 0 56px;font-size:26px;font-weight:700;color:#fff;background:linear-gradient(#ffffb1,#ffffb1) 24px 50%/8px 26px no-repeat,linear-gradient(#334d00 1px,transparent 1px) 0 0/100% 5px,#000;border:2px solid #88c429;border-radius:40px;text-shadow:1px 1px 0 #3a5607,-1px -1px 0 #3a5607,-1px 1px 0 #3a5607,1px -1px 0 #3a5607,0 0 3px #3a5607}
#pp-root[data-theme=sdvx] .pp-panel{background:#eaf2e5;border:0;border-radius:6px;padding:24px 28px;box-shadow:0 0 0 20px rgba(0,0,0,.72),0 0 0 23px #118e2e}
#pp-root[data-theme=sdvx] .pp-lvhead{padding:10px 14px;margin-bottom:16px;color:#1c2d2a;font-weight:700;background-color:#b4dc87;background-image:linear-gradient(#a7d782 1px,transparent 1px),linear-gradient(90deg,#a7d782 1px,transparent 1px);background-size:10px 10px;background-position:-5px -5px;border:1px solid #72a400}
#pp-root[data-theme=sdvx] .pp-lvhead b,#pp-root[data-theme=sdvx] .pp-legend{color:#1c2d2a}
#pp-root[data-theme=sdvx] .pp-btn{color:#fff;background:linear-gradient(#4fb23a,#118e2e);border:1px solid #118e2e;border-radius:0 15px 0 15px;padding:6px 16px;font-weight:700;text-shadow:0 0 2px #3a5607,1px 1px 0 #3a5607,-1px -1px 0 #3a5607,-1px 1px 0 #3a5607,1px -1px 0 #3a5607}
#pp-root[data-theme=sdvx] .pp-btn:hover:not(:disabled){color:#1c2d2a;background:linear-gradient(#e6ff8f,#a9e22b);border-color:#118e2e;text-shadow:none}
#pp-root[data-theme=sdvx] .pp-btn.pri{color:#1c2d2a;background:#94eb00;border-radius:5px;text-shadow:none}
#pp-root[data-theme=sdvx] .pp-btn.pri:hover:not(:disabled){color:#cc6600;background:#ffd300}
#pp-root[data-theme=sdvx] .pp-chip{color:#c6fe87;background:#1e3207;border:3px solid #1e3207;font-weight:700;padding:3px 16px}
#pp-root[data-theme=sdvx] .pp-chip[aria-pressed=true],#pp-root[data-theme=sdvx] .pp-chip:hover{color:#1e3207;background:#c6fe87;border-color:#1e3207}
#pp-root[data-theme=sdvx] .pp-tool{color:#fff;background:#000;border:0;border-top:2px solid #8ad004;border-bottom:2px solid #8ad004;border-radius:0;padding:12px 16px}
#pp-root[data-theme=sdvx] .pp-tool label,#pp-root[data-theme=sdvx] .pp-tool b,#pp-root[data-theme=sdvx] .pp-info{color:#c6fe87}
#pp-root[data-theme=sdvx] .pp-tool select,#pp-root[data-theme=sdvx] .pp-tool input[type=search]{color:#1e3207;background:#daf3c1;border:0;border-radius:20px;font-weight:700;padding:5px 14px}
#pp-root[data-theme=sdvx] .pp-wrap>.pp-tablewrap{background:#eaf2e5;border:3px solid #118e2e;border-radius:12px}
#pp-root[data-theme=sdvx] .pp-table th{color:#1c2d2a;background:#b4dc87;border-bottom:2px solid #72a400}
#pp-root[data-theme=sdvx] .pp-card{background:#f6faf3;border:1px solid #a7d782;border-left:5px solid var(--c);border-radius:6px}
#pp-root[data-theme=sdvx] .pp-ch b{color:#fff}
#pp-root[data-theme=sdvx] .pp-ch span{color:#c6fe87}
@media (max-width:640px){#pp-root[data-theme=sdvx] .pp-wrap{gap:36px;padding:28px 22px 56px}#pp-root[data-theme=sdvx] .pp-wrap::before{font-size:18px;height:46px}#pp-root[data-theme=sdvx] .pp-panel{padding:16px;box-shadow:0 0 0 10px rgba(0,0,0,.72),0 0 0 12px #118e2e}}
@media (max-width:720px){.pp-head{grid-template-columns:1fr}.pp-lvs{grid-template-columns:1fr}.pp-info{margin-left:0;width:100%}}`,
z=document.getElementById("pp-host");
z&&z.remove();
const _=S("div",document.body);
_.id="pp-host";
const N=_.attachShadow({mode:"open"}),P=S("div",N);
P.id="pp-root";
const T=[["light","ライト"],["dark","ダーク"],["auto","端末に合わせる"],["site","サイト風"],["sdvx","SDVX風"]];
let M=E.get("pp-theme");
T.some(t=>t[0]===M)||(M="light"),P.dataset.theme=M,S("style",P,F);
const fontLink=()=>{if("sdvx"===M&&!document.getElementById("pp-font")){const lk=document.createElement("link");lk.id="pp-font";lk.rel="stylesheet";lk.href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500;700;900&display=swap";document.head.appendChild(lk)}};
fontLink();
const j=S("div",P,"","pp-load"),I=S("b",j,"準備中"),R=S("div",j,"","pp-prog"),q=S("i",R),U=S("div",j,"レベル別の譜面リストを取得しています…");
U.style.color="var(--sub)";
let O=!1;
const D=t=>{"Escape"===t.key&&H()},
H=()=>{O=!0,_.remove(),document.removeEventListener("keydown",D);const fk=document.getElementById("pp-font");fk&&fk.remove()};
document.addEventListener("keydown",D);
const B=t=>{j.textContent="",S("b",j,"取得できませんでした").style.fontSize="24px",S("div",j,t).style.color="var(--sub)",S("button",j,"閉じる","pp-btn").onclick=H},
G=async(t,e,n)=>{
const a=await fetch("/game/popn/popn29/playdata/mu_lv.html?version="+(n??-1)+"&bemani=0&category=0&keyword=&sort=&sort_type=up&page="+e+"&lv="+t,{credentials:"same-origin"});
if(!a.ok)throw new Error("HTTP "+a.status+" (Lv"+t+" page"+e+")");
const r=(new DOMParser).parseFromString(await w(a),"text/html"),o=r.querySelector(".mu_list_lv_table");
if(!o){if(/ベーシックコース/.test(r.body.textContent)&&0===e&&null==n)throw new Error("e-amusement ベーシックコースの加入、またはログインが必要です");return null}
const p=r.getElementById("s_page"),i=[];
o.querySelectorAll("li:not(.st_th)").forEach(e=>{
const n=e.children,a=n[0].querySelector("a"),r=n[0].querySelector("p"),o=n[3]||n[n.length-1],p=o.querySelectorAll("img"),c=o.querySelector("p"),g=parseInt(c&&c.textContent,10),f=n[1]?n[1].textContent.normalize("NFKC").replace(/\s+/g,"").toUpperCase():"";
f.indexOf("でっかポップ君")>=0||i.push({lv:t,title:a?a.textContent.trim():"",genre:r?r.textContent.trim():"",href:a?a.getAttribute("href"):"",id:a?L(a.getAttribute("href")):"",d:l[f.charAt(0)]||"",score:isNaN(g)?0:g,medal:s(p[0]&&p[0].getAttribute("src")),rank:s(p[1]&&p[1].getAttribute("src")),msrc:d(p[0]&&p[0].getAttribute("src")),rsrc:d(p[1]&&p[1].getAttribute("src"))})
});
return{rows:i,pages:p&&p.children.length?p.children.length:1}
};
let Y,K;
try{
const t=await(async(t,e)=>{
const n=[],a=[],r=[];
for(let t=38;t<=50;t++)a.push(t);
let o=0,p=null;
if(await Promise.all(Array.from({length:3},async()=>{
for(;a.length&&!p&&!O;){
const i=a.shift();
try{
const e=await G(i,0,t);
if(e){
n.push(...e.rows);
for(let a=1;a<e.pages;a++){await c(300);const e=await G(i,a,t);if(!e)break;n.push(...e.rows)}
}else r.push(i)
}catch(t){return void(p=t)}
o++,e(o,n.length)
}
})),p)throw p;
return{rows:n,miss:r}
})(null,(t,e)=>{I.textContent=t+" / 13",q.style.width=t/13*70+"%",U.textContent=e+" 譜面を取得済み"});
Y=t.rows,K=t.miss
}catch(t){return B(t.message)}
if(O)return;
if(!Y.length)return B("譜面リストが見つかりません。ログイン/課金状態を確認してください");
let J="";
Y.forEach(t=>{t.isNew=!1});
const V=t=>{const e=[...t.querySelectorAll('select[name="page_sl"] option')].map(t=>parseInt(t.value,10)).filter(Number.isFinite);return e.length?Math.max(...e)+1:1},
$=t=>[...t.querySelectorAll('.mu_list_table a[href*="mu_detail"]')].map(t=>L(t.getAttribute("href"))).filter(Boolean);
try{
const t=await(async()=>{
const t=[...(await k(a+"?page=0&version=-1")).querySelectorAll('select[name="version"] option')].map(t=>parseInt(t.value,10)).filter(t=>Number.isFinite(t)&&t>=0);
if(!t.length)return null;
const e=Math.max(...t),n=new Set;
for(let t=0,r=1;t<r&&!O;t++){
t&&await c(300);
const o=await k(a+"?page="+t+"&version="+e);
t||(r=V(o)),$(o).forEach(t=>n.add(t)),I.textContent="新曲判定 "+(t+1)+" / "+r,q.style.width=70+(t+1)/r*30+"%",U.textContent=n.size+" 曲"
}
return n
})();
t?t.size?Y.forEach(e=>{e.isNew=t.has(e.id)}):J="最新バージョンの曲が取得できませんでした。新曲の区別なしで計算しています。":J="バージョンの選択肢が見つかりません。全曲を旧曲として扱っています。"
}catch(t){J="新曲の判定に失敗しました: "+t.message}
if(O)return;
window.__popn=Y;
let W="",X={name:"",id:"",chara:""};
try{
const t=await k("/game/popn/popn29/playdata/index.html"),e=[];
t.querySelectorAll(".st_box > ul > li").forEach(t=>{const n=t.querySelector(":scope > p"),a=t.querySelector(":scope > div");n&&a&&e.push([n.textContent.replace(/\s+/g,""),a.textContent.replace(/\s+/g," ").trim()])});
const n=t=>{const n=e.find(e=>t.test(e[0]));return n?n[1]:""};
W=n(/ポップンクラス/),X.name=n(/プレ[ーイ]ヤー名/),X.chara=n(/キャラ/);
const a=e.map(t=>t[1].match(/\d{4}-\d{4}-\d{4}/)).find(Boolean);
X.id=a?a[0]:""
}catch(t){}
let Q=null,Z=[],tt=[],et=[],nt=new Set,at=0,rt=0,ot=0,pt=1;
const it=t=>b[y(v(t.medal))]||0,
lt=()=>{
if(Y.forEach(t=>{t.rating=t.exact?t.exact.rating:t.score>0?p(t.lv,it(t),Math.min(t.score,r)):0,t.cp=t.rating*i}),Z=Y.filter(t=>t.score>0),Q)tt=Q.new,et=Q.old;
else{const n=(t,e)=>t.filter(t=>t.rating>0).sort((t,e)=>e.rating-t.rating).slice(0,e);tt=n(Z.filter(t=>t.isNew),t),et=n(Z.filter(t=>!t.isNew),e)}
nt=new Set(tt.concat(et)),rt=tt.reduce((t,e)=>t+e.rating,0),ot=et.reduce((t,e)=>t+e.rating,0),at=Math.floor((rt+ot)/100)/100,pt=1,Z.forEach(t=>{t.cp>pt&&(pt=t.cp)})
};
lt(),j.remove();
const ct=S("div",P,"","pp-wrap"),
st={lv:"0",md:"",rank:"",cat:"",pl:"played",ver:"",kw:"",top:!1,sort:"cp",dir:-1,sort2:"",dir2:-1,limit:n};
let dt=[];
const Zs={},mdCells=[];
const gt=S("section",ct,"","pp-panel pp-head"),ft=S("div",gt,"","pp-class"),ut=S("div",ft,"","pp-who");
if(X.name&&S("b",ut,X.name),X.id){const t=S("span",ut,"ID "+X.id,"pp-id");t.title="クリックで表示/ぼかしを切り替え",t.onclick=()=>t.classList.toggle("blur")}
X.chara&&S("span",ut,X.chara),ut.children.length||(ut.style.display="none");
const ht=S("small",ft),xt=S("strong",ft),bt=S("div",ft,"","pp-split"),mt=S("span",bt),vt=S("span",bt);
mt.style.setProperty("--c","var(--c-new)"),vt.style.setProperty("--c","var(--c-old)");
const yt=S("div",ft,"","pp-split"),wt=S("div",gt,"","pp-spark");
wt.setAttribute("aria-hidden","true"),J&&S("div",gt,J,"pp-warn");
const kt=S("div",gt,"","pp-acc"),Ct=S("span",kt),St=S("button",kt,"今作の記録だけで計算し直す","pp-btn");
St.title="曲の詳細ページから今作のスコアとクリア種別を読み直します(1分ほどかかります)";
const Et=S("span",kt,"詳細ページを読むため1分ほどかかります。"),Lt=S("div",gt,"","pp-note"),At=S("div",Lt,"","pp-actions"),
Ft=async(t,e)=>{const n=t.textContent;try{await navigator.clipboard.writeText(e),t.textContent="コピーしました"}catch(t){prompt("コピーしてください",e)}setTimeout(()=>{t.textContent=n},1500)},
zt=S("button",At,"","pp-btn"),
_t=()=>{zt.textContent="表示: "+T.find(t=>t[0]===M)[1]};
_t(),zt.onclick=()=>{M=T[(T.findIndex(t=>t[0]===M)+1)%T.length][0],P.dataset.theme=M,E.set("pp-theme",M),fontLink(),_t()};
const Nt=S("button",At,"表示中をCSVコピー","pp-btn");
Nt.onclick=()=>Ft(Nt,["Lv,Title,Genre,New,Score,Rank,Medal,Points,Rating"].concat(dt.map(t=>[t.lv,'"'+t.title.replace(/"/g,'""')+'"','"'+t.genre.replace(/"/g,'""')+'"',t.isNew?1:0,t.score,g[m(t.rank)]||"",u[v(t.medal)]||"",t.score>0?t.cp.toFixed(2):"",t.score>0?t.rating:""].join(","))).join("\n"));
const Pt=S("button",At,"全データJSONコピー","pp-btn");
Pt.onclick=()=>Ft(Pt,JSON.stringify(Y)),S("button",At,"閉じる (Esc)","pp-btn pri").onclick=H;
const Tt=()=>{
ht.textContent=Q?"推定ポップンクラス(今作の記録で計算)":"推定ポップンクラス(概算・過去作の記録を含む)",
xt.textContent=at.toFixed(2),
mt.textContent="新曲 "+tt.length+"/"+t+"曲  平均 "+(tt.length?(rt*i/tt.length).toFixed(2):"-"),
vt.textContent="旧曲 "+et.length+"/"+e+"曲  平均 "+(et.length?(ot*i/et.length).toFixed(2):"-"),
yt.textContent=W?"公式表示: "+W:"";
const n=tt.concat(et),a=Math.max(...n.map(t=>t.cp),1),r=Math.min(...n.map(t=>t.cp),a);
wt.textContent="",n.forEach(t=>{const e=S("i",wt);e.style.height=25+75*(a===r?1:(t.cp-r)/(a-r))+"%",e.style.setProperty("--c",t.isNew?"var(--c-new)":"var(--c-old)"),e.title=(t.isNew?"[新曲] ":"")+"Lv"+t.lv+" "+t.title+" — "+t.cp.toFixed(2)}),
Ct.textContent=Q?"今作の記録だけで計算しました。":"今の値は過去作のベスト記録を含む概算です。クラスの対象は今作の記録だけなので、公式より高く出ることがあります。",
St.style.display=Q?"none":""
},
Mt=t=>{const e=String(t||"").replace(/[,\s]/g,"").match(/\d+/);return e?parseInt(e[0],10):0},
jt=new Map,
It=async t=>(jt.has(t)||(await c(250+Math.floor(150*Math.random())),jt.set(t,(t=>{
const e={};
t.querySelectorAll(".mu_detail_tb").forEach(t=>{
const n=t.id;
if(!n||"big"===n)return;
let a=null,r=!1;
for(const e of t.children){
if(r&&"TABLE"===e.tagName){a=e;break}
e.classList.contains("item")&&"VERSION"===e.textContent.replace(/[\s▼]/g,"")&&(r=!0)
}
if(!a)return;
const o={};
a.querySelectorAll("tr.play").forEach(t=>{
const e=t.firstElementChild?t.firstElementChild.textContent.replace(/\s+/g,""):"",n=t.querySelector(".play_value");
e&&n&&(o[e]=Mt(n.textContent))
});
const p=t=>{const e=Object.keys(o).find(e=>t.test(e));return e?o[e]:0},i=a.querySelector("tr.score .play_value");
var l,c,s,d;
e[n]={kind:(l=p(/^プレー/),c=p(/^クリア/),s=p(/^FULL/),d=p(/^PERFECT/),l?d?"perfect":s?"fc":c?"clear":"fail":"none"),score:i?Mt(i.textContent):0}
});
return e
})(await k("/game/popn/popn29/playdata/mu_detail.html?no="+encodeURIComponent(t)+"&back=mu_top")))),jt.get(t));
let Rt=0;
const qt=async(t,e)=>{
const n=t.filter(t=>t.score>0&&t.id&&t.d).map(t=>({r:t,cap:p(t.lv,it(t),Math.min(t.score,r))})).filter(t=>t.cap>0).sort((t,e)=>e.cap-t.cap),a=[];
for(const{r:t,cap:r}of n){
if(O)return a;
if(a.length>=e&&r<=a[e-1].exact.rating)break;
const n=await It(t.id);
Rt++,Et.textContent="詳細ページを取得中… "+Rt+"件";
const i=n[t.d];
if(!i){if(1===Rt&&!Object.keys(n).length)throw new Error("詳細ページの形式を読み取れませんでした");continue}
const l="none"===i.kind?0:p(t.lv,o[i.kind],i.score);
if(t.exact={rating:l,kind:i.kind,score:i.score},l>0){
let n=a.length;
for(;n>0&&a[n-1].exact.rating<l;)n--;
a.splice(n,0,t),a.length>e&&a.pop()
}
}
return a
};
St.onclick=async()=>{
St.disabled=!0,Rt=0;
try{
const n=await qt(Y.filter(t=>t.isNew),t),a=await qt(Y.filter(t=>!t.isNew),e);
if(O)return;
Q={new:n,old:a},Et.textContent="",lt(),Tt(),ve()
}catch(t){Et.textContent="失敗: "+t.message,St.disabled=!1}
};
const Ut=S("section",ct,"","pp-panel"),Ot=S("div",Ut,"","pp-lvhead");
S("b",Ot,"レベル別の達成状況(クリックで絞り込み)");
const Dt=S("div",Ot,"","pp-legend");
[["パーフェクト","var(--c-perfect)"],["フルコンボ","var(--c-fc)"],["クリア","var(--c-clear)"],["イージークリア","var(--c-easy)"],["失敗","var(--c-fail)"]].forEach(([t,e])=>{S("span",Dt,t).style.setProperty("--c",e)});
const Ht=S("div",Ut,"","pp-lvs"),Bt={},
Gt=(t,e,a)=>{
const r=a.filter(t=>t.score>0),o=a.length||1,p=t=>r.filter(e=>y(v(e.medal))===t).length,i=S("button",Ht,"","pp-lv");
i.type="button",S("b",i,e);
const l=S("div",i,"","pp-bar");
[[4,"var(--c-perfect)"],[3,"var(--c-fc)"],[2,"var(--c-clear)"],[1,"var(--c-easy)"],[0,"var(--c-fail)"]].forEach(([t,e])=>{const n=S("i",l);n.style.setProperty("--c",e),n.style.width=p(t)/o*100+"%"}),
S("em",i,"FC以上 "+r.filter(t=>y(v(t.medal))>=3).length+" · "+r.length+"/"+a.length),
i.title="パーフェクト "+p(4)+" / フルコンボ "+p(3)+" / クリア "+p(2)+" / イージークリア "+p(1)+" / 失敗 "+p(0)+" / 未プレー "+(a.length-r.length),
i.onclick=()=>{st.lv=t,st.md="",st.limit=n,ve()},
Bt[t]=i
};
Gt("0","ALL",Y);
for(let t=38;t<=50;t++)Gt(String(t),"Lv"+t,Y.filter(e=>e.lv===t));
{
const MK="abcdefghijkl".split(""),
pn=S("section",ct,"","pp-panel"),
hd=S("div",pn,"","pp-lvhead");
S("b",hd,"レベル別のメダル状況(クリックで絞り込み / 再クリックで解除)");
const wp=S("div",pn,"","pp-tablewrap");
wp.style.border="none";
const tb=S("table",wp,"","pp-table pp-mdt"),
hr=tb.createTHead().insertRow();
S("th",hr,"Lv");
const mb=(Y.find(r=>r.msrc&&"none"!==v(r.medal))||{}).msrc,
mu=kk=>mb&&/meda_[^.\/?#]+/.test(mb)?mb.replace(/meda_[^.\/?#]+/,"meda_"+kk):"";
MK.forEach(kk=>{
const th=S("th",hr);
th.title=u[kk];
const ex=Y.find(r=>v(r.medal)===kk&&r.msrc),src=ex?ex.msrc:mu(kk);
if(src){const im=S("img",th);im.src=src;im.alt=us[kk]}
else th.textContent=us[kk]
});
S("th",hr,"未プレー");
S("th",hr,"計");
const bd=tb.createTBody(),
pick=(lvKey,md,pl)=>{
if(st.lv===lvKey&&st.md===md&&st.pl===pl){st.md="";st.pl="played"}
else{st.lv=lvKey;st.md=md;st.pl=pl}
Yt="table";
st.limit=n;
ve()
},
mk=(lvKey,label,rows)=>{
const tr=bd.insertRow(),
cell=(txt,md,pl,cnt)=>{
const td=S("td",tr,txt);
if(cnt){td.className="c";td.onclick=()=>pick(lvKey,md,pl);mdCells.push({td:td,lv:lvKey,md:md,pl:pl})}
else td.className="z"
};
S("td",tr,label);
MK.forEach(kk=>{
const c=rows.filter(r=>r.score>0&&v(r.medal)===kk).length;
cell(c||"-",kk,"played",c)
});
const un=rows.filter(r=>!(r.score>0)).length;
cell(un||"-","","unplayed",un);
cell(rows.length,"","all",rows.length)
};
mk("0","ALL",Y);
for(let lv=38;lv<=50;lv++)mk(String(lv),"Lv"+lv,Y.filter(r=>r.lv===lv))
}
let Yt="table";
const Kt=S("div",ct,"","pp-vbar"),
Jt=[["table","一覧"],["cards","クラス対象("+(t+e)+"曲)"]].map(([t,e])=>{const n=S("button",Kt,e,"pp-chip");return n.type="button",n.onclick=()=>{Yt=t,ve()},[t,n]}),
Vt=S("div",ct,"","pp-tool"),
$t=(t,e,a)=>{const r=S("label",Vt,t+" "),o=S("select",r);Zs[a]=o,e.forEach(([t,e])=>{S("option",o,e).value=t}),o.value=st[a],o.onchange=()=>{st[a]=o.value,st.limit=n,ve()}};
$t("ランク",[["","ALL"]].concat(Object.keys(f).sort((t,e)=>f[e]-f[t]).map(t=>[t,g[t]])),"rank"),
$t("状態",[["","ALL"]].concat(x.map((t,e)=>[String(e),t])),"cat"),
$t("表示",[["played","プレー済み"],["unplayed","未プレー"],["all","すべて"]],"pl"),
$t("曲",[["","すべて"],["new","新曲のみ"],["old","旧曲のみ"]],"ver");
const Wt=S("label",Vt,"第2ソート "),Xt=S("select",Wt);
S("option",Xt,"なし").value="",[["lv","Lv"],["title","曲名"],["score","スコア"],["rank","ランク"],["medal","メダル"],["cp","曲P"]].forEach(([t,e])=>{S("option",Xt,e).value=t});
const Qt=S("button",Wt,"","pp-chip");
Qt.type="button",Qt.title="第2ソートの昇順/降順",
Xt.onchange=()=>{st.sort2=Xt.value===st.sort?"":Xt.value,st.dir2="title"===st.sort2?1:-1,st.limit=n,ve()},
Qt.onclick=()=>{st.dir2=-st.dir2,ve()};
const Zt=S("button",Vt,"クラス対象のみ("+(t+e)+")","pp-chip");
Zt.type="button",Zt.onclick=()=>{st.top=!st.top,st.limit=n,ve()};
const te=S("input",Vt);
let ee;
te.type="search",te.placeholder="曲名 / ジャンルで検索",te.oninput=()=>{clearTimeout(ee),ee=setTimeout(()=>{st.kw=te.value.toLowerCase(),st.limit=n,ve()},150)};
const ne=S("div",Vt,"","pp-info"),ae=S("div",ct,"","pp-tablewrap"),re=S("table",ae,"","pp-table"),oe=re.createTHead().insertRow(),pe={};
[["Lv","lv"],["曲名","title"],["スコア","score"],["ランク","rank"],["メダル","medal"],["曲P","cp"]].forEach(([t,e])=>{
const a=S("th",oe,t);
a.dataset.k=e,pe[e]=a,a.title="クリック: 並べ替え / Shift+クリック: 第2ソート",
a.onclick=t=>{
const a="title"===e?1:-1;
if(t.shiftKey){if(e===st.sort)return;st.sort2===e?st.dir2=-st.dir2:(st.sort2=e,st.dir2=a)}
else st.dir=st.sort===e?-st.dir:a,st.sort=e,st.sort2===e&&(st.sort2="");
st.limit=n,ve()
}
});
const ie=re.createTBody(),le=S("div",ae,"","pp-more"),ce=S("button",le,"","pp-btn");
ce.onclick=()=>{st.limit+=300,ve()};
const se=S("div",ae,"条件に合う譜面がありません。絞り込みを変えてください。","pp-empty"),
de={name:!0,id:!1,chara:!0},
ge=S("div",ct,"","pp-tool");
ge.style.position="static",ge.style.display="none",S("b",ge,"画像に入れる項目"),
[["name","ユーザー名"],["id","ID"],["chara","キャラクター"]].forEach(([t,e])=>{const n=S("label",ge),a=S("input",n);a.type="checkbox",a.checked=de[t],a.onchange=()=>{de[t]=a.checked},n.appendChild(document.createTextNode(e))});
S("button",ge,"画像として保存(PNG)","pp-btn pri").onclick=()=>me();
const fe=S("div",ct,"","pp-cards");
fe.style.display="none";
const ue={lv:t=>t.lv,title:t=>t.title,score:t=>t.score,rank:t=>f[m(t.rank)]||0,medal:t=>h[v(t.medal)]||0,cp:t=>t.score>0?t.rating:-1},
he=t=>{const e=v(t.medal);return t.msrc&&"none"!==e?'<span class="pp-ic" title="'+C(u[e]||e)+'"><img loading="lazy" src="'+C(t.msrc)+'" alt="'+C(u[e]||e)+'"></span>':"-"},
xe=t=>{const e=m(t.rank);return t.rsrc&&"none"!==e?'<span class="pp-ic"><img loading="lazy" src="'+C(t.rsrc)+'" alt="'+C(g[e]||e)+'"><small>'+C(g[e]||e)+"</small></span>":"-"},
be={light:["LIGHT","#2f9e57"],normal:["NORMAL","#2f7fd6"],hyper:["HYPER","#b86e08"],ex:["EX","#c2255c"]};
const me=()=>{
const n=getComputedStyle(P),a=t=>n.getPropertyValue(t).trim(),r=1.5,o=1500,p=40,l=92,c=346,s=t=>Math.ceil(t/4),d=274+104*s(tt.length)+16+44+104*s(et.length)+44,f=document.createElement("canvas");
f.width=Math.round(2250),f.height=Math.round(d*r);
const u=f.getContext("2d");
u.scale(r,r);
const h=(t,e)=>{u.font=(e||400)+" "+t+'px "Hiragino Sans","Hiragino Kaku Gothic ProN","Yu Gothic UI","Yu Gothic",Meiryo,system-ui,sans-serif'},
x=(t,e,n,a,r,o,p)=>{h(a,o),u.fillStyle=r,u.textAlign=p||"left",u.textBaseline="alphabetic",u.fillText(t,e,n)},
b=(t,e,n)=>(h(e,n),u.measureText(t).width),
w=(t,e,n,a)=>{if(b(t,n,a)<=e)return t;let r=t;for(;r.length>1&&b(r+"…",n,a)>e;)r=r.slice(0,-1);return r+"…"},
k=(t,e,n,a,r)=>{u.beginPath(),u.moveTo(t+r,e),u.arcTo(t+n,e,t+n,e+a,r),u.arcTo(t+n,e+a,t,e+a,r),u.arcTo(t,e+a,t,e,r),u.arcTo(t,e,t+n,e,r),u.closePath()},
C=a("--bg"),S=a("--panel"),E=a("--ink"),L=a("--sub"),A=a("--line"),F=a("--accent"),z=[a("--c-fail"),a("--c-easy"),a("--c-clear"),a("--c-fc"),a("--c-perfect")],_=["失敗","イージー","クリア","FC","パーフェクト"],N={fail:0,clear:2,fc:3,perfect:4};
u.fillStyle=C,u.fillRect(0,0,o,d),k(p,p,1420,170,16),u.fillStyle=S,u.fill(),u.strokeStyle=A,u.lineWidth=1,u.stroke(),
de.name&&X.name&&x(w(X.name,640,28,700),68,96,28,E,700);
const T=[];
de.id&&X.id&&T.push("ID "+X.id),de.chara&&X.chara&&T.push(X.chara),T.length&&x(w(T.join("  ・  "),640,16),68,124,16,L),
x("推定ポップンクラス",68,158,14,L),x(at.toFixed(2),68,208,56,F,700);
const M=1432;
[["新曲 上位"+t,tt,rt,a("--c-new")],["旧曲 上位"+e,et,ot,a("--c-old")]].forEach(([t,e,n,a],r)=>{
const o=114+36*r,p=t+"   平均 "+(e.length?(n*i/e.length).toFixed(2):"-"),l=b(p,20,600);
x(p,M,o,20,E,600,"right"),u.fillStyle=a,k(M-l-22,o-14,12,12,3),u.fill()
}),
x(Q?"今作の記録で計算":"概算(過去作の記録を含む)",M,196,14,L,400,"right");
const j=(t,e,n,a,r,o)=>{
x(t+" 上位"+n+"曲",p,o+30,22,E,700),
x("平均 "+(e.length?(a*i/e.length).toFixed(2):"-"),1460,o+30,16,L,400,"right"),
e.forEach((t,e)=>{
const n=p+e%4*358,a=o+44+104*Math.floor(e/4);
k(n,a,c,l,12),u.fillStyle=S,u.fill(),u.strokeStyle=A,u.stroke(),k(n,a+10,5,72,3),u.fillStyle=r,u.fill(),
x("#"+(e+1),n+c-12,a+24,12,L,400,"right"),
x(w(t.title,280,17,600),n+16,a+28,17,E,600),
x(w(t.genre,314,12),n+16,a+48,12,L);
const i=a+78;
let s=n+16;
const d=be[t.d]||[(t.d||"").toUpperCase(),"#888"],f=d[0]+" "+t.lv,h=b(f,11,700)+14;
k(s,i-14,h,18,9),u.fillStyle=d[1],u.fill(),x(f,s+7,i-1,11,"#fff",700),s+=h+8;
const C=String(t.exact?t.exact.score:t.score);
x(C,s,i,14,E),s+=b(C,14)+8;
const F=t.exact?N[t.exact.kind]:y(v(t.medal)),P=void 0!==F&&F>=0?_[F]:"",T=P?b(P,11,700)+12:0,M=n+c-14-70;
if(!t.exact){const e=g[m(t.rank)];e&&"-"!==e&&s+b(e,14,600)+8+T<=M&&(x(e,s,i,14,L,600),s+=b(e,14,600)+8)}
P&&(k(s,i-14,T,18,9),u.fillStyle=z[F],u.fill(),x(P,s+6,i-1,11,4===F?"#3a2a00":"#fff",700)),
x(t.cp.toFixed(2),n+c-14,i+2,24,r,700,"right")
})
};
j("新曲",tt,t,rt,a("--c-new"),230);
const I=274+104*s(tt.length)+16;
j("旧曲",et,e,ot,a("--c-old"),I),
x("Lv38〜50 の譜面から計算  "+(new Date).toLocaleDateString("ja-JP"),p,d-18,13,L),
f.toBlob(t=>{
if(!t)return void alert("画像を作れませんでした");
const e=URL.createObjectURL(t),n=document.createElement("a"),a=new Date;
n.href=e,n.download="popn-class-"+a.getFullYear()+String(a.getMonth()+1).padStart(2,"0")+String(a.getDate()).padStart(2,"0")+".png",document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(e),3e3)
},"image/png")
};
function ve(){
const n="cards"===Yt;
if(ge.style.display=n?"":"none",Vt.style.display=ae.style.display=n?"none":"",fe.style.display=n?"":"none",Jt.forEach(([t,e])=>e.setAttribute("aria-pressed",t===Yt)),n)
return fe.textContent="",void[["新曲",tt,t,rt,"var(--c-new)"],["旧曲",et,e,ot,"var(--c-old)"]].forEach(([t,e,n,a,r])=>{
const o=S("div",fe,"","pp-ch");
S("b",o,t+" 上位"+n+"曲"),S("span",o,e.length+"曲 / 平均 "+(e.length?(a*i/e.length).toFixed(2):"-"));
const p=S("div",fe,"","pp-cg");
p.style.setProperty("--c",r),p.innerHTML=e.map((t,e)=>{const n=be[t.d]||[t.d?t.d.toUpperCase():"","#888"];return'<div class="pp-card"><span class="no">'+(e+1)+'</span><div class="t" title="'+C(t.title)+'">'+C(t.title)+'</div><div class="g">'+C(t.genre)+'</div><div class="m"><span class="pp-diff" style="--dc:'+n[1]+'">'+C(n[0])+" "+t.lv+'</span><span class="s">'+(t.exact?t.exact.score:t.score)+"</span>"+xe(t)+he(t)+'</div><div class="p"><b>'+t.cp.toFixed(2)+"</b><small>rating "+t.rating+"</small></div></div>"}).join(""),e.length||S("div",p,"対象の譜面がありません。","pp-empty")
});
for(const t in Bt)Bt[t].classList.toggle("on",t===st.lv);
for(const kk in Zs)Zs[kk].value=st[kk];
mdCells.forEach(c=>c.td.classList.toggle("sel",c.lv===st.lv&&c.md===st.md&&c.pl===st.pl));
Zt.setAttribute("aria-pressed",st.top),re.classList.toggle("hl",st.top),
dt=Y.filter(t=>("0"===st.lv||t.lv==st.lv)&&(!st.rank||m(t.rank)===st.rank)&&(""===st.cat||String(y(v(t.medal)))===st.cat)&&(!st.md||v(t.medal)===st.md)&&("all"===st.pl||("played"===st.pl)==(t.score>0))&&(!st.ver||("new"===st.ver)==!!t.isNew)&&(!st.top||nt.has(t))&&(!st.kw||(t.title+t.genre).toLowerCase().includes(st.kw)));
const a=ue[st.sort],r=st.sort2?ue[st.sort2]:null;
dt.sort((t,e)=>{const n=a(t),o=a(e);if(n!==o){if(null===n)return 1;if(null===o)return-1;return(n>o?1:-1)*st.dir}if(!r)return 0;const p=r(t),i=r(e);if(p===i)return 0;if(null===p)return 1;if(null===i)return-1;return(p>i?1:-1)*st.dir2});
for(const t in pe)pe[t].className=t===st.sort?st.dir>0?"asc":"desc":t===st.sort2?st.dir2>0?"asc2":"desc2":"";
Xt.value=st.sort2,Qt.textContent=st.dir2>0?"▲":"▼",Qt.style.display=st.sort2?"":"none";
const o=dt.slice(0,st.limit);
ne.textContent=dt.length+"件 / 全"+Y.length+"譜面 / プレー済み"+Z.length+(K.length?" (取得なし: Lv"+K.join(",")+")":"")+(st.md?" / メダル: "+u[st.md]:""),
se.style.display=dt.length?"none":"",le.style.display=dt.length>o.length?"":"none",ce.textContent="さらに表示(残り "+(dt.length-o.length)+"件)",
ie.innerHTML=o.map(t=>"<tr"+(nt.has(t)?' class="top"':"")+'><td class="n">'+t.lv+'</td><td><span class="pp-title">'+C(t.title)+"</span>"+(t.isNew?'<span class="pp-new">NEW</span>':"")+'<span class="pp-genre">'+C(t.genre)+'</span></td><td class="n">'+(t.score||"-")+"</td><td>"+xe(t)+"</td><td>"+he(t)+'</td><td class="n">'+(t.score>0&&t.rating>0?'<span class="pp-cp"><span>'+t.cp.toFixed(2)+'</span><i><b style="width:'+(t.cp/pt*100).toFixed(1)+'%"></b></i></span>':"-")+"</td>"+"</tr>").join("")
}
Tt(),ve()
})();