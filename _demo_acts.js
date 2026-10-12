/* _demo.html 의 화면 띄우기 동작을 그대로 가져온 것. _demo.html 은 건드리지 않는다.
   쓰는 법: var acts = window.makeActs(iframeElement); acts.bt();
   이 파일은 확인용이라 저장소에 올라가지 않는다 (.git/info/exclude). */
window.makeActs = function (f) {
function W(){ return f.contentWindow; }
function ensureConv(title,userText,cb){
  var w=W();
  try{ w.tfDevBillUser(); }catch(e){}
  w.TAI.ok=false;
  w.gNew(userText);
  /* AI 서버가 꺼져 있어 뒤늦게 붙는 오류 안내(연결 실패, 답변을 불러오지 못했습니다)는 계속 지운다 */
  var bad=/연결되지 않아|불러오지 못했|작업 오류|다시 시도/;
  var sweep=function(){ var th=w.document.getElementById('g-thread'); if(!th) return; [].slice.call(th.children).forEach(function(e){ if(!e.querySelector('.tf-sum,.ska,.gcl')&&(bad.test(e.textContent||'')||/^goff/.test(e.id||''))) e.remove(); }); };
  var mo=new w.MutationObserver(sweep); setTimeout(function(){ var th=w.document.getElementById('g-thread'); if(th) mo.observe(th,{childList:true,subtree:true}); sweep(); },300);
  setTimeout(function(){
    try{ var th=w.document.getElementById('g-thread'); if(th){ [].slice.call(th.children).forEach(function(e){ if(/연결되지 않아|불러오지 못했|작업 오류/.test(e.textContent||'')||/^goff/.test(e.id||'')) e.remove(); }); } }catch(e){}
    try{ if(w.G.cur){ w.G.cur.title=title; var t=w.document.getElementById('g-chead-title'); if(t) t.firstChild?t.firstChild.textContent=title:t.textContent=title; } }catch(e){}
    cb(w);
  },1200);
}
/* 확인용 페이지는 항상 최신 코드로 새로 그린다: 저장된 옛 대화(옛 화면 HTML)를 지우고 다시 불러온 뒤 실행 */
function fresh(run){
  try{ var ls=f.contentWindow.localStorage; ls.removeItem('teth.state'); }catch(e){}
  f.onload=function(){ f.onload=null; setTimeout(run,2500); };
  f.src='index.html?'+Date.now();
}
var acts={
  strat:function(){ fresh(function(){ ensureConv('비트코인 매수 시점','비트코인 조금 밀릴 때마다 나눠서 사줘',function(w){
    w.taiThreadAdd('<div class="g-amsg">나눠서 사는 규칙으로 만들었습니다. 조금 밀릴 때마다 사고, 10% 오르면 팔고 5% 내리면 멈춥니다. 최근 1년으로 검증합니다.</div>');
    w.tfAiStrategy({asset:'비트코인',depth:'mid',tp:10,sl:-5,period:'1y',name:'나눠 사는 비트코인'});
  }); }); },
  ask:function(){ fresh(function(){ ensureConv('차트 분석 방향','차트 분석해줘',function(w){
    w.taiThreadAdd('<div class="g-amsg">어떤 차트를 어떻게 볼지 먼저 정하겠습니다.</div>');
    w.skaCard({steps:[
      {title:'어떤 방식으로 분석해드리면 되겠습니까?',multi:true,options:[{t:'지금 흐름',d:'오르는 중인지 내리는 중인지'},{t:'사고팔 자리',d:'어디서 사고 어디서 팔지'},{t:'과열 여부',d:'너무 오르거나 내렸는지'},{t:'거래량',d:'사람들이 얼마나 몰렸는지'},{t:'최근 뉴스',d:'가격을 움직인 사건'}]},
      {title:'어느 기간으로 보겠습니까?',options:[{t:'최근 1주',d:'단기 흐름'},{t:'최근 1개월',d:'중기 흐름'},{t:'최근 1년',d:'큰 흐름'}]}
    ]});
  }); }); },
  next:function(){ fresh(function(){ ensureConv('비트코인 분석','비트코인 지금 어때?',function(w){
    w.taiThreadAdd('<div class="g-amsg">비트코인은 최근 한 달 동안 큰 폭으로 오르내렸습니다. 지금은 단기 고점에서 조금 내려온 자리입니다.</div>');
    w.taiNext(['셋 중에 하나만 고른다면?','얼마까지 떨어지면 사는 게 좋아?','이더리움은 어때?'],[{type:'backtest',label:'비트코인 떨어질 때 사는 전략 검증해줘'},{type:'delegate_trade',label:'너가 대신 적정 가격에 나눠서 사줘'}]);
  }); }); },
  order:function(){ fresh(function(){ ensureConv('비트코인 예약 매도','언제까지 기다리겠습니까 7일',function(w){
    try{ var t=w.tfS(); t.api=t.api||{}; if(!t.api.ex) t.api.ex='bitget'; }catch(e){}
    w.taiThreadAdd('<div class="g-amsg">조건을 확인했습니다. 아래에서 예약합니다.</div>');
    w.tfOrderCard({asset:'비트코인',side:'sell',trigger:90000,qty:'all',ttl:'7d'});
  }); }); },
  contract:function(){ fresh(function(){ ensureConv('비트코인 전략','비트코인 떨어질 때 사는 전략 만들어줘',function(w){
    w.tfAiStrategy({asset:'비트코인',depth:'mid',tp:10,sl:-5,period:'1y',name:'나눠 사는 비트코인'});
    var th=w.document.getElementById('g-thread'); var c=th&&th.querySelector('.tf-sum'); if(c) c.remove();
    w.taiThreadAdd('<div class="g-amsg">질문에 모두 답하셨습니다. 아래 조건으로 진행합니다.</div>');
    w.tfIntakeDone();
  }); }); },
  revise:function(){ fresh(function(){ ensureConv('비트코인 전략 수정','목표 수익을 15%로 바꿔줘',function(w){
    w.tfAiStrategy({asset:'비트코인',depth:'mid',tp:10,sl:-5,period:'1y',name:'나눠 사는 비트코인'});
    var th=w.document.getElementById('g-thread'); var c=th&&th.querySelector('.tf-sum'); if(c) c.remove();
    w.taiThreadAdd('<div class="g-amsg">목표 수익만 바꿔서 다시 검증하겠습니다.</div>');
    w.rvProposal({change:'tp',tp:15});
  }); }); },
  orderst:function(){ fresh(function(){ ensureConv('비트코인 예약 매도','예약 상태 보여줘',function(w){
    try{ var t=w.tfS(); t.api=t.api||{}; if(!t.api.ex) t.api.ex='bitget'; }catch(e){}
    [['wait','조건을 기다리는 중입니다.'],['done','조건에 닿아 체결되었습니다.'],['cancel','예약을 취소했습니다.']].forEach(function(s,i){
      var x=w.odNorm({asset:'비트코인',side:'sell',trigger:90000,qty:'all',ttl:'7d'}); x.id='demoOd'+i; x.status=s[0]; if(s[0]==='done') x.fillAt=Date.now();
      w.taiThreadAdd('<div class="g-amsg">'+s[1]+'</div>'); w.taiThreadAdd(w.odCardHtml(x));
    });
  }); }); },
  reviseold:function(){ fresh(function(){ ensureConv('옛 카드','x',function(w){ w.taiThreadAdd('<div class="tf-sum rv-prop" id="rvold"><div class="h">바뀔 조건</div><p class="rv-ch">산 가격보다 10% 오르면 팔던 조건을 15%로 바꿉니다</p><details class="rv-det"><summary>규칙 전체 보기</summary></details><button class="tf-btn p">수정한 규칙으로 다시 검증하기</button><button class="tf-btn ghost">다른 수정 요청하기</button></div>'); }); }); },
  reviseopen:function(){ acts.revise(); setTimeout(function(){ var d=W().document.querySelector('.rv-prop .rv-det'); if(d) d.open=true; },5000); },
  bt:function(){ acts.strat(); setTimeout(function(){ var b=W().document.querySelector('.tf-sum .tf-btn.p, .tf-sum button'); if(b) b.click(); },5500); },
  btopen:function(){ acts.bt(); setTimeout(function(){ var d=W().document.querySelector('.bt-fold'); if(d) d.open=true; },9000); },
  btrun:function(){ acts.bt(); setTimeout(function(){ var b=W().document.querySelector('#bt-root .bt-set .bt-cta'); if(b) b.click(); },9000); },
  btfeed:function(){ acts.bt(); setTimeout(function(){ var d=W().document, r=d.getElementById('bt-root'), rail=d.getElementById('bt-rail'); r.setAttribute('data-phase','run'); var row=function(t,k,b,v){ return '<div class="bt-fr v2 k-'+k+'"><time class="num">'+t+'</time><span class="bt-dt"></span><b>'+b+'</b><i class="num mk-up">'+v+'</i></div>'; }; rail.innerHTML='<section class="bt-box bt-feedbox"><h3>내린 판단</h3><div class="bt-feed">'+row('09.11','buy','BTC 매수','')+row('08.20','sell','BTC 매도','+23.2%')+row('07.14','sell','BTC 매도','+10.3%')+'</div></section>'; },9000); },
  btres:function(){ acts.bt(); setTimeout(function(){ var d=W().document, r=d.getElementById('bt-root'), rail=d.getElementById('bt-rail'); if(!r||!rail) return; r.setAttribute('data-phase','result');
    rail.innerHTML='<section class="bt-box bt-verdict"><small>최근 3개월, 시작 금액 $1,000 기준 손익</small><p class="bt-v1b"><b class="num mk-up">+$421</b></p><p class="bt-v2"><span>그냥 들고 있었다면 <i class="num">+$426</i></span><b class="num mk-dn">현물 보유 대비 -$5</b></p><div class="bt-k3"><div><small>최대 하락률</small><b class="num mk-dn">-5.1%</b><em class="num">현물 보유 최대 하락률 -7.0%</em></div><div><small>수익 거래</small><b class="num">청산 3건 중 3건</b></div><div><small>평균 보유 기간</small><b class="num">18일</b></div></div></section><section class="bt-box bt-read"><h3>TETH의 해석</h3><p class="f">해석을 불러오지 못했습니다. 결과 숫자는 위에 그대로 있습니다.</p><button type="button" class="bt-rtry">다시 시도</button></section><button type="button" class="bt-cta">규칙 수정하기</button><button type="button" class="bt-sec">이 전략 실행하기</button>';
    var ev=d.getElementById('bt-ev'); var row=function(t,a,w,s,v){ return '<div class="bt-row v2'+(t==='26.09.21'?' on':'')+'"><button type="button" class="bt-rb"><time class="num">'+t+'</time><span class="bt-dt"></span><b>'+a+'</b><span class="wy">'+w+'</span><span class="ot"><small>'+s+'</small> <i class="num mk-up">'+v+'</i></span><svg class="cv" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button>'+(t==='26.09.21'?'<div class="bt-dd-in"><div class="bt-dd-c"><small>BTC 가격, 매수 전후 <i>USD</i></small><svg class="bt-mini" viewBox="0 0 300 120"><rect x="0" y="0" width="300" height="120" fill="none" stroke="#f0566a" stroke-dasharray="3 3"/><polyline points="0,80 60,90 120,70 180,30 240,20 300,25" fill="none" stroke="#cdcdcd" stroke-width="1.5"/><text x="0" y="116" fill="#9ea3ad" font-size="11">2026. 7. 20.</text><text x="300" y="12" fill="#9ea3ad" font-size="11" text-anchor="end">목표 +10%</text></svg></div><div class="bt-dd-f"><div class="bt-blk"><h4>그날 확인한 조건</h4><dl class="bt-dl"><div><dt>하루 반등</dt><dd class="num">+1.1%, 기준 0.5% 넘게</dd></div><div><dt>되돌림 점수</dt><dd class="num">40, 기준 44 아래</dd></div><div><dt>산 가격</dt><dd class="num">$63,461</dd></div></dl></div></div></div>':'')+'</div>'; };
    if(ev) ev.innerHTML='<section class="bt-sec-b" id="bt-dec"><header class="v2"><h3>판단 기록</h3><div class="bt-sort bt-sdd"><span>정렬</span><button type="button" class="bt-sdd-t" aria-expanded="true">최신순<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button><div class="bt-sdd-m"><button type="button" aria-selected="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>최신순</button><button type="button" aria-selected="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>오래된순</button><button type="button" aria-selected="false"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>결과가 큰 순</button></div></div></header><div class="bt-s4 n3" role="tablist"><button type="button" role="tab" aria-selected="false" class="k-buy"><small>매수</small><b class="num">3<i>건</i></b></button><button type="button" role="tab" aria-selected="false" class="k-sell"><small>매도</small><b class="num">3<i>건</i></b></button><button type="button" role="tab" aria-selected="true" class="k-all"><small>전체 기록</small><b class="num">6<i>건</i></b></button></div><div class="bt-list v2">'+row('26.09.21','BTC 매도','익절 목표에 도달했습니다','거래 손익','+11.3%')+row('26.09.11','BTC 매수','밀린 뒤 하루 +0.8% 반등해 조건이 맞았습니다','10일 뒤 매도','+11.3%')+row('26.08.20','BTC 매수','밀린 뒤 하루 +0.8% 반등해 조건이 맞았습니다','10일 뒤 매도','+11.3%')+'<button type="button" class="bt-more"><span class="u">이전 판단 더 보기</span> <i class="num">34건 중 12건 표시</i></button></div></section><section class="bt-sec-b" id="bt-trs"><header><h3>거래 내역</h3><div class="bt-chips" role="group"><button type="button" aria-pressed="true">전체 3건</button><button type="button" aria-pressed="false">수익 3건</button><button type="button" aria-pressed="false">손실 0건</button></div></header><div class="bt-list bt-tlist"><div class="bt-th"><span>종목</span><span>산 날</span><span>판 날</span><span class="r">기간</span><span class="r">손익</span><span></span></div><div class="bt-row bt-tr"><button type="button" class="bt-rb"><b>BTC</b><time class="num"><i>매수</i>2026. 9. 12.</time><time class="num"><i>매도</i>2026. 9. 22.</time><span class="r num">10일</span><span class="r num mk-up">+11.3%</span><svg class="cv" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button></div><div class="bt-row bt-tr"><button type="button" class="bt-rb"><b>BTC</b><time class="num"><i>매수</i>2026. 9. 12.</time><time class="num"><i>매도</i>2026. 9. 22.</time><span class="r num">10일</span><span class="r num mk-up">+11.3%</span><svg class="cv" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg></button></div></div></section>'; setTimeout(function(){ var e=W().document.getElementById('bt-ev'); if(e) e.insertAdjacentHTML('beforeend','<details class="bt-tech" open><summary>자세한 지표</summary><dl class="bt-dl bt-tech-g"><div><dt><button type="button" class="mkd-term">승률<span class="mkd-tip" role="tooltip">설명</span></button></dt><dd class="num">35%</dd></div><div><dt><button type="button" class="mkd-term">손익비<span class="mkd-tip" role="tooltip">설명</span></button></dt><dd class="num">0.92</dd></div><div><dt><button type="button" class="mkd-term">1년으로 환산한 수익률<span class="mkd-tip" role="tooltip">설명</span></button></dt><dd class="num"><span class="mk-dn">-4.5%</span></dd></div><div><dt><button type="button" class="mkd-term">종목을 들고 있던 시간<span class="mkd-tip" role="tooltip">설명</span></button></dt><dd class="num">63%</dd></div><div><dt><button type="button" class="mkd-term">낸 수수료<span class="mkd-tip" role="tooltip">설명</span></button></dt><dd class="num">$26.5</dd></div><div><dt><button type="button" class="mkd-term">가장 길게 회복을 기다린 기간<span class="mkd-tip" role="tooltip">설명</span></button></dt><dd class="num">357일</dd></div></dl></details><section class="bt-sec-b"><header><h3>월별 수익률</h3><span>한 달 전체를 계산한 11개월 중 5개월에 수익이 났습니다.</span></header><div class="skb-mtm"><div class="y">2026<span class="num u">누적 +27.7%</span></div><div class="g"><div class="c"><em>1월</em><b class="num u">+2.4%</b></div><div class="c"><em>2월</em><b class="num d">-14.7%</b></div><div class="c"><em>3월</em><b class="num u">+10.1%</b></div><div class="c e"><em>4월</em><b>-</b></div></div></div><table class="skb-mt"><tr><th>연도</th><th>8월</th><th>9월</th><th>누적</th></tr><tr><td>2026</td><td class="u">+23.2%</td><td class="d">-5.7%</td><td class="yr">+27.7%</td></tr></table></section>'); },200);
    var p=d.getElementById('bt-panel'); if(p){ p.classList.add('sum'); var ps=d.getElementById('bt-pstate'); if(ps) ps.textContent='91일간의 결과입니다. 숫자나 차트 표시를 누르면 판단 근거가 열립니다.'; var c0=d.getElementById('bt-pc0'), c1=d.getElementById('bt-pc1'); if(c0){ c0.className='cell on'; c0.querySelector('b').innerHTML='<button type="button">3번<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button>'; c0.querySelector('span').textContent='91일 동안'; } if(c1){ c1.className='cell on'; c1.querySelector('b').innerHTML='<button type="button">수익 거래 3건<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button><button type="button">손실 거래 0건<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg></button>'; c1.querySelector('span').textContent='매수 3번'; } }
  },9000); },
  go:function(r){ fresh(function(){ var w=W(); try{ w.tfDevBillUser(); }catch(e){} w.location.hash='#/'+r; }); },
  call:function(fn){ fresh(function(){ var w=W(); try{ w.tfDevBillUser(); }catch(e){} var p=fn.split('+'); p.forEach(function(x,i){ setTimeout(function(){ try{ w[x]({}); }catch(e){ console.log(x,e); } },1200+i*1500); }); }); },
  term:function(){ fresh(function(){ var w=W(); try{ w.tfDevBillUser(); }catch(e){} w.TF_PREVIEW=true; w.location.hash='#/trade'; setTimeout(function(){ try{ w.TF_PREVIEW=true; w.tfDashView(); }catch(e){} },1500); }); },
  reset:function(){ fresh(function(){}); }
};
  return acts;
};
