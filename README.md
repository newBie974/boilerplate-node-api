# boilerplate-node-api
Ce mono-repo est composé de plusieurs modules qui fonctionne sur le principe des microservices.
L'ensemble est développé en respectant le principe d'injection de dépendance.

# Requirements

* node > v10
* npm

# Module Customer
Module qui permet toutes les interactions customer
## Depends on
* [auth]()
## Used By
* [nothing]()
## Required
* nothing
## Data Source
**Tables:** customer
## Test
coverage

# Module Auth
Module authentification qui contient les credentials
## Depends on
* [nothing]()
## Used by
* [customer]
## Required
* jwt
* bcrypt - should be remove
## Data Source
**Tables:** credentials
## Test
coverage
