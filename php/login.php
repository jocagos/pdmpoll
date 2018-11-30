<?php
	// Iniciar sesión
	session_start();

	$conexion = new mysqli('localhost', 'root', '', 'pdmpoll');

	// Capturar valores
	$usuario = $_GET['u'];
	$correo = $_GET['u'];
	$password = $_GET['pw'];

	// Verificar que los capos no esten vacios
	if(empty($usuario) && empty($password)){
		// Los campos están vacios
		echo "0";
	} else{
		// Todos los campos no están vacios

		// Encriptar contraseña
		$passwordEnc = md5($password);

		// Query para verificar inicio de sesión 	
		$query = "SELECT * FROM usuarios where (nombreUsuario = '$usuario' or correoUsuario = '$correo') and passwordUsuario = '$passwordEnc'";

		// Mandar query
		$rQuery = $conexion->query($query);

		// Verificar si existe un usuario con los datos ingresados
		if(mysqli_num_rows($rQuery) == 1){
			$r = $rQuery->fetch_object();
			echo $r->idUsuario;
		} else{
			// No existe usuario con los datos ingresados
			echo "0";
		}

	}
?>
