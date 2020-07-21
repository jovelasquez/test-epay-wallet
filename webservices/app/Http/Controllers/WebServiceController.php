<?php

namespace App\Http\Controllers;

use ReflectionException;
use PHP2WSDL\PHPClass2WSDL;

class WebServiceController extends Controller
{
    /**
     * Soap Server function
     *
     * @return Response
     */
    public function server(string $service)
    {
        try {
            $options = [
                'cache_wsdl' => WSDL_CACHE_NONE
            ];

            $wsdl = $this->getWSDL($service);
            $class = $this->getSeviceClass($service);
            
            $server = new \SoapServer($wsdl, $options);
            $server->setObject(new $class());

            ob_start();
            $server->handle();
            
            return response(ob_get_clean())
                ->withHeaders([
                    'Content-Type' => 'text/xml; charset=ISO-8859-1'
                ]);
        } catch (\SOAPFault $e) {
            // Return exception
            return response($e->faultstring, 404);
        }
    }

    /**
     * Get Service Class function
     *
     * @param string $service
     * @return string $class
     */
    protected function getSeviceClass($service)
    {
        $namespace = '\\App\\Http\\Services\\';
        $service = ucfirst(strtolower($service)) . 'Service';
        $class = $namespace . $service;

        if (!class_exists($class)) {
            throw new ReflectionException("La Clase {$class} no existe");
        }

        return $class;
    }

    /**
     * Get WSDL function
     *
     * Obtiene el nombre del archivo WSDL segun el servicio consultado.
     * Crea el archivo WSDL si no existe.
     *
     * @return string
     */
    protected function getWSDL($service)
    {
        $serviceURI = env("APP_URL") . "/webservices/{$service}/soap";
        $serviceClass = $this->getSeviceClass($service);
        $wsdlFile = strtolower($service) . '.wsdl';
        $wsdlFile = storage_path("app/wsdl/{$wsdlFile}");
        
        //if (!$wsdlFile) {
        $wsdlGenerator = new PHPClass2WSDL($serviceClass, $serviceURI);
        $wsdlGenerator->generateWSDL(true);
        $wsdlGenerator->save($wsdlFile);
        //}
        
        return $wsdlFile;
    }
}
