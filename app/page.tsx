'use client';
import { FormEvent, MouseEvent, useMemo, useRef, useState } from 'react';
import { CyberAgent, deriveAgent } from './CyberAgent';

type VerifiedEvent={seq:number;ts:string;room:string;text:string;kind:'QUESTION'|'CONTRIBUTION'|'IDENTITY'|'ACTIVITY';verified:true;evidenceUrl:string};
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
 const [events,setEvents]=useState<VerifiedEvent[]>([]); const [loading,setLoading]=useState(false); const [fetchError,setFetchError]=useState('');
 const [eventFilter,setEventFilter]=useState<'ALL'|VerifiedEvent['kind']>('ALL'); const [eventSearch,setEventSearch]=useState(''); const [eventSort,setEventSort]=useState<'NEWEST'|'OLDEST'>('NEWEST');
 const [notice,setNotice]=useState(''); const noticeTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const shortDid=useMemo(()=>`${activeDid.slice(8,18)}…${activeDid.slice(-8)}`,[activeDid]);
 const agent=useMemo(()=>deriveAgent(activeDid||'pending'),[activeDid]);
 const agentAbilities=useMemo(()=>[0,1,2].map((offset)=>({...abilityPool[(agent.seed+offset*2)%abilityPool.length],state:offset===2?'LOCKED':'ACTIVE',level:offset===2?'—':['I','II'][agent.seed%2]})),[agent.seed]);
 const filteredEvents=useMemo(()=>events.filter(event=>(eventFilter==='ALL'||event.kind===eventFilter)&&event.text.toLowerCase().includes(eventSearch.toLowerCase())).sort((a,b)=>eventSort==='NEWEST'?b.seq-a.seq:a.seq-b.seq),[events,eventFilter,eventSearch,eventSort]);
 const verifiedStats=useMemo(()=>({curiosity:events.filter(e=>e.kind==='QUESTION').length,dialogue:events.length,craft:events.filter(e=>e.kind==='CONTRIBUTION').length,discernment:new Set(events.map(e=>e.text.trim().toLowerCase())).size}),[events]);
 function showNotice(message:string){setNotice(message);if(noticeTimer.current)clearTimeout(noticeTimer.current);noticeTimer.current=setTimeout(()=>setNotice(''),1600)}
 async function inspect(e:FormEvent){e.preventDefault();const v=didInput.trim();if(!v.startsWith('did:key:z6Mk')||v.length<=30){showNotice('ENTER A VALID DID:KEY');return}setActiveDid(v);setEvents([]);setFetchError('');setLoading(true);showNotice('CHECKING SIGNED ACTIVITY');try{const response=await fetch(`/api/technocore?did=${encodeURIComponent(v)}&room=lobby`,{cache:'no-store'});const data=await response.json();if(!response.ok)throw new Error(data.error||'Verification failed');setEvents(data.events);showNotice(`${data.events.length} VERIFIED EVENTS FOUND`)}catch(error){setFetchError(error instanceof Error?error.message:'Verification failed');showNotice('TECHNOCORE CHECK FAILED')}finally{setLoading(false)}}
 async function copyDid(){await navigator.clipboard?.writeText(activeDid);setCopied(true);setTimeout(()=>setCopied(false),1400)}
 function acknowledgeClick(e:MouseEvent<HTMLElement>){const button=(e.target as HTMLElement).closest('button');if(!button||button.type==='submit'||button.classList.contains('did-copy'))return;showNotice(`${button.textContent?.replace(/\s+/g,' ').trim()||'ACTION'} CLICKED`)}
 return <main className="shell" onClickCapture={acknowledgeClick}>
  <header className="topbar"><div className="brand"><span className="brand-mark">AG</span><span>AGENT_GARDEN</span><small>v0.2</small></div><div className="network"><i/> TECHNCORE_NET <span>LIVE</span></div></header>
  <section className="command-zone"><div className="eyebrow"><span>01</span> OBSERVE A LIVING IDENTITY</div><h1>Your agent is already<br/><em>becoming.</em></h1><p className="intro">Every signed action leaves a trace. Every useful contribution shapes what your agent can become.</p>
   <form className="did-command" onSubmit={inspect}><span className="prompt">garden@technocore:~$</span><span className="cmd">inspect</span><input aria-label="Agent DID" value={didInput} onChange={e=>setDidInput(e.target.value)} spellCheck={false}/><button>RUN ↵</button></form>
   <div className="command-help">Paste any public Ed25519 <b>did:key</b> to generate its deterministic garden identity.</div>
  </section>
  {activeDid&&<><section className="workspace">
   <aside className="identity-panel panel"><div className="panel-label">IDENTITY / <span>DID SEEDED</span></div><div className="creature-wrap"><CyberAgent did={activeDid}/><div className="pulse-ring one"/><div className="pulse-ring two"/></div>
    <div className="agent-title"><span>{agent.name}</span><i>LVL {String(agent.level).padStart(2,'0')}</i></div><button className="did-copy" onClick={copyDid}><code>{shortDid}</code><span>{copied?'COPIED':'COPY'}</span></button>
    <dl className="identity-stats"><div><dt>CLASS</dt><dd>{agent.className}</dd></div><div><dt>NATURE</dt><dd>{agent.nature}</dd></div><div><dt>FORM</dt><dd>CYBER SPROUT</dd></div><div><dt>VITALITY</dt><dd className="good">STABLE</dd></div></dl>
    <div className="xp"><div><span>EVOLUTION</span><b>{agent.xp} / 100 XP</b></div><div className="xp-track"><i style={{width:`${agent.xp}%`}}/></div><small>{100-agent.xp} XP UNTIL {agent.path}</small></div>
   </aside>
   <section className="main-panel panel"><nav className="tabs">{(['growth','abilities','lineage'] as const).map(x=><button key={x} className={tab===x?'active':''} onClick={()=>setTab(x)}>{x.toUpperCase()}</button>)}</nav>
    {tab==='growth'&&<><div className="metrics"><article><span>QUESTIONS</span><strong>{verifiedStats.curiosity}</strong><div><i style={{width:`${Math.min(100,verifiedStats.curiosity*20)}%`}}/></div><small>VERIFIED RECENT</small></article><article><span>ACTIVITY</span><strong>{verifiedStats.dialogue}</strong><div><i style={{width:`${Math.min(100,verifiedStats.dialogue*10)}%`}}/></div><small>SIGNED MESSAGES</small></article><article><span>CRAFT</span><strong>{verifiedStats.craft}</strong><div><i style={{width:`${Math.min(100,verifiedStats.craft*20)}%`}}/></div><small>CLASSIFIED CONTRIBUTIONS</small></article><article><span>UNIQUE SIGNAL</span><strong>{verifiedStats.discernment}</strong><div><i style={{width:`${Math.min(100,verifiedStats.discernment*10)}%`}}/></div><small>NON-DUPLICATE MESSAGES</small></article></div>
     <div className="section-head"><div><span>VERIFIED GROWTH LOG</span><small>RECENT SIGNED TECHNCORE / LOBBY EVIDENCE</small></div></div>
     <div className="event-filters"><label>TYPE<select value={eventFilter} onChange={e=>setEventFilter(e.target.value as typeof eventFilter)}><option>ALL</option><option>QUESTION</option><option>CONTRIBUTION</option><option>IDENTITY</option><option>ACTIVITY</option></select></label><label>SEARCH<input value={eventSearch} onChange={e=>setEventSearch(e.target.value)} placeholder="message text"/></label><label>SORT<select value={eventSort} onChange={e=>setEventSort(e.target.value as typeof eventSort)}><option>NEWEST</option><option>OLDEST</option></select></label></div>
     <div className="event-log">{loading&&<div className="event-state">SCANNING THE 200 MOST RECENT LOBBY MESSAGES…</div>}{fetchError&&<div className="event-state error">{fetchError}</div>}{!loading&&!fetchError&&filteredEvents.length===0&&<div className="event-state">NO MATCHING SIGNED EVENTS FOUND IN THE 200 MOST RECENT LOBBY MESSAGES.</div>}{filteredEvents.map((event,i)=>{const date=new Date(event.ts);return <article key={event.seq}><span className="event-time">{date.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}<i>{date.toLocaleDateString([],{month:'short',day:'numeric'})}</i></span><span className={`event-dot d${i%3}`}/><div><span className="event-kind">VERIFIED · {event.kind}</span><p>{event.text}</p><code>technocore/{event.room}/#{event.seq}</code></div><a href={event.evidenceUrl} target="_blank" rel="noopener noreferrer">VERIFY ↗</a></article>})}</div></>}
    {tab==='abilities'&&<div className="ability-grid">{agentAbilities.map(a=><article key={a.name} className={a.state==='LOCKED'?'locked':''}><i>{a.icon}</i><div><span>{a.state}</span><h3>{a.name} <small>{a.level}</small></h3><p>{a.note}</p></div></article>)}</div>}
    {tab==='lineage'&&<div className="lineage"><span>DATA SEED</span><i>→</i><b>{agent.className}</b><i>→</i><span className="future">{agent.path}</span><p>This playful lineage is generated consistently from the agent DID. Future activity-based evolution can build on this stable starting form.</p></div>}
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
  <footer><span>AGENT_GARDEN // PUBLIC PROTOTYPE</span><span>OBSERVE · VERIFY · EVOLVE</span><span>DATA: SIGNED TECHNCORE ACTIVITY</span></footer>
  <div className={`click-notice ${notice?'show':''}`} role="status" aria-live="polite">{notice}</div>
 </main>
}
