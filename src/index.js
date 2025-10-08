import config from './.env/conf.json';
import { store, persistor } from './app/store/store';
import { loading, whithAnimations } from "@customerjourney/cj-core"
import 'animate.css';
import '@customerjourney/cj-core/src/pageloader.css';
import { App } from './App';
/**
 * Set Loading element before app run
 */
loading({color:"is-dark", direction:"is-right-to-left"});

let isRehydrated = false;

function startApp() {
    // Si no se ha rehidratado, salimos.
    if (!isRehydrated) {
        console.warn('¡Atención! La rehidratación no ha finalizado. Esperando...');
        // Puedes actualizar un elemento de carga en el DOM aquí.
        loading({color:"is-dark", direction:"is-right-to-left"});
        return;
    }

    // Ocultar la pantalla de carga

    console.log('✅ Rehidratación completa. Los datos están listos.');

    // Acceder a datos persistidos, por ejemplo:
    const currentState = store.getState();
    if(currentState?.context?.theme){
        document.documentElement.setAttribute('data-theme', currentState.context.theme);
    }
    
    App.run();
}

const unsubscribe = persistor.subscribe(() => {
    // El estado del persistor se puede obtener llamando a getState()
    const persistorState = persistor.getState();

    // La bandera 'bootstrapped' es la que indica que la rehidratación se completó
    if (persistorState.bootstrapped && !isRehydrated) {
        isRehydrated = true;
        unsubscribe(); // Dejar de escuchar para evitar ejecuciones futuras innecesarias
        startApp();    // ¡Lanzar la aplicación principal!
        whithAnimations();
    }
});



