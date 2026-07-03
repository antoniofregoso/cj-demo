import { appSignal } from "../../store/appStore";
import { effect } from "@preact/signals-core";


let lastProcessedLang = null;
let lastProcessedTheme = null;
let lastProcessedStage = null;

export function initHomeUpdater() {
    let page = document.querySelector('app-page');
    effect(() => {
        // 1. Extraemos los valores del Signal (Preact se suscribe automáticamente a ellos)
        const currentState = appSignal.value;
        const currentLang = currentState.context?.lang;
        const currentTheme = currentState.context?.theme;
        const currentStage = currentState.context?.stage;

        // Bandera para saber si realmente debemos recargar la página
        let requiereUpdate = false;

        // 2. Verificación independiente para el Idioma
        if (currentLang !== lastProcessedLang) {
            console.log(`[Updater] Detectado cambio de idioma a: ${currentLang}`);
            lastProcessedLang = currentLang;
            requiereUpdate = true;
        }

        // 3. Verificación independiente para el Tema (Oscuro/Claro)
        if (currentTheme !== lastProcessedTheme) {
            console.log(`[Updater] Detectado cambio de tema a: ${currentTheme}`);
            lastProcessedTheme = currentTheme;
            requiereUpdate = true;
        }
        if (currentStage !== lastProcessedStage) {
            console.log(`[Updater] Detectado cambio de stage a: ${currentStage.source}`);
            lastProcessedStage = currentStage;
        }
        // 4. Si cualquiera de los dos cambió, actualizamos los datos de la página una sola vez
        if (requiereUpdate) {
            page.data.context = currentState.context;
            page.loadData();
        }
    });
}
