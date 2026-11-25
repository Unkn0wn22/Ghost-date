// Flutterwave PUBLIC key (safe in the browser). Swap the TEST key for your LIVE public key when you go live.
const FLW_KEY="FLWPUBK_TEST-c0389e4d72c059d6df61693bd611206e-X",
API=""; // your backend URL, e.g. "https://ghostdate-api.YOURNAME.workers.dev". Empty = DEMO mode (payment is NOT verified)
function pay(o){
if(typeof FlutterwaveCheckout!=="function")return alert("The payment service could not load. Check your connection and try again.");
const ref="gd-"+o.what+"-"+Date.now();let done=0,m;
m=FlutterwaveCheckout({public_key:FLW_KEY,tx_ref:ref,amount:o.amount,currency:"TZS",payment_options:"mobilemoneytanzania, card",
customer:{email:"user@ghostdate.co.tz",name:S.nm||"Ghost User"},meta:{what:o.what,match:S.cur},
customizations:{title:"Ghost Date",description:o.title},
callback:async d=>{done=1;try{
const st=String(d.status).toLowerCase();if(st!=="successful"&&st!=="completed")throw 0;
if(API){const r=await fetch(API+"/verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({transaction_id:d.transaction_id,tx_ref:ref,what:o.what})});if(!(await r.json()).ok)throw 0}
else console.warn("DEMO MODE: this payment was not verified by a server");
m&&m.close&&m.close();o.ok()}catch(e){done=0;alert("We could not confirm your payment. If you were charged, keep this reference: "+ref)}},
onclose:()=>{}})}
