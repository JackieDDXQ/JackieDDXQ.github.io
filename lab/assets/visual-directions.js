(() => {
  const drafts=[...document.querySelectorAll('.draft')];
  function show(){
    const id=location.hash==='#draft-b'?'draft-b':'draft-a';
    drafts.forEach(draft=>draft.hidden=draft.id!==id);
    document.querySelectorAll('.study-header [data-view]').forEach(link=>{
      if('draft-'+link.dataset.view===id)link.setAttribute('aria-current','page');
      else link.removeAttribute('aria-current');
    });
  }
  document.querySelectorAll('[data-view]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();
    history.pushState(null,'','#draft-'+link.dataset.view);show();window.scrollTo({top:0,behavior:'instant'});
    // Links inside the old draft become hidden; move focus back to its visible switch.
    if(link.closest('.draft'))document.querySelector('.study-header [data-view="'+link.dataset.view+'"]').focus({preventScroll:true});
  }));
  window.addEventListener('hashchange',show);show();
})();
