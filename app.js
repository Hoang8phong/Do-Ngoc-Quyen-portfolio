// Typing effect for the name headline
(function(){
  const words = ["Đỗ Ngọc Quyên","Rắn"]; // cycle between these
  const el = document.getElementById('typed-name');
  if(!el) return;

  // Respect user motion preferences
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = words[0];
    return;
  }

  const typeSpeed = 90;     // ms per character
  const deleteSpeed = 60;   // ms per character when deleting
  const hold = 1000;        // pause when a word completes
  let i = 0; // word index
  let j = 0; // char index
  let typing = true;

  function step(){
    const word = words[i];
    if(typing){
      if(j===0) el.textContent = ""; // clear fallback
      if(j < word.length){
        el.textContent += word[j++];
        setTimeout(step, typeSpeed);
      } else {
        typing = false;
        setTimeout(step, hold);
      }
    } else {
      if(j > 0){
        el.textContent = el.textContent.slice(0,-1);
        j--;
        setTimeout(step, deleteSpeed);
      } else {
        typing = true;
        i = (i+1) % words.length;
        setTimeout(step, 300);
      }
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', step, { once:true });
  } else { step(); }
})();

// --- Disable right-click site-wide (context menu) ---
(() => {

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  }, { capture: true });

  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) e.preventDefault();
  });
})();

