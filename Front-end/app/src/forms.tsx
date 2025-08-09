import { useEffect, useRef, useState } from "react"
import type{ RefObject } from "react"
import { useLocation, useParams } from "react-router-dom";
export default function Forms(){

    const location = useLocation();
    const {mode} = useParams<string>();

    type FormRefs = {
        formSign: RefObject<HTMLDivElement | null>;
        formLog: RefObject<HTMLDivElement | null>;
        };

        const [stateForm, setForm] = useState<FormRefs>({
            formSign: useRef<HTMLDivElement>(null),
            formLog: useRef<HTMLDivElement>(null)
            })

        const [presentForm, setPresent]= useState<string | null>(null)

        const change_presentForm = (value: string)=>{
            setPresent(value)
        }

    const decition = (varr: string)=>{
        if (mode === "sign"){
            stateForm.formSign.current!.style.display = "flex";
            stateForm.formLog.current!.style.display = "none";
            }
        else{
            stateForm.formLog.current!.style.display = "flex";
            stateForm.formSign.current!.style.display = "none";
        }
    }
        useEffect(()=>{
            try{
                const map = new Map(Object.entries(stateForm))
                map.forEach((value, key)=>{
                    if(map.get(key)!.current){
                        return;
                    }
                })
                decition(mode!);
                return;
                   
        }
        catch(e: any){
            console.log(e)
            throw new Error(e)
        }
    }, [])

    useEffect(()=>{
        const map = new Map(Object.entries(stateForm))
                map.forEach((value, key)=>{
                    if(map.get(key)!.current){
                        return;
                    }
                })
        decition(presentForm!);
    }, [presentForm])
    return (
        <>
            <div className="singUp" ref={stateForm.formSign}>
                <div>
                    <form method="POST" className="forms">

                        <button type="submit"></button>
                    </form>
                </div>
            </div>

            <div className="logIn" ref={stateForm.formLog}>
                
                <form method="POST"className="forms">

                        <button type="submit"></button>
                    </form>
            </div>
        </>
    )
}