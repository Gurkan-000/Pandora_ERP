(() => {
  const KEY = 'pandora_products', CAT = 'pandora_categories';
  const defaults = [{ id: 'prod-1', name: 'Audífonos inalámbricos', price: 129.90, categoryId: 'cat-1' }, { id: 'prod-2', name: 'Polera urbana', price: 79.90, categoryId: 'cat-2' }, { id: 'prod-3', name: 'Lámpara de escritorio', price: 54.50, categoryId: 'cat-3' }, { id: 'prod-4', name: 'Mochila deportiva', price: 99.00, categoryId: 'cat-4' }];
  const read = () => { let data = localStorage.getItem(KEY); if (data === null) { localStorage.setItem(KEY, JSON.stringify(defaults)); return [...defaults]; } try { return JSON.parse(data) || []; } catch { return [...defaults]; } };
  const cats = () => { try { return JSON.parse(localStorage.getItem(CAT)) || []; } catch { return []; } };
  const save = data => localStorage.setItem(KEY, JSON.stringify(data));
  window.initProductos = () => {
    const tbody = document.getElementById('productRows'); if (!tbody) return;
    const money = value => 'S/ ' + Number(value).toFixed(2);
    const render = () => {
      const items = read(); document.getElementById('productCount').textContent = `${items.length} ${items.length === 1 ? 'producto' : 'productos'}`;
      tbody.innerHTML = items.length ? items.map((x, i) => `<tr><td class="row-number">${String(i + 1).padStart(2, '0')}</td><td class="item-name">${escapeHtml(x.name)}<div style="font-size:9px;color:#a39cad;font-weight:400;margin-top:4px">${escapeHtml(cats().find(c => c.id === x.categoryId)?.name || 'Sin categoría')}</div></td><td>${money(x.price)}</td><td><div class="action-group"><button class="action-btn edit-btn" data-edit="${x.id}">✎ Actualizar</button><button class="action-btn delete-btn" data-delete="${x.id}">⌫ Eliminar</button></div></td></tr>`).join('') : '<tr><td colspan="4"><div class="empty-state"><div class="empty-icon">◇</div>No hay productos registrados todavía.</div></td></tr>';
    };
    const openForm = (item = null) => {
      const categories = cats(); if (!categories.length) { alert('Primero registra al menos una categoría.'); return; }
      const options = categories.map(c => `<option value="${c.id}" ${item?.categoryId === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('');
      window.showPandoraModal(item ? 'Actualizar producto' : 'Crear producto', item ? 'Modifica los datos del producto.' : 'Completa los datos para agregar un producto.', `<label for="productName">Nombre del producto</label><input id="productName" name="name" maxlength="80" placeholder="Ej. Teclado mecánico" required value="${item ? escapeHtml(item.name) : ''}"><label for="productPrice">Precio (S/)</label><input id="productPrice" name="price" type="number" min="0.01" step="0.01" placeholder="0.00" required value="${item ? Number(item.price).toFixed(2) : ''}"><label for="productCategory">Categoría</label><select id="productCategory" name="categoryId" required>${options}</select>`, data => { const price = Number(data.price); if (!data.name || !Number.isFinite(price) || price <= 0) return false; const items = read(); if (item) { const target = items.find(x => x.id === item.id); if (target) Object.assign(target, { name: data.name, price, categoryId: data.categoryId }); } else items.push({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), name: data.name, price, categoryId: data.categoryId }); save(items); render(); window.pandoraToast(item ? 'Producto actualizado' : 'Producto creado correctamente'); });
    };
    document.getElementById('addProduct').onclick = () => openForm();
    tbody.onclick = e => { const edit = e.target.closest('[data-edit]')?.dataset.edit; const del = e.target.closest('[data-delete]')?.dataset.delete; if (edit) { const item = read().find(x => x.id === edit); if (item) openForm(item); } if (del) { const items = read(); const item = items.find(x => x.id === del); if (item && confirm(`¿Eliminar el producto "${item.name}"?`)) { save(items.filter(x => x.id !== del)); render(); window.pandoraToast('Producto eliminado'); } } };
    render();
  };
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
})();