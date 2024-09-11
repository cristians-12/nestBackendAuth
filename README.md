<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

Servicio backend para autentificacion y registro de usuarios haciendo uso de MongoDB

Este servicio permite crear, actualizar y obtener usuarios del sistema. Esto haciendo uso de JWT para todas las peticiones protegidas

## Autenticación
Todas las peticiones deben incluir el encabezado de autorización con un token JWT:

## Lista de Endpoints

| Método | Endpoint                   | Descripción                    |
|--------|----------------------------|--------------------------------|
| `GET`  | `/users`                   | Obtiene todos los usuarios     |
| `GET`  | `/users/:id`               | Obtiene un usuario por ID      |
| `POST` | `/users`                   | Crea un nuevo usuario          |
| `POST` | `/:id/users/favorites`     | Para agregar favorito a usuario|
| `GET`  | `/users/:id/favorites`     | Obtiene todos los favoritos    |
|        |                            | de un usuario.                 |