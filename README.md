# ProyectoLaboratorio

//node server.js
//port: 3000
//database name: database

Intalar Dependencias!!!!!
npm install mongoose
npm install bcrypt
npm install ejs
npm install express
npm install method-override
npm install express-session

Paso 1: Instalar Postman
Descargar Postman:

Ve al sitio oficial de Postman: https://www.postman.com/downloads/.

Descarga la versión para tu sistema operativo (Windows, macOS o Linux).

Instalar Postman:

Ejecuta el instalador descargado y sigue las instrucciones en pantalla para completar la instalación.

Abrir Postman:

Una vez instalado, abre Postman desde tu menú de aplicaciones o escritorio.

Paso 2: Configurar el Entorno para Probar tu API
Crea una Nueva Colección:

En la barra lateral izquierda de Postman, haz clic en el botón "+ New Collection".

Nombra la colección, por ejemplo: ProyectoLaboratorio.

Crear una Nueva Petición:

Haz clic en "+ New Request" dentro de tu colección.

Nombra tu petición, por ejemplo: Obtener Estado de Pacientes.

Configurar la Petición:

Selecciona el método GET.

En el campo de URL, escribe: http://localhost:3000/api/patient-status.

(Opcional) Agrega una descripción si lo deseas.

Paso 3: Probar la Ruta
Haz clic en "Send":

Postman realizará una solicitud a tu API en el servidor local.

Si todo está configurado correctamente, deberías recibir un JSON como respuesta, por ejemplo:

json
{
    "No empezado": 5,
    "En proceso": 3,
    "Terminado": 7
}