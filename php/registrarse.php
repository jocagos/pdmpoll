<?php 
	// Iniciar conexión
	$conexion = mysqli_connect('localhost', 'root', '', 'pdmpoll');
	$data = file_get_contents('php://input');
	
	$data = json_decode($data, true);
	
	// Capturar valores
	$user = $data['user'];
	$mail = $data['email'];
    $pass = $data['pass'];

	// Verificar que los campos no esten vacios
	if(empty($user) && empty($mail) && empty($pass)){
		// Todos los campos están vacios
		echo "0";
	} else{
		// No todos los campos están vacios

		// Verificar si el campo de nombre de usuario está vacio
		if(empty($user)){
			// El campo está vacio
			file_put_contents('errReg.txt', 'NO_USER');
			echo "2";
		} else{
			// El campo no está vacio
			
			// Verificar si el campo de correo esta vacio
			if(empty($mail)){
				// El campo esta vacio
				file_put_contents('errReg.txt', 'NO_MAIL');
				echo "3";
			}else{
				// El campo no esta vacio
		
				// Verificar si el campo de contraseña esta vacio
				if(empty($pass)){
					// El campo esta vacio
					echo "4";
					file_put_contents('errReg.txt', 'NO_PASS');
				} else{

					// Verificar que el nombre de usuario o correo no se repitan. Solo pueden 
					// existir un nombre de usuario unico al igual que el correo
					
					// Query para verificar si existe un nombre de usuario o correo ya existentes en la aplicación
					$query = "SELECT * FROM users where userName like '$user' and email like '$mail'";
					$rQuery = $conexion->query($query);

					if(mysqli_num_rows($rQuery) == 1){
						// El nombre de usuario o correo ya existen
						echo "5";
						file_put_contents('errReg.txt', 'ALREADY');
					}else{
						// Registro existoso

						// Encriptar contraseña
						$passass = md5($pass);
						
						$insertQuery = "INSERT INTO users (userName, pass, email) VALUES ('$user', '$passass', '$mail')";
						$rInsert = $conexion->query($insertQuery);
						echo "1";
						file_put_contents('errReg.txt', 'SUCCESS');
					}
				}
			}
		}
	}
?>