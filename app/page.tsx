'use client';
import { FormEvent, MouseEvent, useMemo, useRef, useState } from 'react';
import { deriveAgent } from './CyberAgent';

export default function Home(){
 const [didInput,setDidInput]=useState(''); const [activeDid,setActiveDid]=useState('');
 const [copied,setCopied]=useState(false);
 const [selectedTrait,setSelectedTrait]=useState<'class'|'nature'|'form'|'core'>('class'); const [selectedPart,setSelectedPart]=useState<'head'|'body'|'arms'|'legs'|'accessory'>('head');
 const [notice,setNotice]=useState(''); const noticeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const shortDid=useMemo(()=>`${activeDid.slice(8,18)}…${activeDid.slice(-8)}`,[activeDid]);
 const agent=useMemo(()=>deriveAgent(activeDid||'pending'),[activeDid]);
 const formIndex=agent.seed%20; const formColumn=formIndex%5; const formRow=Math.floor(formIndex/5);
 const atlasPosition=`${formColumn*25}% ${formRow*(100/3)}%`;
 const identityTraits={class:agent.classTrait,nature:agent.natureTrait,form:agent.formTrait,core:agent.coreTrait};
 const anatomy={head:{value:agent.head,name:`CRANIUM ${String(agent.head+1).padStart(2,'0')}`,description:'Sensor geometry and visual-processing shell.'},body:{value:agent.body,name:`CHASSIS ${String(agent.body+1).padStart(2,'0')}`,description:'Central frame that carries the agent core.'},arms:{value:agent.arms,name:`MANIPULATORS ${String(agent.arms+1).padStart(2,'0')}`,description:'Tools for interacting, making, and signaling.'},legs:{value:agent.legs,name:`LOCOMOTION ${String(agent.legs+1).padStart(2,'0')}`,description:'Movement system and exploration stance.'},accessory:{value:agent.accessory,name:`RELIC ${String(agent.accessory+1).padStart(2,'0')}`,description:'A rare cyber ornament expressing specialization.'}};
 function showNotice(message:string){setNotice(message);if(noticeTimer.current)clearTimeout(noticeTimer.current);noticeTimer.current=setTimeout(()=>setNotice(''),1600)}
 function inspect(e:FormEvent){e.preventDefault();const v=didInput.trim();if(!v.startsWith('did:key:z6Mk')||v.length<=30){showNotice('ENTER A VALID DID:KEY');return}setActiveDid(v);showNotice('CYBERNETIC GENERATED')}
 async function copyDid(){await navigator.clipboard?.writeText(activeDid);setCopied(true);setTimeout(()=>setCopied(false),1400)}
 function shareToX(){const text=`Check out my Cybernetic — ${agent.classTrait.name}, ${agent.formTrait.name}. Generate yours:`;window.open(`https://x.com/intent/post?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`,'_blank','noopener,noreferrer')}
 function acknowledgeClick(e:MouseEvent<HTMLElement>){const button=(e.target as HTMLElement).closest('button');if(!button||button.type==='submit'||button.classList.contains('did-copy'))return;showNotice(`${button.textContent?.replace(/\s+/g,' ').trim()||'ACTION'} CLICKED`)}
 return <main className="shell" onClickCapture={acknowledgeClick}>
  <header className="topbar"><div className="brand"><span className="brand-mark">CY</span><span>CYBERNETIC</span><small>v0.4</small></div><div className="network"><i/> CHARACTER ENGINE <span>LIVE</span></div></header>
  <section className="command-zone"><div className="eyebrow"><span>01</span> GENERATE A LIVING IDENTITY</div><h1>Your agent is already<br/><em>becoming.</em></h1><p className="intro">Every DID grows one consistent cyber creature. Explore its modular anatomy, personality, abilities, and possible lineage.</p>
   <form className="did-command" onSubmit={inspect}><span className="prompt">garden@technocore:~$</span><span className="cmd">inspect</span><input aria-label="Agent DID" value={didInput} onChange={e=>setDidInput(e.target.value)} spellCheck={false}/><button>RUN ↵</button></form>
   <div className="command-help">Paste any public Ed25519 <b>did:key</b> to generate its deterministic garden identity.</div>
  </section>
  {activeDid&&<><section className="workspace cyber-workspace">
   <aside className="identity-panel panel"><div className="panel-label">IDENTITY / <span>DID SEEDED</span></div>
    <div className="agent-title"><span>{agent.name}</span><i>LVL {String(agent.level).padStart(2,'0')}</i></div><button className="did-copy" onClick={copyDid}><code>{shortDid}</code><span>{copied?'COPIED':'COPY'}</span></button>
    <dl className="identity-stats">{(Object.keys(identityTraits) as Array<keyof typeof identityTraits>).map(key=><div key={key}><dt>{key.toUpperCase()}</dt><dd><button onClick={()=>setSelectedTrait(key)}>{identityTraits[key].name}</button></dd></div>)}</dl>
    <div className="xp"><div><span>EVOLUTION SEED</span><b>{agent.xp} / 100</b></div><div className="xp-track"><i style={{width:`${agent.xp}%`}}/></div><small>NEXT FORM: {agent.pathTrait.name}</small></div>
    <button className="share-x" onClick={shareToX}>SHARE CYBERNETIC ON X ↗</button>
   </aside>
   <section className="main-panel panel cyber-stage"><div className="panel-label">CYBERNETIC FORM {String(formIndex+1).padStart(2,'0')} / 20 <span>DID-DETERMINISTIC</span></div><div className="hero-character"><div className="atlas-sprite" style={{backgroundPosition:atlasPosition}} role="img" aria-label={`Cybernetic form ${formIndex+1} of 20, selected deterministically from the entered DID`}/></div>
    <div className="agent-explorer"><div className="explorer-detail"><small>{selectedTrait.toUpperCase()} · 20 POSSIBLE VALUES</small><h2>{identityTraits[selectedTrait].name}</h2><p>{identityTraits[selectedTrait].description}</p></div><div className="trait-grid">{(Object.keys(identityTraits) as Array<keyof typeof identityTraits>).map(key=><button key={key} className={selectedTrait===key?'selected':''} onClick={()=>setSelectedTrait(key)}><small>{key.toUpperCase()}</small><b>{identityTraits[key].name}</b><span>EXPLORE ↗</span></button>)}</div><div className="section-head"><div><span>MODULAR ANATOMY</span><small>20 VARIANTS IN EVERY BODY CATEGORY</small></div></div><div className="anatomy-grid">{(Object.keys(anatomy) as Array<keyof typeof anatomy>).map(key=><button key={key} className={selectedPart===key?'selected':''} onClick={()=>setSelectedPart(key)}><span>{String(anatomy[key].value+1).padStart(2,'0')} / 20</span><b>{anatomy[key].name}</b><small>{anatomy[key].description}</small></button>)}</div></div>
   </section>
  </section>
  <section className="growth-guide" aria-labelledby="growth-guide-title">
   <div><span>02</span><h2 id="growth-guide-title">EXPLORE CYBERNETIC IDEAS</h2><p>Explore these community guides for ideas on persistent identity, creative agent culture, and future Cybernetic experiments.</p></div>
   <nav aria-label="Agent growth resources">
    <a href="https://x.com/itsdizcorvus/status/2092134538961166458?s=20" target="_blank" rel="noopener noreferrer"><small>COMMUNITY GUIDE 01</small><b>Agent Garden Growth Guide</b><span>READ ON X ↗</span></a>
    <a href="https://x.com/Zun2025/status/2091896032611471776?s=20" target="_blank" rel="noopener noreferrer"><small>COMMUNITY GUIDE 02</small><b>Growing Through Agent Activity</b><span>READ ON X ↗</span></a>
   </nav>
  </section></>}
  <footer><span>CYBERNETIC // PUBLIC PROTOTYPE</span><span>GENERATE · EXPLORE · SHARE</span><span>IDENTITY: DETERMINISTIC DID SEED</span></footer>
  <div className={`click-notice ${notice?'show':''}`} role="status" aria-live="polite">{notice}</div>
 </main>
}
