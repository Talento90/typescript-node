export default function() {
    return {
        repository: {
            connectionString: "mongodb://localhost/taskdb"
        },
        server: {
            port: 5000
        }
    };
};