# SaludEnRuta API

API REST del proyecto integrador **SaludEnRuta**,  es una plataforma que orienta a los ciudadanos de la Región Enriquillo (Barahona, Bahoruco, Independencia y Pedernales) sobre dónde pueden recibir un servicio de salud ya identificado.

**La API no diagnostica**. Solo entrega información de establecimientos, servicios, horarios, requisitos y ubicación geográfica, para que la persona decida a cuál acudir.

## Integrantes del grupo

Grupo 4 — Lenguaje de Programación III, UASD:
- Benson Ho Chen
- Abel Taveras
- Joanfi Espinal López
- José Peña

## Características principales

- **2 recursos principales**: Establecimientos y Servicios.
- **9 Endpoints**
- **Filtros de búsqueda** por provincia y por servicio.
- **CRUD completo** para establecimientos (Crear, Leer, Actualizar, Eliminar).
- **Validación de datos** 
- **Manejo de errores global** (respuestas JSON para rutas no encontradas y errores del servidor).

## Requisitos previos

- Tener instalado **Node.js** 
- Un cliente HTTP para probar la API como **Postman**,

## Instalación y ejecución

1. Abrir la terminal en la carpeta raíz del proyecto.
2. Instalar las dependencias necesarias (Express):
   ```bash
   npm install
   ```
3. Iniciar el servidor:
   ```bash
   npm start
   ```
   El servidor estará disponible en `http://localhost:3000`.
4. Para el desarrollo con recarga automática:
   ```bash
   npm run dev
   ```

## Estructura del proyecto

```text
saludenruta-api/
├── package.json
├── README.md
└── src/
    ├── server.js 
    ├── data/
    │   └── bd.js 
    ├── routes/
    │   ├── establecimientos.js 
    │   └── servicios.js
    ├── controllers/
    │   ├── establecimientos.js 
    │   └── servicios.js 
    └── middleware/
        ├── validarEstablecimiento.js 
        └── errores.js 
```

## Endpoints

| Método | Ruta | Descripción | Códigos HTTP |
|---|---|---|---|
| GET | `/` | Verificación de estado de la API | 200 |
| GET | `/api/establecimientos` | Lista establecimientos. Acepta `?provincia=` y `?servicio=` | 200 |
| GET | `/api/establecimientos/:id` | Detalle de un establecimiento | 200, 404 |
| POST | `/api/establecimientos` | Crea un establecimiento | 201, 400 |
| PATCH | `/api/establecimientos/:id` | Actualiza parcialmente un establecimiento | 200, 400, 404 |
| DELETE | `/api/establecimientos/:id` | Elimina un establecimiento | 200, 404 |
| GET | `/api/servicios` | Lista el catálogo de servicios | 200 |
| GET | `/api/servicios/:id` | Detalle de un servicio | 200, 404 |
| GET | `/api/servicios/:id/establecimientos` | Establecimientos que ofrecen ese servicio | 200, 404 |

*Cualquier ruta no definida devuelve un error 404 en formato JSON.*

## Reglas de Validación

Los endpoints de escritura (POST y PATCH) son estrictos con los datos que reciben:

- **`nombre`**: Mínimo 3 caracteres.
- **`tipo`**: Debe ser `Hospital`, `Centro de Atención Primaria` o `Centro de Salud`.
- **`provincia`**: Debe ser `Barahona`, `Bahoruco`, `Independencia` o `Pedernales`.
- **`telefono`**: Formato exacto `809-000-0000`.
- **`latitud` / `longitud`**: Números dentro de rangos geográficos válidos.
- **`horarios`**: Arreglo no vacío; horas en formato `HH:MM` y la apertura debe ser menor que el cierre.
- **`servicios`**: Arreglo no vacío; cada `servicio_id` debe existir, con `disponibilidad` válida y `requisitos` en texto.
- **POST**: Debe cumplir todos los campos obligatorios
- **PATCH**: No permite enviar un body vacío `{}` ni intentar modificar el campo `id`.

## Códigos HTTP Utilizados

- `200 OK`: Petición exitosa (GET, PATCH, DELETE).
- `201 Created`: Recurso creado exitosamente (POST).
- `400 Bad Request`: Datos inválidos o campos faltantes.
- `404 Not Found`: El recurso solicitado o la ruta no existen.
- `500 Internal Server Error`: Error inesperado en el servidor.

## Cómo probar la API

- **Navegador web:** Puedes probar los endpoints de tipo `GET` abriendo las rutas directamente en el navegador.
- **Postman:** Para probar `POST`, `PATCH` y `DELETE`, utiliza Postman. 