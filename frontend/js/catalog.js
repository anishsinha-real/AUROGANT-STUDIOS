const state={category:'All',query:'',sort:'featured'};
function renderCatalog(){
 const grid=document.getElementById('catalogGrid');if(!grid)return;
 let products=[...(window.AUR_PRODUCTS||[])];
 if(state.category!=='All')products=products.filter(p=>p.category===state.category);
 if(state.query)products=products.filter(p=>`${p.name} ${p.code} ${p.category}`.toLowerCase().includes(state.query.toLowerCase()));
 if(state.sort==='low')products.sort((a,b)=>(a.salePrice||a.price)-(b.salePrice||b.price));
 if(state.sort==='high')products.sort((a,b)=>(b.salePrice||b.price)-(a.salePrice||a.price));
 if(state.sort==='new')products.sort((a,b)=>Number(b.newArrival)-Number(a.newArrival));
 grid.innerHTML=products.map(p=>`<article class="card product-card"><div class="media"><img src="${productImage(p)}" alt="${esc(p.name)}" loading="lazy">${p.bestseller?'<span class="badge">BESTSELLER</span>':''}${p.newArrival?'<span class="badge" style="left:auto;right:14px">NEW</span>':''}</div><div class="body"><h3>${esc(p.name)}</h3><div class="meta">${esc(p.category)} · ${esc(p.fit||'Regular')}</div><div class="price">${money(p.salePrice||p.price)} <span class="old">${money(p.price||p.salePrice)}</span></div><div class="card-actions"><a class="btn" href="studio.html?id=${encodeURIComponent(p.code)}">Design</a><button class="btn btn-gold" data-add="${p.code}">Quick Add</button></div></div></article>`).join('')||'<div class="empty">No products match your filters.</div>';
 grid.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{const p=selectedProduct(b.dataset.add);addToCart({code:p.code,name:p.name,productImage:productImage(p),size:p.sizes?.[0]||'M',color:p.colors?.[0]||'Black',unitPrice:p.salePrice||p.price,quantity:1,designId:null});});
}
function initCatalog(){
 document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-category]').forEach(x=>x.classList.remove('active'));b.classList.add('active');state.category=b.dataset.category;renderCatalog()});
 document.getElementById('catalogSearch')?.addEventListener('input',e=>{state.query=e.target.value;renderCatalog()});
 document.getElementById('catalogSort')?.addEventListener('change',e=>{state.sort=e.target.value;renderCatalog()});
 renderCatalog();
}
document.addEventListener('DOMContentLoaded',initCatalog);
