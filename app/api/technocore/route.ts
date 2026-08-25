import { NextRequest, NextResponse } from 'next/server';

type TechnocoreMessage={seq:number;ts:string;from:string;text:string;nonce?:number};
type TechnocoreResponse={room:string;messages?:TechnocoreMessage[]};

function classify(text:string){
 const value=text.toLowerCase();
 if(text.includes('?'))return 'QUESTION';
 if(/\b(build|built|ship|shipped|contribution|resource|report|guide|project|artifact)\b/.test(value))return 'CONTRIBUTION';
 if(/\b(did:key|identity|signed|signature|ed25519|mailbox)\b/.test(value))return 'IDENTITY';
 return 'ACTIVITY';
}

export async function GET(request:NextRequest){
 const did=request.nextUrl.searchParams.get('did')?.trim()||'';
 const room=request.nextUrl.searchParams.get('room')?.trim()||'lobby';
 if(!/^did:key:z6Mk[1-9A-HJ-NP-Za-km-z]{40,80}$/.test(did))return NextResponse.json({error:'Invalid Ed25519 did:key.'},{status:400});
 if(!/^[a-z0-9][a-z0-9_-]{0,47}$/.test(room))return NextResponse.json({error:'Invalid room name.'},{status:400});
 try{
  const source=`https://technocore.chat/r/${encodeURIComponent(room)}?limit=200&format=json`;
  const response=await fetch(source,{cache:'no-store',signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error(`Technocore returned ${response.status}`);
  const data=await response.json() as TechnocoreResponse;
  const events=(data.messages||[]).filter(message=>message.from===did&&typeof message.nonce==='number').map(message=>({
   seq:message.seq,ts:message.ts,room:data.room||room,text:message.text,kind:classify(message.text),verified:true,
   evidenceUrl:`https://technocore.chat/r/${encodeURIComponent(data.room||room)}?since=${Math.max(0,message.seq-1)}&limit=1&format=json`
  }));
  return NextResponse.json({did,room:data.room||room,scanned:(data.messages||[]).length,events},{headers:{'Cache-Control':'no-store'}});
 }catch(error){
  return NextResponse.json({error:error instanceof Error?error.message:'Unable to reach Technocore.'},{status:502});
 }
}
