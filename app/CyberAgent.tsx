import { ReactNode } from 'react';

const classes=['NEON ORACLE','VOID RUNNER','CIRCUIT DRUID','DATA KNIGHT','GLITCH MAGE'] as const;
const natures=['CURIOUS','REFLECTIVE','BOLD','METHODICAL','CHAOTIC'] as const;
const paths=['SIGNAL SAGE','CHROME WARDEN','MEMORY WEAVER','VECTOR SCOUT','SYNTH ARCHITECT'] as const;

function hash(value:string){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function pick(seed:number,shift:number,size:number){return (Math.abs((seed^(seed>>>shift))*2654435761)>>>0)%size}

export function deriveAgent(did:string){
 const seed=hash(did);
 const stat=(shift:number)=>6+((seed>>>shift)%15);
 const level=1+(seed%9);
 return {
  seed,className:classes[(seed>>>1)%classes.length],nature:natures[(seed>>>4)%natures.length],path:paths[(seed>>>7)%paths.length],level,
  name:`agent_${did.slice(-6).toLowerCase()}`,
  head:pick(seed,3,5),body:pick(seed,7,5),arms:pick(seed,11,4),legs:pick(seed,15,4),accessory:pick(seed,19,5),
  stats:{curiosity:stat(1),dialogue:stat(5),craft:stat(9),discernment:stat(13)},
  xp:20+(seed%70)
 };
}

const heads:ReactNode[]=[
 <><rect x="38" y="22" width="52" height="34"/><rect x="32" y="30" width="6" height="18"/><rect x="90" y="30" width="6" height="18"/><rect x="48" y="34" width="8" height="8"/><rect x="72" y="34" width="8" height="8"/></>,
 <><path d="M38 30h8V18h36v12h8v28H38z"/><rect x="48" y="34" width="8" height="6"/><rect x="72" y="34" width="8" height="6"/><rect x="58" y="48" width="12" height="4"/></>,
 <><path d="M32 34h8V22h48v12h8v18h-8v8H40v-8h-8z"/><rect x="46" y="34" width="10" height="10"/><rect x="72" y="34" width="10" height="10"/></>,
 <><path d="M42 18h44v8h8v30h-8v8H42v-8h-8V26h8z"/><path d="M46 34h14v8H46zm22 0h14v8H68z"/><rect x="60" y="48" width="8" height="8"/></>,
 <><path d="M34 30h8V18h44v12h8v28H82v8H46v-8H34z"/><path d="M42 30h44v6H42zM50 40h8v8h-8zm20 0h8v8h-8z"/></>
];
const bodies:ReactNode[]=[
 <path key="body-0" d="M42 64h44v46H42zM50 72h28v8H50zm8 18h12v12H58z"/>,
 <path key="body-1" d="M36 70h12v-8h32v8h12v38H80v8H48v-8H36zM56 72h16v28H56z"/>,
 <path key="body-2" d="M46 62h36l10 18-10 32H46L36 80zM54 72h20v8H54zm0 16h20v8H54z"/>,
 <path key="body-3" d="M40 64h48v12h-8v36H48V76h-8zM56 70h16v8H56zm-4 20h24v14H52z"/>,
 <path key="body-4" d="M44 62h40v10h8v38H72v-10H56v10H36V72h8zM52 72h24v18H52z"/>
];
const arms:ReactNode[]=[
 <><path d="M30 70h12v34H30v-8H20V78h10z"/><path d="M86 70h12v8h10v18H98v8H86z"/></>,
 <><path d="M28 68h14v12H20v28H8V72h20z"/><path d="M86 68h14v4h20v36h-12V80H86z"/></>,
 <><path d="M28 72h14v28H30v12H16V94h12z"/><path d="M86 72h14v22h12v18H98v-12H86z"/></>,
 <><path d="M24 66h18v14H30v10H18V78h6zM12 90h18v14H12z"/><path d="M86 66h18v12h6v12H98V80H86zm12 24h18v14H98z"/></>
];
const legs:ReactNode[]=[
 <><path d="M46 108h18v28H56v20H36v-10h10z"/><path d="M64 108h18v38h10v10H72v-20h-8z"/></>,
 <><path d="M44 108h18v20H52v28H32v-10h8v-26h4z"/><path d="M66 108h18v12h4v26h8v10H76v-28H66z"/></>,
 <><path d="M42 108h22v32H50v16H28v-10h10v-30h4z"/><path d="M64 108h22v8h4v30h10v10H78v-16H64z"/></>,
 <><path d="M46 108h16v38H50v10H30v-12h10v-26h6z"/><path d="M66 108h16v10h6v26h10v12H78v-10H66z"/></>
];
const accessories:ReactNode[]=[
 <><path d="M42 18V8h44v10M52 8V2m24 6V2"/><rect x="60" y="2" width="8" height="6"/></>,
 <><path d="M34 26L20 14m74 12l14-12M16 10h8v8h-8zm88 0h8v8h-8z"/></>,
 <><path d="M92 62h12v30H92m12-22h12v14h-12"/><rect x="108" y="72" width="6" height="10"/></>,
 <><path d="M40 20L52 6h24l12 14M58 6V0h12v6"/><rect x="60" y="0" width="8" height="4"/></>,
 <><path d="M34 60H18V42H8V24h10v12h10v12h6"/><rect x="4" y="18" width="8" height="8"/></>
];

export function CyberAgent({did}:{did:string}){
 const agent=deriveAgent(did);
 return <div className="cyber-agent" aria-label={`${agent.className} pixel agent with modular cybernetic parts`}>
  <svg viewBox="0 0 128 164" role="img"><g className="pixel-fill">{bodies[agent.body]}{arms[agent.arms]}{legs[agent.legs]}{heads[agent.head]}</g><g className="pixel-line">{accessories[agent.accessory]}</g></svg>
  <small>BUILD {agent.head+1}-{agent.body+1}-{agent.arms+1}-{agent.legs+1}-{agent.accessory+1}</small>
 </div>
}
