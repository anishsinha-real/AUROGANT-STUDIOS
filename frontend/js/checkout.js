function getTotals(){const cart=getCart();const subtotal=cart.reduce((s,i)=>s+(i.unitPrice||0)*i.quantity,0);const shipping=subtotal>=999?0:99;const gst=Math.round(subtotal*.05);return {subtotal,shipping,gst,total:subtotal+shipping+gst}}
async function submitOrder(e){e.preventDefault();const form=e.currentTarget;const fd=new FormData(form);const customer=Object.fromEntries(fd.entries());const items=getCart();if(!items.length){toast('Your cart is empty');return}const totals=getTotals();const btn=form.querySelector('button[type=submit]');btn.disabled=true;btn.textContent='Placing order…';
 const payload={customer,items,totals,paymentMethod:customer.paymentMethod||'cod'};
 let result=await api('/orders',{method:'POST',body:JSON.stringify(payload)});
 if(!result){const id=`LOCAL-${Date.now()}`;localStorage.setItem('aur_last_order',JSON.stringify({id,...payload,status:'pending'}));localStorage.removeItem('aur_cart');location.href=`order-success.html?id=${id}`;return}
 const order=result.order;
 if(customer.paymentMethod==='online'){
   try{const pay=await api('/payments/create',{method:'POST',body:JSON.stringify({amount:totals.total,receipt:order.id}),allowOffline:false});
     if(pay?.mode==='live'&&window.Razorpay){const rz=new Razorpay({key:pay.keyId,amount:pay.amount,currency:'INR',name:'AURØGANT STUDIO',description:'Custom apparel order',order_id:pay.orderId,prefill:{name:customer.name,email:customer.email,contact:customer.phone},handler:async response=>{await api('/payments/verify',{method:'POST',body:JSON.stringify({orderId:pay.orderId,paymentId:response.razorpay_payment_id,signature:response.razorpay_signature}),allowOffline:false});localStorage.removeItem('aur_cart');location.href=`order-success.html?id=${order.id}`}});rz.open();return}
   }catch(err){toast(err.message||'Payment setup unavailable. Choose COD.');btn.disabled=false;btn.textContent='Place Order';return}
 }
 localStorage.removeItem('aur_cart');location.href=`order-success.html?id=${order.id}`;
}
document.addEventListener('DOMContentLoaded',()=>{document.getElementById('checkoutForm')?.addEventListener('submit',submitOrder);const t=getTotals();['subtotal','shipping','gst','total'].forEach(k=>document.getElementById('co'+k[0].toUpperCase()+k.slice(1))&&(document.getElementById('co'+k[0].toUpperCase()+k.slice(1)).textContent=k==='shipping'?(t.shipping?money(t.shipping):'FREE'):money(t[k])));if(!getCart().length){document.getElementById('checkoutNotice').textContent='Your cart is empty. Go back to products first.'}});
