document.addEventListener("DOMContentLoaded", function() {
  // --- LÓGICA PARA EL HEADER DINÁMICO ---
  const header = document.getElementById('main-header');
  if (!header) return;
  
  // La clase 'is-homepage' la podemos detectar de otra forma si es necesario,
  // pero por ahora, la lógica de scroll funcionará en todas las páginas.
  // Si el body tiene una clase específica para la homepage, podríamos usarla.
  // document.body.classList.contains('homepage')

  let isMenuOpen = false; // Variable para saber el estado del menú
  const scrollThreshold = 10; // Distancia en píxeles para activar el efecto

  // Función ÚNICA que decide el estilo del header
  const updateHeaderStyle = () => {
      const isScrolled = window.scrollY > scrollThreshold;
      
      // Si el menú está abierto O si se ha hecho scroll, el header es oscuro
      if (isMenuOpen || isScrolled) {
          header.classList.add('bg-gray-700/30', 'backdrop-blur-sm', 'shadow-lg');
      } else {
          // Solo si está arriba de todo Y el menú está cerrado, es transparente
          header.classList.remove('bg-gray-700/30', 'backdrop-blur-sm', 'shadow-lg');
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
      menuIconClose.classList.toggle('hidden');

      // Actualizamos el estado del menú
      isMenuOpen = !isExpanded;
      
      // Llamamos a la función central para que actualice el header
      updateHeaderStyle();
    });
  }

  window.addEventListener('scroll', updateHeaderStyle, { passive: true });
});