-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS eduplay_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE eduplay_db;
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    age INT NOT NULL CHECK (age >= 5 AND age <= 18),
    grade INT NOT NULL CHECK (grade >= 1 AND grade <= 6),
    avatar VARCHAR(10) DEFAULT '🧑‍🎓',
    coins INT DEFAULT 100,
    level INT DEFAULT 1,
    total_score INT DEFAULT 0,
    games_completed INT DEFAULT 0,
    streak_days INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_grade (grade),
    INDEX idx_total_score (total_score)
);

-- TABLA DE JUEGOS

CREATE TABLE games (
    id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    category VARCHAR(50),
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy',
    stages INT DEFAULT 15,
    game_type VARCHAR(50),
    grade INT NOT NULL CHECK (grade >= 1 AND grade <= 6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_grade (grade),
    INDEX idx_difficulty (difficulty),
    INDEX idx_category (category)
);


-- TABLA DE PROGRESO DE USUARIOS

CREATE TABLE user_progress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    stage INT DEFAULT 1,
    completed BOOLEAN DEFAULT FALSE,
    best_score INT DEFAULT 0,
    play_count INT DEFAULT 0,
    last_played TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_game (user_id, game_id),
    INDEX idx_user_id (user_id),
    INDEX idx_game_id (game_id),
    INDEX idx_completed (completed)
);


-- TABLA DE LOGROS
CREATE TABLE achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(10),
    condition_type ENUM('score', 'games_completed', 'streak', 'stage', 'time') NOT NULL,
    condition_value INT NOT NULL,
    points_reward INT DEFAULT 0,
    coins_reward INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- TABLA DE LOGROS DE USUARIOS
-- ================================================
CREATE TABLE user_achievements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    achievement_id INT NOT NULL,
    achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_achievement (user_id, achievement_id),
    INDEX idx_user_id (user_id),
    INDEX idx_achievement_id (achievement_id)
);

-- ================================================
-- TABLA DE SESIONES DE JUEGO
-- ================================================
CREATE TABLE game_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    stage INT NOT NULL,
    score INT DEFAULT 0,
    time_spent INT DEFAULT 0, -- en segundos
    completed BOOLEAN DEFAULT FALSE,
    session_date DATE DEFAULT (CURRENT_DATE),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_game_id (game_id),
    INDEX idx_session_date (session_date)
);

-- ================================================
-- TABLA DE BACKUP AUTOMÁTICO
-- ================================================
CREATE TABLE backups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    size_bytes INT,
    created_by INT,
    backup_type ENUM('manual', 'automatic') DEFAULT 'manual',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_created_at (created_at)
);

-- ================================================
-- INSERTAR DATOS INICIALES - JUEGOS
-- ================================================

-- Juegos para 1° Primaria
INSERT INTO games (id, name, description, icon, category, difficulty, stages, game_type, grade) VALUES
(1, 'Puzzles Numéricos', 'Completa puzzles con números del 1 al 10', '🧩', 'matemáticas', 'easy', 15, 'puzzle', 1),
(2, 'Memoria de Números', 'Memoriza secuencias de números', '🧠', 'memoria', 'easy', 15, 'memory', 1),
(3, 'Suma Básica', 'Aprende a sumar con objetos visuales', '➕', 'matemáticas', 'easy', 15, 'math', 1),
(4, 'Colores y Formas', 'Identifica y relaciona colores y formas', '🎨', 'lógica', 'easy', 15, 'colors', 1),
(5, 'Secuencias Simples', 'Completa secuencias lógicas básicas', '🔢', 'lógica', 'easy', 15, 'sequence', 1),
(6, 'Letras y Sonidos', 'Asocia letras con sus sonidos', '🔤', 'lenguaje', 'easy', 15, 'letters', 1),
(7, 'Cuenta Objetos', 'Cuenta objetos del 1 al 20', '🔢', 'matemáticas', 'easy', 15, 'counting', 1);

