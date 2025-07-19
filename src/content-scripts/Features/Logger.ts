
export class Logger{
    static log(message: string, display=false){
        console.log(message)
    }
    static error(message: string, error=null, display=false){
        console.error(`Extension: ${message} ${error ? "\n Additional information: " + error : ""}`)
    }
}