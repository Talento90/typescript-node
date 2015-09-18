class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return 'Olá, ' + this.greeting + '!';
    }
}

    export = Greeter
