<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST["usuario"];
    $foto = $_FILES["foto"]["name"];
    $password = $_POST["password"];
    $correo = $_POST["correo"];

    // Guardar la foto en una carpeta en el servidor
    $fotoRuta = "fotos/" . $foto;
    move_uploaded_file($_FILES["foto"]["tmp_name"], $fotoRuta);

    // Conectar a la base de datos y guardar los datos del usuario
    $conexion = new mysqli("localhost", "nombre_usuario", "contraseña", "nombre_base_de_datos");

    if ($conexion->connect_error) {
        die("Error en la conexión: " . $conexion->connect_error);
    }

    $sql = "INSERT INTO usuarios (usuario, foto, password, correo) VALUES ('$usuario', '$fotoRuta', '$password', '$correo')";

    if ($conexion->query($sql) === TRUE) {
        echo "Usuario registrado correctamente.";
    } else {
        echo "Error al registrar el usuario: " . $conexion->error;
    }

    $conexion->close();
}
?>
