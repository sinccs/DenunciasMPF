document.addEventListener("DOMContentLoaded", function() {
  // Busca el contenedor del menú en la página actual
  const menuPlaceholder = document.getElementById("menu-placeholder");
  
  // Si encuentra el contenedor, carga el menú
  if (menuPlaceholder) {
    fetch("header.html") // <-- Cambio aquí: de "menu.html" a "header.html"
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el menú.");
        }
        return response.text();
      })
      .then(data => {
        // Inserta el contenido del menú en el contenedor
        menuPlaceholder.innerHTML = data;

        // Si el placeholder tiene la clase 'is-homepage', la pasamos al header cargado
        if (menuPlaceholder.classList.contains('is-homepage')) {
          document.getElementById('main-header')?.classList.add('is-homepage');
        }

        // --- LÓGICA PARA EL HEADER DINÁMICO ---
        const header = document.getElementById('main-header');
        if (!header) return;

        const scrollThreshold = 10; // Distancia en píxeles para activar el efecto

        const handleScroll = () => {
            if (window.scrollY > scrollThreshold) {
                // Al hacer scroll: fondo oscuro para contraste del logo
                header.classList.add('bg-black/30', 'shadow-lg', 'backdrop-blur-sm');
                header.classList.remove('bg-white/10');
            } else {
                // Arriba de todo: transparente
                header.classList.remove('bg-black/30', 'shadow-lg');
                header.classList.add('bg-white/10');
            }
        };

        // --- LÓGICA PARA EL MENÚ HAMBURGUESA ---
        const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIconOpen = document.getElementById('menu-icon-open');
        const menuIconClose = document.getElementById('menu-icon-close');

        if (menuBtn && mobileMenu && menuIconOpen && menuIconClose) {
          menuBtn.addEventListener('click', () => {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
            menuIconOpen.classList.toggle('hidden');
            menuIconOpen.classList.toggle('block');
            menuIconClose.classList.toggle('hidden');
            menuIconClose.classList.toggle('block');

            // Cuando el menú se abre, cambiamos el color del botón a negro para que se vea sobre el fondo blanco.
            if (!isExpanded) {
              menuBtn.classList.add('text-black');
              menuBtn.classList.remove('text-white');
              // Forzamos el estado de scroll en el header para que el logo sea visible
              header?.classList.add('bg-black/30', 'shadow-lg', 'backdrop-blur-sm');
              header?.classList.remove('bg-white/10');
            } else {
              menuBtn.classList.remove('text-black');
              menuBtn.classList.add('text-white');
              // Al cerrar, dejamos que el manejador de scroll decida el estado del header
              handleScroll(); // Llama a handleScroll para aplicar el estado correcto inmediatamente
            }
          });
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
      })
      .catch(error => {
        console.error("Error al cargar el menú:", error);
        // Opcional: Muestra un mensaje de error en la página
        menuPlaceholder.innerHTML = "<p>Error al cargar el menú.</p>";
      });
  }
});