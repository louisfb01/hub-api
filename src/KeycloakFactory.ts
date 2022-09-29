import { Application } from 'express';
import Keycloak from 'keycloak-connect';
import session from 'express-session';
import KeycloakConfig from './KeycloakConfig';

let keycloak: Keycloak.Keycloak;

function get(app: Application) {
  if (keycloak) return keycloak;

  var memoryStore = new session.MemoryStore();

  const sessionSecret = process.env.CODA_HUB_API_KEYCLOAK_SESSION_MEMORY_SECRET
    ? process.env.CODA_HUB_API_KEYCLOAK_SESSION_MEMORY_SECRET
    : '';

  //session
  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: memoryStore
  }));

  keycloak = new Keycloak({ store: memoryStore }, KeycloakConfig as any);
  return keycloak;
}

export default { get };
