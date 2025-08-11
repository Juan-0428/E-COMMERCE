
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