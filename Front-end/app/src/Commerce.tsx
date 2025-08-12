import { GET_SESSION, SearchUser } from "@scripts/commerce";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function Commerce(){
    const locate = useLocation();
    const navigate  = useNavigate();
    const params = useParams();

    const [initValidation, setValidation] = useState<Boolean>(false);

    type ObjectUser =
    {
        IDENTIFICACION_USUARIO: string;
        NOMBRE_USUARIO: string;
    }
    const [userInfo, setInfo] = useState<undefined | null | ObjectUser>();
    useEffect(
        ()=>{
            const response = async()=>{
                try{
                    const verify: Boolean = await GET_SESSION(locate.pathname, params.id!)
                    if (verify){
                        setValidation(true);
                        return;
                    }
                    else{
                        navigate("/error")
                        return;
                    }

                }
                catch(error: any){
                    console.log(error)
                    throw new Error(error)
                }
            }
            response()
        
    }, [])

    useEffect(()=>{
        const validation = async()=>{
                try{
                    const UsserInformation = await SearchUser(params.id!);
                    setInfo(UsserInformation);
                    return;
                }
                catch(error: any){
                    console.log(error)
                    throw new Error(error);
                }
            }
            validation();
    },[initValidation])

    
    return(
        <>
            <div className="header">
                <div className="image">

                </div>
                <label>{userInfo?.IDENTIFICACION_USUARIO}</label>
            </div>
        </>
    )
}