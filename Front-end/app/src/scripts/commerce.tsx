
export async function GET_SESSION(location: string, id: string){
    const token = localStorage.getItem("Token")
    const identificacionUsuario = decodeURI(id);
    try{     
        const response = await fetch(`http://localhost:4000/${location}?id=${identificacionUsuario}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if(response.ok){
            return true;
        }
        else{
            return false;
        }
    }
    catch(error: any){
        console.log(error);
        throw new Error(error)
    }

}

export async function SearchUser(id: string){
    try{
        const response = await fetch(`http://localhost:4000/user?id=${id}`, {
            method: "POST",
            body: JSON.stringify(Object.entries(
                [
                    ["IDENTIFICACION_USUARIO", id]
                ]
            )),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("Token")?.toString()}`
            }
        })
        if(response.ok){
            const body: string = await response.json();
            const header: Headers = response.headers;
            const objectJava = JSON.parse(body);
            return objectJava;
        }
        else{

        }
    }
    catch(error: any){
        console.log(error)
        throw new Error(error)
    }
}