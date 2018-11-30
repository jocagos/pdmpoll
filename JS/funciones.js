var qIdx = 1;

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
    appAjax.open('GET', 'http://localhost/Polls/php/peliculas.php');
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

function addPOption(i) {
    poller = document.getElementById('Q' + i + 'poll-options');
    poller.innerHTML += '\n<li class="list-group-item"><input type="text" class="Q' + i + 'answear form-control" maxlength="100" name=""></li>';
}

function addPQuestion() {
    poller = document.getElementById('preguntaContainer');
    qIdx++;
    poller.innerHTML += '<br>\n<h3>Pregunta ' + qIdx + ': </h3><input type="text" class="form-control" name="question" class="question" id="Q' + qIdx + '"><br><h4>Escribe las posibles respuestas:</h4><br><ul class="list-group" id="Q' + qIdx + 'poll-options"><li class="list-group-item"><input type="text" class="Q' + qIdx + 'answear form-control" maxlength="100" name=""></li><li class="list-group-item"><input type="text" class="' + 'Q' + qIdx + 'answear form-control" maxlength="100" name=""></li></ul><br><button type="button" onclick=addPOption(' + qIdx + ') class="btn btn-lg btn-info">Añadir Opcion</button>';
}

function addPoll() {
    var quests = {};
    quests['title'] = document.getElementById('T').value;
    quests['dep'] = document.getElementById('D').value;
    quests['user'] = localStorage.getItem('idUsuario');
    quests['des'] = document.getElementById('DS').value;
    var keys = [];
    for (var i = 1; i <= qIdx; ++i) {
        var Q = document.getElementById('Q' + (i)).value;
        var elem = document.getElementsByClassName('Q' + i + 'answear form-control');
        var options = [];
        keys.push(Q);
        for (var j = 0; j < elem.length; j++) {
            if (typeof elem[j].value !== 'undefined') {
                options.push(elem[j].value);
            }
        }
        quests[Q] = options;
    }
    // var a = s.split('\n').filter(listE => listE.length > 0 && !(/^\s+$/.test(listE)));
    // a = a.map(Function.prototype.call, String.prototype.trim);
    console.log(quests);
    var dataPost = {};
    dataPost['questions'] = keys;
    dataPost['vals'] = { quests };
    var dataStr = JSON.stringify(quests);
    console.log('str: >' + dataStr + '<');
    console.log(quests);
    req = new XMLHttpRequest();
    //?q=' + question
    var url = 'http://localhost:9999/Polls/php/addpoll.php';
    // for (var i = 0; i < options.length; ++i) {
    //     url += '&p' + i + '=' + options[i];
    // }
    req.open('POST', url);
    req.setRequestHeader('Content-Type', 'application/json', true);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {

            console.log('RT: ' + req.responseText);
        }
        // else {
        //     alert('loginAjax.responseText = ' + loginAjax.readyState + ' status = ' + loginAjax.status + ' statusText = ' + loginAjax.statusText);
        //     setTimeout(function() {
        //         document.querySelector('.respuesta').style.opacity = "0";
        //     }, 3000)
        // }
    }
    req.send(dataStr);
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
    var url = 'http://localhost:9999/Polls/php/login.php';
    var datos = { 'user': usuario, 'pass': password };
    loginAjax.open('POST', url);
    loginAjax.setRequestHeader('Content-Type', 'application/json', true);
    loginAjax.onreadystatechange = function() {
        // alert('rs: ' + loginAjax.readyState + ' s: ' + loginAjax.status);
        if (loginAjax.readyState == 4 && loginAjax.status == 200) {

            if (loginAjax.responseText != "0") {
                // Asignar idUsuario para verificar que este iniciando
                localStorage.setItem('idUsuario', loginAjax.responseText);
                // Mandar respuesta
                alert("Has iniciado de forma exitosa. ¡Disfruta las películas!");
                // Mandar a inicio.html
                // setTimeout(function() {
                window.location.assign("http://localhost:9999/Polls/addpoll.html");
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
        //     alert('loginAjax.responseText = ' + loginAjax.readyState + ' status = ' + loginAjax.status + ' statusText = ' + loginAjax.statusText);
        //     setTimeout(function() {
        //         document.querySelector('.respuesta').style.opacity = "0";
        //     }, 3000)
        // }
    }
    loginAjax.send(JSON.stringify(datos));

}
// Función para registrar un nuevo usuario
function registrarse() {

    usuario = document.getElementById('usuarioR').value;
    correo = document.getElementById('correoR').value;
    password = document.getElementById('passwordR').value;

    logAjax = new XMLHttpRequest();
    var url = 'php/registrarse.php';
    logAjax.open('POST', url);
    logAjax.setRequestHeader('Content-Type', 'application/json');
    d = {};
    d['user'] = usuario;
    d['pass'] = password;
    d['email'] = correo;
    logAjax.onreadystatechange = function() {
        if (logAjax.readyState == 4 && logAjax.status == 200) {
            alert('rt: ' + logAjax.responseText);
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
    logAjax.send(JSON.stringify(d));
}
// Función para cerrar sesión
function logout() {
    outAjax = new XMLHttpRequest();
    var url = 'http://localhost:9999/Polls/php/logout.php';
    outAjax.open('POST', url);
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
    var u = localStorage.getItem('idUsuario');
    outAjax.send();
}
// Ver una pelicula seleccionada
function verPelicula(id) {
    localStorage.setItem('idPelicula', id);
    setTimeout(function() {
        window.location.assign('detalles.html');
    }, 100);
}

function cargarDetalles() {

    var u = localStorage.getItem('idUsuario');
    // Crear ajax
    var req = new XMLHttpRequest();
    var url = 'http://localhost:9999/Polls/php/detalles.php';
    req.open('POST', url);
    var d = {};
    d['user'] = u;
    var s = JSON.stringify(d);
    req.onreadystatechange = function() {
        if (req.readyState == 4 && req.status == 200) {
            if (req.responseText) {
                polls = JSON.parse(req.responseText);
                for (var i = 0; i < polls.length; ++i) {
                    var pollItem = '<li class="list-group-item list-group-item-primary" id="P' + i + '><button class="btn btn-dark">' + polls[i]['title'] + '</button> <button class="btn btn-danger onclick="deletepoll(\'' + polls[i]['title'] + '\')">Borrar</button></li>';
                    document.getElementById('poll-list').innerHTML += pollItem;
                }
            }
            // for (x = 0; x < polls.length; x++) {
            //     console.log(polls);
            //     //var pollItem = '<li class="list-group-item list-group-item-primary" id="P' + x + '><button class="btn btn-dark"></button> <button class="btn btn-danger">Borrar</button></li>';
            //     //document.getElementById('poll-list').innerHTML += detalles;
            // }
        }
    }
    req.send(JSON.stringify(d));
}

function deletepoll(poll) {
    if (confirm('Seguro que quiere eliminar ' + poll + '?')) {

        var u = localStorage.getItem('idUsuario');
        var req = XMLHttpRequest();
        var url = 'http://localhost:9999/Polls/php/deletepoll.php';
        req.open('POST', url);
        var d = {};
        d['title'] = poll;
        d['user'] = u;
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                if (req.responseText == 'true') {
                    alert('Se borro con exito la encuesta');
                    document.location.reload(true);
                } else {
                    alert('Error al intentar borrar');
                }
            }
        }
        req.send(JSON.stringify(d));
    }
}

function acerca() {
    alert('PDMPoll Inc. proporciona servicios de polling gratuitos.');
}