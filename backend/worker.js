// Cloudflare Worker: verifies Flutterwave payments on the server.
// Setup: create a KV namespace bound as PAID; add secrets FLW_SECRET (your FLWSECK key) and FLW_HASH (webhook secret hash).
const ALLOW="https://mpembenzelu07.github.io",PRICES={unlock:1500,whatsapp:2000};
const cors={"Access-Control-Allow-Origin":ALLOW,"Access-Control-Allow-Headers":"Content-Type"};
const j=(o,c=200)=>new Response(JSON.stringify(o),{status:c,headers:{...cors,"Content-Type":"application/json"}});
async function verify(id,env){const r=await fetch("https://api.flutterwave.com/v3/transactions/"+encodeURIComponent(id)+"/verify",{headers:{Authorization:"Bearer "+env.FLW_SECRET}});return (await r.json()).data||{}}
export default{async fetch(req,env){
const u=new URL(req.url);
if(req.method=="OPTIONS")return new Response(null,{headers:cors});
if(u.pathname=="/verify"&&req.method=="POST"){
const{transaction_id,tx_ref,what}=await req.json();
if(!PRICES[what]||!String(tx_ref).startsWith("gd-"+what+"-"))return j({ok:false},400);
if(await env.PAID.get(tx_ref))return j({ok:false,reason:"already used"}); // stops one payment unlocking twice
const d=await verify(transaction_id,env);
const ok=d.status=="successful"&&d.currency=="TZS"&&d.tx_ref==tx_ref&&d.amount>=PRICES[what];
if(ok)await env.PAID.put(tx_ref,JSON.stringify({what,id:transaction_id})); // TODO: also save which user and which match was unlocked
return j({ok})}
if(u.pathname=="/webhook"&&req.method=="POST"){
if(req.headers.get("verif-hash")!==env.FLW_HASH)return new Response("no",{status:401});
const e=await req.json(); // re-check e.data.id with verify(), then fulfil the order (covers users who close the tab early)
return new Response("ok")}
return new Response("Ghost Date API")}}
