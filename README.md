# test-epay-wallet

## Instalación 

Clonar el repositorio `$ git clone https://github.com/jovelasquez/test-epay-wallet.git`

### WebServices (SOAP)

1. Moverse al `$ cd test-epay-wallet/`
2. Crear el archivo `.env`
3. Ejecutar el comando `$ composer install`
4. Ejecutar el comando `$ php artisan key:generate` 
5. Configurar la base de datos
6. Ejecutar la migración de la bases de datos `$ php artisan migrate:fresh`
7. Configurar la ruta del Servicio SOAP en el archivo de `.env` la variables es `APP_URL`
8. Correr el servidor `php artisan server`
