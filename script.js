const progress=document.querySelector('.progress');
addEventListener('scroll',()=>{const h=document.documentElement;progress.style.width=(scrollY/(h.scrollHeight-innerHeight)*100)+'%'});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
document.querySelectorAll('[data-count]').forEach(el=>{const obs=new IntersectionObserver(es=>{if(es[0].isIntersecting){let end=+el.dataset.count,start=0,step=Math.max(1,Math.ceil(end/45));const t=setInterval(()=>{start=Math.min(end,start+step);el.textContent=start.toLocaleString()+(end>100?' +':'');if(start>=end)clearInterval(t)},25);obs.disconnect()}},{threshold:.5});obs.observe(el)});
document.getElementById('year').textContent=new Date().getFullYear();
document.getElementById('copyDonate').addEventListener('click',async()=>{await navigator.clipboard.writeText('DEMO-ACCOUNT-0001');document.getElementById('copied').textContent='Demo account copied ✓'});
document.querySelector('.menu').addEventListener('click',()=>{const n=document.querySelector('nav');n.style.display=n.style.display==='flex'?'none':'flex';n.style.position='absolute';n.style.right='5%';n.style.top='76px';n.style.flexDirection='column';n.style.padding='18px';n.style.background='#081812';n.style.border='1px solid #19382d';n.style.borderRadius='15px'});
