module.exports = {
    apps: [
        {
            name: "whatsapp bulk",
            cwd: "../backend",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production"
            }
        },
    ]
}