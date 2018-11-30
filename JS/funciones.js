function cargarPeliculas() {
    crearPeliculas();
}
// Cargar peliculas en inicio.html
function crearPeliculas() {
    // Verificar que el usuario tenga iniciado la sesión, pero si no, regresar al index.html
    if (localStorage.getItem('idUsuario') == 0) {
        setTimeout(function() {
            alert('Debes iniciar sesión')
            window.location.assign('index.html')
        }, 1000);
    }

    document.querySelector('section').style.opacity = "1";
    document.querySelector('h1').style.opacity = "1";
    document.querySelector('i').style.opacity = "1";

    appAjax = new XMLHttpRequest();
    // Abrir el Ajax para cargar las peliculas al inicio de la aplicacion
    appAjax.open('GET', 'http://localhost/uaqflix/php/peliculas.php');
    appAjax.send();
    appAjax.onreadystatechange = function() {
        if (appAjax.readyState == 4 && appAjax.status == 200) {
            // Guardar el resultado del ajax 
            pelicula = JSON.parse(appAjax.responseText);
            // Recorrido de todas las peliculas
            div = "";
            for (i = 0; i < pelicula.length; i++) {
                // Crear diferentes div de las peliculas
                div += "<div class='pelicula oculto'" +
                    "onclick='verPelicula(this.id)' id='" + pelicula[i].id + "'>" +
                    "<div class='pelicula-img'><img src='" + pelicula[i].img + "' title='" + pelicula[i].descripcion + "'></div>" +
                    "<div class='pelicula-nombre'>" + pelicula[i].nombre + "</div>" +
                    "<div class='pelicula-categoria'>" + pelicula[i].categoria + "</div>" +
                    "<div class='pelicula-duracion'>" + pelicula[i].duracion + "</div>" +
                    "</div>";
                // Mandamos el div al inicio.html
            }
            document.querySelector('section').innerHTML = div;
            peliculas = document.querySelectorAll('.pelicula');
            i = 0;
            // Animacion de las peliculas
            animacionPeliculas();
        }
    }
}

// Dar pequeña animación a las peliculas cuando carguen en inicio.html
function animacionPeliculas() {
    if (i < peliculas.length) {
        peliculas[i].classList.remove('oculto')
        i++
        setTimeout(function() {
            animacionPeliculas();
        }, 100)
    }
}