-- Juegos para 2° Primaria
INSERT INTO games (id, name, description, icon, category, difficulty, stages, game_type, grade) VALUES
(8, 'Sumas y Restas', 'Operaciones básicas hasta el 100', '🧮', 'matemáticas', 'easy', 15, 'math', 2),
(9, 'Memoria Visual', 'Juegos de memoria con imágenes', '👁️', 'memoria', 'easy', 15, 'memory', 2),
(10, 'Patrones Lógicos', 'Identifica y completa patrones', '🔄', 'lógica', 'medium', 15, 'pattern', 2),
(11, 'Palabras y Sílabas', 'Forma palabras y cuenta sílabas', '📝', 'lenguaje', 'medium', 15, 'words', 2),
(12, 'Comparar Números', 'Mayor, menor e igual hasta el 100', '⚖️', 'matemáticas', 'medium', 15, 'comparison', 2),
(13, 'Figuras Geométricas', 'Reconoce formas geométricas básicas', '📐', 'geometría', 'medium', 15, 'shapes', 2),
(14, 'Lectura de Reloj', 'Aprende las horas en punto y media', '🕐', 'tiempo', 'medium', 15, 'time', 2);

-- Juegos para 3° Primaria
INSERT INTO games (id, name, description, icon, category, difficulty, stages, game_type, grade) VALUES
(15, 'Puzzle de Multiplicaciones', 'Aprende las tablas de multiplicar', '✖️', 'matemáticas', 'medium', 15, 'multiplication', 3),
(16, 'Memoria de Figuras', 'Memoriza patrones geométricos', '🔺', 'memoria', 'medium', 15, 'memory', 3),
(17, 'Cálculo Mental Rápido', 'Resuelve operaciones mentalmente', '⚡', 'matemáticas', 'medium', 15, 'mental_math', 3),
(18, 'Puzzle de Fracciones', 'Introduce conceptos de fracciones', '🍰', 'matemáticas', 'medium', 15, 'fractions', 3),
(19, 'Secuencias Numéricas', 'Encuentra patrones en números', '🔢', 'lógica', 'medium', 15, 'sequence', 3),
(20, 'Rompecabezas de Palabras', 'Forma palabras con sílabas', '🧩', 'lenguaje', 'medium', 15, 'word_puzzle', 3),
(21, 'Lógica y Patrones', 'Resuelve puzzles lógicos', '🎯', 'lógica', 'medium', 15, 'logic', 3),
(22, 'Aventuras Matemáticas', 'Explora conceptos matemáticos', '🗺️', 'matemáticas', 'medium', 15, 'adventure', 3),
(23, 'Resuelve el Enigma', 'Acertijos y problemas lógicos', '🕵️', 'lógica', 'hard', 15, 'riddle', 3),
(24, 'Crucigramas Numéricos', 'Completa crucigramas con números', '📋', 'matemáticas', 'hard', 15, 'crossword', 3);

-- Juegos para 4° Primaria
INSERT INTO games (id, name, description, icon, category, difficulty, stages, game_type, grade) VALUES
(25, 'Multiplicación y División', 'Domina operaciones avanzadas', '➗', 'matemáticas', 'medium', 15, 'math_advanced', 4),
(26, 'Lógica Matemática', 'Problemas de razonamiento lógico', '🧠', 'lógica', 'medium', 15, 'math_logic', 4),
(27, 'Operaciones Mixtas', 'Combina diferentes operaciones', '🔄', 'matemáticas', 'medium', 15, 'mixed_operations', 4),
(28, 'Secuencias Geométricas', 'Patrones con figuras geométricas', '📐', 'geometría', 'medium', 15, 'geometry', 4),
(29, 'Rompecabezas de Problemas', 'Resuelve problemas paso a paso', '🧩', 'matemáticas', 'hard', 15, 'problem_solving', 4),
(30, 'Sudoku para Niños', 'Sudoku adaptado para estudiantes', '🔢', 'lógica', 'hard', 15, 'sudoku', 4),
(31, 'Aventuras con Decimales', 'Explora números decimales', '🎯', 'matemáticas', 'hard', 15, 'decimals', 4),
(32, 'Memoria de Símbolos', 'Memoriza símbolos matemáticos', '🔣', 'memoria', 'medium', 15, 'symbol_memory', 4),
(33, 'Puzzle de Fracciones', 'Operaciones con fracciones', '🍰', 'matemáticas', 'hard', 15, 'fractions_advanced', 4),
(34, 'Desafío Matemático', 'Retos matemáticos complejos', '🏆', 'matemáticas', 'hard', 15, 'math_challenge', 4);

