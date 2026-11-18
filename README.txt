PANDORA ERP - DEMO FRONTEND
===========================

REQUISITOS
- Navegador moderno.
- Visual Studio Code con la extensión Live Server (recomendado).

EJECUCIÓN
1. Descomprime PandoraERP.zip.
2. Abre la carpeta PandoraERP en Visual Studio Code.
3. Clic derecho sobre index.html > Open with Live Server.
4. Inicia sesión con:
   Usuario: admin
   Contraseña: Pandora2026!

MÓDULOS
- Login: autenticación de demostración.
- Categorías: crear, actualizar y eliminar.
- Productos: crear, actualizar y eliminar; cada producto se asocia a una categoría.
- Horario: fecha y reloj en la barra superior.
- Perfil: usuario activo y cierre de sesión.

ALMACENAMIENTO
Los datos de demostración se inicializan en localStorage. Los cambios realizados desde la interfaz
se guardan en el almacenamiento local del navegador. No existe backend ni base de datos.

ESTRUCTURA
Login/       login.css, login.js, login.html (pantalla integrada desde index.html)
categoria/   categoria.html, categoria.css, categoria.js
productos/   productos.html, productos.css, productos.js
assets/      estilos y lógica general del panel

NOTA
El panel carga los módulos HTML mediante fetch, por eso debes abrirlo usando Live Server o un
servidor HTTP local; no abras app.html directamente con file://.
La autenticación es solo demostrativa y no es segura para producción. Las credenciales están
definidas en Login/login.js.
