(function(){
  const canvas=document.getElementById('tc');
  const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setSize(innerWidth,innerHeight);
  renderer.shadowMap.enabled=true;
  renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x030a03,0.055);
  const cam=new THREE.PerspectiveCamera(52,innerWidth/innerHeight,0.1,100);
  cam.position.set(0,0.8,7.5);
  scene.add(new THREE.AmbientLight(0xfff8e7,0.45));
  const kl=new THREE.SpotLight(0xffe4a0,3.2,22,Math.PI/5,0.38,1.1);
  kl.position.set(3,8,5);kl.castShadow=true;kl.shadow.mapSize.set(2048,2048);
  scene.add(kl);scene.add(kl.target);
  const fl=new THREE.SpotLight(0xb0c4ff,1.1,16,Math.PI/4,0.5);
  fl.position.set(-5,3,3);scene.add(fl);
  const rl=new THREE.DirectionalLight(0x3a6a2a,0.7);rl.position.set(0,-2,-5);scene.add(rl);
  const pl=new THREE.PointLight(0xC4872A,1.6,9);pl.position.set(0,3,2);scene.add(pl);
  const shGeo=new THREE.BoxGeometry(17,0.22,3.4);
  const shMat=new THREE.MeshPhongMaterial({color:0x3A1E06,shininess:70,specular:0x8B5A2B});
  const sh=new THREE.Mesh(shGeo,shMat);sh.position.set(0,-1.74,0);sh.receiveShadow=true;scene.add(sh);
  const rfGeo=new THREE.BoxGeometry(17,0.01,3.4);
  const rfMat=new THREE.MeshPhongMaterial({color:0x6B4020,shininess:250,specular:0xffffff,transparent:true,opacity:0.28});
  scene.add(new THREE.Mesh(rfGeo,rfMat)).position.set(0,-1.63,0);
  const wGeo=new THREE.PlaneGeometry(22,12);
  scene.add(new THREE.Mesh(wGeo,new THREE.MeshPhongMaterial({color:0x050f05,shininess:5}))).position.set(0,2,-3.5);
  const jD=[
    {nm:'Turmeric',bc:0xE8A020,sc:0xF5C010,lc:0x4A2A08,x:-3.4},
    {nm:'Cinnamon',bc:0x9B5523,sc:0x7B3A10,lc:0x2E1506,x:-1.7},
    {nm:'Paprika', bc:0xC0301B,sc:0xA02010,lc:0x3A1008,x: 0.0},
    {nm:'Cardamom',bc:0x2D6A2D,sc:0x1A4A1A,lc:0x0D2A0D,x: 1.7},
    {nm:'Rosemary',bc:0x4A7C4E,sc:0x2D5A30,lc:0x152A17,x: 3.4},
  ];
  const jgs=[];
  jD.forEach((d,i)=>{
    const g=new THREE.Group();g.position.set(d.x,-0.22,0);
    const jR=0.40,jH=1.75;
    const glGeo=new THREE.CylinderGeometry(jR,jR*0.88,jH,48,1,true);
    const glMat=new THREE.MeshPhongMaterial({color:0xd0eaf5,transparent:true,opacity:0.2,shininess:320,specular:0xffffff,side:THREE.FrontSide});
    g.add(new THREE.Mesh(glGeo,glMat));
    const glBGeo=new THREE.CylinderGeometry(jR*0.97,jR*0.85,jH,48,1,true);
    const glBMat=new THREE.MeshPhongMaterial({color:0xa8d0de,transparent:true,opacity:0.09,shininess:220,specular:0x88ccee,side:THREE.BackSide});
    g.add(new THREE.Mesh(glBGeo,glBMat));
    const hGeo=new THREE.CylinderGeometry(jR+0.01,jR*0.89+0.01,jH*0.65,6,1,true,0.1,0.22);
    const hM=new THREE.Mesh(hGeo,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0.07,side:THREE.FrontSide}));
    hM.position.y=0.14;g.add(hM);
    const bM=new THREE.Mesh(new THREE.CylinderGeometry(jR*0.88,jR*0.88,0.08,48),new THREE.MeshPhongMaterial({color:0xb0d0e0,transparent:true,opacity:0.48,shininess:200}));
    bM.position.y=-(jH/2)+0.04;g.add(bM);
    const spM=new THREE.Mesh(new THREE.CylinderGeometry(jR*0.83,jR*0.80,jH*0.54,32),new THREE.MeshPhongMaterial({color:d.sc,shininess:6}));
    spM.position.y=-(jH*0.21);g.add(spM);
    const tpM=new THREE.Mesh(new THREE.SphereGeometry(jR*0.83,24,12,0,Math.PI*2,0,Math.PI*0.33),new THREE.MeshPhongMaterial({color:new THREE.Color(d.sc).multiplyScalar(1.22),shininess:4}));
    tpM.position.y=spM.position.y+jH*0.27;g.add(tpM);
    const lbGeo=new THREE.CylinderGeometry(jR+0.005,jR*0.885+0.005,jH*0.40,48,1,true,0.5,Math.PI*1.32);
    g.add(new THREE.Mesh(lbGeo,new THREE.MeshPhongMaterial({color:0xFAF7F0,shininess:2,side:THREE.DoubleSide}))).position=new THREE.Vector3(0,0.07,0);
    const bdGeo=new THREE.CylinderGeometry(jR+0.006,jR*0.886+0.006,0.11,48,1,true,0.5,Math.PI*1.32);
    const bdM=new THREE.Mesh(bdGeo,new THREE.MeshPhongMaterial({color:d.bc,shininess:28,side:THREE.DoubleSide}));
    bdM.position.y=0.39;g.add(bdM);
    const rgM=new THREE.Mesh(new THREE.TorusGeometry(jR+0.01,0.028,12,48),new THREE.MeshPhongMaterial({color:0xbcc8d2,shininess:260,specular:0xffffff}));
    rgM.position.y=jH/2-0.09;g.add(rgM);
    const ckM=new THREE.Mesh(new THREE.CylinderGeometry(jR+0.02,jR+0.02,0.27,32),new THREE.MeshPhongMaterial({color:d.lc,shininess:22,specular:new THREE.Color(d.lc).multiplyScalar(0.5)}));
    ckM.position.y=jH/2+0.135;ckM.castShadow=true;g.add(ckM);
    const ctM=new THREE.Mesh(new THREE.CylinderGeometry(jR+0.04,jR+0.04,0.07,32),new THREE.MeshPhongMaterial({color:d.lc,shininess:38,specular:new THREE.Color(d.lc).multiplyScalar(0.58)}));
    ctM.position.y=jH/2+0.305;g.add(ctM);
    const cbM=new THREE.Mesh(new THREE.TorusGeometry(jR+0.04,0.022,8,32),new THREE.MeshPhongMaterial({color:new THREE.Color(d.lc).multiplyScalar(0.68),shininess:55}));
    cbM.position.y=jH/2+0.305;g.add(cbM);
    const sdM=new THREE.Mesh(new THREE.CircleGeometry(0.43,32),new THREE.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0.26}));
    sdM.rotation.x=-Math.PI/2;sdM.position.set(0,-(jH/2)+0.002,0.1);g.add(sdM);
    g.children[0].castShadow=true;
    g.userData={by:g.position.y,fs:0.38+i*0.11,fa:0.072+i*0.008,fo:i*(Math.PI*2/5)};
    scene.add(g);jgs.push(g);
  });
  const dN=500,dP=new Float32Array(dN*3),dC=new Float32Array(dN*3);
  const dCs=[[0.91,0.63,0.1],[0.75,0.18,0.1],[0.17,0.42,0.17],[0.55,0.25,0.06],[0.88,0.72,0.08]];
  for(let i=0;i<dN;i++){dP[i*3]=(Math.random()-0.5)*18;dP[i*3+1]=(Math.random()-0.5)*9;dP[i*3+2]=(Math.random()-0.5)*8-1;const c=dCs[Math.floor(Math.random()*dCs.length)];dC[i*3]=c[0];dC[i*3+1]=c[1];dC[i*3+2]=c[2];}
  const dGeo=new THREE.BufferGeometry();dGeo.setAttribute('position',new THREE.BufferAttribute(dP,3));dGeo.setAttribute('color',new THREE.BufferAttribute(dC,3));
  scene.add(new THREE.Points(dGeo,new THREE.PointsMaterial({size:0.033,vertexColors:true,transparent:true,opacity:0.25})));
  let mx=0,my=0;
  document.addEventListener('mousemove',e=>{mx=(e.clientX/innerWidth-0.5);my=-(e.clientY/innerHeight-0.5);});
  const ck=new THREE.Clock();
  (function ani(){
    requestAnimationFrame(ani);
    const t=ck.getElapsedTime();
    jgs.forEach(jg=>{const u=jg.userData;jg.position.y=u.by+Math.sin(t*u.fs+u.fo)*u.fa;jg.rotation.y=mx*0.24+Math.sin(t*0.17+u.fo)*0.028;});
    const dp=dGeo.attributes.position.array;
    for(let i=0;i<dN;i++){dp[i*3+1]+=0.003;if(dp[i*3+1]>4.5)dp[i*3+1]=-4.5;}
    dGeo.attributes.position.needsUpdate=true;
    pl.position.x=Math.sin(t*0.5)*1.4;pl.intensity=1.2+Math.sin(t*0.8)*0.28;
    cam.position.x+=(mx*0.48-cam.position.x)*0.04;
    cam.position.y+=(my*0.24+0.8-cam.position.y)*0.04;
    cam.lookAt(0,0.2,0);renderer.render(scene,cam);
  })();
  window.addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
})();
window.addEventListener('scroll',()=>{
  const s=scrollY;
  document.getElementById('nav').classList.toggle('sc',s>60);
  document.getElementById('btt').classList.toggle('vs',s>400);
});
function tgMenu(){document.getElementById('hbg').classList.toggle('op');document.getElementById('mm').classList.toggle('op');document.body.style.overflow=document.getElementById('mm').classList.contains('op')?'hidden':'';}