-- Juegos para 5° Primaria
INSERT INTO games (id, name, description, icon, category, difficulty, stages, game_type, grade) VALUES
(35, 'Operaciones Avanzadas', 'Operaciones con números grandes', '🔢', 'matemáticas', 'hard', 15, 'advanced_operations', 5),
(36, 'Problemas Verbales', 'Resuelve problemas de la vida real', '📖', 'matemáticas', 'hard', 15, 'word_problems', 5),
(37, 'Laberinto de Fracciones', 'Navega usando fracciones', '🗺️', 'matemáticas', 'hard', 15, 'fraction_maze', 5),
(38, 'Puzzle de Decimales', 'Operaciones con decimales', '🎯', 'matemáticas', 'hard', 15, 'decimal_puzzle', 5),
(39, 'Sudoku Intermedio', 'Sudoku de dificultad media', '🧩', 'lógica', 'hard', 15, 'sudoku_intermediate', 5),
(40, 'Desafíos Lógicos', 'Problemas de lógica compleja', '🧠', 'lógica', 'hard', 15, 'logic_challenges', 5),
(41, 'Crucigrama Matemático', 'Crucigramas con operaciones', '📋', 'matemáticas', 'hard', 15, 'math_crossword', 5),
(42, 'Matemática en la Vida Real', 'Aplica matemáticas al mundo real', '🌍', 'matemáticas', 'hard', 15, 'real_world_math', 5),
(43, 'Desafío de Figuras', 'Problemas con geometría', '📐', 'geometría', 'hard', 15, 'geometry_challenge', 5),
(44, 'Calcula y Avanza', 'Progresa resolviendo cálculos', '🎮', 'matemáticas', 'hard', 15, 'calculate_advance', 5);

-- Juegos para 6° Primaria
INSERT INTO games (id, name, description, icon, category, difficulty, stages, game_type, grade) VALUES
(45, 'Desafíos Algebraicos', 'Introducción al álgebra', '📊', 'matemáticas', 'hard', 15, 'algebra', 6),
(46, 'Lógica y Estrategia', 'Juegos de estrategia compleja', '♟️', 'lógica', 'hard', 15, 'strategy', 6),
(47, 'Puzzle de Porcentajes', 'Calcula porcentajes y proporciones', '📊', 'matemáticas', 'hard', 15, 'percentages', 6),
(48, 'Operaciones Combinadas', 'Operaciones con múltiples pasos', '🔄', 'matemáticas', 'hard', 15, 'combined_operations', 6),
(49, 'Desafío de Medidas', 'Conversiones y medidas', '📏', 'matemáticas', 'hard', 15, 'measurements', 6),
(50, 'Matemática en el Mundo', 'Aplicaciones avanzadas', '🌍', 'matemáticas', 'hard', 15, 'world_math', 6),
(51, 'Juegos de Estrategia', 'Pensamiento estratégico avanzado', '🎯', 'lógica', 'hard', 15, 'strategy_games', 6),
(52, 'Criptogramas Matemáticos', 'Descifra códigos matemáticos', '🔐', 'matemáticas', 'hard', 15, 'cryptograms', 6),
(53, 'Puzzle de Proporciones', 'Resuelve proporciones complejas', '⚖️', 'matemáticas', 'hard', 15, 'proportions', 6),
(54, 'Desafío Final', 'El reto más difícil de todos', '👑', 'matemáticas', 'hard', 15, 'final_challenge', 6);

