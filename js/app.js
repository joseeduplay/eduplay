// Álgebra básica
    loadAlge// ================================================
// APLICACIÓN EDUPLAY COMPLETA CON BACKEND Y BACKUP
// ================================================

class EduPlayApp {
    constructor() {
        this.currentUser = null;
        this.currentGame = null;
        this.currentStage = 1;
        this.currentScore = 0;
        this.gameStartTime = null;
        this.gameState = {};
        this.apiUrl = 'api.php'; // Cambia por tu URL del API
        
        // Base de datos completa de juegos por grado
        this.gameDatabase = this.initializeCompleteGameDatabase();
        
        this.init();
    }

    initializeCompleteGameDatabase() {
        return {
            1: [ // 1° Primaria (6-7 años)
                {
                    id: 1,
                    name: "Puzzles Numéricos",
                    description: "Completa puzzles con números del 1 al 10",
                    icon: "🧩",
                    category: "matemáticas",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "puzzle"
                },
                {
                    id: 2,
                    name: "Memoria de Números",
                    description: "Memoriza secuencias de números",
                    icon: "🧠",
                    category: "memoria",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "memory"
                },
                {
                    id: 3,
                    name: "Suma Básica",
                    description: "Aprende a sumar con objetos visuales",
                    icon: "➕",
                    category: "matemáticas",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "math"
                },
                {
                    id: 4,
                    name: "Colores y Formas",
                    description: "Identifica y relaciona colores y formas",
                    icon: "🎨",
                    category: "lógica",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "colors"
                },
                {
                    id: 5,
                    name: "Secuencias Simples",
                    description: "Completa secuencias lógicas básicas",
                    icon: "🔢",
                    category: "lógica",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "sequence"
                },
                {
                    id: 6,
                    name: "Letras y Sonidos",
                    description: "Asocia letras con sus sonidos",
                    icon: "🔤",
                    category: "lenguaje",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "letters"
                },
                {
                    id: 7,
                    name: "Cuenta Objetos",
                    description: "Cuenta objetos del 1 al 20",
                    icon: "🔢",
                    category: "matemáticas",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "counting"
                }
            ],
            2: [ // 2° Primaria (7-8 años)
                {
                    id: 8,
                    name: "Sumas y Restas",
                    description: "Operaciones básicas hasta el 100",
                    icon: "🧮",
                    category: "matemáticas",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "math"
                },
                {
                    id: 9,
                    name: "Memoria Visual",
                    description: "Juegos de memoria con imágenes",
                    icon: "👁️",
                    category: "memoria",
                    difficulty: "easy",
                    stages: 15,
                    gameType: "memory"
                },
                {
                    id: 10,
                    name: "Patrones Lógicos",
                    description: "Identifica y completa patrones",
                    icon: "🔄",
                    category: "lógica",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "pattern"
                },
                {
                    id: 11,
                    name: "Palabras y Sílabas",
                    description: "Forma palabras y cuenta sílabas",
                    icon: "📝",
                    category: "lenguaje",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "words"
                },
                {
                    id: 12,
                    name: "Comparar Números",
                    description: "Mayor, menor e igual hasta el 100",
                    icon: "⚖️",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "comparison"
                },
                {
                    id: 13,
                    name: "Figuras Geométricas",
                    description: "Reconoce formas geométricas básicas",
                    icon: "📐",
                    category: "geometría",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "shapes"
                },
                {
                    id: 14,
                    name: "Lectura de Reloj",
                    description: "Aprende las horas en punto y media",
                    icon: "🕐",
                    category: "tiempo",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "time"
                }
            ],
            3: [ // 3° Primaria (8-9 años)
                {
                    id: 15,
                    name: "Puzzle de Multiplicaciones",
                    description: "Aprende las tablas de multiplicar",
                    icon: "✖️",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "multiplication"
                },
                {
                    id: 16,
                    name: "Memoria de Figuras",
                    description: "Memoriza patrones geométricos",
                    icon: "🔺",
                    category: "memoria",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "memory"
                },
                {
                    id: 17,
                    name: "Cálculo Mental Rápido",
                    description: "Resuelve operaciones mentalmente",
                    icon: "⚡",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "mental_math"
                },
                {
                    id: 18,
                    name: "Puzzle de Fracciones",
                    description: "Introduce conceptos de fracciones",
                    icon: "🍰",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "fractions"
                },
                {
                    id: 19,
                    name: "Secuencias Numéricas",
                    description: "Encuentra patrones en números",
                    icon: "🔢",
                    category: "lógica",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "sequence"
                },
                {
                    id: 20,
                    name: "Rompecabezas de Palabras",
                    description: "Forma palabras con sílabas",
                    icon: "🧩",
                    category: "lenguaje",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "word_puzzle"
                }
            ],
            4: [ // 4° Primaria (9-10 años)
                {
                    id: 21,
                    name: "Matemática Avanzada",
                    description: "Operaciones combinadas y problemas",
                    icon: "🤓",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "math_advanced"
                },
                {
                    id: 22,
                    name: "Lógica y Razonamiento",
                    description: "Resuelve problemas de lógica",
                    icon: "🧐",
                    category: "lógica",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "logic"
                },
                {
                    id: 23,
                    name: "Fracciones Avanzadas",
                    description: "Suma y resta de fracciones",
                    icon: "🔢",
                    category: "matemáticas",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "fractions_advanced"
                },
                {
                    id: 24,
                    name: "Sudoku Básico",
                    description: "Resuelve sudokus de 4x4 y 6x6",
                    icon: "🔢",
                    category: "lógica",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "sudoku"
                },
                {
                    id: 25,
                    name: "Problemas de Palabras",
                    description: "Resuelve problemas matemáticos con texto",
                    icon: "📖",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "word_problems"
                }
            ],
            5: [ // 5° Primaria (10-11 años)
                {
                    id: 26,
                    name: "Decimales y Operaciones",
                    description: "Trabaja con números decimales",
                    icon: "🔢",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "decimals"
                },
                {
                    id: 27,
                    name: "Álgebra Básica",
                    description: "Introduce ecuaciones simples",
                    icon: "📊",
                    category: "matemáticas",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "algebra"
                },
                {
                    id: 28,
                    name: "Geometría Práctica",
                    description: "Calcula áreas y perímetros",
                    icon: "📏",
                    category: "geometría",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "geometry"
                },
                {
                    id: 29,
                    name: "Juegos de Estrategia",
                    description: "Desarrolla el pensamiento estratégico",
                    icon: "♟️",
                    category: "estrategia",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "strategy"
                },
                {
                    id: 30,
                    name: "Medidas y Conversiones",
                    description: "Convierte entre unidades de medida",
                    icon: "📐",
                    category: "matemáticas",
                    difficulty: "medium",
                    stages: 15,
                    gameType: "measurements"
                }
            ],
            6: [ // 6° Primaria (11-12 años)
                {
                    id: 31,
                    name: "Porcentajes y Proporciones",
                    description: "Calcula porcentajes y proporciones",
                    icon: "📊",
                    category: "matemáticas",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "percentages"
                },
                {
                    id: 32,
                    name: "Geometría Avanzada",
                    description: "Trabajo con ángulos y figuras complejas",
                    icon: "📐",
                    category: "geometría",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "geometry_challenge"
                },
                {
                    id: 33,
                    name: "Algebra Intermedia",
                    description: "Ecuaciones con múltiples variables",
                    icon: "🔢",
                    category: "matemáticas",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "algebra"
                },
                {
                    id: 34,
                    name: "Sudoku Intermedio",
                    description: "Sudokus de 9x9 con mayor dificultad",
                    icon: "🧩",
                    category: "lógica",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "sudoku_intermediate"
                },
                {
                    id: 35,
                    name: "Proporciones y Razones",
                    description: "Resuelve problemas de proporcionalidad",
                    icon: "⚖️",
                    category: "matemáticas",
                    difficulty: "hard",
                    stages: 15,
                    gameType: "proportions"
                }
            ]
        };
    }

