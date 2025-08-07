# 🚀 EduPlay - Guía Completa de Instalación

## 📋 Requisitos del Sistema

### Servidor
- **PHP 7.4+** (recomendado PHP 8.0+)
- **MySQL 8.0+** o MariaDB 10.4+
- **Apache** o **Nginx** con mod_rewrite
- **HTTPS** (obligatorio para PWA)

### Herramientas
- **XAMPP/WAMP/LAMP** (para desarrollo local)
- **FileZilla** o cliente FTP (para subir archivos)
- **Navegador moderno** (Chrome, Firefox, Safari, Edge)

## 🔨 Instalación Local (Desarrollo)

### Paso 1: Descargar XAMPP
1. Ve a [https://www.apachefriends.org](https://www.apachefriends.org)
2. Descarga XAMPP para tu sistema operativo
3. Instala XAMPP en `C:\xampp` (Windows) o `/opt/lampp` (Linux)

### Paso 2: Configurar los Archivos
1. **Crea la carpeta del proyecto:**
   ```
   C:\xampp\htdocs\eduplay\
   ```

2. **Copia todos los archivos:**
   - `index.html`
   - `api.php`
   - `app.js`
   - `manifest.json`
   - `sw.js`
   - `eduplay_db.sql`
   - `setup.php`

### Paso 3: Configurar la Base de Datos
1. **Inicia XAMPP:**
   - Abre XAMPP Control Panel
   - Inicia **Apache** y **MySQL**

2. **Crear la base de datos:**
   - Ve a `http://localhost/phpmyadmin`
   - Crea nueva base de datos llamada `eduplay_db`
   - Importa el archivo `eduplay_db.sql`

### Paso 4: Configurar la API
1. **Edita `api.php` (líneas 21-25):**
   ```php
   class DatabaseConfig {
       const HOST = 'localhost';
       const USERNAME = 'root';
       const PASSWORD = '';  // Deja vacío si no tienes contraseña
       const DATABASE = 'eduplay_db';
   }
   ```

### Paso 5: Configurar JavaScript
1. **Edita `app.js` (línea 8):**
   ```javascript
   const API_BASE_URL = 'http://localhost/eduplay/api.php';
   ```

### Paso 6: Probar la Aplicación
1. **Abre tu navegador y ve a:**
   ```
   http://localhost/eduplay/
   ```

2. **¡Listo!** Deberías ver la pantalla de login.

## 🌐 Instalación en Servidor Web (Producción)

### Paso 1: Preparar el Hosting
**Requisitos del hosting:**
- PHP 7.4+ con extensiones: PDO, PDO_MySQL, JSON
- MySQL/MariaDB
- SSL/HTTPS activado
- Acceso FTP/SFTP

**Hostings recomendados:**
- **Hostinger** (económico, buena velocidad)
- **SiteGround** (premium, excelente soporte)
- **DigitalOcean** (para desarrolladores avanzados)

### Paso 2: Subir Archivos
1. **Usar FileZilla:**
   - Conecta a tu servidor FTP
   - Sube todos los archivos a la carpeta `public_html/`

2. **Estructura final:**
   ```
   public_html/
   ├── index.html
   ├── api.php
   ├── app.js
   ├── manifest.json
   ├── sw.js
   ├── icons/
   │   ├── icon-72x72.png
   │   ├── icon-192x192.png
   │   └── icon-512x512.png
   └── setup.php
   ```

### Paso 3: Configurar Base de Datos
1. **Crear base de datos en cPanel/hosting:**
   - Ve al panel de control de tu hosting
   - Crea nueva base de datos MySQL
   - Anota: nombre de BD, usuario, contraseña

2. **Importar datos:**
   - Usa phpMyAdmin del hosting
   - Importa `eduplay_db.sql`

### Paso 4: Configurar URLs
1. **Edita `api.php`:**
   ```php
   class DatabaseConfig {
       const HOST = 'localhost';
       const USERNAME = 'tu_usuario_db';
       const PASSWORD = 'tu_contraseña_db';
       const DATABASE = 'tu_nombre_db';
   }
   ```

2. **Edita `app.js`:**
   ```javascript
   const API_BASE_URL = 'https://tudominio.com/api.php';
   ```

### Paso 5: Configurar HTTPS
1. **Activar SSL en tu hosting**
2. **Forzar HTTPS** (agregar a `.htaccess`):
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Paso 6: Configurar PWA
1. **Edita `manifest.json`:**
   ```json
   {
     "start_url": "https://tudominio.com/",
     "scope": "https://tudominio.com/"
   }
   ```

## 📱 Convertir a Aplicación Android

### Opción 1: PWA (Recomendada - Más Fácil)
1. **Verifica que tu sitio tenga HTTPS**
2. **Prueba en Chrome móvil:**
   - Ve a tu sitio web
   - Toca "Agregar a pantalla de inicio"
   - ¡Ya tienes la app instalada!

### Opción 2: APK con Capacitor
1. **Instalar Node.js:**
   ```bash
   # Descargar de https://nodejs.org
   node --version  # Verificar instalación
   ```

2. **Instalar Capacitor:**
   ```bash
   npm install -g @capacitor/cli
   npm install @capacitor/core @capacitor/android
   ```

3. **Configurar proyecto:**
   ```bash
   # En la carpeta de tu proyecto
   npx cap init EduPlay com.eduplay.app
   ```

4. **Configurar `capacitor.config.json`:**
   ```json
   {
     "appId": "com.eduplay.app",
     "appName": "EduPlay",
     "webDir": "www",
     "bundledWebRuntime": false,
     "server": {
       "url": "https://tudominio.com"
     }
   }
   ```

5. **Preparar archivos:**
   ```bash
   # Crear carpeta www y copiar archivos
   mkdir www
   cp index.html app.js manifest.json sw.js www/
   cp -r icons www/
   ```

6. **Agregar plataforma Android:**
   ```bash
   npx cap add android
   npx cap sync
   ```

7. **Instalar Android Studio:**
   - Descargar de [https://developer.android.com/studio](https://developer.android.com/studio)
   - Seguir el asistente de instalación

8. **Abrir proyecto en Android Studio:**
   ```bash
   npx cap open android
   ```

9. **Compilar APK:**
   - En Android Studio: `Build > Generate Signed Bundle/APK`
   - Seguir el asistente para crear APK

## 🎨 Crear Iconos de la App

### Herramientas Online (Gratis)
1. **PWA Builder** - [https://www.pwabuilder.com](https://www.pwabuilder.com)
2. **Favicon Generator** - [https://favicon.io](https://favicon.io)
3. **Canva** - [https://canva.com](https://canva.com)

### Especificaciones de Iconos
```
Tamaños necesarios:
- 72x72px (Android)
- 96x96px (Android)
- 128x128px (Chrome)
- 144x144px (Android)
- 152x152px (iPad)
- 192x192px (Android)
- 384x384px (Android)
- 512x512px (Splash screen)
```

### Diseño Sugerido
```
Concepto: Gamepad + Libro
Colores: 
- Fondo: Gradiente (#667eea → #764ba2)
- Icono: Blanco (#ffffff)
- Texto: "EP" o símbolo 🎮📚
Estilo: Flat design, esquinas redondeadas
```

## 🔧 Solución de Problemas Comunes

### Error: "API connection failed"
**Causa:** URL incorrecta en `app.js`
**Solución:**
```javascript
// Verificar que la URL sea correcta
const API_BASE_URL = 'https://tudominio.com/api.php';  // ✅ Correcto
const API_BASE_URL = 'https://tudominio.com/api';     // ❌ Incorrecto
```

### Error: "Database connection failed"
**Causa:** Credenciales incorrectas en `api.php`
**Solución:**
1. Verificar datos en el panel del hosting
2. Probar conexión con phpMyAdmin
3. Actualizar credenciales en `api.php`

### La PWA no se instala
**Causas y soluciones:**
1. **No hay HTTPS:** Activar SSL en el hosting
2. **manifest.json incorrecto:** Verificar sintaxis JSON
3. **Service Worker no funciona:** Verificar ruta de `sw.js`
4. **Iconos faltantes:** Subir todos los iconos a `/icons/`

### Los juegos no cargan
**Causa:** Error en JavaScript
**Solución:**
1. Abrir Developer Tools (F12)
2. Ver errores en Console
3. Verificar que `app.js` se cargue correctamente

### Problemas de rendimiento
**Optimizaciones:**
1. **Comprimir imágenes:** Usar formato WebP
2. **Minificar CSS/JS:** Usar herramientas online
3. **Habilitar Gzip:** En `.htaccess`:
   ```apache
   <IfModule mod_deflate.c>
     AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript
   </IfModule>
   ```

## 🚀 Publicar en Google Play Store

### Requisitos
1. **Cuenta de desarrollador Google Play:** $25 USD (una sola vez)
2. **APK/AAB firmado digitalmente**
3. **Metadatos de la app**

### Proceso de Publicación
1. **Crear cuenta:**
   - Ve a [https://play.google.com/console](https://play.google.com/console)
   - Paga la tarifa de registro ($25 USD)

2. **Preparar metadatos:**
   ```
   Título: EduPlay - Juegos Educativos
   Descripción corta: Plataforma educativa para niños de primaria
   Descripción larga: (mínimo 80 caracteres)
   Categoría: Educación
   Edad: Para toda la familia
   ```

3. **Preparar assets:**
   - **Icono:** 512x512 PNG
   - **Screenshots:** Al menos 2 por orientación
   - **Banner:** 1024x500 PNG (opcional)

4. **Subir APK/AAB:**
   - Usar Android Studio para generar
   - Subir a Google Play Console

5. **Configurar precio:**
   - Gratis (recomendado para empezar)
   - De pago (con precio fijo)

6. **Revisar y publicar:**
   - Google revisará la app (1-3 días)
   - Una vez aprobada, estará disponible

## 📊 Analytics y Monitoreo

### Google Analytics (Gratis)
1. **Crear cuenta:** [https://analytics.google.com](https://analytics.google.com)
2. **Agregar código al `index.html`:**
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'GA_TRACKING_ID');
   </script>
   ```

### Monitoreo de Errores
**Sentry (gratis hasta cierto límite):**
1. Crear cuenta en [https://sentry.io](https://sentry.io)
2. Agregar SDK a la aplicación
3. Recibir notificaciones de errores en tiempo real

## 🎯 Optimización SEO

### Meta Tags Básicos
```html
<meta name="description" content="EduPlay - Juegos educativos interactivos para niños de primaria. Aprende matemáticas, español y más.">
<meta name="keywords" content="juegos educativos, primaria, niños, matemáticas, español, aprendizaje">
<meta name="author" content="Tu Nombre">

<!-- Open Graph (Facebook) -->
<meta property="og:title" content="EduPlay - Juegos Educativos">
<meta property="og:description" content="Plataforma educativa interactiva para niños">
<meta property="og:image" content="https://tudominio.com/icons/icon-512x512.png">
<meta property="og:url" content="https://tudominio.com">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="EduPlay - Juegos Educativos">
<meta name="twitter:description" content="Plataforma educativa interactiva para niños">
<meta name="twitter:image" content="https://tudominio.com/icons/icon-512x512.png">
```

## 💰 Monetización (Opcional)

### Google AdSense
1. **Crear cuenta:** [https://www.google.com/adsense](https://www.google.com/adsense)
2. **Agregar código de anuncios**
3. **Posiciones recomendadas:**
   - Entre juegos (no intrusivos)
   - En resultados de juegos completados
   - Banner inferior (móvil)

### Modelo Freemium
1. **Versión gratuita:** Juegos básicos
2. **Versión premium:** Más juegos, sin anuncios, reportes para padres
3. **Implementar:** PayPal, Stripe para pagos

## 📞 Soporte y Contacto

### Para resolver dudas:
1. **GitHub Issues:** Crear issue en el repositorio
2. **Email:** tu-email@dominio.com
3. **Discord/Telegram:** Crear grupo de soporte

### Recursos adicionales:
- **Mozilla PWA Guide:** [https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- **Android Developer Guide:** [https://developer.android.com/guide](https://developer.android.com/guide)
- **Capacitor Documentation:** [https://capacitorjs.com/docs](https://capacitorjs.com/docs)

---

## 🎉 ¡Felicidades!

¡Has instalado exitosamente EduPlay! Ahora tienes una plataforma educativa completa y funcional.

**Próximos pasos:**
1. ✅ Personalizar colores y diseño
2. ✅ Agregar más juegos específicos
3. ✅ Implementar sistema de badges/logros
4. ✅ Crear panel para maestros/padres
5. ✅ Optimizar para SEO
6. ✅ Publicar en tiendas de aplicaciones

**¡El futuro de la educación digital está en tus manos! 🚀📚🎮**