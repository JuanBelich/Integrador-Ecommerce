document.getElementById("register-form").addEventListener("submit", function (event) {

            event.preventDefault(); 
            const formData = new FormData(this);

                // Convertir el FormData en un objeto simple
                const data = Object.fromEntries(formData.entries());
                fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Datos enviados correctamente:", data);
                    
                    })
                .catch((error) => {
                        console.error("Error al enviar los datos:", error);
                    });
                    if (typeof window !== 'undefined') {
                        window.location.href = '/login';  // Asegúrate de usar la URL correcta para la redirección
                    }
});

                