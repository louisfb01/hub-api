# Hub API

### Overview

- **Description:** This repository implements a service that orchestrates and aggregates distributed analysis jobs on the CODA platform. It receives requests from the [dashboard API](https://github.com/coda-platform/dashboard-api) and communicates with the [site APIs](https://github.com/coda-platform/site-api) conformant to the [CODA API specification](https://github.com/coda-platform/api-specification).
- **Primary author(s):** Kevin Arsenault [[@arsenaultk9](https://github.com/arsenaultk9)], Xue Feishi [[@xuefeishi](https://github.com/xuefeishi)], Jeffrey Li [[@JeffreyLi16](https://github.com/JeffreyLi16)], Maxime Lavigne [[@malavv](https://github.com/malavv)].
- **Contributors:** Louis Mullie [[@louism](https://github.com/louismullie)], Pascal St-Onge [[@stongepa](https://github.com/stongepa)].
- **License:** The code in this repository is released under the GNU General Public License, V3.

Contents
========

 * [Overview](#overview)
 * [Installation](#installation)
 * [Usage](#usage)
 * [Deployment](#deployment)
 * [Security](#security)
 * [Want to contribute?](#want-to-contribute)

### Installation
---

#### Step 1: Configuration

Supply the following environment variables via a `.env` file:

```bash
CODA_HUB_API_SERVER_PORT=
CODA_HUB_API_KEYCLOAK_URL=
CODA_HUB_API_KEYCLOAK_REALM=
CODA_HUB_API_KEYCLOAK_CLIENT_SECRET=
CODA_HUB_API_KEYCLOAK_SESSION_MEMORY_SECRET=
CODA_HUB_API_REDIS_HOST=
CODA_HUB_API_REDIS_PORT=
CODA_HUB_API_EMAIL_HOST=
CODA_HUB_API_EMAIL_PORT=
CODA_HUB_API_ERROR_EMAIL_RECIPIENTS=
```

### Usage
---

#### Step 1

Start Redis instance (looks for it on 7777 by default).

```bash
$ docker run --name some-redis -p 7777:7777 -d redis
```

#### Step 2

Run the hub server (runs on 5427 by default).

```bash
$ npm start
```

### Deployment
---

#### Step 1

```bash
$ docker login -u ${USER} -p ${USER}
$ ./publish.sh
```

#### Step 2

Ask a VALERIA team member to update the image in OpenShift.

### Security
---

Use the following commands to check for security threats.

#### Comprehensive scan

Uses [Trivy](https://github.com/aquasecurity/trivy) to scan for security issues.

```bash
docker run --rm -v C:\dev\trivy:/root/.cache/ -v //var/run/docker.sock:/var/run/docker.sock  aquasec/trivy image coda-hub-api:latest --security-checks vuln > report.txt
```

#### Check NPM dependencies

Submits a description of the NPM dependencies of the project to your default registry and asks for a report of known vulnerabilities.

```bash
npm audit
```

### Want to Contribute?
---

Check out `CONTRIBUTING.md`.
