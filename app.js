// highlight active nav link based on current path
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const target = a.getAttribute('href');
    if(target === path) a.classList.add('active');
  });
})();
