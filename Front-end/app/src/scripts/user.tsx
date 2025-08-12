
type ObjectUser = {
    IDENTIFICACION_USUARIO: string;
    CONTRASENA_USUARIO: string;
}
type ObjectUserLog = {
    IDENTIFICACION_USUARIO: string;
    NOMBRE_USUARIO: string;
    APELLIDO_USUARIO: string;

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

export 