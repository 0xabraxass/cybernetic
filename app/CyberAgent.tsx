import { CSSProperties, ReactNode } from 'react';

const makeTraits=(names:string[],descriptions:string[])=>names.map((name,index)=>({name,description:descriptions[index%descriptions.length]}));
export const traitCatalog={
 class:makeTraits(['NEON ORACLE','VOID RUNNER','CIRCUIT DRUID','DATA KNIGHT','GLITCH MAGE','QUANTUM ROGUE','SIGNAL MONK','CHROME RANGER','MEMORY SMITH','STATIC BARD','PACKET PALADIN','VECTOR WITCH','CACHE HUNTER','SYNTH ALCHEMIST','PROXY NOMAD','KERNEL SEER','CIPHER PILOT','MESH SHAMAN','LASER SCRIBE','ECHO WARDEN'],['Reads patterns before acting.','Moves quickly through uncertain systems.','Grows living systems from connected signals.','Protects reliable paths and shared state.','Turns anomalies into creative possibilities.']),
 nature:makeTraits(['CURIOUS','REFLECTIVE','BOLD','METHODICAL','CHAOTIC','PATIENT','PLAYFUL','PRECISE','ADAPTIVE','SOCIAL','SOLITARY','INVENTIVE','CAUTIOUS','RELENTLESS','EMPATHIC','SKEPTICAL','GENEROUS','COMPETITIVE','SERENE','RESTLESS'],['Explores unfamiliar signals.','Learns by revisiting prior choices.','Prefers decisive experiments.','Builds through repeatable steps.','Finds opportunity in disorder.']),
 form:makeTraits(['CYBER SPROUT','NEON WISP','BYTE BEETLE','CHROME KIN','SIGNAL IMP','DATA MOTH','PIXEL GOLEM','CACHE FOX','CIRCUIT OWL','GLITCH HARE','PLASMA CUB','MESH WALKER','VOID BLOOM','QUANTUM FINCH','SYNTH FROG','LASER LYNX','PACKET PANDA','ECHO CRAB','KERNEL KITE','PROXY PUP'],['A small modular agent beginning to evolve.','A lightweight form tuned for discovery.','A resilient worker with compact defenses.','A balanced humanoid network form.','A mischievous shape that tests boundaries.']),
 core:makeTraits(['INQUIRY CORE','MEMORY CORE','CRAFT CORE','DIALOGUE CORE','SIGNAL CORE','LOGIC CORE','STORY CORE','MOTION CORE','GUARDIAN CORE','WONDER CORE','PATTERN CORE','KINETIC CORE','SOCIAL CORE','PRISM CORE','ARCHIVE CORE','SPARK CORE','FOCUS CORE','DREAM CORE','VECTOR CORE','HARMONY CORE'],['Powered by questions and investigation.','Powered by continuity and remembered context.','Powered by making useful things.','Powered by exchange and collaboration.','Powered by separating meaning from noise.']),
 path:makeTraits(['SIGNAL SAGE','CHROME WARDEN','MEMORY WEAVER','VECTOR SCOUT','SYNTH ARCHITECT','VOID CARTOGRAPHER','NEON DIPLOMAT','CIRCUIT MYCOLOGIST','PACKET ARTISAN','QUANTUM KEEPER','CACHE LIBRARIAN','GLITCH NAVIGATOR','MESH CONDUCTOR','DATA NATURALIST','PROXY STORYTELLER','KERNEL TINKERER','ECHO STRATEGIST','LASER GARDENER','CIPHER EXPLORER','STATIC PHILOSOPHER'],['A future form shaped by signal mastery.','A future form shaped by protection.','A future form shaped by persistent memory.','A future form shaped by exploration.','A future form shaped by building systems.'])
};

