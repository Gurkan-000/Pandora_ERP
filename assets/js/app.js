(() => {
  const session = JSON.parse(localStorage.getItem('pandora_session') || 'null');
  if (!session) { location.replace('index.html'); return; }
  const $ = (id) => document.getElementById(id);
  $('profileName').textContent = session.name;
  $('menuUser').textContent = session.name;
  $('avatarInitial').textContent = session.name.charAt(0).toUpperCase();
  $('todayDate').textContent = new Intl.DateTimeFormat('es-PE',{weekday:'long',day:'numeric',month:'long',year:'numeric'}).format(new Date());
  const updateClock = () => $('clock').textContent = new Intl.DateTimeFormat('es-PE',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date());
  updateClock(); setInterval(updateClock,1000);
  $('profileButton').addEventListener('click', () => $('profileMenu').classList.toggle('hidden'));
  $('logoutButton').addEventListener('click', () => { localStorage.removeItem('pandora_session'); location.href='index.html'; });
  document.addEventListener('click', e => { if (!e.target.closest('.profile-wrap')) $('profileMenu').classList.add('hidden'); });
  $('mobileMenu').addEventListener('click', () => $('sidebar').classList.toggle('open'));
  const config = {
    categoria:{title:'Categorías',description:'Organiza tus productos agrupándolos en categorías.',file:'categoria/categoria.html'},
    productos:{title:'Productos',description:'Administra tu catálogo, precios y categorías.',file:'productos/productos.html'}
  };
  async function showModule(view) {
    const item=config[view]; if(!item)return;
    document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
    $('breadcrumbCurrent').textContent=item.title; $('pageTitle').textContent=item.title; $('pageDescription').textContent=item.description;
    $('moduleContent').innerHTML='<div class="loading-state">Cargando módulo…</div>';
    try { const response=await fetch(item.file); if(!response.ok)throw new Error('No se pudo cargar el módulo');
      $('moduleContent').innerHTML=await response.text();
      if(view==='categoria') window.initCategorias?.(); else window.initProductos?.();
      $('sidebar').classList.remove('open');
    } catch(e) { $('moduleContent').innerHTML='<div class="surface-card empty-state">No se pudo cargar el módulo. Abre el proyecto con Live Server (no directamente desde el archivo).</div>'; }
  }
  document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>showModule(b.dataset.view)));
  window.pandoraToast = (message) => { const old=document.querySelector('.toast');old?.remove();const el=document.createElement('div');el.className='toast success';el.textContent=message;document.body.appendChild(el);setTimeout(()=>el.remove(),2600); };
  window.showPandoraModal = (title,subtitle,fields,onSave) => {
    const backdrop=document.createElement('div');backdrop.className='modal-backdrop';
    backdrop.innerHTML=`<section class="modal" role="dialog" aria-modal="true"><header class="modal-header"><div><h3>${title}</h3><p>${subtitle}</p></div><button class="modal-close" type="button" aria-label="Cerrar">×</button></header><form class="modal-form"><div class="modal-fields">${fields}</div><div class="modal-actions"><button type="button" class="secondary-btn cancel">Cancelar</button><button type="submit" class="primary-btn">Guardar cambios</button></div></form></section>`;
    document.body.appendChild(backdrop); const close=()=>backdrop.remove();
    backdrop.querySelector('.modal-close').onclick=close;backdrop.querySelector('.cancel').onclick=close;
    backdrop.addEventListener('click',e=>{if(e.target===backdrop)close();});
    backdrop.querySelector('form').onsubmit=e=>{e.preventDefault();const data={};backdrop.querySelectorAll('[name]').forEach(input=>data[input.name]=input.value.trim());if(onSave(data)!==false)close();};
    backdrop.querySelector('input,select')?.focus();
  };
  showModule('categoria');
})();