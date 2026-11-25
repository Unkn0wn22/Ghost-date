(()=>{if(!window.THREE)return;
const W=()=>innerWidth,H=()=>innerHeight,low=(navigator.hardwareConcurrency||4)<=4,rm=matchMedia("(prefers-reduced-motion:reduce)").matches,
r=new THREE.WebGLRenderer({canvas:$("#bg"),antialias:!low,alpha:true}),sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,1,.1,100),
col=new THREE.Color("#f5c542"),tg=new THREE.Color("#f5c542"),g=new THREE.IcosahedronGeometry(4.2,low?1:2),
solid=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x2a2060,flatShading:true,transparent:true,opacity:.6,roughness:.4,metalness:.3})),
wire=new THREE.Mesh(g,new THREE.MeshBasicMaterial({color:col,wireframe:true,transparent:true,opacity:.4})),
grp=new THREE.Group(),sh=[],pl=new THREE.PointLight(0xf5c542,1.5,40);
r.setPixelRatio(Math.min(devicePixelRatio,low?1:1.5));cam.position.z=9;grp.add(solid,wire);sc.add(grp);
for(let i=0;i<(low?10:22);i++){const m=new THREE.Mesh(new THREE.TetrahedronGeometry(.25+Math.random()*.5),new THREE.MeshBasicMaterial({color:0x7c5cff,wireframe:true,transparent:true,opacity:.5}));
m.position.set((Math.random()-.5)*20,(Math.random()-.5)*12,(Math.random()-.5)*8-2);m.userData.v=[Math.random()*.01,Math.random()*.01];sc.add(m);sh.push(m)}
sc.add(new THREE.AmbientLight(0x6655ff,.6));pl.position.set(-6,4,6);sc.add(pl);
let mx=0,my=0,run=true;
addEventListener("pointermove",e=>{mx=e.clientX/W()-.5;my=e.clientY/H()-.5});
addEventListener("deviceorientation",e=>{if(e.gamma!=null){mx=e.gamma/60;my=(e.beta-45)/90}});
function rs(){r.setSize(W(),H(),false);cam.aspect=W()/H();cam.updateProjectionMatrix();grp.position.x=W()>800?2.8:0;if(rm)loop()}
addEventListener("resize",rs);
document.addEventListener("visibilitychange",()=>{run=!document.hidden;if(run)loop()});
window.setPath=c=>tg.set(c);
function loop(t=0){if(!run)return;t*=.001;col.lerp(tg,.04);wire.material.color.copy(col);pl.color.copy(col);
grp.rotation.y=t*.12;grp.rotation.x=t*.06;grp.scale.setScalar(1+Math.sin(t)*.025);
sh.forEach(m=>{m.rotation.x+=m.userData.v[0];m.rotation.y+=m.userData.v[1]});
cam.position.x+=(mx*2-cam.position.x)*.04;cam.position.y+=(-my*1.5-cam.position.y)*.04;cam.lookAt(0,0,0);r.render(sc,cam);if(!rm)requestAnimationFrame(loop)}
rs();loop()})();
