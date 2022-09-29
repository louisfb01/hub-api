const config = {
    "realm": process.env.CODA_HUB_API_KEYCLOAK_REALM,
    "auth-server-url": process.env.CODA_HUB_API_KEYCLOAK_URL,
    "ssl-required": "external",
    "resource": "coda-hub-api",
    "credentials": {
        "secret": process.env.CODA_HUB_API_KEYCLOAK_CLIENT_SECRET
    },
    "confidential-port": 0
}

export default config;