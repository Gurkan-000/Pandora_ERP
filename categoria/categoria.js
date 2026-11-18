(() => {
  const KEY='pandora_categories';
  const defaults=[{id:'cat-1',name:'Electrónica'},{id:'cat-2',name:'Ropa y accesorios'},{id:'cat-3',name:'Hogar'},{id:'cat-4',name:'Deportes'}];
  const read=()=>{let data=localStorage.getItem(KEY);if(data===null){localStorage.setItem(KEY,JSON.stringify(defaults));return [...defaults];}try{return JSON.parse(data)||[];}catch{return [...defaults];}};
  const save=data=>localStorage.setItem(KEY,JSON.stringify(data));
  window.initCategorias=()=>{
    const tbody=document.getElementById('categoryRows');if(!tbody)return;
    const render=()=>{const items=read();document.getElementById('categoryCount').textContent=`${items.length} ${items.length===1?'categoría':'categorías'}`;
      tbody.innerHTML=items.length?items.map((x,i)=>`<tr><td class="row-number">${String(i+1).padStart(2,'0')}</td><td class="item-name">${escapeHtml(x.name)}</td><td><div class="action-group"><button class="action-btn edit-btn" data-edit="${x.id}">✎ Actualizar</button><button class="action-btn delete-btn" data-delete="${x.id}">⌫ Eliminar</button></div></td></tr>`).join(''):'<tr><td colspan="3"><div class="empty-state"><div class="empty-icon">▦</div>No hay categorías registradas todavía.</div></td></tr>';};
    const openForm=(item=null)=>window.showPandoraModal(item?'Actualizar categoría':'Crear categoría',item?'Modifica el nombre de la categoría.':'Completa el nombre para registrar una categoría.',`<label for="categoryName">Nombre de la categoría</label><input id="categoryName" name="name" maxlength="60" placeholder="Ej. Tecnología" required value="${item?escapeHtml(item.name):''}">`,data=>{if(!data.name){return false;}const items=read();if(items.some(x=>x.name.toLowerCase()===data.name.toLowerCase()&&x.id!==item?.id)){alert('Ya existe una categoría con ese nombre.');return false;}if(item){const target=items.find(x=>x.id===item.id);if(target)target.name=data.name;}else items.push({id:crypto.randomUUID?crypto.randomUUID():String(Date.now()),name:data.name});save(items);render();window.pandoraToast(item?'Categoría actualizada':'Categoría creada correctamente');});
    document.getElementById('addCategory').onclick=()=>openForm();
    tbody.onclick=e=>{const edit=e.target.closest('[data-edit]')?.dataset.edit;const del=e.target.closest('[data-delete]')?.dataset.delete;if(edit){const item=read().find(x=>x.id===edit);if(item)openForm(item);}if(del){const items=read();const item=items.find(x=>x.id===del);if(item&&confirm(`¿Eliminar la categoría "${item.name}"?`)){save(items.filter(x=>x.id!==del));render();window.pandoraToast('Categoría eliminada');}}};
    render();
  };
  function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
})();