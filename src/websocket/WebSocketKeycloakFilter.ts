import KeycloakApi from "../api/KeycloakApi";

function keycloakFilter(eventListener: (args: any) => void) {
    return async (args: any) => {
        const token = args.token;
        const isTokenValid = await KeycloakApi.isTokenValide(token);

        if (!isTokenValid) {
            console.error('Invalid keycloak token');
            return;
        }

        eventListener(args);
    }
}

export default {
    keycloakFilter
}