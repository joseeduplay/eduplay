<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class DatabaseConfig {
    const HOST     = 'localhost';
    const USERNAME = 'root';
    const PASSWORD = '';
    const DATABASE = 'eduplay_db';
}

function sendJson($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

$mysqli = new mysqli(
    DatabaseConfig::HOST,
    DatabaseConfig::USERNAME,
    DatabaseConfig::PASSWORD,
    DatabaseConfig::DATABASE
);

if ($mysqli->connect_error) {
    sendJson(["success" => false, "message" => "Error en la conexión a la base de datos"], 500);
}

$path = explode('/', trim($_GET['q'] ?? '', '/'));

// Endpoint de test de conexión
if ($path[0] === 'ping') {
    sendJson([
        "success" => true,
        "message" => "API activa y funcionando correctamente.",
        "offline" => false
    ]);
}

switch ($path[0]) {
    case 'register':
        $data = json_decode(file_get_contents("php://input"), true);
        $stmt = $mysqli->prepare("INSERT INTO users (name, username, age, grade, avatar) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("ssiis", $data['name'], $data['username'], $data['age'], $data['grade'], $data['avatar']);
        if ($stmt->execute()) {
            $user_id = $stmt->insert_id;
            $res = $mysqli->query("SELECT * FROM users WHERE id = $user_id");
            $user = $res->fetch_assoc();
            sendJson(["success" => true, "user" => $user]);
        } else {
            sendJson(["success" => false, "message" => "Error al registrar usuario o nombre de usuario duplicado"], 400);
        }
        break;

    case 'login':
        $data = json_decode(file_get_contents("php://input"), true);
        $username = $mysqli->real_escape_string($data['username']);
        $res = $mysqli->query("SELECT * FROM users WHERE username = '$username'");
        if ($res->num_rows > 0) {
            $user = $res->fetch_assoc();
            $mysqli->query("UPDATE users SET last_login = NOW() WHERE id = " . $user['id']);
            sendJson(["success" => true, "user" => $user]);
        } else {
            sendJson(["success" => false, "message" => "Usuario no encontrado"], 404);
        }
        break;

    default:
        sendJson(["success" => false, "message" => "Endpoint no válido"], 404);
}
?>
