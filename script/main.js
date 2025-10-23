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
        
        let isMenuOpen = false; // Variable para saber el estado del menú
        const scrollThreshold = 10; // Distancia en píxeles para activar el efecto

        // Función ÚNICA que decide el estilo del header
        const updateHeaderStyle = () => {
            const isScrolled = window.scrollY > scrollThreshold;
            
            // Si el menú está abierto O si se ha hecho scroll, el header es oscuro
            if (isMenuOpen || isScrolled) {
                header.classList.add('bg-black/30', 'shadow-lg', 'backdrop-blur-sm');
                header.classList.remove('bg-white/10');
            } else {
                // Solo si está arriba de todo Y el menú está cerrado, es transparente
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

            // Actualizamos el estado del menú
            isMenuOpen = !isExpanded;

            // Cambiamos el color del botón según el estado del menú
            if (!isExpanded) {
              menuBtn.classList.add('text-black');
              menuBtn.classList.remove('text-white');
            } else {
              menuBtn.classList.remove('text-black');
              menuBtn.classList.add('text-white');
            }
            
            // Llamamos a la función central para que actualice el header
            updateHeaderStyle();
          });
        }

        window.addEventListener('scroll', updateHeaderStyle, { passive: true });
      })
      .catch(error => {
        console.error("Error al cargar el menú:", error);
        // Opcional: Muestra un mensaje de error en la página
        menuPlaceholder.innerHTML = "<p>Error al cargar el menú.</p>";
      });
  }
});