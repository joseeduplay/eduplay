<?php
// ================================================
// EDUPLAY SETUP SCRIPT
// Configuración automática de la aplicación
// ================================================

header('Content-Type: text/html; charset=utf-8');

// Verificar si ya está configurado
if (file_exists('config.lock')) {
    die('⚠️ EduPlay ya está configurado. Elimina el archivo "config.lock" para volver a configurar.');
}

$error = '';
$success = '';
$step = $_GET['step'] ?? 1;

// Procesar formularios
if ($_POST) {
    switch ($_POST['action']) {
        case 'test_db':
            $result = testDatabaseConnection($_POST);
            if ($result['success']) {
                $success = '✅ Conexión a la base de datos exitosa!';
                $step = 2;
            } else {
                $error = '❌ Error de conexión: ' . $result['error'];
            }
            break;
            
        case 'create_db':
            $result = createDatabase($_POST);
            if ($result['success']) {
                $success = '✅ Base de datos creada e inicializada correctamente!';
                $step = 3;
            } else {
                $error = '❌ Error al crear la base de datos: ' . $result['error'];
            }
            break;
            
        case 'create_config':
            $result = createConfiguration($_POST);
            if ($result['success']) {
                $success = '✅ Configuración completada! EduPlay está listo para usar.';
                $step = 4;
                // Crear archivo de bloqueo
                file_put_contents('config.lock', date('Y-m-d H:i:s'));
            } else {
                $error = '❌ Error al crear configuración: ' . $result['error'];
            }
            break;
    }
}