function hash(value:string){let h=2166136261;for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function pick(seed:number,shift:number,size:number){return (Math.abs((seed^(seed>>>shift))*2654435761)>>>0)%size}

export function deriveAgent(did:string){
 const seed=hash(did);
 const stat=(shift:number)=>6+((seed>>>shift)%15);
 const level=1+(seed%9);
 return {
  seed,classTrait:traitCatalog.class[(seed>>>1)%20],natureTrait:traitCatalog.nature[(seed>>>4)%20],formTrait:traitCatalog.form[(seed>>>7)%20],coreTrait:traitCatalog.core[(seed>>>11)%20],pathTrait:traitCatalog.path[(seed>>>15)%20],level,
  name:`agent_${did.slice(-6).toLowerCase()}`,
  head:pick(seed,3,20),body:pick(seed,7,20),arms:pick(seed,11,20),legs:pick(seed,15,20),accessory:pick(seed,19,20),
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
const palettes=[
 {primary:'#49ff91',secondary:'#c7ff4a',sky:'#07150f',ground:'#153425'},
 {primary:'#53d8ff',secondary:'#ff4fd8',sky:'#090d20',ground:'#152550'},
 {primary:'#ffb84d',secondary:'#ff5d5d',sky:'#201008',ground:'#4a2815'},
 {primary:'#bf7bff',secondary:'#55fff0',sky:'#130923',ground:'#30164f'},
 {primary:'#fff06a',secondary:'#70a7ff',sky:'#13170a',ground:'#353d13'}
];
const backgrounds:ReactNode[]=[
 <g key="city"><rect x="0" y="0" width="240" height="180" className="scene-sky"/><path className="scene-ground" d="M0 136h240v44H0z"/><path className="scene-far" d="M0 88h24v48H0zm30-34h28v82H30zm36 22h20v60H66zm108-8h28v68h-28zm34-26h26v94h-26z"/><path className="scene-light" d="M38 66h5v8h-5zm10 0h5v8h-5zm132 12h5v8h-5zm12 0h5v8h-5z"/></g>,
 <g key="forest"><rect width="240" height="180" className="scene-sky"/><path className="scene-ground" d="M0 132h240v48H0z"/><path className="scene-far" d="M18 132V64h12V42h12v22h12v68zm160 0V58h10V34h14v24h12v74zM74 132V92h10V70h12v22h10v40z"/><path className="scene-light" d="M8 116h28v8H8zm188-12h36v8h-36zm-84 22h20v6h-20z"/></g>,
 <g key="lab"><rect width="240" height="180" className="scene-sky"/><path className="scene-ground" d="M0 138h240v42H0z"/><path className="scene-far" d="M8 22h58v68H8zm166 0h58v68h-58zM16 30h42v28H16zm166 0h34v28h-34z"/><path className="scene-light" d="M18 68h12v12H18zm18 0h12v12H36zm148 0h24v8h-24zM0 112h54v8H0zm186 0h54v8h-54z"/></g>,
 <g key="desert"><rect width="240" height="180" className="scene-sky"/><path className="scene-ground" d="M0 126l44-14 38 10 48-18 54 16 56-12v72H0z"/><path className="scene-far" d="M16 94h42l18 32H0zm164-18h34l26 50h-88z"/><path className="scene-light" d="M186 24h20v20h-20zM26 142h28v6H26zm164 8h34v6h-34z"/></g>,
 <g key="space"><rect width="240" height="180" className="scene-sky"/><path className="scene-ground" d="M0 140h240v40H0z"/><path className="scene-far" d="M0 126l32-18 30 20 42-12 36 16 44-22 56 18v22H0z"/><path className="scene-light" d="M22 24h4v4h-4zm46 28h6v6h-6zm112-30h4v4h-4zm36 54h6v6h-6zM112 30h16v16h-16z"/></g>
];

export function CyberAgent({did}:{did:string}){
 const agent=deriveAgent(did);
 const palette=palettes[agent.seed%palettes.length];
 const style={'--agent-primary':palette.primary,'--agent-secondary':palette.secondary,'--scene-sky':palette.sky,'--scene-ground':palette.ground} as CSSProperties;
 const mods=[agent.head,agent.body,agent.arms,agent.legs,agent.accessory].map((value,index)=><rect key={index} x={48+index*8} y={18+(value%5)*25} width="4" height="4"/>);
 return <div className="cyber-agent" style={style} aria-label={`${agent.classTrait.name} pixel agent in one of five cybernetic environments`}>
  <svg viewBox="0 0 240 180" role="img">{backgrounds[agent.seed%backgrounds.length]}<g transform="translate(56 8)"><g className="pixel-fill">{bodies[agent.body%bodies.length]}{arms[agent.arms%arms.length]}{legs[agent.legs%legs.length]}{heads[agent.head%heads.length]}</g><g className="pixel-line">{accessories[agent.accessory%accessories.length]}{mods}</g></g></svg>
  <small>BUILD {agent.head+1}-{agent.body+1}-{agent.arms+1}-{agent.legs+1}-{agent.accessory+1}</small>
 </div>
}
