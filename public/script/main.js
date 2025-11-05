document.addEventListener("DOMContentLoaded", function() {
  // --- LÓGICA PARA EL MENÚ HAMBURGUESA (Entrada/Salida por la DERECHA) ---
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const header = document.getElementById('main-header'); // Definimos header aquí para usarlo en ambos bloques
  
  const ANIMATION_DURATION = 300; // Milisegundos, coincide con 'duration-300' de Tailwind

  if (menuBtn && mobileMenu && menuIconOpen && menuIconClose) {
    
    // Aseguramos que el menú inicie oculto en móvil con la clase 'hidden'
    mobileMenu.classList.add('hidden');

    menuBtn.addEventListener('click', () => {
      let isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';

      // 1. Toggle de estado ARIA
      menuBtn.setAttribute('aria-expanded', !isExpanded);

      // 2. Toggle de íconos
      menuIconOpen.classList.toggle('hidden');
      menuIconClose.classList.toggle('hidden');

      // 3. Toggle de color del botón (para la 'X')
      menuBtn.classList.toggle('text-white');
      menuBtn.classList.toggle('text-[#09788a]');
      
      if (!isExpanded) {
        // ABRIR MENÚ (Entra por la derecha)
        // Quitamos el fondo del header para que no interfiera con el menú blanco
        header.classList.remove('bg-gray-700/50', 'backdrop-blur-sm', 'shadow-lg');

        // Paso 1: Hacemos visible el elemento, pero sigue fuera de pantalla
        mobileMenu.classList.remove('hidden'); 
        
        // Paso 2: Permitimos la transición para deslizarse
        setTimeout(() => {
            // Quitamos la clase que lo mantiene fuera ('translate-x-full')
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        }, 10); // Pequeño retraso necesario para que Tailwind aplique la transición
      } else {
        // CERRAR MENÚ (Sale por la derecha)
        // Paso 1: Añadimos la clase para que se deslice fuera de pantalla
        mobileMenu.classList.add('translate-x-full');
        
        // Paso 2: Ocultamos el elemento completamente después de la animación
        setTimeout(() => {
          mobileMenu.classList.add('hidden');
          document.body.style.overflow = 'auto';
          // Restauramos el fondo del header al cerrar el menú
          header.classList.add('bg-gray-700/50', 'backdrop-blur-sm', 'shadow-lg');
        }, ANIMATION_DURATION);
      }
    });
    
    // Cierra menú si se hace clic en un enlace (es importante para re-habilitar el scroll)
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Simula un clic en el botón para cerrar, animar y habilitar el scroll
            menuBtn.click();
        });
    });
  }

  // Se eliminó la lógica de scroll para un fondo de header estático.
});