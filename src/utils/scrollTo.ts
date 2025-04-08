// utils/scrollTo.ts
export function scrollToElementWithSpeed(id: string, duration = 1000) {
    const target = document.getElementById(id);
    if (!target) return;
  
    const startY = window.scrollY;
    const endY = target.getBoundingClientRect().top + window.scrollY;
    const distance = endY - startY;
    const startTime = performance.now();
  
  //  const easeInOutQuad = (t: number) =>
  //    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  
    function animate(time: number) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 2);
  
      window.scrollTo(0, startY + distance * ease);
  
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
  
    requestAnimationFrame(animate);
  }
  