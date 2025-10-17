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
      })
      .catch(error => {
        console.error("Error al cargar el menú:", error);
        // Opcional: Muestra un mensaje de error en la página
        menuPlaceholder.innerHTML = "<p>Error al cargar el menú.</p>";
      });
  }
});