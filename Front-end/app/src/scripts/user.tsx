
type ObjectUser = {
    IDENTIFICACION_USUARIO: string;
    CONTRASENA_USUARIO: string;
}
type ObjectUserLog = {
    IDENTIFICACION_USUARIO: string;
    NOMBRE_SISTEMA: string;
    NOMBRE_USUARIO: string;
    APELLIDO_USUARIO: string;
    GENERO_USUARIO: string;
    EDAD_USUARIO: string;
    CORREO_ELECTRONICO: string;
    FECHA_NACIMIENTO: string;
    DIRECCION_USUARIO: string;
    CIUDAD_RESIDENCIA: string;
    CONTRASENA_USUARIO: string;
    CATEGORIA_USUARIO: string;

}
const endPoints = Object.fromEntries([
    ["sign", "http://localhost:4000/sign_up"], 
    ["log", "http://localhost:4000/sign_up"]
])
export async function verifySesion(data: ObjectUser, destinity: string){
    try{
        const url = new Map(Object.entries(endPoints)).get(destinity)?.toString();
        if (!url) throw new Error(`No existe endpoint para "${destinity}"`);

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                "Content-Type": "application/json"
            }
        })
        if (response.ok){
            const responseBody = await response.json()
            const id = responseBody.get("identificacionUsuario");
            const token = response.headers.get("tokenJWT")
            if(typeof token === "string"){
                localStorage.setItem("token", token);
            }
            return id;
        }
    }
    catch(error: any){
        console.log(error)
        throw new Error(error)
    }

}

export async function sendInfoLog(data: ObjectUserLog, endpoint: string) {
    try{
        const entries = Object.entries(endPoints);
        const entriesSet: Set<[string, string]> = new Set(entries);
        const iterator: SetIterator<[string, string]>= entriesSet.values();
        let result = iterator.next();
        while(!result.done){
            if (result.value[0] === endpoint){
                const response = await fetch(result.value[1], {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers:{
                        "Content-Type": "application/json"
                    }

                })
                if(response.ok){
                    const body = await response.json()
                    return body.IDENTIFICACION_USUARIO;
            }
            result = iterator.next();

        }
    }
        
    }
    catch(error: any){
        console.log(error)
        throw new Error(error)
    }
    
} 