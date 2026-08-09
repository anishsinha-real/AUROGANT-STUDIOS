function renderCart(){
 const list=document.getElementById('cartList'),empty=document.getElementById('cartEmpty'),wrap=document.getElementById('cartWrap');if(!list)return;
 const cart=getCart();if(!cart.length){list.innerHTML='';empty.hidden=false;wrap.hidden=true;document.getElementById('cartTotal').textContent=money(0);return}
 empty.hidden=true;wrap.hidden=false;
 list.innerHTML=cart.map(i=>`<div class="cart-item"><img src="${esc(i.productImage||'assets/products/UC21.png')}" alt=""><div><strong>${esc(i.name)}</strong><div class="meta">${esc(i.code)} · ${esc(i.color||'')} · ${esc(i.size||'')}</div><div class="qty" style="margin-top:10px"><button data-dec="${esc(i.key)}">−</button><span>${i.quantity}</span><button data-inc="${esc(i.key)}">+</button><button class="btn" style="padding:5px 10px;margin-left:8px" data-remove="${esc(i.key)}">Remove</button></div></div><strong>${money((i.unitPrice||0)*i.quantity)}</strong></div>`).join('');
 list.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{removeFromCart(b.dataset.remove);renderCart()});
 list.querySelectorAll('[data-inc]').forEach(b=>b.onclick=()=>{const i=getCart().find(x=>x.key===b.dataset.inc);updateCartQty(b.dataset.inc,(i?.quantity||1)+1);renderCart()});
 list.querySelectorAll('[data-dec]').forEach(b=>b.onclick=()=>{const i=getCart().find(x=>x.key===b.dataset.dec);updateCartQty(b.dataset.dec,(i?.quantity||1)-1);renderCart()});
 const subtotal=cart.reduce((s,i)=>s+(i.unitPrice||0)*i.quantity,0);const shipping=subtotal>=999?0:99;const gst=Math.round(subtotal*.05);document.getElementById('cartSubtotal').textContent=money(subtotal);document.getElementById('cartShipping').textContent=shipping?money(shipping):'FREE';document.getElementById('cartGst').textContent=money(gst);document.getElementById('cartTotal').textContent=money(subtotal+shipping+gst);
}
document.addEventListener('DOMContentLoaded',renderCart);