-- ================================================
-- INSERTAR LOGROS PREDEFINIDOS
-- ================================================
INSERT INTO achievements (name, description, icon, condition_type, condition_value, points_reward, coins_reward) VALUES
('Primer Paso', 'Completa tu primer juego', '🎯', 'games_completed', 1, 50, 10),
('Aprendiz Dedicado', 'Completa 5 juegos', '📚', 'games_completed', 5, 100, 25),
('Maestro de Números', 'Completa 10 juegos', '🧮', 'games_completed', 10, 200, 50),
('Genio Matemático', 'Completa 25 juegos', '🧠', 'games_completed', 25, 500, 100),
('Leyenda EduPlay', 'Completa todos los juegos de tu grado', '👑', 'games_completed', 50, 1000, 200),

('Puntuación Básica', 'Alcanza 1000 puntos totales', '⭐', 'score', 1000, 50, 20),
('Puntuación Intermedia', 'Alcanza 5000 puntos totales', '🌟', 'score', 5000, 100, 50),
('Puntuación Avanzada', 'Alcanza 10000 puntos totales', '✨', 'score', 10000, 200, 100),
('Puntuación Élite', 'Alcanza 25000 puntos totales', '💫', 'score', 25000, 500, 200),
('Puntuación Legendaria', 'Alcanza 50000 puntos totales', '🏆', 'score', 50000, 1000, 500),

('Constancia', 'Juega 3 días consecutivos', '📅', 'streak', 3, 75, 15),
('Dedicación', 'Juega 7 días consecutivos', '🔥', 'streak', 7, 150, 30),
('Perseverancia', 'Juega 15 días consecutivos', '💪', 'streak', 15, 300, 75),
('Compromiso Total', 'Juega 30 días consecutivos', '🎖️', 'streak', 30, 750, 150);

-- ================================================
-- CREAR USUARIOS DE EJEMPLO (OPCIONAL)
-- ================================================
INSERT INTO users (name, username, age, grade, avatar, coins, level, total_score) VALUES
('María González', 'maria123', 8, 2, '🦄', 150, 2, 850),
('Carlos Rodríguez', 'carlos_pro', 10, 4, '🤖', 200, 3, 1200),
('Ana Jiménez', 'ana_star', 7, 1, '⭐', 125, 1, 450),
('Luis Martín', 'luis_gamer', 11, 5, '🦸', 300, 4, 2100),
('Sofia López', 'sofia_smart', 9, 3, '🐱', 175, 2, 950);

-- ================================================
-- CREAR PROGRESO DE EJEMPLO
-- ================================================
INSERT INTO user_progress (user_id, game_id, stage, completed, best_score, play_count) VALUES
-- Progreso de María (grade 2)
(1, 8, 5, FALSE, 150, 3),
(1, 9, 3, FALSE, 120, 2),
(1, 10, 15, TRUE, 280, 5),

-- Progreso de Carlos (grade 4)  
(2, 25, 8, FALSE, 220, 4),
(2, 26, 12, FALSE, 180, 3),
(2, 27, 15, TRUE, 350, 6),

-- Progreso de Ana (grade 1)
(3, 1, 3, FALSE, 80, 2),
(3, 2, 2, FALSE, 60, 1),
(3, 3, 5, FALSE, 95, 3),

-- Progreso de Luis (grade 5)
(4, 35, 10, FALSE, 280, 5),
(4, 36, 15, TRUE, 420, 8),
(4, 37, 6, FALSE, 190, 2),

-- Progreso de Sofia (grade 3)
(5, 15, 7, FALSE, 160, 4),
(5, 16, 4, FALSE, 110, 2),
(5, 17, 9, FALSE, 200, 3);

-- ================================================
-- VISTAS ÚTILES PARA REPORTES
-- ================================================

-- Vista de ranking de usuarios por grado
CREATE VIEW user_ranking AS
SELECT 
    u.id,
    u.name,
    u.username,
    u.grade,
    u.total_score,
    u.level,
    u.games_completed,
    u.coins,
    RANK() OVER (PARTITION BY u.grade ORDER BY u.total_score DESC) as grade_rank,
    RANK() OVER (ORDER BY u.total_score DESC) as global_rank
FROM users u
ORDER BY u.grade, u.total_score DESC;