// Buscar peliculas
function _buscar() {
    // Capturar el valor del buscador
    buscar = document.getElementById('buscador');

    if (buscar.value != "") {
        // Crear ajax
        buscarAjax = new XMLHttpRequest;
        buscarAjax.open('GET', 'http://localhost/uaqflix/php/buscar.php?search=' + buscar.value);
        buscarAjax.send();
        buscarAjax.onreadystatechange = function() {
            if (buscarAjax.readyState == 4 && buscarAjax.status == 200) {
                if (buscarAjax.responseText != "none") {
                    // Guardar el resultado del ajax
                    pelicula = JSON.parse(buscarAjax.responseText);
                    // Recorrido de todas las peliculas
                    div = "";
                    for (i = 0; i < pelicula.length; i++) {
                        // Crear diferentes div de las peliculas
                        div += "<div class='pelicula oculto'" +
                            "onclick='verPelicula(this.id)' id='" + pelicula[i].id + "'>" +
                            "<div class='pelicula-img'><img src='" + pelicula[i].img + "' title='" + pelicula[i].descripcion + "'></div>" +
                            "<div class='pelicula-nombre'>" + pelicula[i].nombre + "</div>" +
                            "<div class='pelicula-categoria'>" + pelicula[i].categoria + "</div>" +
                            "<div class='pelicula-duracion'>" + pelicula[i].duracion + "</div>" +
                            "</div>";
                        // Mandamos el div al inicio.html
                    }
                    document.querySelector('section').innerHTML = div;
                    peliculas = document.querySelectorAll('.pelicula');
                    i = 0;
                    // Animacion de las peliculas
                    animacionPeliculas();
                }
            }
        }
    } else {
        cargarPeliculas();
    }
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

// Función para iniciar sesión
function login() {
    // Capturar valores
    usuario = document.getElementById('ingreso').value;
    password = document.getElementById('password').value;
    // Crear ajax
    loginAjax = new XMLHttpRequest();
    loginAjax.open('GET', 'http://localhost/Polls/php/login.php?u=' + usuario + '&pw=' + password);
    loginAjax.send();
    loginAjax.onreadystatechange = function() {
        if (loginAjax.readyState == 4 && loginAjax.status == 200) {
            if (loginAjax.responseText != "0") {
                // Asignar idUsuario para verificar que este iniciando
                localStorage.setItem('idUsuario', loginAjax.responseText);
                // Mandar respuesta
                alert("Has iniciado de forma exitosa. ¡Disfruta las películas!");
                // Mandar a inicio.html
                // setTimeout(function() {
                window.location.assign("inicio.html");
                // }, 2500)

            } else {
                // Mandar respuesta
                alert("El nombre de usuario o la contraseña son incorrectos. Verifica los datos.");
                setTimeout(function() {
                    document.querySelector('.respuesta').style.opacity = "0";
                }, 2000)
            }
        }
        // else {
        //     alert("Los datos ingresados son incorrectos, favor de verificar.");
        //     setTimeout(function() {
        //         document.querySelector('.respuesta').style.opacity = "0";
        //     }, 3000)
        // }
    }
}
// Función para registrar un nuevo usuario
function registrarse() {

    usuario = document.getElementById('usuarioR').value;
    correo = document.getElementById('correoR').value;
    password = document.getElementById('passwordR').value;

    logAjax = new XMLHttpRequest();
    logAjax.open('GET', 'php/registrarse.php?u=' + usuario + '&c=' + correo + '&pw=' + password);
    logAjax.send();
    logAjax.onreadystatechange = function() {
        if (logAjax.readyState == 4 && logAjax.status == 200) {
            if (logAjax.responseText == "1") {

                // Exito con el registro de usuario
                document.querySelector('.respuesta').style.opacity = "1";
                document.querySelector('.respuesta').innerHTML = "Usuario creado con exito, ya puedes iniciar sesión";

                setTimeout(function() {
                    document.querySelector('.respuesta').style.opacity = "0";
                }, 2000)

                setTimeout(function() {
                    window.location.assign("index.html");
                }, 3000)
            } else {
                // Error si todos los campos están vacios
                if (logAjax.responseText == "0") {
                    document.querySelector('.respuesta').style.opacity = "1";
                    document.querySelector('.respuesta').innerHTML = "Favor de llenar los campos requeridos";
                    setTimeout(function() {
                        document.querySelector('.respuesta').style.opacity = "0";
                    }, 2000)
                }
                // Error si el campo de nombre de usuario está vacio
                if (logAjax.responseText == "2") {
                    document.querySelector('.respuesta').style.opacity = "1";
                    document.querySelector('.respuesta').innerHTML = "Nombre de Usuario es requerido";
                    setTimeout(function() {
                        document.querySelector('.respuesta').style.opacity = "0";
                    }, 2000)
                } else {
                    // El campo no está vacio

                    // Error si el campo de correo esta vacio
                    if (logAjax.responseText == "3") {
                        document.querySelector('.respuesta').style.opacity = "1";
                        document.querySelector('.respuesta').innerHTML = "Un correo es requerido";
                        setTimeout(function() {
                            document.querySelector('.respuesta').style.opacity = "0";
                        }, 2000)
                    } else {
                        // El campo no está vacio

                        // Error si el campo de contraseña está vacio
                        if (logAjax.responseText == "4") {
                            document.querySelector('.respuesta').style.opacity = "1";
                            document.querySelector('.respuesta').innerHTML = "Una contraseña es requerida";
                            setTimeout(function() {
                                document.querySelector('.respuesta').style.opacity = "0";
                            }, 2000)
                        } else {
                            // El campo no está vacio

                            // Error si ya existe un nombre de usuario o correo
                            if (logAjax.responseText == "5") {
                                document.querySelector('.respuesta').style.opacity = "1";
                                document.querySelector('.respuesta').innerHTML = "El nombre de usuario o correo ya fuerón tomados. Favor de verificar datos.";
                                setTimeout(function() {
                                    document.querySelector('.respuesta').style.opacity = "0";
                                }, 2000)
                            }
                        }
                    }
                }
            }
        }
    }
}
// Función para cerrar sesión
function logout() {
    outAjax = new XMLHttpRequest();
    outAjax.open('GET', 'http://localhost/uaqflix/php/logout.php');
    outAjax.send();
    outAjax.onreadystatechange = function() {
        if (outAjax.readyState == 4 && outAjax.status == 200) {
            localStorage.setItem('idUsuario', 0);
            alert('Se cerro sesión');
            window.location.assign("index.html");
        } else {
            localStorage.setItem('idUsuario', 0);
            window.location.assign("index.html");

        }
    }
}
// Ver una pelicula seleccionada
function verPelicula(id) {
    localStorage.setItem('idPelicula', id);
    setTimeout(function() {
        window.location.assign('detalles.html');
    }, 100);
}

function cargarDetalles() {
    // Capturar el valor del id de la pelicula en el local storage
    idPelicula = localStorage.getItem('idPelicula');
    // Crear ajax
    cargarAjax = new XMLHttpRequest();
    cargarAjax.open('GET', 'http://localhost/uaqflix/php/detalles.php?idP=' + idPelicula);
    cargarAjax.send();

    cargarAjax.onreadystatechange = function() {
        if (cargarAjax.readyState == 4 && cargarAjax.status == 200) {
            pelicula = JSON.parse(cargarAjax.responseText);
            for (x = 0; x < pelicula.length; x++) {
                detalles = "<div class='pelicula-detalles'>" +
                    "<div class='pelicula-img-desc'><img src='" + pelicula[x].img + "'></div>" +
                    "<h1 class='pelicula-titulo'>" + pelicula[x].nombre + " </h1>" +
                    "<h4 class='pelicula-desc'>" + pelicula[x].descripcion + "</h4>" +
                    "<h3 style='margin-left: 20%; '>Trailer: </h3>" +
                    "<video class='pelicula-trailer' controls><source src='" + pelicula[x].trailer + "' type='video/mp4'>Por favor actualiza tu navegador para disfrutar del contenido</video>"
                "</div>";
                document.querySelector('section').innerHTML += detalles;
            }
        }
    }
}

function acerca() {
    alert('UAQflix Inc. proporciona servicios de streaming gratuitos.');
}
