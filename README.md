<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Guía de Instalación y Uso</title>
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 20px;
    }
    h1 {
        color: #333;
    }        
</style>
</head>
<body>
    <h1>Guía de Instalación y Uso</h1>
    <ol>
  <li>Ejecutar <code>npm install</code></li>
  <li>Ejecutar los scripts en MySQL /scripts/</li>
  <li>Modificar los datos de la contraseña de root en el archivo <code>.env</code></li>
  <li>Ejecutar <code>npm run start:dev</code></li>
  <li>Crear categorías con la API Categorías (se adjuntan los archivos Postman en la carpeta) <code>resource</code></li>
  <li>La documentación de Swagger se puede ver en el siguiente link <a href="http://localhost:3000/api/docs">http://localhost:3000/api/docs</a></li>

</ol>
   
<h2>Por qué implementar un interceptor que haga que los response sigan una misma estructura?</h2>
<p>Al definir una estructura común para todas las respuestas de la API, los consumidores pueden esperar una forma consistente de manejar los datos de respuesta, lo que facilita la comprensión y el mantenimiento del código del cliente. Además, se puede incluir un código de estado específico en la respuesta para indicar un error y proporcionar un mensaje claro y personalizado.</p>

<h2>Diferencia de usar UUID vs Snowflake-ID</h2>
<p>La diferencia principal entre UUID y Snowflake-ID radica en cómo se generan y su uso. Mientras que UUID es un identificador único de 128 bits generado de manera aleatoria o utilizando algoritmos específicos, Snowflake-ID es un identificador único de 64 bits generado utilizando un esquema de identificación distribuida que incluye un timestamp, un identificador de nodo y un contador.</p>        
</body>
</html>