const cats2=['All','Blends','Global Fusions','Extracts','Natural Spices & Herbs','Grinders','Mixes','Crunch Toppers'];
const prods=[
  // BLENDS
  {id:1,nm:"Herbes de Provence",cat:"Blends",bg:"Organic",or:"France · Organic, Salt-Free",img:"https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&auto=format&fit=crop&q=80",dc:"Classic French blend of lavender, thyme, rosemary and savory. Authentic and aromatic — elevates roasted chicken, lamb and vegetables beautifully.",fl:"Floral, Herbal, Aromatic",ht:"None",org:true,ig:"Thyme, Rosemary, Savory, Lavender, Marjoram",pr:"Chicken, Lamb, Vegetables",sz:[{l:"25g",p:380},{l:"50g",p:680}]},
  {id:2,nm:"Mexican Seasoning Blend",cat:"Blends",bg:"Organic",or:"Organic · Salt-Free",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",dc:"Our organic version highlights cumin & paprika. Great for classic Mexican dishes, meats, sauces and eggs. No salt added.",fl:"Bold, Smoky, Earthy",ht:"Medium",org:true,ig:"Cumin, Onion, Garlic, Paprika, Cilantro, Red Pepper, Coriander, Oregano",pr:"Tacos, Fajitas, Salsa, Eggs",sz:[{l:"40g",p:350},{l:"80g",p:620}]},
  {id:3,nm:"Italian Seasoning",cat:"Blends",bg:"Organic",or:"Italy-inspired · Organic",img:"https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=600&auto=format&fit=crop&q=80",dc:"More basil, less oregano — a more authentic Italian blend than pizza seasoning. Perfect for pasta, sauces and breads.",fl:"Herbal, Basil-forward, Aromatic",ht:"None",org:true,ig:"Basil, Oregano, Thyme, Rosemary, Marjoram",pr:"Pasta, Sauces, Bread, Pizza",sz:[{l:"25g",p:320},{l:"50g",p:580}]},
  {id:4,nm:"Turkish Mulling Spice",cat:"Blends",bg:null,or:"Turkey-inspired",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=80",dc:"A warming holiday blend of cinnamon, cloves, allspice and orange peel. Perfect for mulled wine, cider and festive drinks.",fl:"Warm, Sweet, Spiced",ht:"None",org:false,ig:"Cinnamon, Cloves, Allspice, Orange Peel, Cardamom",pr:"Mulled Wine, Cider, Holiday Baking",sz:[{l:"40g",p:380},{l:"80g",p:680}]},
  {id:5,nm:"Pumpkin Pie Spice",cat:"Blends",bg:null,or:"USA-inspired",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",dc:"Cinnamon, ginger, nutmeg, cloves, cardamom and star anise. The definitive pumpkin spice blend for baking and coffee.",fl:"Warm, Sweet, Cinnamon-forward",ht:"None",org:false,ig:"Cinnamon, Ginger, Nutmeg, Cloves, Cardamom, Star Anise",pr:"Pumpkin Pie, Lattes, Baking",sz:[{l:"40g",p:350}]},
  {id:6,nm:"BBQ Spice Gift Set",cat:"Blends",bg:"Gift",or:"Various Origins",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",dc:"Five essential BBQ spices beautifully boxed and ready to gift: Smoked Paprika, Garlic Powder, Cumin, Black Pepper & Chili Flakes.",fl:"Smoky, Bold, Savory",ht:"Medium",org:false,ig:"Smoked Paprika, Garlic, Cumin, Black Pepper, Chili",pr:"All Meats, Corn, Potatoes",sz:[{l:"Gift Set x5",p:2200}]},
  // GLOBAL FUSIONS
  {id:7,nm:"Smoky Turmeric Rub",cat:"Global Fusions",bg:"New",or:"Southwest India-inspired",img:"https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&auto=format&fit=crop&q=80",dc:"Inspired by southwest India where turmeric originated. Turmeric meets smoked paprika, garlic and ancho chile. A colorful, tasty rub. Heat: 1/5.",fl:"Smoky, Earthy, Turmeric-warm",ht:"Mild (1/5)",org:false,ig:"Sea Salt, Turmeric, Smoked Paprika, Garlic, Ancho Chile, Cumin, Onion",pr:"Chicken, Shrimp, Vegetables, Rice",sz:[{l:"68g",p:480},{l:"Bulk 200g",p:1200}]},
  {id:8,nm:"Spicy Garlic Rub",cat:"Global Fusions",bg:"Bestseller",or:"North Africa-inspired (Harissa)",img:"https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=600&auto=format&fit=crop&q=80",dc:"Inspired by harissa, the national condiment of Tunisia. Chiles with robust garlic and crystallized lemon. Bold and fiery. Great on fish or stews.",fl:"Bold, Garlicky, Spicy",ht:"Hot (4/5)",org:false,ig:"Chile Pepper, Garlic, Sea Salt, Red Pepper, Crystallized Lemon, Coriander, Cumin, Caraway",pr:"Fish, Lamb, Stews, Couscous, Sweet Potatoes",sz:[{l:"57g",p:480},{l:"Bulk 200g",p:1200}]},
  {id:9,nm:"Coriander Lime Rub",cat:"Global Fusions",bg:null,or:"Thailand-inspired",img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80",dc:"Inspired by the lush fields of Thailand. Fragrant coriander seed with bright lime tartness. Delicious on chicken, tofu, fish and vegetables. Heat: 1.5/5.",fl:"Citrus, Floral, Bright",ht:"Mild (1.5/5)",org:false,ig:"Coriander, Lime, Sea Salt, Garlic, Ginger, Pepper",pr:"Chicken, Tofu, Fish, Rice, Vegetables",sz:[{l:"54g",p:480},{l:"Bulk 200g",p:1200}]},
  {id:10,nm:"Chipotle Cinnamon Rub",cat:"Global Fusions",bg:null,or:"Mexico-inspired",img:"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80",dc:"The unexpected combination of smoky chipotle and warm cinnamon, inspired by Mexican mole traditions. Deep and complex on pork or beef.",fl:"Smoky, Warm, Chocolate-hint",ht:"Medium (2.5/5)",org:false,ig:"Chipotle, Cinnamon, Sea Salt, Brown Sugar, Cumin, Garlic",pr:"Pork, Beef, Chocolate Desserts",sz:[{l:"57g",p:480},{l:"Bulk 200g",p:1200}]},
  {id:11,nm:"Mild Sriracha Rub",cat:"Global Fusions",bg:null,or:"Thailand-inspired",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",dc:"The beloved sriracha flavor in a dry rub. Sweet chile heat with garlic and a hint of vinegar tang. Perfect on wings, burgers and grilled corn.",fl:"Sweet-Heat, Garlicky, Tangy",ht:"Medium (2/5)",org:false,ig:"Chile, Garlic, Sea Salt, Vinegar Powder, Cane Sugar",pr:"Wings, Burgers, Grilled Corn, Tofu",sz:[{l:"57g",p:480},{l:"Bulk 200g",p:1200}]},
  {id:12,nm:"Tandoori Rub",cat:"Global Fusions",bg:null,or:"North India-inspired",img:"https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&auto=format&fit=crop&q=80",dc:"The classic North Indian tandoor spice blend. Fragrant with cumin, coriander, turmeric and warming spices. Extraordinary on grilled meats.",fl:"Warm, Earthy, Aromatic",ht:"Mild-Medium (2/5)",org:false,ig:"Cumin, Coriander, Turmeric, Paprika, Ginger, Garlic, Cardamom, Cayenne",pr:"Chicken, Lamb, Paneer, Cauliflower",sz:[{l:"57g",p:480},{l:"Bulk 200g",p:1200}]},
  {id:13,nm:"Smoky Chile Rub",cat:"Global Fusions",bg:null,or:"Southwest USA-inspired",img:"https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&auto=format&fit=crop&q=80",dc:"A deep, smoky chile blend inspired by Southwestern BBQ. Ancho, chipotle and guajillo chiles with smoked paprika and cumin. Bold on beef.",fl:"Smoky, Bold, Chile-deep",ht:"Medium-Hot (3/5)",org:false,ig:"Ancho Chile, Chipotle, Smoked Paprika, Cumin, Sea Salt, Garlic",pr:"Beef, Pork Ribs, Brisket",sz:[{l:"57g",p:480},{l:"Bulk 200g",p:1200}]},
  // EXTRACTS
  {id:14,nm:"Pure Madagascar Vanilla Extract",cat:"Extracts",bg:"Premium",or:"Madagascar",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=80",dc:"Pure Madagascar vanilla extract with rich, complex flavour. The Spice Hunter's signature extract — no artificial ingredients, just real vanilla beans.",fl:"Sweet, Rich, Floral",ht:"None",org:true,ig:"Madagascar Vanilla Beans, Alcohol, Water",pr:"Baking, Ice Cream, Pastries, Coffee",sz:[{l:"60ml",p:750},{l:"120ml",p:1350}]},
  // NATURAL SPICES & HERBS
  {id:15,nm:"Turmeric, Ground",cat:"Natural Spices & Herbs",bg:"Organic",or:"India · Certified Organic",img:"https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=600&auto=format&fit=crop&q=80",dc:"Vibrant antioxidant-packed turmeric ground from the rhizome of a ginger-like plant. Warm, earthy flavour — essential in Indian & Moroccan cooking.",fl:"Earthy, Warm, Slightly Bitter",ht:"None",org:true,ig:"100% Organic Turmeric",pr:"Curries, Rice, Marinades, Stews, Golden Milk",sz:[{l:"50g",p:250},{l:"100g",p:450},{l:"250g",p:950}]},
  {id:16,nm:"Saigon Cinnamon, Ground",cat:"Natural Spices & Herbs",bg:"Premium",or:"Vietnam · First in USA to sell",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=80",dc:"The Spice Hunter was first in the USA to sell Saigon Cinnamon. Sweeter and more aromatic than regular cinnamon. Ground from Vietnamese bark.",fl:"Sweet, Intense, Aromatic",ht:"None",org:false,ig:"100% Saigon Cinnamon (Cinnamomum loureirii)",pr:"Oatmeal, Baking, Chai, Middle Eastern Dishes",sz:[{l:"50g",p:320},{l:"100g",p:580}]},
  {id:17,nm:"Turkish Bay Leaves, Whole",cat:"Natural Spices & Herbs",bg:null,or:"Turkey · Shade-dried",img:"https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&auto=format&fit=crop&q=80",dc:"Turkish bay leaves are shade-dried, giving a more aromatic and complex flavour than California bay. A Spice Hunter specialty for Sunday sauce.",fl:"Herbal, Floral, Complex",ht:"None",org:false,ig:"100% Turkish Bay Leaves",pr:"Sunday Sauce, Stews, Soups, Braises",sz:[{l:"8g",p:280},{l:"20g",p:580}]},
  {id:18,nm:"Allspice, Jamaican, Whole",cat:"Natural Spices & Herbs",bg:null,or:"Jamaica",img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80",dc:"Distinctive, mild, sweet and peppery. Named because it combines the flavour of cinnamon, cloves and nutmeg in one berry. Whole berries for freshness.",fl:"Sweet, Peppery, Warm",ht:"None",org:false,ig:"100% Jamaican Allspice Berries",pr:"Bean Dishes, Rice, Meat, Spiced Cookies, Jerk Seasoning",sz:[{l:"35g",p:280},{l:"70g",p:500}]},
  {id:19,nm:"Cumin, Ground",cat:"Natural Spices & Herbs",bg:"Organic",or:"Egypt-origin · Organic",img:"https://images.unsplash.com/photo-1612197527762-8cfb4b634a24?w=600&auto=format&fit=crop&q=80",dc:"Seeds from a small herb plant native to Egypt. Strong, spicy aroma and earthy, warm flavour. Essential to Mexican and Indian dishes worldwide.",fl:"Earthy, Nutty, Warm",ht:"None",org:true,ig:"100% Organic Cumin",pr:"Mexican Dishes, Indian Curries, Spice Rubs",sz:[{l:"50g",p:220},{l:"100g",p:400},{l:"250g",p:850}]},
  {id:20,nm:"Paprika, Ground",cat:"Natural Spices & Herbs",bg:null,or:"Hungary & Spain",img:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",dc:"Dried, ground mild chile peppers known for bright red colour and mild, sweet flavour. Adds colour to salads, stews, chili and deviled eggs.",fl:"Mild, Sweet, Earthy-Red",ht:"None",org:false,ig:"100% Paprika",pr:"Potato Salad, Stews, Chili, Deviled Eggs",sz:[{l:"50g",p:200},{l:"100g",p:380}]},
  // GRINDERS
  {id:21,nm:"Indian Ocean Sea Salt Grinder",cat:"Grinders",bg:"Organic",or:"Indian Ocean · Organic",img:"https://images.unsplash.com/photo-1612197527762-8cfb4b634a24?w=600&auto=format&fit=crop&q=80",dc:"Pure Indian Ocean sea salt in a premium ceramic grinder. Organic certified. No anti-caking agents. Coarse crystals for fresh-ground salt at the table.",fl:"Clean, Mineral, Pure",ht:"None",org:true,ig:"100% Organic Sea Salt",pr:"Everything — finishing salt",sz:[{l:"85g grinder",p:580}]},
  {id:22,nm:"Peppercorn Blend Grinder",cat:"Grinders",bg:null,or:"Vietnam & India",img:"https://images.unsplash.com/photo-1612197527762-8cfb4b634a24?w=600&auto=format&fit=crop&q=80",dc:"Black, white, red and green peppercorns blended for complexity and aroma. Freshly ground flavour with every twist. A kitchen essential.",fl:"Bold, Spicy, Aromatic",ht:"Medium",org:false,ig:"Black Pepper, White Pepper, Red Pepper, Green Pepper",pr:"Meats, Pasta, Sauces, Salads",sz:[{l:"85g grinder",p:620}]},
  {id:23,nm:"Himalayan Pink Salt Grinder",cat:"Grinders",bg:null,or:"Pakistan · Himalayan",img:"https://images.unsplash.com/photo-1612197527762-8cfb4b634a24?w=600&auto=format&fit=crop&q=80",dc:"Pure Himalayan pink salt in a refillable ceramic grinder. Trace minerals give a subtle, complex flavour beyond regular table salt.",fl:"Clean, Mineral, Subtle",ht:"None",org:false,ig:"100% Himalayan Pink Salt",pr:"Everything — finishing and cooking",sz:[{l:"85g grinder",p:620}]},
  // MIXES
  {id:24,nm:"Turkey Brine Mix",cat:"Mixes",bg:"#1 Seller",or:"USA",img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80",dc:"The Spice Hunter's #1 selling product. A perfect blend of herbs, salt and aromatics for the juiciest, most flavourful roast turkey you've ever made.",fl:"Herbal, Savory, Aromatic",ht:"None",org:false,ig:"Salt, Brown Sugar, Herbs, Garlic, Peppercorn, Bay Leaves, Allspice",pr:"Turkey, Chicken, Pork Roast",sz:[{l:"280g",p:1200}]},
  {id:25,nm:"Saigon Cinnamon French Toast Mix",cat:"Mixes",bg:null,or:"Vietnam Cinnamon",img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=600&auto=format&fit=crop&q=80",dc:"Featuring signature Saigon cinnamon and warm spices, this mix makes extraordinary French toast in minutes. Just add eggs and milk.",fl:"Sweet, Cinnamon-intense, Vanilla",ht:"None",org:false,ig:"Saigon Cinnamon, Vanilla, Nutmeg, Cardamom, Flour",pr:"French Toast, Pancakes, Waffles",sz:[{l:"180g",p:650}]},
  // CRUNCH TOPPERS
  {id:26,nm:"Everything Bagel Crunch",cat:"Crunch Toppers",bg:"Trending",or:"Salt-Free · Non-GMO · Gluten-Free",img:"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80",dc:"The iconic everything bagel blend — garlic, onion, sesame seeds, poppy seeds and black sesame. Add texture and savory crunch to any dish.",fl:"Savory, Nutty, Garlicky",ht:"None",org:false,ig:"Sesame Seed, Garlic, Black Sesame Seeds, Toasted Onion, Onion, Poppy Seeds",pr:"Bagels, Avocado Toast, Sweet Potato, Ice Cream, Salads",sz:[{l:"60g",p:380},{l:"120g",p:650}]},
  {id:27,nm:"7 Seed Crunch",cat:"Crunch Toppers",bg:null,or:"Salt-Free · Non-GMO · Gluten-Free",img:"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80",dc:"All the seeds in one bottle. Hemp, chia, golden flax, sesame and poppy seeds. A nutritional powerhouse topper for any dish.",fl:"Nutty, Earthy, Wholesome",ht:"None",org:false,ig:"Golden Flax, Black Sesame, Sesame, Hemp, Chia, Toasted Sesame, Poppy Seeds",pr:"Guacamole, Salads, Smoothie Bowls, Yogurt, Salmon",sz:[{l:"60g",p:350},{l:"120g",p:600}]},
  {id:28,nm:"Garden Veggie Crunch",cat:"Crunch Toppers",bg:null,or:"Salt-Free · Non-GMO · Gluten-Free",img:"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=600&auto=format&fit=crop&q=80",dc:"A fresh veggie-forward crunch topper with garden herbs, seeds and dehydrated vegetables. Light, fresh and addictive on salads or soups.",fl:"Fresh, Veggie, Herbal",ht:"None",org:false,ig:"Seeds, Herbs, Dehydrated Vegetables",pr:"Salads, Soups, Avocado Toast, Eggs",sz:[{l:"60g",p:350},{l:"120g",p:600}]},
  {id:29,nm:"Zesty Italian Crunch",cat:"Crunch Toppers",bg:null,or:"Salt-Free · Non-GMO · Gluten-Free",img:"https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=600&auto=format&fit=crop&q=80",dc:"Italian herbs meet crunchy seeds for a zesty topper. Red pepper complements all your pizza, bread, soups and pasta with a satisfying crunch.",fl:"Herbal, Zesty, Peppery",ht:"Mild",org:false,ig:"Seeds, Italian Herbs, Red Pepper, Garlic, Oregano",pr:"Pizza, Bread, Pasta, Soups",sz:[{l:"60g",p:350},{l:"120g",p:600}]},
  {id:30,nm:"Roasted Garlic & Onion Crunch",cat:"Crunch Toppers",bg:null,or:"Salt-Free · Non-GMO · Gluten-Free",img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop&q=80",dc:"Roasted garlic and toasted onion with crunchy seeds. Rich, savory and deeply flavourful. The perfect finishing topper for meats, grains and soups.",fl:"Savory, Roasted, Deep",ht:"None",org:false,ig:"Sesame Seeds, Roasted Garlic, Toasted Onion, Poppy Seeds",pr:"Meats, Grain Bowls, Soups, Roasted Veg",sz:[{l:"60g",p:350},{l:"120g",p:600}]},
];
let cart=[],curP=null,curS=0,curC='All';
function bCats(){document.getElementById('cats').innerHTML=cats2.map(c=>`<button class="cb2${c==='All'?' ac':''}" onclick="fByCat('${c}',this)">${c}</button>`).join('');}
function fByCat(c,btn){curC=c;document.querySelectorAll('.cb2').forEach(b=>b.classList.remove('ac'));btn.classList.add('ac');const q=document.getElementById('sip').value.toLowerCase();rProds(prods.filter(p=>(c==='All'||p.cat===c)&&mch(p,q)));}
function srchP(){const q=document.getElementById('sip').value.toLowerCase();rProds(prods.filter(p=>(curC==='All'||p.cat===curC)&&mch(p,q)));}
function mch(p,q){return p.nm.toLowerCase().includes(q)||p.cat.toLowerCase().includes(q)||p.fl.toLowerCase().includes(q)||p.or.toLowerCase().includes(q);}
function rProds(data){document.getElementById('pg').innerHTML=data.length?data.map(p=>`<div class="pc" onclick="opMod(${p.id})"><div class="piw"><img class="pim" src="${p.img}" alt="${p.nm}" loading="lazy">${p.bg?`<div class="pbg">${p.bg}</div>`:''}</div><div class="pin"><p class="pct">${p.cat}${p.org?' &middot; Organic':''}</p><h3 class="pn">${p.nm}</h3><p class="pd">${p.dc.substring(0,78)}...</p><div class="pts"><span class="pt">${p.fl.split(',')[0].trim()}</span>${p.ht!=='None'?`<span class="pt">&#x1F336; ${p.ht}</span>`:''}</div><div class="pft"><div class="pp">KSh ${p.sz[0].p} <span>/ ${p.sz[0].l}</span></div><button class="pad" onclick="event.stopPropagation();qAdd(${p.id})">+ Add</button></div></div></div>`).join(''):'<p style="color:var(--tm);font-size:14px;padding:40px 0;grid-column:1/-1">No products found.</p>';}
function opMod(id){curP=prods.find(p=>p.id===id);curS=0;const p=curP;document.getElementById('mimg').src=p.img;document.getElementById('mimg').alt=p.nm;document.getElementById('mor').textContent=p.or.toUpperCase();document.getElementById('mn').textContent=p.nm;document.getElementById('mdc').textContent=p.dc;document.getElementById('mat').innerHTML=[['Category',p.cat],['Flavor',p.fl],['Heat Level',p.ht],['Organic',p.org?'Yes — Certified':'No'],['Best With',p.pr]].map(([l,v])=>`<div class="mat"><span class="ml">${l}</span><span class="mv">${v}</span></div>`).join('');document.getElementById('szs').innerHTML=p.sz.map((s,i)=>`<button class="sz ${i===0?'ac':''}" onclick="selSz(${i},this)">${s.l}</button>`).join('');updPr();document.getElementById('madb').onclick=()=>addC(p,curS);document.getElementById('mov').classList.add('op');document.body.style.overflow='hidden';}
function selSz(i,btn){curS=i;document.querySelectorAll('.sz').forEach(b=>b.classList.remove('ac'));btn.classList.add('ac');updPr();}
function updPr(){document.getElementById('mpr').textContent=`KSh ${curP.sz[curS].p}`;}
function clsMov(e){if(e.target===document.getElementById('mov'))clsMD();}
function clsMD(){document.getElementById('mov').classList.remove('op');document.body.style.overflow='';}
function addC(p,si){const s=p.sz[si];const ex=cart.find(i=>i.id===p.id&&i.s===s.l);if(ex)ex.q++;else cart.push({id:p.id,nm:p.nm,img:p.img,s:s.l,p:s.p,q:1});updCart();tst2(`${p.nm} (${s.l}) added!`);clsMD();}
function qAdd(id){const p=prods.find(x=>x.id===id);const s=p.sz[0];const ex=cart.find(i=>i.id===id&&i.s===s.l);if(ex)ex.q++;else cart.push({id,nm:p.nm,img:p.img,s:s.l,p:s.p,q:1});updCart();tst2(`${p.nm} added!`);}
function rmC(i){cart.splice(i,1);updCart();}
function updCart(){const cnt=cart.reduce((s,i)=>s+i.q,0);const tot=cart.reduce((s,i)=>s+i.p*i.q,0);document.getElementById('cb').textContent=cnt;document.getElementById('cta').textContent=`KSh ${tot.toLocaleString()}`;const el=document.getElementById('ci2');if(!cart.length){el.innerHTML='<div class="ce">Your cart is empty<br><br>Add some spices!</div>';return;}el.innerHTML=cart.map((it,i)=>`<div class="cit"><img src="${it.img}" alt="${it.nm}" onerror="this.style.display='none'"><div class="cid"><div class="cin">${it.nm}</div><div class="csz">${it.s} &times; ${it.q}</div><div class="cip">KSh ${(it.p*it.q).toLocaleString()}</div></div><button class="crm" onclick="rmC(${i})">&#x2715;</button></div>`).join('');}
function tgCart(){document.getElementById('cs').classList.toggle('op');}
function checkout(){tst2('Contact us on WhatsApp to complete your order!');}
const hD=[
  {lb:"Toasting Spices",tt:"The Art of Toasting",sb:"Unlock deeper flavour",tx:"Toasting whole spices in a dry pan unlocks essential oils that dramatically transform their flavour. Heat a heavy pan over medium heat. Add whole spices in a single layer, shake gently for 1–3 minutes until fragrant. Never walk away — they burn in seconds. Transfer to a cool plate and grind once cooled.",hi:"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=900&auto=format&fit=crop&q=80",rc:[{img:"https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&auto=format&fit=crop&q=80",nm:"Toasted Cumin Dal",tm:"30 min"},{img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&auto=format&fit=crop&q=80",nm:"Spiced Lamb Stew",tm:"2 hrs"}],pr:["Cumin + Coriander","Cardamom + Cinnamon","Mustard + Fenugreek"]},
  {lb:"Building Flavour",tt:"Layering Your Spices",sb:"Three-stage method",tx:"Great spiced dishes are built in layers. Whole spices go in hot oil first — they bloom and sizzle. Ground spices mid-cook get 2 minutes to cook out their raw flavour. Finish with fresh herbs off the heat to preserve their brightness. This three-stage approach is the backbone of East African, Indian and Middle Eastern cuisine.",hi:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&auto=format&fit=crop&q=80",rc:[{img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&auto=format&fit=crop&q=80",nm:"Kenyan Pilau",tm:"1 hr"},{img:"https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=400&auto=format&fit=crop&q=80",nm:"Vegetable Biryani",tm:"90 min"}],pr:["Whole → Ground → Fresh","Dry → Bloom → Braise"]},
  {lb:"Storage Guide",tt:"Keep Spices Fresh",sb:"Shelf life & storage",tx:"Whole spices: 3–4 years. Ground spices: 1–2 years. Always store airtight, away from heat, light and moisture. The spice rack above your stove looks beautiful — but steam and heat are the enemy. A cool dark drawer extends life dramatically. Do the smell test: no aroma means no flavour.",hi:"https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=900&auto=format&fit=crop&q=80",rc:[{img:"https://images.unsplash.com/photo-1612197527762-8cfb4b634a24?w=400&auto=format&fit=crop&q=80",nm:"Freshness Test Guide",tm:"5 min read"},{img:"https://images.unsplash.com/photo-1587049352851-8d4e89133924?w=400&auto=format&fit=crop&q=80",nm:"Refresh Stale Spices",tm:"10 min"}],pr:["Airtight jars always","Away from heat & light","Whole outlasts ground"]},
  {lb:"Perfect Pairings",tt:"What Goes With What",sb:"Flavour pairing guide",tx:"Warm spices (cinnamon, cardamom, cloves) harmonize in sweet and savoury dishes alike. Earthy spices — cumin, coriander, turmeric — form the backbone of curry bases worldwide. Bright spices like sumac and coriander seed cut through rich, fatty dishes. Spices from the same cuisine almost always work together.",hi:"https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=900&auto=format&fit=crop&q=80",rc:[{img:"https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400&auto=format&fit=crop&q=80",nm:"Spiced Chai Masala",tm:"15 min"},{img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&auto=format&fit=crop&q=80",nm:"Slow-Roast Chicken",tm:"3 hrs"}],pr:["Cumin + Turmeric + Coriander","Cinnamon + Cardamom + Cloves","Paprika + Garlic + Oregano"]},
];
function rHowto(){document.getElementById('hnv').innerHTML=hD.map((h,i)=>`<div class="hni ${i===0?'ac':''}" onclick="shH(${i},this)"><div class="hnu">0${i+1}</div><span class="hlb">${h.lb}</span></div>`).join('');document.getElementById('hbd').innerHTML=hD.map((h,i)=>`<div class="hart ${i===0?'ac':''}" id="h${i}"><img class="hhi" src="${h.hi}" alt="${h.tt}" loading="lazy"><p class="hsu">${h.sb}</p><h3 class="htt">${h.tt}</h3><p class="htx">${h.tx}</p><div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--tm);margin-bottom:11px">Recipes</div><div class="rg">${h.rc.map(r=>`<div class="rc"><img class="ri" src="${r.img}" alt="${r.nm}" loading="lazy"><div class="ro"><div class="rn">${r.nm}</div><div class="rt">${r.tm}</div></div></div>`).join('')}</div><div style="font-size:9px;letter-spacing:3px;text-transform:uppercase;color:var(--tm);margin:20px 0 10px">Pairings</div><div class="pr">${h.pr.map(p=>`<span class="pi">${p}</span>`).join('')}</div></div>`).join('');}
function shH(i,el){document.querySelectorAll('.hni').forEach(n=>n.classList.remove('ac'));document.querySelectorAll('.hart').forEach(a=>a.classList.remove('ac'));el.classList.add('ac');document.getElementById(`h${i}`).classList.add('ac');}
const rvs=[
  {nm:"Amina K.",lc:"Westlands, Nairobi",st:5,tx:"The turmeric is unlike anything I&apos;ve bought before. The colour and aroma are so vivid — pure and fresh. My curries have never tasted better!"},
  {nm:"Brian O.",lc:"Karen, Nairobi",st:5,tx:"Ordered the BBQ gift set for my dad. He absolutely loved it. The smoked paprika alone is worth the price. Fast delivery to Karen!"},
  {nm:"Fatuma M.",lc:"Mombasa",st:5,tx:"Finally found real Ceylon cinnamon. So delicate and fragrant — completely different from what I&apos;ve been using. My chai is transformed."},
  {nm:"David N.",lc:"Kileleshwa, Nairobi",st:4,tx:"The Korean BBQ blend is incredible. Complex and warming. I used it on beef and my whole family asked where I got it. Reordering soon."},
  {nm:"Grace W.",lc:"Thika",st:5,tx:"Pure spices with no chemicals — exactly what my grandmother used. Delivery to Thika was faster than expected!"},
  {nm:"James K.",lc:"Kilimani, Nairobi",st:5,tx:"The website made it so easy to know how to use each spice. Packaging is beautiful and everything smells incredibly fresh."},
];
function rRevs(){document.getElementById('rvg').innerHTML=rvs.map(r=>`<div class="rvc"><div class="rs">${[1,2,3,4,5].map(s=>`<span class="star${s<=r.st?'':' e'}">&#x2605;</span>`).join('')}</div><p class="rtx">${r.tx}</p><div class="rr"><div class="rav">${r.nm[0]}</div><div><div class="rnm">${r.nm}</div><div class="rlc">${r.lc}</div></div></div></div>`).join('');}
const qD=[
  {q:"What are you cooking tonight?",os:["A rich curry or stew","Grilled meat or BBQ","Baked goods or tea","A fresh salad or soup"]},
  {q:"What flavour mood are you in?",os:["Warm & earthy","Bold & smoky","Sweet & aromatic","Light & herby"]},
  {q:"How adventurous are you feeling?",os:["Give me something classic","I love bold flavours","Something exotic please","Keep it simple & safe"]},
];
const qRs=[
  {e:"&#x1F33F;",s:"Turmeric",d:"Golden, earthy and deeply nourishing. Turmeric brings warmth and colour to your dish tonight. Try it in a curry base with cumin and coriander.",id:7},
  {e:"&#x1F336;&#xFE0F;",s:"Smoky Paprika",d:"Bold, deep and gloriously smoky. Perfect for rubbing on meat or adding intensity to any dish. Unmistakably delicious.",id:1},
  {e:"&#x1FAD9;",s:"Cardamom",d:"Exotic, floral and wonderfully complex. Cardamom will elevate your baking or chai into something truly special.",id:5},
  {e:"&#x1FAB5;",s:"Ceylon Cinnamon",d:"Warm, sweet and universally loved. Our most versatile spice — perfect for anything tonight.",id:8},
];
let qAns=[];
function rQuiz(){document.getElementById('qpg').innerHTML=qD.map((_,i)=>`<div class="qdt" id="qd${i}"></div>`).join('');document.getElementById('qsts').innerHTML=qD.map((q,i)=>`<div class="qst ${i===0?'ac':''}" id="qs${i}"><div class="qq">${q.q}</div><div class="qos">${q.os.map((o,j)=>`<button class="qo" onclick="slQ(${i},${j},this)">${o}</button>`).join('')}</div></div>`).join('')+`<div class="qst" id="qsr"><div class="qrs" id="qrb"></div><button class="qrst" onclick="rstQ()" style="margin-top:16px">&#x21BA; Try Again</button></div>`;document.getElementById('qd0').classList.add('ac');}
function slQ(si,oi,btn){document.querySelectorAll(`#qs${si} .qo`).forEach(b=>b.classList.remove('sl'));btn.classList.add('sl');qAns[si]=oi;setTimeout(()=>{document.getElementById(`qs${si}`).classList.remove('ac');if(si<qD.length-1){document.getElementById(`qs${si+1}`).classList.add('ac');document.getElementById(`qd${si+1}`).classList.add('ac');}else shQR();},380);}
function shQR(){const r=qRs[qAns[0]||0];document.getElementById('qsr').classList.add('ac');document.getElementById('qrb').innerHTML=`<div class="qre">${r.e}</div><div class="qrsp">${r.s}</div><p class="qrd">${r.d}</p><button class="ba" onclick="opMod(${r.id})">Shop ${r.s} &rarr;</button>`;}
function rstQ(){qAns=[];document.querySelectorAll('.qst').forEach(s=>s.classList.remove('ac'));document.querySelectorAll('.qdt').forEach(d=>d.classList.remove('ac'));document.getElementById('qs0').classList.add('ac');document.getElementById('qd0').classList.add('ac');document.querySelectorAll('.qo').forEach(b=>b.classList.remove('sl'));}
const faqs=[
  {q:"How long do your spices stay fresh?",a:"Whole spices last 3–4 years, ground spices 1–2 years when stored in airtight containers away from heat and light. We print harvest dates on all our products."},
  {q:"Do you use any fillers, anti-caking agents or MSG?",a:"Never. Savora Spices contain no artificial flavours, no preservatives, no MSG, no anti-caking agents and no artificial colours. What’s on the label is exactly what’s in the jar."},
  {q:"Are your products organic?",a:"Many of our products are certified organic including our Natural Spices & Herbs range and several blends. Look for the Organic label on each product."},
  {q:"Whole vs ground — which should I buy?",a:"Whole spices stay fresh longer and give you more control over grind size. Ground spices are convenient. For everyday cooking, ground is perfect. For maximum flavour, buy whole and grind as needed."},
  {q:"Do you deliver across Kenya?",a:"Yes! We deliver across Nairobi same-day or next-day, and to other major Kenyan cities within 2–3 business days. Contact us on WhatsApp for remote areas and bulk orders."},
  {q:"Are your products irradiated?",a:"Never. Our products and all ingredients are never irradiated. We believe in clean, natural preservation methods only."},
];
function rFAQ(){document.getElementById('fl').innerHTML=faqs.map((f,i)=>`<div class="fi" id="fi${i}"><button class="fq" onclick="tgFAQ(${i})">${f.q}<span class="fic">+</span></button><div class="fa"><p>${f.a}</p></div></div>`).join('');}
function tgFAQ(i){const el=document.getElementById(`fi${i}`);const was=el.classList.contains('op');document.querySelectorAll('.fi').forEach(f=>f.classList.remove('op'));if(!was)el.classList.add('op');}
function joinWL(){const e=document.getElementById('pem').value;if(!e||!e.includes('@')){tst2('Please enter a valid email.');return;}tst2("You’re on the waitlist! We’ll notify you when Premium launches.");document.getElementById('pem').value='';}
function tst2(msg){const t=document.getElementById('tst');t.textContent=msg;t.classList.add('sh');setTimeout(()=>t.classList.remove('sh'),3200);}
bCats();rProds(prods);rHowto();rRevs();rQuiz();rFAQ();updCart();
