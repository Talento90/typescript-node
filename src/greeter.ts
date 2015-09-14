class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    
    greet() {
        return 'Olá, ' + this.greeting + '!';
    }
    
    greetAsync(): Promise<string> {
        return new Promise<string>((resolve, reject)=>{
            resolve('Olá, ' + this.greeting + '!');
        });
    }
}

export = Greeter;