function testDatabaseConnection($data) {
    try {
        $dsn = "mysql:host={$data['host']};charset=utf8mb4";
        $pdo = new PDO($dsn, $data['username'], $data['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return ['success' => true];
    } catch (PDOException $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

function createDatabase($data) {
    try {
        // Conectar al servidor MySQL
        $dsn = "mysql:host={$data['host']};charset=utf8mb4";
        $pdo = new PDO($dsn, $data['username'], $data['password']);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Crear base de datos
        $pdo->exec("CREATE DATABASE IF NOT EXISTS {$data['database']} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
        $pdo->exec("USE {$data['database']}");
        
        // Leer y ejecutar el archivo SQL
        $sqlFile = file_get_contents('database/eduplay_db.sql');
        if (!$sqlFile) {
            throw new Exception('No se pudo leer el archivo eduplay_db.sql');
        }
        
        // Dividir en queries individuales
        $queries = array_filter(array_map('trim', explode(';', $sqlFile)));
        
        foreach ($queries as $query) {
            if (!empty($query) && !preg_match('/^--/', $query)) {
                $pdo->exec($query);
            }
        }
        
        // Insertar datos de ejemplo si existe el archivo
        if (file_exists('database/sample_data.sql')) {
            $sampleData = file_get_contents('database/sample_data.sql');
            $sampleQueries = array_filter(array_map('trim', explode(';', $sampleData)));
            
            foreach ($sampleQueries as $query) {
                if (!empty($query) && !preg_match('/^--/', $query)) {
                    $pdo->exec($query);
                }
            }
        }
        
        return ['success' => true];
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}

function createConfiguration($data) {
    try {
        // Actualizar archivo API con las credenciales
        $apiContent = file_get_contents('api.php');
        
        $apiContent = str_replace(
            [
                "const HOST = 'localhost';",
                "const USERNAME = 'root';",
                "const PASSWORD = '';",
                "const DATABASE = 'eduplay_db';"
            ],
            [
                "const HOST = '{$data['host']}';",
                "const USERNAME = '{$data['username']}';",
                "const PASSWORD = '{$data['password']}';",
                "const DATABASE = '{$data['database']}';"
            ],
            $apiContent
        );
        
        file_put_contents('api.php', $apiContent);
        
        // Crear archivo de configuración adicional
        $config = [
            'database' => [
                'host' => $data['host'],
                'username' => $data['username'],
                'password' => $data['password'],
                'database' => $data['database']
            ],
            'app' => [
                'name' => $data['app_name'] ?? 'EduPlay',
                'url' => $data['app_url'] ?? 'http://localhost',
                'version' => '1.0.0',
                'timezone' => $data['timezone'] ?? 'America/Lima'
            ],
            'created_at' => date('Y-m-d H:i:s')
        ];
        
        file_put_contents('config.json', json_encode($config, JSON_PRETTY_PRINT));
        
        return ['success' => true];
    } catch (Exception $e) {
        return ['success' => false, 'error' => $e->getMessage()];
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuración de EduPlay</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            overflow: hidden;
        }
        
        .header {
            background: linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
        }
        
        .content {
            padding: 40px;
        }
        
        .step-indicator {
            display: flex;
            justify-content: center;
            margin-bottom: 40px;
        }
        
        .step {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            font-weight: bold;
            color: #666;
        }
        
        .step.active {
            background: #667eea;
            color: white;
        }
        
        .step.completed {
            background: #00b894;
            color: white;
        }
        
        .form-group {
            margin-bottom: 25px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #2d3436;
        }
        
        .form-group input, .form-group select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
        }
        
        .form-group input:focus, .form-group select:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 10px rgba(102, 126, 234, 0.3);
        }
        
        .btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
        
        .btn-success {
            background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
        }
        
        .alert {
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 25px;
            font-weight: bold;
        }
        
        .alert-error {
            background: #ffe8e8;
            color: #d63031;
            border: 1px solid #fdb8b8;
        }
        
        .alert-success {
            background: #e8f8f5;
            color: #00b894;
            border: 1px solid #b8f5e8;
        }
        
        .requirements {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 25px;
        }
        
        .requirements h3 {
            color: #2d3436;
            margin-bottom: 15px;
        }
        
        .requirements ul {
            list-style-type: none;
            padding: 0;
        }
        
        .requirements li {
            padding: 5px 0;
            color: #636e72;
        }
        
        .requirements li:before {
            content: "✓";
            color: #00b894;
            font-weight: bold;
            margin-right: 10px;
        }
        
        .card {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 25px;
            margin-bottom: 25px;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #ddd;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 20px;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #00b894 0%, #00a085 100%);
            transition: width 0.3s ease;
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                width: calc(100% - 20px);
            }
            
            .content {
                padding: 20px;
            }
            
            .header {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎮 Configuración de EduPlay</h1>
            <p>Asistente de instalación automática</p>
        </div>
        
        <div class="content">
            <!-- Progress Bar -->
            <div class="progress-bar">
                <div class="progress-fill" style="width: <?= ($step / 4) * 100 ?>%"></div>
            </div>
            
            <!-- Step Indicator -->
            <div class="step-indicator">
                <div class="step <?= $step >= 1 ? 'active' : '' ?> <?= $step > 1 ? 'completed' : '' ?>">1</div>
                <div class="step <?= $step >= 2 ? 'active' : '' ?> <?= $step > 2 ? 'completed' : '' ?>">2</div>
                <div class="step <?= $step >= 3 ? 'active' : '' ?> <?= $step > 3 ? 'completed' : '' ?>">3</div>
                <div class="step <?= $step >= 4 ? 'active' : '' ?>">4</div>
            </div>
            
            <?php if ($error): ?>
                <div class="alert alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            
            <?php if ($success): ?>
                <div class="alert alert-success"><?= htmlspecialchars($success) ?></div>
            <?php endif; ?>
            
            <?php if ($step == 1): ?>
                <!-- STEP 1: Requirements Check -->
                <div class="card">
                    <h2>📋 Verificación de Requisitos</h2>
                    
                    <div class="requirements">
                        <h3>Requisitos del Sistema:</h3>
                        <ul>
                            <li>PHP <?= PHP_VERSION ?> <?= version_compare(PHP_VERSION, '7.4.0', '>=') ? '✅' : '❌ (Requiere 7.4+)' ?></li>
                            <li>Extensión PDO: <?= extension_loaded('pdo') ? '✅' : '❌' ?></li>
                            <li>Extensión PDO MySQL: <?= extension_loaded('pdo_mysql') ? '✅' : '❌' ?></li>
                            <li>Extensión JSON: <?= extension_loaded('json') ? '✅' : '❌' ?></li>
                            <li>Permisos de escritura: <?= is_writable('.') ? '✅' : '❌' ?></li>
                        </ul>
                    </div>
                    
                    <form method="post">
                        <input type="hidden" name="action" value="test_db">
                        
                        <div class="form-group">
                            <label for="host">🖥️ Servidor MySQL:</label>
                            <input type="text" id="host" name="host" value="localhost" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="username">👤 Usuario MySQL:</label>
                            <input type="text" id="username" name="username" value="root" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="password">🔐 Contraseña MySQL:</label>
                            <input type="password" id="password" name="password">
                        </div>
                        
                        <button type="submit" class="btn">🔍 Probar Conexión</button>
                    </form>
                </div>
                
            <?php elseif ($step == 2): ?>
                <!-- STEP 2: Database Creation -->
                <div class="card">
                    <h2>🗄️ Configuración de Base de Datos</h2>
                    <p>Se creará la base de datos con todas las tablas necesarias.</p>
                    
                    <form method="post">
                        <input type="hidden" name="action" value="create_db">
                        <input type="hidden" name="host" value="<?= htmlspecialchars($_POST['host'] ?? 'localhost') ?>">
                        <input type="hidden" name="username" value="<?= htmlspecialchars($_POST['username'] ?? 'root') ?>">
                        <input type="hidden" name="password" value="<?= htmlspecialchars($_POST['password'] ?? '') ?>">
                        
                        <div class="form-group">
                            <label for="database">🗄️ Nombre de la Base de Datos:</label>
                            <input type="text" id="database" name="database" value="eduplay_db" required>
                        </div>
                        
                        <div class="requirements">
                            <h3>Se crearán las siguientes tablas:</h3>
                            <ul>
                                <li>users - Información de usuarios</li>
                                <li>games - Catálogo de juegos</li>
                                <li>game_progress - Progreso de usuarios</li>
                                <li>achievements - Sistema de logros</li>
                                <li>user_achievements - Logros de usuarios</li>
                                <li>game_sessions - Sesiones de juego</li>
                                <li>daily_stats - Estadísticas diarias</li>
                            </ul>
                        </div>
                        
                        <button type="submit" class="btn">🚀 Crear Base de Datos</button>
                    </form>
                </div>
                
            <?php elseif ($step == 3): ?>
                <!-- STEP 3: Application Configuration -->
                <div class="card">
                    <h2>⚙️ Configuración de la Aplicación</h2>
                    
                    <form method="post">
                        <input type="hidden" name="action" value="create_config">
                        <input type="hidden" name="host" value="<?= htmlspecialchars($_POST['host'] ?? 'localhost') ?>">
                        <input type="hidden" name="username" value="<?= htmlspecialchars($_POST['username'] ?? 'root') ?>">
                        <input type="hidden" name="password" value="<?= htmlspecialchars($_POST['password'] ?? '') ?>">
                        <input type="hidden" name="database" value="<?= htmlspecialchars($_POST['database'] ?? 'eduplay_db') ?>">
                        
                        <div class="form-group">
                            <label for="app_name">🎮 Nombre de la Aplicación:</label>
                            <input type="text" id="app_name" name="app_name" value="EduPlay" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="app_url">🌐 URL de la Aplicación:</label>
                            <input type="url" id="app_url" name="app_url" value="<?= (isset($_SERVER['HTTPS']) ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['REQUEST_URI']) ?>" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="timezone">🕐 Zona Horaria:</label>
                            <select id="timezone" name="timezone" required>
                                <option value="America/Lima">Lima, Perú (GMT-5)</option>
                                <option value="America/Bogota">Bogotá, Colombia (GMT-5)</option>
                                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                                <option value="America/Argentina/Buenos_Aires">Buenos Aires, Argentina (GMT-3)</option>
                                <option value="America/Santiago">Santiago, Chile (GMT-3)</option>
                                <option value="Europe/Madrid">Madrid, España (GMT+1)</option>
                                <option value="UTC">UTC (GMT+0)</option>
                            </select>
                        </div>
                        
                        <button type="submit" class="btn btn-success">✅ Finalizar Configuración</button>
                    </form>
                </div>
                
            <?php elseif ($step == 4): ?>
                <!-- STEP 4: Completion -->
                <div class="card">
                    <h2>🎉 ¡Configuración Completada!</h2>
                    
                    <div class="alert alert-success">
                        <strong>✅ EduPlay ha sido configurado exitosamente!</strong>
                    </div>
                    
                    <div class="requirements">
                        <h3>📋 Resumen de la configuración:</h3>
                        <ul>
                            <li>Base de datos creada e inicializada</li>
                            <li>Archivo de configuración generado</li>
                            <li>API configurada correctamente</li>
                            <li>Datos de ejemplo insertados</li>
                        </ul>
                    </div>
                    
                    <div class="requirements">
                        <h3>🚀 Próximos pasos:</h3>
                        <ul>
                            <li>Accede a la aplicación en: <strong><a href="index.html" target="_blank">index.html</a></strong></li>
                            <li>Prueba la API en: <strong><a href="api.php/stats" target="_blank">api.php/stats</a></strong></li>
                            <li>Usuario de prueba: <strong>demo_student</strong></li>
                            <li>Revisa la documentación en README.md</li>
                        </ul>
                    </div>
                    
                    <div class="requirements">
                        <h3>📱 Para convertir a aplicación móvil:</h3>
                        <ul>
                            <li>Configura HTTPS (requerido para PWA)</li>
                            <li>Genera iconos para diferentes tamaños</li>
                            <li>Usa Capacitor para crear APK</li>
                            <li>Sigue las instrucciones en README.md</li>
                        </ul>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <a href="index.html" class="btn btn-success" style="text-decoration: none; display: inline-block; margin-right: 10px;">
                            🎮 Ir a EduPlay
                        </a>
                        <a href="api.php/stats" class="btn" style="text-decoration: none; display: inline-block;" target="_blank">
                            🔍 Probar API
                        </a>
                    </div>
                    
                    <div style="margin-top: 30px; padding: 20px; background: #fff3cd; border-radius: 8px; border: 1px solid #ffeaa7;">
                        <h4>⚠️ Importante:</h4>
                        <p>Por seguridad, elimina este archivo (setup.php) después de completar la configuración.</p>
                        <p>El archivo config.lock evitará que se ejecute nuevamente este asistente.</p>
                    </div>
                </div>
                
                <script>
                    // Opcional: Eliminar setup.php automáticamente después de 10 segundos
                    setTimeout(() => {
                        if (confirm('¿Deseas eliminar automáticamente el archivo setup.php por seguridad?')) {
                            fetch('setup.php?delete=1')
                                .then(() => alert('Archivo setup.php eliminado exitosamente'))
                                .catch(() => alert('No se pudo eliminar automáticamente. Elimínalo manualmente.'));
                        }
                    }, 10000);
                </script>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>

<?php
// Auto-eliminar archivo si se solicita
if (isset($_GET['delete']) && $_GET['delete'] == '1' && $step == 4) {
    unlink(__FILE__);
    exit('Setup file deleted successfully');
}
?>