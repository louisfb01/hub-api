import axios from 'axios';

async function isTokenValide(token: string) {
    const keycloakUrlAndRealm = `${process.env.CODA_AUTH_SERVICE_URL}/realms/${process.env.CODA_HUB_API_AUTH_REALM}`;
    const instance = axios.create({
        baseURL: keycloakUrlAndRealm
    });

    try {
        const response = await instance.get('protocol/openid-connect/userinfo',
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            });

        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export default {
    isTokenValide
}