-- Vista de estadísticas de juegos
CREATE VIEW game_statistics AS
SELECT 
    g.id,
    g.name,
    g.grade,
    g.category,
    g.difficulty,
    COUNT(up.user_id) as players_count,
    AVG(up.best_score) as avg_score,
    MAX(up.best_score) as max_score,
    COUNT(CASE WHEN up.completed = TRUE THEN 1 END) as completion_count,
    ROUND((COUNT(CASE WHEN up.completed = TRUE THEN 1 END) * 100.0 / COUNT(up.user_id)), 2) as completion_rate
FROM games g
LEFT JOIN user_progress up ON g.id = up.game_id
GROUP BY g.id, g.name, g.grade, g.category, g.difficulty
ORDER BY g.grade, g.id;

-- Vista de actividad diaria
CREATE VIEW daily_activity AS
SELECT 
    DATE(gs.created_at) as game_date,
    COUNT(DISTINCT gs.user_id) as active_users,
    COUNT(gs.id) as total_sessions,
    SUM(gs.score) as total_score,
    AVG(gs.time_spent) as avg_time_spent,
    COUNT(CASE WHEN gs.completed = TRUE THEN 1 END) as completed_sessions
FROM game_sessions gs
GROUP BY DATE(gs.created_at)
ORDER BY game_date DESC;

-- ================================================
-- PROCEDIMIENTOS ALMACENADOS
-- ================================================

DELIMITER //

-- Procedimiento para actualizar estadísticas del usuario
CREATE PROCEDURE UpdateUserStats(
    IN p_user_id INT,
    IN p_score_increase INT,
    IN p_games_completed_increase INT
)
BEGIN
    DECLARE new_level INT;
    
    -- Actualizar puntuación y juegos completados
    UPDATE users 
    SET 
        total_score = total_score + p_score_increase,
        games_completed = games_completed + p_games_completed_increase,
        last_login = CURRENT_TIMESTAMP
    WHERE id = p_user_id;
    
    -- Calcular nuevo nivel basado en puntuación
    SELECT FLOOR((total_score / 1000) + 1) INTO new_level
    FROM users WHERE id = p_user_id;
    
    -- Actualizar nivel
    UPDATE users SET level = new_level WHERE id = p_user_id;
    
    -- Verificar y otorgar logros automáticamente
    CALL CheckAndGrantAchievements(p_user_id);
END //

-- Procedimiento para verificar y otorgar logros
CREATE PROCEDURE CheckAndGrantAchievements(IN p_user_id INT)
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE v_achievement_id INT;
    DECLARE v_condition_type VARCHAR(20);
    DECLARE v_condition_value INT;
    DECLARE v_user_value INT;
    
    DECLARE achievement_cursor CURSOR FOR
        SELECT a.id, a.condition_type, a.condition_value
        FROM achievements a
        WHERE a.id NOT IN (
            SELECT ua.achievement_id 
            FROM user_achievements ua 
            WHERE ua.user_id = p_user_id
        );
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN achievement_cursor;
    
    achievement_loop: LOOP
        FETCH achievement_cursor INTO v_achievement_id, v_condition_type, v_condition_value;
        
        IF done THEN
            LEAVE achievement_loop;
        END IF;
        
        -- Obtener valor actual del usuario según el tipo de condición
        CASE v_condition_type
            WHEN 'score' THEN
                SELECT total_score INTO v_user_value FROM users WHERE id = p_user_id;
            WHEN 'games_completed' THEN
                SELECT games_completed INTO v_user_value FROM users WHERE id = p_user_id;
            WHEN 'streak' THEN
                SELECT streak_days INTO v_user_value FROM users WHERE id = p_user_id;
            ELSE
                SET v_user_value = 0;
        END CASE;
        
        -- Si cumple la condición, otorgar el logro
        IF v_user_value >= v_condition_value THEN
            INSERT INTO user_achievements (user_id, achievement_id)
            VALUES (p_user_id, v_achievement_id);
            
            -- Otorgar recompensas
            UPDATE users u
            JOIN achievements a ON a.id = v_achievement_id
            SET 
                u.total_score = u.total_score + a.points_reward,
                u.coins = u.coins + a.coins_reward
            WHERE u.id = p_user_id;
        END IF;
        
    END LOOP;
    
    CLOSE achievement_cursor;
