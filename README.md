# LoginRegisterJWT

Aplicacion siguiendo el curso de **Angular** con **GraphQL** haciendo un sistema de autenticación con **JWT**(Json Web Token) consumiendo como backend una **API** hecha en GraphQL la cual usa **MongoDB** para las operaciones de base de datos. A su vez estamos usando **typescript** para Angular.

También usamos para el frontend **Bootstrap**.

## Descripcion 


En esta aplicación realizamos un sistema el cual permite loguearse al usuario, siempre y cuando este registrado en la base de datos.

Si no lo está se le permite registrarse, esto a su vez hace uso de un mutation de GraphQL para guardar al usuario en la base de datos de mongo.

Se le permite ver el listado de usuarios registrados asi no esté logueado,de igual manera si no está logueado no puede navegar a su perfil hasta que no inicie sesion.

Tiene validacion de rutas, tiene validacion del token y una expiracion del mismo. 

Respecto a GraphQL, hacemos uso de mutation y queries. 

![Login page](https://github.com/Bikcodeh/login-register-jwt/tree/master/src/assets/pictures/login_page.png?raw=true "Login page") 
![Register page](https://github.com/Bikcodeh/login-register-jwt/tree/master/src/assets/pictures/register_page.png?raw=true "Register page") 
![Usuarios page](https://github.com/Bikcodeh/login-register-jwt/tree/master/src/assets/pictures/usuarios.png?raw=true "Usuarios page") 
![Profile page](https://github.com/Bikcodeh/login-register-jwt/tree/master/src/assets/pictures/profile.png?raw=true "Profile page") 
