import { forwardRef } from "react"
import type{ RefObject } from "react"
type resource_URI ={
    resource: string;
    ref: RefObject<HTMLLabelElement | null>;

}
export default function Footer({resource, ref}: resource_URI){
    return (
        <>
            <div  style={{backgroundColor: "black"}}>
                <h1>
                    Todos los derechos reservados a: 
                    Nos encontramos en el recurso {resource}
                    
                </h1>
                <label ref={ref}></label>
                <button name="Hola">
                    Hola! no
                </button>
            </div>
        </>
    )

}