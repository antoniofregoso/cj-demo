import { appSignal } from "../appStore";

// 3. AQUÍ AGREGAS LAS ACCIONES DEL USUARIO
// Exportamos un objeto con funciones semánticas y descriptivas
export const contextActions = {

    setLang(lang) {
        appSignal.value = {
            ...appSignal.value,
            context: {
                ...appSignal.value.context,
                lang
            }
        };
    },

    setTheme(theme) {
        appSignal.value = {
            ...appSignal.value,
            context: {
                ...appSignal.value.context,
                theme
            }
        };
    },

    setStage(stage) {
        appSignal.value = {
            ...appSignal.value,
            context: {
                ...appSignal.value.context,
                stage
            }
        };
    },


    // Controlar estados de carga (útil para cuando mandas datos a Odoo o n8n)
    setLoading(isLoading, errorMessage = null) {
        appSignal.value = {
            ...appSignal.value,
            meta: {
                ...appSignal.value.meta,
                is_loading: isLoading,
                error_message: errorMessage
            }
        };
    },

    // Reset completo (Para cuando terminen en la página '#thanks')
    clearStore() {
        localStorage.removeItem("cj_demo_state");
        const freshState = JSON.parse(JSON.stringify(INITIAL_STATE));
        freshState.context.session_token = generateSessionId();
        freshState.meta.start = Date.now();
        appSignal.value = freshState;
    }
};