    init() {
        this.checkConnection();
        this.showLoginScreen();
    }

    // ================================================
    // MÉTODOS DE API Y CONEXIÓN
    // ================================================

    async checkConnection() {
        try {
            const response = await fetch(`${this.apiUrl}?path=games`);
            if (!response.ok) {
                throw new Error('API not available');
            }
            console.log('✅ Conexión con API establecida');
        } catch (error) {
            console.warn('⚠️ API no disponible, usando almacenamiento local');
            this.showNotification('Trabajando sin conexión', 'info');
        }
    }

    async apiCall(endpoint, method = 'GET', data = null) {
        try {
            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            if (data) {
                options.body = JSON.stringify(data);
            }

            const response = await fetch(`${this.apiUrl}?path=${endpoint}`, options);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'API Error');
            }

            return result;
        } catch (error) {
            console.warn('API Error:', error.message);
            return this.fallbackToLocalStorage(endpoint, method, data);
        }
    }

    fallbackToLocalStorage(endpoint, method, data) {
        const users = JSON.parse(localStorage.getItem('eduplay_users') || '{}');
        
        switch (endpoint) {
            case 'login':
                if (users[data.username]) {
                    return { user: users[data.username] };
                }
                throw new Error('Usuario no encontrado');
            
            case 'register':
                if (users[data.username]) {
                    throw new Error('Usuario ya existe');
                }
                const userData = {
                    id: Date.now(),
                    name: data.name,
                    username: data.username,
                    age: data.age,
                    grade: data.grade,
                    avatar: data.avatar,
                    coins: data.fund,
                    level: 1,
                    total_score: 0,
                    games_completed: 0,
                    streak_days: 0,
                    progress: {},
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                };
                users[data.username] = userData;
                localStorage.setItem('eduplay_users', JSON.stringify(users));
                return { user: userData };
            
            default:
                throw new Error('Endpoint not supported offline');
        }
    }

    // ================================================
    // AUTENTICACIÓN Y USUARIOS
    // ================================================

    showLoginScreen() {
        document.getElementById('login-screen').style.display = 'block';
        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('game-area').classList.remove('active');
    }

    showRegister() {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('register-form').style.display = 'block';
    }

    showLogin() {
        document.getElementById('login-form').style.display = 'block';
        document.getElementById('register-form').style.display = 'none';
    }

    async login() {
        const username = document.getElementById('login-username').value.trim();
        
        if (!username) {
            this.showNotification('Por favor ingresa un nombre de usuario', 'error');
            return;
        }

        try {
            const result = await this.apiCall('login', 'POST', { username });
            this.currentUser = result.user;
            this.currentUser.progress = this.currentUser.progress || {};
            this.showDashboard();
            this.showNotification(`¡Bienvenido de vuelta, ${this.currentUser.name}!`, 'success');
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    async register() {
        const name = document.getElementById('reg-name').value.trim();
        const username = document.getElementById('reg-username').value.trim();
        const age = parseInt(document.getElementById('reg-age').value);
        const grade = parseInt(document.getElementById('reg-grade').value);
        const avatar = document.getElementById('reg-avatar').value;
        const fund = parseInt(document.getElementById('reg-fund').value) || 100;

        if (!name || !username || !age || !grade) {
            this.showNotification('Por favor completa todos los campos obligatorios', 'error');
            return;
        }

        try {
            const result = await this.apiCall('register', 'POST', {
                name, username, age, grade, avatar, fund
            });
            this.currentUser = result.user;
            this.currentUser.progress = this.currentUser.progress || {};
            this.showDashboard();
            this.showNotification(`¡Cuenta creada exitosamente, ${name}!`, 'success');
        } catch (error) {
            this.showNotification(error.message, 'error');
        }
    }

    // ================================================
    // DASHBOARD Y INTERFAZ
    // ================================================

    showDashboard() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        document.getElementById('game-area').classList.remove('active');
        
        this.updateUserDisplay();
        this.loadGamesForGrade();
    }

    updateUserDisplay() {
        if (!this.currentUser) return;

        document.getElementById('user-avatar').textContent = this.currentUser.avatar;
        document.getElementById('user-name-display').textContent = this.currentUser.name;
        document.getElementById('user-grade-display').textContent = `Grado: ${this.currentUser.grade}°`;
        document.getElementById('user-fund-display').textContent = `💎 ${this.currentUser.coins} monedas`;
        document.getElementById('total-score').textContent = this.currentUser.total_score || 0;
        document.getElementById('games-completed').textContent = this.currentUser.games_completed || 0;
        document.getElementById('streak-days').textContent = this.currentUser.streak_days || 0;
        document.getElementById('level-display').textContent = this.currentUser.level || 1;
    }

    loadGamesForGrade() {
        const games = this.gameDatabase[this.currentUser.grade] || [];
        const container = document.getElementById('games-container');
        container.innerHTML = '';

        games.forEach(game => {
            const progress = this.currentUser.progress[game.id] || { 
                stage: 1, 
                completed: false, 
                bestScore: 0,
                playCount: 0
            };
            const progressPercentage = Math.min(100, ((progress.stage - 1) / game.stages) * 100);

            const gameCard = document.createElement('div');
            gameCard.className = `game-card ${progress.completed ? 'completed' : ''}`;
            gameCard.onclick = () => this.startGame(game);

            gameCard.innerHTML = `
                <div class="difficulty-badge difficulty-${game.difficulty}">${game.difficulty}</div>
                <div class="stage-badge">Etapa ${progress.stage}/${game.stages}</div>
                <div class="game-icon">${game.icon}</div>
                <div class="game-title">${game.name}</div>
                <div class="game-description">${game.description}</div>
                <div class="game-progress">
                    <div class="game-progress-bar" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="game-stats">
                    <span>Categoría: ${game.category}</span>
                    <span>Mejor: ${progress.bestScore || 0} pts</span>
                </div>
            `;

            container.appendChild(gameCard);
        });
    }

    // ================================================
    // GESTIÓN DE JUEGOS
    // ================================================

    startGame(game) {
        this.currentGame = game;
        const userProgress = this.currentUser.progress[game.id] || { 
            stage: 1, 
            completed: false, 
            bestScore: 0,
            playCount: 0
        };
        this.currentStage = userProgress.stage;
        this.currentScore = 0;
        this.gameStartTime = Date.now();

        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('game-area').classList.add('active');
        
        this.updateGameHeader();
        this.loadGameContent();
    }

    updateGameHeader() {
        document.getElementById('stage-selector-btn').textContent = `Etapa ${this.currentStage}/${this.currentGame.stages}`;
        document.getElementById('current-game-score').textContent = `Puntos: ${this.currentScore}`;
    }

    loadGameContent() {
        const content = document.getElementById('game-content');
        
        const instructions = this.getGameInstructions(this.currentGame.gameType, this.currentStage);
        content.innerHTML = `
            <div class="game-instructions">${instructions}</div>
            <div id="game-play-area"></div>
        `;

        this.loadSpecificGame();
    }

    getGameInstructions(gameType, stage) {
        const instructions = {
            puzzle: `Completa el puzzle numérico. Etapa ${stage}: Ordena los números correctamente`,
            memory: `Memoriza la secuencia y repítela. Etapa ${stage}: ${Math.min(8, stage + 2)} elementos`,
            math: `Resuelve las operaciones matemáticas. Etapa ${stage}: Nivel ${stage}`,
            colors: `Identifica y selecciona los colores correctos. Etapa ${stage}`,
            sequence: `Completa la secuencia lógica. Etapa ${stage}`,
            letters: `Asocia las letras con sus sonidos. Etapa ${stage}`,
            counting: `Cuenta los objetos correctamente. Etapa ${stage}`,
            pattern: `Encuentra y completa el patrón. Etapa ${stage}`,
            words: `Forma las palabras correctas. Etapa ${stage}`,
            comparison: `Compara los números usando >, < o =. Etapa ${stage}`,
            shapes: `Identifica las formas geométricas. Etapa ${stage}`,
            time: `Lee la hora correctamente. Etapa ${stage}`,
            multiplication: `Resuelve las multiplicaciones. Etapa ${stage}: Tabla del ${Math.min(10, stage)}`,
            mental_math: `Calcula mentalmente lo más rápido posible. Etapa ${stage}`,
            fractions: `Trabaja con fracciones básicas. Etapa ${stage}`,
            fractions_advanced: `Operaciones con fracciones. Etapa ${stage}`,
            word_puzzle: `Arma las palabras con las sílabas. Etapa ${stage}`,
            logic: `Resuelve el problema lógico. Etapa ${stage}`,
            math_advanced: `Operaciones combinadas. Etapa ${stage}`,
            sudoku: `Completa el sudoku. Etapa ${stage}`,
            sudoku_intermediate: `Sudoku intermedio. Etapa ${stage}`,
            word_problems: `Resuelve problemas matemáticos con texto. Etapa ${stage}`,
            decimals: `Operaciones con números decimales. Etapa ${stage}`,
            percentages: `Calcula porcentajes. Etapa ${stage}`,
            algebra: `Resuelve ecuaciones básicas. Etapa ${stage}`,
            geometry: `Geometría básica. Etapa ${stage}`,
            geometry_challenge: `Geometría avanzada. Etapa ${stage}`,
            strategy: `Piensa estratégicamente. Etapa ${stage}`,
            measurements: `Conversiones de medidas. Etapa ${stage}`,
            proportions: `Resuelve proporciones. Etapa ${stage}`,
            default: `¡Resuelve el desafío de la etapa ${stage}!`
        };
        
        return instructions[gameType] || instructions.default;
    }

    loadSpecificGame() {
        const playArea = document.getElementById('game-play-area');
        const gameType = this.currentGame.gameType;
        
        this.gameState = {};
        
        switch(gameType) {
            case 'puzzle':
                this.loadPuzzleGame(playArea);
                break;
            case 'memory':
                this.loadMemoryGame(playArea);
                break;
            case 'math':
            case 'mental_math':
            case 'multiplication':
                this.loadMathGame(playArea);
                break;
            case 'math_advanced':
            case 'mixed_operations':
                this.loadAdvancedMathGame(playArea);
                break;
            case 'colors':
                this.loadColorsGame(playArea);
                break;
            case 'sequence':
            case 'pattern':
                this.loadSequenceGame(playArea);
                break;
            case 'letters':
                this.loadLettersGame(playArea);
                break;
            case 'counting':
                this.loadCountingGame(playArea);
                break;
            case 'comparison':
                this.loadComparisonGame(playArea);
                break;
            case 'shapes':
                this.loadShapesGame(playArea);
                break;
            case 'fractions':
            case 'fractions_advanced':
                this.loadFractionsGame(playArea);
                break;
            case 'word_puzzle':
            case 'words':
                this.loadWordGame(playArea);
                break;
            case 'logic':
            case 'riddle':
            case 'math_logic':
                this.loadLogicGame(playArea);
                break;
            case 'time':
                this.loadTimeGame(playArea);
                break;
            case 'sudoku':
            case 'sudoku_intermediate':
                this.loadSudokuGame(playArea);
                break;
            case 'word_problems':
                this.loadWordProblemsGame(playArea);
                break;
            case 'decimals':
            case 'decimal_puzzle':
                this.loadDecimalGame(playArea);
                break;
            case 'percentages':
                this.loadPercentageGame(playArea);
                break;
            case 'algebra':
                this.loadAlgebraGame(playArea);
                break;
            case 'geometry':
            case 'geometry_challenge':
                this.loadGeometryGame(playArea);
                break;
            case 'strategy':
            case 'strategy_games':
                this.loadStrategyGame(playArea);
                break;
            case 'measurements':
                this.loadMeasurementsGame(playArea);
                break;
            case 'proportions':
                this.loadProportionsGame(playArea);
                break;
            default:
                this.loadDefaultGame(playArea);
                break;
        }
    }

    // ================================================
    // JUEGOS ESPECÍFICOS MEJORADOS
    // ================================================

    loadPuzzleGame(container) {
        const maxNumber = Math.min(15, this.currentStage + 4);
        const numbers = Array.from({length: maxNumber}, (_, i) => i + 1);
        this.shuffleArray(numbers);

        this.gameState = {
            correctOrder: Array.from({length: maxNumber}, (_, i) => i + 1),
            currentOrder: [...numbers],
            completed: [],
            attempts: 0
        };

        container.innerHTML = `
            <div class="question-display">Ordena los números del 1 al ${maxNumber}</div>
            <div class="game-grid puzzle-grid" id="puzzle-grid"></div>
            <div style="text-align: center; margin-top: 15px;">
                <span>Progreso: <span id="puzzle-progress">0</span>/${maxNumber}</span>
            </div>
        `;

        const grid = document.getElementById('puzzle-grid');
        numbers.forEach((num, index) => {
            const btn = document.createElement('button');
            btn.className = 'game-btn';
            btn.textContent = num;
            btn.onclick = () => this.handlePuzzleClick(btn, num, index);
            grid.appendChild(btn);
        });
    }

    handlePuzzleClick(btn, number, index) {
        const expectedNext = this.gameState.completed.length + 1;
        
        if (number === expectedNext) {
            btn.classList.add('correct');
            btn.disabled = true;
            this.gameState.completed.push(number);
            this.currentScore += 10 + (this.currentStage * 2);
            this.updateGameHeader();

            document.getElementById('puzzle-progress').textContent = this.gameState.completed.length;

            if (this.gameState.completed.length === this.gameState.correctOrder.length) {
                setTimeout(() => this.completeStage(), 500);
            }
        } else {
            btn.classList.add('incorrect');
            setTimeout(() => btn.classList.remove('incorrect'), 600);
            this.gameState.attempts++;
            this.currentScore = Math.max(0, this.currentScore - 5);
            this.updateGameHeader();
            
            if (this.gameState.attempts >= 3) {
                this.showNotification('Demasiados errores. El número correcto se marca.', 'info');
                const correctBtn = [...document.querySelectorAll('#puzzle-grid .game-btn')]
                    .find(b => parseInt(b.textContent) === expectedNext && !b.disabled);
                if (correctBtn) {
                    correctBtn.style.boxShadow = '0 0 20px #00b894';
                    setTimeout(() => {
                        correctBtn.style.boxShadow = '';
                    }, 2000);
                }
                this.gameState.attempts = 0;
            }
        }
    }

    loadMemoryGame(container) {
        const sequenceLength = Math.min(8, this.currentStage + 2);
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const sequence = Array.from({length: sequenceLength}, () => 
            colors[Math.floor(Math.random() * Math.min(colors.length, 4 + Math.floor(this.currentStage / 3)))]
        );

        this.gameState = {
            sequence: sequence,
            playerSequence: [],
            currentIndex: 0,
            showing: false,
            canClick: false
        };

        const colorNames = {
            red: 'Rojo', blue: 'Azul', green: 'Verde', 
            yellow: 'Amarillo', purple: 'Morado', orange: 'Naranja'
        };

        container.innerHTML = `
            <div class="question-display">Memoriza la secuencia de ${sequenceLength} colores</div>
            <div class="game-grid memory-grid" id="memory-grid"></div>
            <div style="text-align: center; margin-top: 20px;">
                <button class="modal-btn" onclick="app.startMemorySequence()" id="start-memory-btn">Ver Secuencia</button>
                <div id="memory-status" style="margin-top: 10px; font-weight: bold;"></div>
            </div>
        `;

        const grid = document.getElementById('memory-grid');
        const availableColors = colors.slice(0, Math.min(6, 4 + Math.floor(this.currentStage / 3)));
        availableColors.forEach(color => {
            const btn = document.createElement('button');
            btn.className = `game-btn color-${color}`;
            btn.onclick = () => this.handleMemoryClick(color);
            btn.style.position = 'relative';
            btn.innerHTML = `<span style="color: white; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">${colorNames[color]}</span>`;
            grid.appendChild(btn);
        });
    }

    startMemorySequence() {
        this.gameState.showing = true;
        this.gameState.canClick = false;
        document.getElementById('start-memory-btn').disabled = true;
        document.getElementById('memory-status').textContent = 'Observa la secuencia...';
        
        const buttons = document.querySelectorAll('#memory-grid .game-btn');
        buttons.forEach(btn => btn.disabled = true);
        
        let index = 0;
        const showNext = () => {
            if (index < this.gameState.sequence.length) {
                const color = this.gameState.sequence[index];
                const btn = document.querySelector(`.color-${color}`);
                btn.classList.add('revealed');
                
                setTimeout(() => {
                    btn.classList.remove('revealed');
                    index++;
                    setTimeout(showNext, 400);
                }, 800);
            } else {
                this.gameState.showing = false;
                this.gameState.canClick = true;
                document.getElementById('memory-status').textContent = 'Ahora repite la secuencia';
                buttons.forEach(btn => btn.disabled = false);
            }
        };

        showNext();
    }

    handleMemoryClick(color) {
        if (!this.gameState.canClick || this.gameState.showing) return;

        this.gameState.playerSequence.push(color);
        const currentIndex = this.gameState.playerSequence.length - 1;
        
        const btn = document.querySelector(`.color-${color}`);
        btn.classList.add('revealed');
        setTimeout(() => btn.classList.remove('revealed'), 300);

        if (color === this.gameState.sequence[currentIndex]) {
            this.currentScore += 15 + (this.currentStage * 3);
            this.updateGameHeader();
            
            document.getElementById('memory-status').textContent = 
                `Progreso: ${this.gameState.playerSequence.length}/${this.gameState.sequence.length}`;

            if (this.gameState.playerSequence.length === this.gameState.sequence.length) {
                document.getElementById('memory-status').textContent = '¡Perfecto! Secuencia completada';
                setTimeout(() => this.completeStage(), 1000);
            }
        } else {
            this.showNotification('Secuencia incorrecta. Inténtalo de nuevo.', 'error');
            this.gameState.playerSequence = [];
            this.currentScore = Math.max(0, this.currentScore - 10);
            this.updateGameHeader();
            document.getElementById('memory-status').textContent = 'Secuencia reiniciada. Inténtalo de nuevo.';
        }
    }

    loadMathGame(container) {
        const difficulty = this.currentStage;
        let problems = [];
        const problemCount = Math.min(8, 3 + Math.floor(this.currentStage / 3));

        if (this.currentGame.gameType === 'multiplication') {
            const tables = Math.min(12, Math.floor(difficulty / 2) + 2);
            for (let i = 0; i < problemCount; i++) {
                const a = Math.floor(Math.random() * tables) + 1;
                const b = Math.floor(Math.random() * 10) + 1;
                problems.push({
                    question: `${a} × ${b}`,
                    answer: a * b,
                    options: this.generateMathOptions(a * b, 'multiplication')
                });
            }
        } else if (this.currentGame.gameType === 'mental_math') {
            const maxNum = Math.min(200, difficulty * 15);
            for (let i = 0; i < problemCount; i++) {
                const operations = ['+', '-'];
                if (difficulty > 5) operations.push('×');
                if (difficulty > 8) operations.push('÷');
                
                const operation = operations[Math.floor(Math.random() * operations.length)];
                let a, b, answer;
                
                switch(operation) {
                    case '+':
                        a = Math.floor(Math.random() * maxNum) + 1;
                        b = Math.floor(Math.random() * maxNum) + 1;
                        answer = a + b;
                        break;
                    case '-':
                        a = Math.floor(Math.random() * maxNum) + 10;
                        b = Math.floor(Math.random() * (a - 1)) + 1;
                        answer = a - b;
                        break;
                    case '×':
                        a = Math.floor(Math.random() * 12) + 2;
                        b = Math.floor(Math.random() * 12) + 2;
                        answer = a * b;
                        break;
                    case '÷':
                        answer = Math.floor(Math.random() * 20) + 2;
                        b = Math.floor(Math.random() * 10) + 2;
                        a = answer * b;
                        break;
                }
                
                problems.push({
                    question: `${a} ${operation} ${b}`,
                    answer: answer,
                    options: this.generateMathOptions(answer, this.currentGame.gameType)
                });
            }
        } else {
            const maxNum = Math.min(100, difficulty * 8);
            for (let i = 0; i < problemCount; i++) {
                const a = Math.floor(Math.random() * maxNum) + 1;
                const b = Math.floor(Math.random() * maxNum) + 1;
                const operation = Math.random() > 0.4 ? '+' : '-';
                const answer = operation === '+' ? a + b : Math.max(a - b, 0);
                problems.push({
                    question: `${a} ${operation} ${b}`,
                    answer: answer,
                    options: this.generateMathOptions(answer, 'basic')
                });
            }
        }

        this.gameState = {
            problems: problems,
            currentProblem: 0,
            correctAnswers: 0,
            startTime: Date.now()
        };

        this.showMathProblem(container);
    }

    generateMathOptions(correct, type = 'basic') {
        const options = [correct];
        let range = 10;
        
        if (type === 'multiplication') range = 20;
        else if (type === 'mental_math') range = 15;
        
        while (options.length < 4) {
            const offset = Math.floor(Math.random() * (range * 2)) - range;
            const wrong = Math.max(0, correct + offset);
            if (wrong !== correct && !options.includes(wrong)) {
                options.push(wrong);
            }
        }
        this.shuffleArray(options);
        return options;
    }

    showMathProblem(container) {
        const problem = this.gameState.problems[this.gameState.currentProblem];
        const timeLeft = this.currentGame.gameType === 'mental_math' ? 
            Math.max(0, 15 - Math.floor((Date.now() - this.gameState.startTime) / 1000)) : null;
        
        container.innerHTML = `
            <div class="question-display">
                ${problem.question} = ?
                ${timeLeft !== null ? `<div style="color: #e74c3c; margin-top: 10px;">⏰ ${timeLeft}s</div>` : ''}
            </div>
            <div class="game-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 400px;">
                ${problem.options.map(option => 
                    `<button class="game-btn" onclick="app.handleMathAnswer(${option})">${option}</button>`
                ).join('')}
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <div>Problema ${this.gameState.currentProblem + 1} de ${this.gameState.problems.length}</div>
                <div style="margin-top: 5px;">Correctas: ${this.gameState.correctAnswers}/${this.gameState.problems.length}</div>
            </div>
        `;

        if (this.currentGame.gameType === 'mental_math' && timeLeft > 0) {
            setTimeout(() => {
                if (this.gameState.currentProblem < this.gameState.problems.length) {
                    this.showMathProblem(container);
                }
            }, 1000);
        }
    }

    handleMathAnswer(answer) {
        const problem = this.gameState.problems[this.gameState.currentProblem];
        const buttons = document.querySelectorAll('#game-content .game-btn');
        
        buttons.forEach(btn => btn.disabled = true);
        
        if (answer === problem.answer) {
            this.gameState.correctAnswers++;
            let points = 20;
            if (this.currentGame.gameType === 'mental_math') {
                const timeBonus = Math.max(0, 15 - Math.floor((Date.now() - this.gameState.startTime) / 1000));
                points += timeBonus;
            }
            this.currentScore += points;
            
            buttons.forEach(btn => {
                if (parseInt(btn.textContent) === answer) {
                    btn.classList.add('correct');
                }
            });
        } else {
            buttons.forEach(btn => {
                if (parseInt(btn.textContent) === answer) {
                    btn.classList.add('incorrect');
                } else if (parseInt(btn.textContent) === problem.answer) {
                    btn.classList.add('correct');
                }
            });
        }

        this.updateGameHeader();

        setTimeout(() => {
            this.gameState.currentProblem++;
            if (this.gameState.currentProblem < this.gameState.problems.length) {
                this.gameState.startTime = Date.now();
                this.showMathProblem(document.getElementById('game-play-area'));
            } else {
                const successRate = this.gameState.correctAnswers / this.gameState.problems.length;
                if (successRate >= 0.6) {
                    this.completeStage();
                } else {
                    this.showNotification(`Necesitas al menos ${Math.ceil(this.gameState.problems.length * 0.6)} respuestas correctas. ¡Inténtalo de nuevo!`, 'error');
                    setTimeout(() => this.loadGameContent(), 1500);
                }
            }
        }, 2000);
    }

    loadColorsGame(container) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
        const availableColors = colors.slice(0, Math.min(6, 3 + Math.floor(this.currentStage / 2)));
        const targetColor = availableColors[Math.floor(Math.random() * availableColors.length)];
        const gridSize = Math.min(9, 4 + this.currentStage);
        
        this.gameState = {
            targetColor: targetColor,
            found: 0,
            total: Math.max(2, Math.floor(gridSize / 3) + 1),
            attempts: 0,
            maxAttempts: Math.max(3, gridSize - 2)
        };

        const colorNames = {
            red: 'Rojo', blue: 'Azul', green: 'Verde',
            yellow: 'Amarillo', purple: 'Morado', orange: 'Naranja'
        };

        container.innerHTML = `
            <div class="question-display">
                Encuentra todos los objetos de color <strong>${colorNames[targetColor]}</strong>
                <div style="margin-top: 10px; font-size: 0.9em;">
                    Encontrados: <span id="color-progress">${this.gameState.found}</span>/${this.gameState.total} | 
                    Intentos restantes: <span id="attempts-left">${this.gameState.maxAttempts}</span>
                </div>
            </div>
            <div class="game-grid colors-grid" id="colors-grid"></div>
        `;

        const grid = document.getElementById('colors-grid');
        const gridItems = [];
        
        for (let i = 0; i < this.gameState.total; i++) {
            gridItems.push(targetColor);
        }
        
        while (gridItems.length < gridSize) {
            const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
            if (randomColor !== targetColor) {
                gridItems.push(randomColor);
            }
        }
        
        this.shuffleArray(gridItems);
        
        gridItems.forEach((color, index) => {
            const btn = document.createElement('button');
            btn.className = `game-btn color-${color}`;
            btn.onclick = () => this.handleColorClick(btn, color, index);
            btn.style.position = 'relative';
            
            const symbols = ['●', '▲', '■', '♦', '★', '▼'];
            btn.innerHTML = `<span style="font-size: 1.5em; color: white; text-shadow: 1px 1px 2px rgba(0,0,0,0.7);">${symbols[index % symbols.length]}</span>`;
            grid.appendChild(btn);
        });
    }

    handleColorClick(btn, color, index) {
        if (btn.disabled) return;
        
        btn.disabled = true;
        this.gameState.attempts++;
        
        if (color === this.gameState.targetColor) {
            btn.classList.add('correct');
            this.gameState.found++;
            this.currentScore += 15 + (this.currentStage * 2);
            
            document.getElementById('color-progress').textContent = this.gameState.found;
            
            if (this.gameState.found >= this.gameState.total) {
                setTimeout(() => this.completeStage(), 500);
                return;
            }
        } else {
            btn.classList.add('incorrect');
            this.currentScore = Math.max(0, this.currentScore - 5);
            this.gameState.maxAttempts--;
        }
        
        document.getElementById('attempts-left').textContent = this.gameState.maxAttempts;
        this.updateGameHeader();
        
        if (this.gameState.maxAttempts <= 0 && this.gameState.found < this.gameState.total) {
            this.showNotification('Se acabaron los intentos. Mostrando respuestas correctas.', 'info');
            const allButtons = document.querySelectorAll('#colors-grid .game-btn');
            allButtons.forEach(button => {
                if (!button.disabled && button.classList.contains(`color-${this.gameState.targetColor}`)) {
                    button.classList.add('revealed');
                }
                button.disabled = true;
            });
            setTimeout(() => this.loadGameContent(), 3000);
        }
    }

    // Función para completar juegos que faltaban
    loadTimeGame(container) {
        const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const minutes = [0, 15, 30, 45];
        
        const hour = hours[Math.floor(Math.random() * hours.length)];
        const minute = minutes[Math.floor(Math.random() * minutes.length)];
        
        let timeText;
        if (minute === 0) {
            timeText = `${hour}:00`;
        } else {
            timeText = `${hour}:${minute}`;
        }
        
        this.gameState = {
            correctTime: timeText,
            hour: hour,
            minute: minute
        };

        const options = this.generateTimeOptions(hour, minute);
        
        container.innerHTML = `
            <div class="question-display">
                ¿Qué hora marca el reloj?
                <div style="font-size: 3em; margin: 20px 0;">🕐</div>
                <div style="font-size: 2em; margin: 15px 0; font-weight: bold;">
                    ${timeText}
                </div>
            </div>
            <div class="game-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 500px;">
                ${options.map(option => 
                    `<button class="game-btn" onclick="app.handleTimeAnswer('${option}')" style="font-size: 1.2em;">${option}</button>`
                ).join('')}
            </div>
        `;
    }

    generateTimeOptions(hour, minute) {
        const options = [];
        
        if (minute === 0) {
            options.push(`Son las ${hour} en punto`);
            options.push(`Son las ${hour} y cuarto`);
            options.push(`Son las ${hour} y media`);
            options.push(`Es la ${hour + 1} menos cuarto`);
        } else if (minute === 15) {
            options.push(`Son las ${hour} y cuarto`);
            options.push(`Son las ${hour} en punto`);
            options.push(`Son las ${hour} y media`);
            options.push(`Es la ${hour + 1} menos cuarto`);
        } else if (minute === 30) {
            options.push(`Son las ${hour} y media`);
            options.push(`Son las ${hour} en punto`);
            options.push(`Son las ${hour} y cuarto`);
            options.push(`Es la ${hour + 1} menos cuarto`);
        } else if (minute === 45) {
            options.push(`Es la ${hour + 1} menos cuarto`);
            options.push(`Son las ${hour} en punto`);
            options.push(`Son las ${hour} y cuarto`);
            options.push(`Son las ${hour} y media`);
        }
        
        return options;
    }

    handleTimeAnswer(answer) {
        const buttons = document.querySelectorAll('#game-content .game-btn');
        let correctAnswer;
        
        if (this.gameState.minute === 0) {
            correctAnswer = `Son las ${this.gameState.hour} en punto`;
        } else if (this.gameState.minute === 15) {
            correctAnswer = `Son las ${this.gameState.hour} y cuarto`;
        } else if (this.gameState.minute === 30) {
            correctAnswer = `Son las ${this.gameState.hour} y media`;
        } else if (this.gameState.minute === 45) {
            correctAnswer = `Es la ${this.gameState.hour + 1} menos cuarto`;
        }
        
        if (answer === correctAnswer) {
            buttons.forEach(btn => {
                if (btn.textContent === answer) {
                    btn.classList.add('correct');
                }
            });
            this.currentScore += 20 + (this.currentStage * 3);
            this.updateGameHeader();
            this.showNotification('¡Correcto! Sabes leer la hora', 'success');
            setTimeout(() => this.completeStage(), 1500);
        } else {
            buttons.forEach(btn => {
                if (btn.textContent === answer) {
                    btn.classList.add('incorrect');
                } else if (btn.textContent === correctAnswer) {
                    btn.classList.add('correct');
                }
            });
            this.currentScore = Math.max(0, this.currentScore - 10);
            this.updateGameHeader();
            this.showNotification(`Incorrecto. La respuesta era: ${correctAnswer}`, 'error');
            setTimeout(() => this.loadGameContent(), 3000);
        }
    }

    // Completar funciones que faltan del código original
    loadDecimalGame(container) {
        const decimalProblems = [
            { question: "0.5 + 0.3 = ?", answer: 0.8 },
            { question: "1.2 - 0.7 = ?", answer: 0.5 },
            { question: "2.5 × 2 = ?", answer: 5.0 },
            { question: "3.6 ÷ 2 = ?", answer: 1.8 },
            { question: "0.25 + 0.75 = ?", answer: 1.0 },
            { question: "1.5 - 0.8 = ?", answer: 0.7 },
            { question: "0.4 × 5 = ?", answer: 2.0 },
            { question: "4.8 ÷ 4 = ?", answer: 1.2 }
        ];

        const currentProblem = decimalProblems[Math.min(this.currentStage - 1, decimalProblems.length - 1)];
        this.gameState = {
            problem: currentProblem,
            options: this.generateDecimalOptions(currentProblem.answer)
        };

        container.innerHTML = `
            <div class="question-display">
                Resuelve la operación con decimales
                <div style="font-size: 2em; margin: 20px 0; font-weight: bold;">
                    ${currentProblem.question}
                </div>
            </div>
            <div class="game-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 400px;">
                ${this.gameState.options.map(option => 
                    `<button class="game-btn" onclick="app.handleDecimalAnswer(${option})" style="font-size: 1.4em;">${option}</button>`
                ).join('')}
            </div>
        `;
    }

    generateDecimalOptions(correct) {
        const options = [correct];
        const variations = [0.1, 0.2, -0.1, -0.2, 0.5, -0.5];
        
        for (const variation of variations) {
            const option = Math.round((correct + variation) * 10) / 10;
            if (option >= 0 && !options.includes(option) && options.length < 4) {
                options.push(option);
            }
        }
        
        while (options.length < 4) {
            const random = Math.round((correct + (Math.random() * 2 - 1)) * 10) / 10;
            if (random >= 0 && !options.includes(random)) {
                options.push(random);
            }
        }
        
        this.shuffleArray(options);
        return options;
    }

    handleDecimalAnswer(answer) {
        const buttons = document.querySelectorAll('#game-content .game-btn');
        
        if (Math.abs(answer - this.gameState.problem.answer) < 0.01) {
            buttons.forEach(btn => {
                if (Math.abs(parseFloat(btn.textContent) - answer) < 0.01) {
                    btn.classList.add('correct');
                }
            });
            this.currentScore += 25 + (this.currentStage * 3);
            this.updateGameHeader();
            setTimeout(() => this.completeStage(), 1000);
        } else {
            buttons.forEach(btn => {
                if (Math.abs(parseFloat(btn.textContent) - answer) < 0.01) {
                    btn.classList.add('incorrect');
                } else if (Math.abs(parseFloat(btn.textContent) - this.gameState.problem.answer) < 0.01) {
                    btn.classList.add('correct');
                }
            });
            this.currentScore = Math.max(0, this.currentScore - 10);
            this.updateGameHeader();
            setTimeout(() => this.loadGameContent(), 2000);
        }
    }

    loadPercentageGame(container) {
        const percentageProblems = [
            { question: "¿Cuánto es el 25% de 100?", answer: 25, hint: "25/100 × 100" },
            { question: "¿Cuánto es el 50% de 80?", answer: 40, hint: "La mitad de 80" },
            { question: "¿Cuánto es el 10% de 200?", answer: 20, hint: "10/100 × 200" },
            { question: "¿Cuánto es el 75% de 60?", answer: 45, hint: "3/4 de 60" },
            { question: "¿Cuánto es el 20% de 150?", answer: 30, hint: "1/5 de 150" },
            { question: "¿Cuánto es el 30% de 90?", answer: 27, hint: "30/100 × 90" },
            { question: "¿Cuánto es el 40% de 75?", answer: 30, hint: "2/5 de 75" },
            { question: "¿Cuánto es el 60% de 50?", answer: 30, hint: "3/5 de 50" }
        ];

        const currentProblem = percentageProblems[Math.min(this.currentStage - 1, percentageProblems.length - 1)];
        this.gameState = {
            problem: currentProblem,
            options: this.generatePercentageOptions(currentProblem.answer)
        };

        container.innerHTML = `
            <div class="question-display">
                ${currentProblem.question}
                <div style="margin-top: 15px; font-size: 0.9em; color: #666; font-style: italic;">
                    💡 Pista: ${currentProblem.hint}
                </div>
            </div>
            <div class="game-grid" style="grid-template-columns: repeat(2, 1fr); max-width: 400px;">
                ${this.gameState.options.map(option => 
                    `<button class="game-btn" onclick="app.handlePercentageAnswer(${option})" style="font-size: 1.4em;">${option}</button>`
                ).join('')}
            </div>
        `;
    }

    generatePercentageOptions(correct) {
        const options = [correct];
        const variations = [5, 10, -5, -10, Math.floor(correct * 1.2), Math.floor(correct * 0.8)];
        
        for (const variation of variations) {
            const option = Math.max(0, correct + variation);
            if (!options.includes(option) && options.length < 4) {
                options.push(option);
            }
        }
        
        while (options.length < 4) {
            const random = Math.max(0, correct + (Math.floor(Math.random() * 20) - 10));
            if (!options.includes(random)) {
                options.push(random);
            }
        }
        
        this.shuffleArray(options);
        return options;
    }

    handlePercentageAnswer(answer) {
        const buttons = document.querySelectorAll('#game-content .game-btn');
        
        if (answer === this.gameState.problem.answer) {
            buttons.forEach(btn => {
                if (parseInt(btn.textContent) === answer) {
                    btn.classList.add('correct');
                }
            });
            this.currentScore += 35 + (this.currentStage * 5);
            this.updateGameHeader();
            this.showNotification('¡Excelente cálculo de porcentajes!', 'success');
            setTimeout(() => this.completeStage(), 1500);
        } else {
            buttons.forEach(btn => {
                if (parseInt(btn.textContent) === answer) {
                    btn.classList.add('incorrect');
                } else if (parseInt(btn.textContent) === this.gameState.problem.answer) {
                    btn.classList.add('correct');
                }
            });
            this.currentScore = Math.max(0, this.currentScore - 15);
            this.updateGameHeader();
            this.showNotification(`Incorrecto. La respuesta era: ${this.gameState.problem.answer}`, 'error');
            setTimeout(() => this.loadGameContent(), 3000);
        }
    }



    