// Cursor personalizado
document.addEventListener('DOMContentLoaded', function() {
    // Crear el elemento del cursor personalizado
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    // Variables para el seguimiento del mouse
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Actualizar posición del mouse
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animar el cursor para que siga al mouse con suavidad
    function animateCursor() {
        // Interpolación suave para el seguimiento
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    // Iniciar la animación
    animateCursor();

    // Efectos hover para elementos clickeables
    const clickableElements = document.querySelectorAll('a, button, .cart-btn, .quantity-btn-decrease, .quantity-btn-increase, .delete-product, .btn-primary, .menu-icon, input[type="button"], input[type="submit"], .card-products-container img');
    
    clickableElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });

    // Ocultar cursor cuando el mouse sale de la ventana
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    // Mostrar cursor cuando el mouse entra a la ventana
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '0.8';
    });

    // Ocultar cursor en dispositivos táctiles
    if ('ontouchstart' in window) {
        cursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
});
