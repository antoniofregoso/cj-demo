import { signal, effect, computed } from "@preact/signals-core";
import initialStateJson from "./state.json";
import { generateSessionId } from "../utils/crypto";

const INITIAL_STATE = initialStateJson;

function loadInitialState() {
    let localData = localStorage.getItem("cj_demo_state");

    // CASE 1: First visit
    if (!localData) {
        // Clonamos el estado inicial limpio
        const newState = JSON.parse(JSON.stringify(INITIAL_STATE));
        newState.context.session_token = generateSessionId();
        newState.meta.start = Date.now();

        // Guardamos la cadena de texto en localStorage
        localStorage.setItem("cj_demo_state", JSON.stringify(newState));
        return newState; // Retornamos el objeto directamente
    }

    const savedState = JSON.parse(localData);
    const sessionStarted = savedState.meta.start > 0;
    // CASE 2: The user return after 24 hours
    if (sessionStarted) {
        const savedTime = new Date(savedState.meta.start).getTime();
        const currentTime = new Date().getTime();
        const EXPIRATION_LIMIT = 24 * 60 * 60 * 1000; // 24 horas

        if (currentTime - savedTime > EXPIRATION_LIMIT) {
            localStorage.removeItem("cj_demo_state");
            const newState = JSON.parse(JSON.stringify(INITIAL_STATE));
            newState.meta.start = Date.now();
            return newState;
        }
    }
    // CASE 3: The user return before 24 hours
    return savedState;
}

// 1. Instanciamos el Signal
export const appSignal = signal(loadInitialState());

// 2. Persistencia automática (Sustituye la escritura manual dentro de tus acciones)
effect(() => {
    localStorage.setItem("cj_demo_state", JSON.stringify(appSignal.value));
});




// 4. SELECTORES COMPUTADOS (Opcionales, muy limpios para tu interfaz)
export const currentStep = computed(() => appSignal.value.meta.current_step);
export const isUiLoading = computed(() => appSignal.value.meta.is_loading);