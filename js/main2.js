const databaseURL = 'https://consultora-de-proyectos-default-rtdb.firebaseio.com/warmiEnergy.json';
let sendData = () => {
    const form = document.getElementById('form');
    const formData = new FormData(form); // Captura los datos del formulario
    const data = Object.fromEntries(formData.entries()); // Convierte FormData a un objeto

    // Agrega la fecha y hora actual al objeto
    data['saved'] = new Date().toLocaleString('es-CO', { timeZone: 'America/Guayaquil' });

    // Envía los datos a Firebase
    fetch(databaseURL, {
        method: 'POST', // Método HTTP
        headers: {
            'Content-Type': 'application/json' // Especifica el formato JSON
        },
        body: JSON.stringify(data) // Convierte los datos a JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.statusText}`);
            }
            return response.json(); // Procesa la respuesta como JSON
        })
        .then(result => {
            alert('¡Datos guardados exitosamente!'); // Mensaje de éxito
            form.reset(); // Reinicia el formulario
            getData();
        })
        .catch(error => {
            alert('Hemos experimentado un error. ¡Vuelve pronto!'); // Manejo de errores
        });
        //getData()
};


let getData = async () => {
    try {
        // Realiza la petición a Firebase
        const response = await fetch(databaseURL);
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        // Convierte la respuesta a un objeto JSON
        const data = await response.json();

        // Verifica si hay datos disponibles
        if (data) {
            const tableBody = document.querySelector('#data-table tbody');
            tableBody.innerHTML = ''; // Limpia la tabla antes de agregar nuevos datos

            // Itera sobre los datos y crea filas para la tabla
            let index = 1;
            for (let key in data) {
                const { nombre, correo, celular, servicio, comentario, saved } = data[key];

                const row = `
                    <tr>
                        <td>${index++}</td>
                        <td>${nombre || ''}</td>
                        <td>${correo || ''}</td>
                        <td>${celular || ''}</td>
                        <td>${servicio || ''}</td>
                        <td>${comentario || ''}</td>
                        <td>${saved || ''}</td>
                    </tr>
                `;

                tableBody.innerHTML += row; // Agrega la fila a la tabla
            }
        }
    } catch (error) {
        alert('Error al cargar los datos: ' + error.message); // Muestra un mensaje de error
    }
};
    
let loaded = (eventLoaded) => {

    let myform = document.getElementById('form');

    myform.addEventListener('submit', (eventSubmit) => {
        eventSubmit.preventDefault();

        const emailElement = document.querySelector('.form-control-lg');
        const emailText = emailElement.value;

        if (emailText.length === 0) {
            emailElement.focus()
            return;
        }
        emailElement.animate(
            [
                { transform: "translateY(0)" },
                { transform: "translateY(50px)" },
                { transform: "translateY(-50px)" },
                { transform: "translateY(0)" }
            ],
            {
                duration: 400,
                easing: "linear",
            }
        )
        sendData();
    })

}
let ready = () => {
    console.log('DOM está listo');

}




window.addEventListener("DOMContentLoaded", () => {
    getData(); // Carga los datos al iniciar la página
    ready(); 
});
window.addEventListener("load", loaded)