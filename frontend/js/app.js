window.AUR_CONFIG = window.AUR_CONFIG || { apiBase: localStorage.getItem('aur_api_base') || 'http://localhost:5000/api' };

function money(n){return `₹${Math.round(Number(n)||0).toLocaleString('en-IN')}`}
function esc(s){return String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toast(message){const el=document.getElementById('toast');if(!el)return;el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2400)}
async function api(path, options={}){
  const base=String(window.AUR_CONFIG.apiBase||'').replace(/\/$/,'');
  try{
    const res=await fetch(base+path,{headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
    const data=await res.json();
    if(!res.ok) throw new Error(data.message||'Request failed');
    return data;
  }catch(error){
    if(options.allowOffline!==false) return null;
    throw error;
  }
}
function getCart(){return JSON.parse(localStorage.getItem('aur_cart')||'[]')}
function setCart(cart){localStorage.setItem('aur_cart',JSON.stringify(cart)); updateCartCount()}
function updateCartCount(){const n=getCart().reduce((s,i)=>s+Number(i.quantity||1),0);document.querySelectorAll('[data-cart-count]').forEach(e=>e.textContent=n)}
function addToCart(item){const cart=getCart();const key=item.key||`${item.code}-${item.size}-${item.color}-${item.designId||'blank'}`;const found=cart.find(i=>i.key===key);if(found)found.quantity+=Number(item.quantity||1);else cart.push({...item,key,quantity:Number(item.quantity||1)});setCart(cart);toast('Added to cart');}
function removeFromCart(key){setCart(getCart().filter(i=>i.key!==key));}
function updateCartQty(key,qty){const cart=getCart();const item=cart.find(i=>i.key===key);if(item)item.quantity=Math.max(1,Number(qty)||1);setCart(cart)}
function productImage(p){return p?.mockups?.front||p?.images?.front||`assets/products/${p?.code}.png`}
function selectedProduct(code){return window.AUR_PRODUCTS?.find(p=>p.code===code)||null}
function wireCommon(){updateCartCount();document.querySelectorAll('[data-back-top]').forEach(b=>b.onclick=()=>scrollTo({top:0,behavior:'smooth'}));document.querySelectorAll('[data-faq]').forEach(item=>item.onclick=()=>item.classList.toggle('open'));}
window.money=money;window.esc=esc;window.toast=toast;window.api=api;window.getCart=getCart;window.setCart=setCart;window.updateCartCount=updateCartCount;window.addToCart=addToCart;window.removeFromCart=removeFromCart;window.updateCartQty=updateCartQty;window.productImage=productImage;window.selectedProduct=selectedProduct;window.wireCommon=wireCommon;
document.addEventListener('DOMContentLoaded',wireCommon);