END //

-- Procedimiento para crear backup automático
CREATE PROCEDURE CreateAutomaticBackup()
BEGIN
    DECLARE backup_filename VARCHAR(255);
    DECLARE backup_size INT DEFAULT 0;
    
    SET backup_filename = CONCAT('auto_backup_', DATE_FORMAT(NOW(), '%Y%m%d_%H%i%s'), '.sql');
    
    -- Simular tamaño del backup (en una implementación real, calcularías el tamaño real)
    SELECT COUNT(*) * 1024 INTO backup_size FROM users;
    
    INSERT INTO backups (filename, size_bytes, backup_type)
    VALUES (backup_filename, backup_size, 'automatic');
    
    SELECT LAST_INSERT_ID() as backup_id, backup_filename as filename;
END //

-- Procedimiento para limpiar datos antiguos
CREATE PROCEDURE CleanupOldData()
BEGIN
    -- Eliminar sesiones de juego muy antiguas (más de 6 meses)
    DELETE FROM game_sessions 
    WHERE created_at < DATE_SUB(NOW(), INTERVAL 6 MONTH);
    
    -- Eliminar backups automáticos antiguos (más de 3 meses)
    DELETE FROM backups 
    WHERE backup_type = 'automatic' 
    AND created_at < DATE_SUB(NOW(), INTERVAL 3 MONTH);
    
    SELECT ROW_COUNT() as cleaned_records;
END //

DELIMITER ;

-- ================================================
-- TRIGGERS
-- ================================================

DELIMITER //

-- Trigger para registrar sesiones de juego
CREATE TRIGGER after_progress_update
    AFTER UPDATE ON user_progress
    FOR EACH ROW
BEGIN
    IF NEW.best_score > OLD.best_score OR NEW.stage > OLD.stage THEN
        INSERT INTO game_sessions (user_id, game_id, stage, score, completed)
        VALUES (NEW.user_id, NEW.game_id, NEW.stage, NEW.best_score, NEW.completed);
    END IF;
END //

-- Trigger para mantener streak_days actualizado
CREATE TRIGGER after_user_login
    AFTER UPDATE ON users
    FOR EACH ROW
BEGIN
    IF NEW.last_login != OLD.last_login THEN
        IF DATE(NEW.last_login) = DATE(DATE_ADD(OLD.last_login, INTERVAL 1 DAY)) THEN
            -- Usuario jugó día consecutivo
            UPDATE users SET streak_days = streak_days + 1 WHERE id = NEW.id;
        ELSEIF DATE(NEW.last_login) > DATE(DATE_ADD(OLD.last_login, INTERVAL 1 DAY)) THEN
            -- Usuario perdió la racha
            UPDATE users SET streak_days = 1 WHERE id = NEW.id;
        END IF;
    END IF;
END //

DELIMITER ;

-- ================================================
-- EVENTOS PROGRAMADOS
-- ================================================

-- Habilitar el programador de eventos
SET GLOBAL event_scheduler = ON;

-- Evento para crear backup automático diariamente
CREATE EVENT IF NOT EXISTS daily_backup
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
DO
    CALL CreateAutomaticBackup();

-- Evento para limpiar datos antiguos semanalmente
CREATE EVENT IF NOT EXISTS weekly_cleanup
ON SCHEDULE EVERY 1 WEEK
STARTS CURRENT_TIMESTAMP
DO
    CALL CleanupOldData();

-- ================================================
-- ÍNDICES ADICIONALES PARA OPTIMIZACIÓN
-- ================================================

-- Índices compuestos para consultas frecuentes
CREATE INDEX idx_user_grade_score ON users(grade, total_score DESC);
CREATE INDEX idx_progress_user_completed ON user_progress(user_id, completed);
CREATE INDEX idx_sessions_date_user ON game_sessions(session_date, user_id);
CREATE INDEX idx_games_grade_difficulty ON games(grade, difficulty);
