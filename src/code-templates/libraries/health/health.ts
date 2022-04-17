const defaultOptions = {
    livenessPath: "/liveness",
    readinessPath: "/readiness"
};


// Should be implemented differently for SQL / Mongo? Express / Fastify / nest ?
export const HealthService = {
    init(baseRoute, app, dbConnection) { // TODO - should receive as params: app to register routes, connection to db

        process.on('SIGTERM', () => {

        })

        const livenessRoute = baseRoute + defaultOptions.livenessPath
        const readinessRoute = baseRoute + defaultOptions.readinessPath

        /* Liveness */
        app.get(livenessRoute, (request, response) => {
            const data = {
                uptime: process.uptime(),
                message: 'OK',
                date: new Date()
            }
            response
                .status(200)
                .send(data)
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