//"Para empezar, tenemos el archivo index.js, que es el punto de entrada principal de nuestra aplicación. Su única responsabilidad es importar nuestro componente raíz, que es el App, e inyectarlo dentro del HTML físico para que React tome el control de la pantalla."
import React from 'react';//Trae la librería principal de React. Es lo que te permite usar toda la lógica de componentes en este archivo.
import ReactDOM from 'react-dom/client';//Mientras que React maneja la lógica (estados, ciclos de vida), ReactDOM  que se encarga de agarrar esa lógica y dibujarla físicamente en el DOM (el HTML del navegador).
import './index.css';//Importa la hoja de estilos global
import App from './App';//Importa el componente principal de la aplicacion que va a ser el contenedor de todas las demas pantallas y rutas de la aplicacion.

const root = ReactDOM.createRoot(document.getElementById('root'));//"Buscá ese div vacío llamado 'root'(o elemento html con el id='root') y convertilo en la raíz de toda mi aplicación". Todo tu dashboard se va a inyectar y va a vivir adentro de ese único div.
root.render(//Acá le das la orden a la raíz que creaste arriba de que finalmente empiece a dibujar (renderizar) tu aplicación
  <React.StrictMode>
    <App />
  </React.StrictMode>
  //<React.StrictMode> Es una herramienta estricta de desarrollo de React. Básicamente, envuelve a tu aplicación para avisarte si estás usando código viejo o haciendo malas prácticas.
  // <App/> Llama a tu componente padre principal para que se dibuje adentro del Modo Estricto y de la raíz.

  // Lo que hace ReactDOM.createRoot es crear un punto de conexión o 'puente' que permite que React inyecte el resultado final de ese Virtual DOM adentro del DOM real del navegador."
  
  //Pregunta: "Me dijiste que esto es una Single Page Application (SPA) y que carga un solo HTML. ¿En qué parte del código de React le decís dónde inyectar todo tu proyecto adentro de ese HTML?"

//respuesta:

//Esto sucede en este archivo. Utilizo el método ReactDOM.createRoot(), pasándole como parámetro document.getElementById('root'). Eso busca el único div vacío que existe en mi archivo index.html público y lo convierte en el contenedor raíz donde React va a inyectar todo el dashboard dinámicamente."
);


