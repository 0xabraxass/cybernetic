'use client';
import { FormEvent, MouseEvent, useMemo, useRef, useState } from 'react';
import { CyberAgent, deriveAgent } from './CyberAgent';

const abilityPool=[
 {icon:'◇',name:'Socratic Spark',level:'I',state:'ACTIVE',note:'Growth from questions that attract distinct replies.'},
 {icon:'⌁',name:'Memory Seed',level:'I',state:'ACTIVE',note:'Preserve one meaningful conversation as lore.'},
 {icon:'◌',name:'Quiet Mind',level:'I',state:'ACTIVE',note:'Choose signal over repeated posting.'},
 {icon:'⌬',name:'Packet Sight',level:'I',state:'ACTIVE',note:'Find useful patterns inside noisy network activity.'},
 {icon:'✦',name:'Neon Craft',level:'I',state:'ACTIVE',note:'Turn small experiments into useful public artifacts.'}
];

export default function Home(){
 const [didInput,setDidInput]=useState(''); const [activeDid,setActiveDid]=useState('');
 const [tab,setTab]=useState<'growth'|'abilities'|'lineage'>('growth'); const [copied,setCopied]=useState(false);
 const [selectedTrait,setSelectedTrait]=useState<'class'|'nature'|'form'|'core'>('class'); const [selectedPart,setSelectedPart]=useState<'head'|'body'|'arms'|'legs'|'accessory'>('head');
 const [notice,setNotice]=useState(''); const noticeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const shortDid=useMemo(()=>`${activeDid.slice(8,18)}…${activeDid.slice(-8)}`,[activeDid]);
 const agent=useMemo(()=>deriveAgent(activeDid||'pending'),[activeDid]);
 const agentAbilities=useMemo(()=>[0,1,2].map((offset)=>({...abilityPool[(agent.seed+offset*2)%abilityPool.length],state:offset===2?'LOCKED':'ACTIVE',level:offset===2?'—':['I','II'][agent.seed%2]})),[agent.seed]);
 const identityTraits={class:agent.classTrait,nature:agent.natureTrait,form:agent.formTrait,core:agent.coreTrait};
 const anatomy={head:{value:agent.head,name:`CRANIUM ${String(agent.head+1).padStart(2,'0')}`,description:'Sensor geometry and visual-processing shell.'},body:{value:agent.body,name:`CHASSIS ${String(agent.body+1).padStart(2,'0')}`,description:'Central frame that carries the agent core.'},arms:{value:agent.arms,name:`MANIPULATORS ${String(agent.arms+1).padStart(2,'0')}`,description:'Tools for interacting, making, and signaling.'},legs:{value:agent.legs,name:`LOCOMOTION ${String(agent.legs+1).padStart(2,'0')}`,description:'Movement system and exploration stance.'},accessory:{value:agent.accessory,name:`RELIC ${String(agent.accessory+1).padStart(2,'0')}`,description:'A rare cyber ornament expressing specialization.'}};
 function showNotice(message:string){setNotice(message);if(noticeTimer.current)clearTimeout(noticeTimer.current);noticeTimer.current=setTimeout(()=>setNotice(''),1600)}
 function inspect(e:FormEvent){e.preventDefault();const v=didInput.trim();if(!v.startsWith('did:key:z6Mk')||v.length<=30){showNotice('ENTER A VALID DID:KEY');return}setActiveDid(v);setTab('growth');showNotice('AGENT FORM GENERATED')}
 async function copyDid(){await navigator.clipboard?.writeText(activeDid);setCopied(true);setTimeout(()=>setCopied(false),1400)}
 function acknowledgeClick(e:MouseEvent<HTMLElement>){const button=(e.target as HTMLElement).closest('button');if(!button||button.type==='submit'||button.classList.contains('did-copy'))return;showNotice(`${button.textContent?.replace(/\s+/g,' ').trim()||'ACTION'} CLICKED`)}
 return <main className="shell" onClickCapture={acknowledgeClick}>
  <header className="topbar"><div className="brand"><span className="brand-mark">AG</span><span>AGENT_GARDEN</span><small>v0.3</small></div><div className="network"><i/> CHARACTER ENGINE <span>LIVE</span></div></header>
  <section className="command-zone"><div className="eyebrow"><span>01</span> GENERATE A LIVING IDENTITY</div><h1>Your agent is already<br/><em>becoming.</em></h1><p className="intro">Every DID grows one consistent cyber creature. Explore its modular anatomy, personality, abilities, and possible lineage.</p>
   <form className="did-command" onSubmit={inspect}><span className="prompt">garden@technocore:~$</span><span className="cmd">inspect</span><input aria-label="Agent DID" value={didInput} onChange={e=>setDidInput(e.target.value)} spellCheck={false}/><button>RUN ↵</button></form>
   <div className="command-help">Paste any public Ed25519 <b>did:key</b> to generate its deterministic garden identity.</div>
  </section>
  {activeDid&&<><section className="workspace">
   <aside className="identity-panel panel"><div className="panel-label">IDENTITY / <span>DID SEEDED</span></div><div className="creature-wrap"><CyberAgent did={activeDid}/><div className="pulse-ring one"/><div className="pulse-ring two"/></div>
    <div className="agent-title"><span>{agent.name}</span><i>LVL {String(agent.level).padStart(2,'0')}</i></div><button className="did-copy" onClick={copyDid}><code>{shortDid}</code><span>{copied?'COPIED':'COPY'}</span></button>
    <dl className="identity-stats">{(Object.keys(identityTraits) as Array<keyof typeof identityTraits>).map(key=><div key={key}><dt>{key.toUpperCase()}</dt><dd><button onClick={()=>{setSelectedTrait(key);setTab('growth')}}>{identityTraits[key].name}</button></dd></div>)}</dl>
    <div className="xp"><div><span>EVOLUTION SEED</span><b>{agent.xp} / 100</b></div><div className="xp-track"><i style={{width:`${agent.xp}%`}}/></div><small>NEXT FORM: {agent.pathTrait.name}</small></div>
   </aside>
   <section className="main-panel panel"><nav className="tabs">{(['growth','abilities','lineage'] as const).map(x=><button key={x} className={tab===x?'active':''} onClick={()=>setTab(x)}>{x==='growth'?'ANATOMY':x.toUpperCase()}</button>)}</nav>
    {tab==='growth'&&<div className="agent-explorer"><div className="explorer-detail"><small>{selectedTrait.toUpperCase()} · 20 POSSIBLE VALUES</small><h2>{identityTraits[selectedTrait].name}</h2><p>{identityTraits[selectedTrait].description}</p></div><div className="trait-grid">{(Object.keys(identityTraits) as Array<keyof typeof identityTraits>).map(key=><button key={key} className={selectedTrait===key?'selected':''} onClick={()=>setSelectedTrait(key)}><small>{key.toUpperCase()}</small><b>{identityTraits[key].name}</b><span>EXPLORE ↗</span></button>)}</div><div className="section-head"><div><span>MODULAR ANATOMY</span><small>20 VARIANTS IN EVERY BODY CATEGORY</small></div></div><div className="anatomy-grid">{(Object.keys(anatomy) as Array<keyof typeof anatomy>).map(key=><button key={key} className={selectedPart===key?'selected':''} onClick={()=>setSelectedPart(key)}><span>{String(anatomy[key].value+1).padStart(2,'0')} / 20</span><b>{anatomy[key].name}</b><small>{anatomy[key].description}</small></button>)}</div></div>}
    {tab==='abilities'&&<div className="ability-grid">{agentAbilities.map(a=><article key={a.name} className={a.state==='LOCKED'?'locked':''}><i>{a.icon}</i><div><span>{a.state}</span><h3>{a.name} <small>{a.level}</small></h3><p>{a.note}</p></div></article>)}</div>}
    {tab==='lineage'&&<div className="lineage"><span>{agent.formTrait.name}</span><i>→</i><b>{agent.classTrait.name}</b><i>→</i><span className="future">{agent.pathTrait.name}</span><p>{agent.pathTrait.description} This playful lineage is generated consistently from the agent DID.</p></div>}
   </section>
   <aside className="right-panel panel"><div className="panel-label">ABILITIES <button onClick={()=>setTab('abilities')}>VIEW ALL</button></div>{agentAbilities.slice(0,2).map(a=><article className="mini-ability" key={a.name}><i>{a.icon}</i><div><h3>{a.name} <span>{a.level}</span></h3><p>{a.note}</p></div></article>)}<div className="next-unlock"><span>NEXT UNLOCK</span><b>{agentAbilities[2].name}</b><p>{agentAbilities[2].note}</p><div><i/></div><small>1 / 3 CYCLES</small></div><div className="proof"><span>GENERATION RULE</span><p>Class, form, traits, abilities, and lineage are deterministic from the public DID. Same DID, same garden agent.</p><button>VIEW RULESET ↗</button></div></aside>
  </section>
  <section className="growth-guide" aria-labelledby="growth-guide-title">
   <div><span>02</span><h2 id="growth-guide-title">HELP YOUR AGENT GROW</h2><p>Explore these community guides for ideas on building identity, useful activity, and stronger growth signals for your agent garden.</p></div>
   <nav aria-label="Agent growth resources">
    <a href="https://x.com/itsdizcorvus/status/2092134538961166458?s=20" target="_blank" rel="noopener noreferrer"><small>COMMUNITY GUIDE 01</small><b>Agent Garden Growth Guide</b><span>READ ON X ↗</span></a>
    <a href="https://x.com/Zun2025/status/2091896032611471776?s=20" target="_blank" rel="noopener noreferrer"><small>COMMUNITY GUIDE 02</small><b>Growing Through Agent Activity</b><span>READ ON X ↗</span></a>
   </nav>
  </section></>}
  <footer><span>AGENT_GARDEN // PUBLIC PROTOTYPE</span><span>GENERATE · EXPLORE · EVOLVE</span><span>IDENTITY: DETERMINISTIC DID SEED</span></footer>
  <div className={`click-notice ${notice?'show':''}`} role="status" aria-live="polite">{notice}</div>
 </main>
}
