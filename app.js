document.addEventListener("DOMContentLoaded", function () {

    // Función para obtener alumnos desde el localStorage
    function getStudents() {
        let students = localStorage.getItem("students");
        if (students) {
            return JSON.parse(students);
        } else {
            return [];
        }
    }

    // Función para guardar alumnos en localStorage
    function saveStudents(students) {
        localStorage.setItem("students", JSON.stringify(students));
    }

    // Evento para agregar un alumno desde AgregarAlumnos.html
    document.getElementById("alumnoForm")?.addEventListener("submit", function (e) {
        e.preventDefault();  // Prevenir el comportamiento por defecto del formulario (recarga de página)

        const firstname = document.getElementById("firstname").value.trim();
        const lastname = document.getElementById("lastname").value.trim();

        if (firstname && lastname) {
            const students = getStudents();  // Obtener la lista de alumnos actual
            const id = students.length + 1;  // Generar un ID único (simplemente la longitud de la lista + 1)
            const newStudent = { id, firstname, lastname };  // Crear un nuevo objeto de estudiante

            students.push(newStudent);  // Agregar el nuevo alumno a la lista
            saveStudents(students);  // Guardar la lista actualizada en localStorage

            alert("Alumno agregado exitosamente");

            // Limpiar los campos del formulario
            document.getElementById("firstname").value = '';
            document.getElementById("lastname").value = '';

            // Redirigir a la página de alumnos después de agregar un nuevo alumno
            window.location.href = 'Alumnos.html';
        } else {
            alert("Por favor complete todos los campos");
        }
    });

    // Función para mostrar los alumnos en la tabla de Alumnos.html
    function showStudents() {
        const students = getStudents();
        const tbody = document.getElementById("alumnoBody");
        tbody.innerHTML = '';  // Limpiar la tabla antes de agregar nuevas filas

        students.forEach(student => {
            let tr = document.createElement("tr");
            tr.innerHTML = `<td>${student.id}</td><td>${student.lastname}</td><td>${student.firstname}</td>`;
            tbody.appendChild(tr);
        });
    }

    // Mostrar los alumnos cuando la página Alumnos.html se cargue
    if (document.getElementById("alumnoBody")) {
        showStudents();
    }
});
