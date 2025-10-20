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
        window.addEventListener('scroll', handleScroll, { passive: true });
      })
      .catch(error => {
        console.error("Error al cargar el menú:", error);
        // Opcional: Muestra un mensaje de error en la página
        menuPlaceholder.innerHTML = "<p>Error al cargar el menú.</p>";
      });
  }
});