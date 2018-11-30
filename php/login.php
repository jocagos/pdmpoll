<?php
	// Iniciar sesión
	if( !isset($_SESSION) ){
		session_start();
		$_SESSION['open'] = true;
	}

	$data = file_get_contents('php://input');
	$data = json_decode($data, true);

	$conexion = new mysqli('localhost', 'root', '', 'pdmpoll');

	// Capturar valores
	$usuario = $data['user'];
	$correo = $data['user'];
	$password = $data['pass'];

	// Verificar que los capos no esten vacios
	if(empty($usuario) && empty($password)){
		// Los campos están vacios
		echo "0";
	} else{
		// Todos los campos no están vacios

		// Encriptar contraseña
		$passwordEnc = md5($password);

		// Query para verificar inicio de sesión 	
		$query = "SELECT * FROM users where (userName = '$usuario' or email = '$correo') and pass = '$passwordEnc'";
		
		// Mandar query
		$rQuery = $conexion->query($query);
		// Verificar si existe un usuario con los datos ingresados
		if(mysqli_num_rows($rQuery) == 1){
			$r = $rQuery->fetch_object();
			echo $r->userId;
		} else{
			// No existe usuario con los datos ingresados
			echo "0";
		}

	}
?>
