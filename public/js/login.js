document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log("Inicio de sesión exitoso:", data.message);
        } else {
            console.error("Error en el inicio de sesión:", data.message);
            alert("username o contraseña incorrectos");
        }
    })
    .catch((error) => {
        console.error("Error en la solicitud:", error);
    });

    if (typeof window !== 'undefined') {
        window.location.href = '/profile';  // Asegúrate de usar la URL correcta para la redirección
    }


});
