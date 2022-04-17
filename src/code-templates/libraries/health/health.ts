const defaultOptions = {
    livenessPath: "/liveness",
    readinessPath: "/readiness"
};

// Should be implemented differently for SQL / Mongo? Express / Fastify / nest ?
export const HealthService = {
    init(baseRoute, app, dbConnection) { // TODO - should receive as params: app to register routes, connection to db
        const livenessRoute = baseRoute + defaultOptions.livenessPath
        const readinessRoute = baseRoute + defaultOptions.readinessPath
        /* Liveness */
        app.get(livenessRoute, (request, response) => {
            response
                .status(200)
                .end();
        })
        /* Readiness */
        app.get(readinessRoute, (request, response) => {
            // TODO - check DB connection
            response
                .status(200)
                .end();
        })
    },
}