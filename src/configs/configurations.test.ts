export default function() {
    return {
        repository: {
            connectionString: "mongodb://localhost/taskdb-test"
        },
        server: {
            port: 5100
        }
    };
};