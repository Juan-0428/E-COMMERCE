import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';

import { createContext, useContext, type ReactNode } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type InterfaceContextType = string;
const Interface = createContext<InterfaceContextType | null>(null);
type HeadersProps ={
    title: string;
    children?: ReactNode
}
export default function Initialization(){

    return (
        <Interface.Provider value="white">
           <Header title="E-commerce"/>
        </Interface.Provider>
    )
}

function Header({title, children}: HeadersProps){
    return (
         <div>
                <section>
                    <div className="header">
                        <img src="" alt="" />
                        <h1>
                            {title}
                        </h1>
                        
                    </div>
                    <div className="buttonHeaders">
                        <Button color="secondary">Button 1</Button>
                        <Button color="secondary">Button 1</Button>
                        <Button color="secondary">Button 1</Button>
                        <Button color="secondary">Button 1</Button>
                    </div>
                    <SearchElement/>
                    {children}
                </section>
        </div>
    );
}
function SearchElement(){
    const theme = useContext(Interface);
    const classname = "button-"+ (theme ?? "default");
    return (<div className={classname}>
            <TextField placeholder="Search..."/>
            <Button className = {classname} startIcon={<FontAwesomeIcon icon={faSearchengin}/>}/>
    </div>);
}
