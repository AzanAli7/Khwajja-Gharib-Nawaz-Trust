
document.addEventListener("DOMContentLoaded",()=>{
  const items=document.querySelectorAll(
    ".card,.box,.project,.service,.feature,.gallery-item,.content-box,section"
  );
  items.forEach((el,i)=>{
    el.style.setProperty("--i",Math.min(i,12));
    el.classList.add("reveal");
  });
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("show");io.unobserve(e.target)}})
  },{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  document.querySelectorAll("a[href^='#']").forEach(a=>{
    a.addEventListener("click",e=>{
      const target=document.querySelector(a.getAttribute("href"));
      if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
    });
  });
});
