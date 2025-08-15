import { useEffect, useRef, useState } from "react"
import type{ ErrorInfo, RefObject } from "react"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { verifySesion } from "@scripts/user";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import { inputBaseClasses } from '@mui/material/InputBase';
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";



export default function Forms(){

    const location = useLocation();
    const {mode} = useParams<string>();
    const navigate = useNavigate();
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

    //
    type ObjectUser = {
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
    
    const[signForm, setSign] = useState<{IDENTIFICACION_USUARIO: string, CONTRASENA_USUARIO: string}>({
        IDENTIFICACION_USUARIO: "",
        CONTRASENA_USUARIO: ""
    })
    const [logForm, setLog] = useState<ObjectUser>()

    const senf_form_sign = async()=>{
        try{
            const identificacionUsuario = await verifySesion(signForm, "sign");
            navigate(`/commerce?sessionid=${encodeURI(identificacionUsuario?.toString())}`)
            return;
        }
        catch(error: any){
            console.log(error)
            throw new Error(error)
        }
    }
    const sendFormLog = async()=>{
        try{
        }
        catch(error: any){
            console.log(error);
            throw new Error(error)
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const changFormSign = (key: string, value: string) => {
        setSign(prevText => ({
            ...prevText,     // Keep previous state
            [key]: value     // Update the given key
        }));
        };

    const changFormLog = (key: string, value: string) => {
        setLog(prevText => ({
            ...(prevText!) ,    // Keep previous state
            [key]: value     // Update the given key
        }));
        };

    function valuetext(value: number) {
        return `${value}`;
        }
    
    return (
        <>  <div className="message">
                <label></label>
            </div>
            <div className="singUp" ref={stateForm.formSign}>
                <div>
                    <form className="forms">
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Identificacion del usuario"
                            multiline
                            maxRows={4}
                            onChange={(event)=>{
                                changFormSign("IDENTIFICACION_USUARIO", event.target.value)
                            }}
                            />
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Contraseña"
                            />
                        </FormControl>
                            <label>
                                Olvidaste tu contraseña? 
                                <a href="">
                                    Oprime aquí!
                                </a>
                            </label>
                       
                        <Button variant="text" color="secondary" onClick={async()=>{
                            senf_form_sign()
                        }}>
                            Enviar
                        </Button>
                    </form>
                </div>
            </div>

            <div className="logIn" ref={stateForm.formLog}>
                
                <form className="forms">
                    <TextField
                        required
                        id="outlined-required"
                        label="Required"
                        placeholder="Identificacion del usuario"
                        onChange={(event) =>{
                            changFormLog("IDENTIFICACION_USUARIO", event.target.value)
                        }}
                        />
                        <TextField
                            id="input-with-icon-textfield"
                            label="Nombre de usuario"
                            placeholder="Elige un nombre de uusario"
                            slotProps={{
                            input: {
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                                ),
                            },
                            }}
                            variant="standard"
                            onChange={(event) =>{
                                    changFormLog("NOMBRE_SISTEMA", event.target.value)
                                }}
                            
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder="Nombre del usuario"
                            onChange={(event) =>{
                                changFormLog("NOMBRE_USUARIO", event.target.value)
                            }}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Required"
                            placeholder="Apellido del usuario"
                            onChange={(event) =>{
                                changFormLog("APELLIDO_USUARIO", event.target.value)
                            }}
                        />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Genero</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="female" control={<Radio onChange={(event)=>{
                                    changFormLog("GENERO_USUARIO", "F");
                                }}/>} label="F" />
                                <FormControlLabel value="male" control={<Radio onChange={(event)=>{
                                    changFormLog("GENERO_USUARIO", "M");
                                }}/>} label="M" />
                                <FormControlLabel value="other" control={<Radio onChange={(event)=>{
                                    changFormLog("GENERO_USUARIO", "O");
                                }}/>} label="Otro" />
                                <FormControlLabel
                                value="disabled"
                                disabled
                                control={<Radio />}
                                label="other"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Slider
                            aria-label="Temperature"
                            defaultValue={30}
                            getAriaValueText={valuetext}
                            valueLabelDisplay="auto"
                            shiftStep={30}
                            step={1}
                            marks
                            min={10}
                            max={110}
                            />
                        <TextField
                            id="standard-suffix-shrink"
                            label="Correo electrónico"
                            variant="standard"
                            slotProps={{
                            htmlInput: {
                                sx: { textAlign: 'right' },
                            },
                            input: {
                                endAdornment: (
                                <InputAdornment
                                    position="end"
                                    sx={{
                                    alignSelf: 'flex-end',
                                    margin: 0,
                                    marginBottom: '5px',
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    [`[data-shrink=true] ~ .${inputBaseClasses.root} > &`]: {
                                        opacity: 1,
                                    },
                                    }}
                                >
                                    @gmail.com
                                </InputAdornment>
                                ),
                            },
                            }}
                            onChange={(event) =>{
                                changFormLog("CORREO_ELECTRONICO", event.target.value)
                            }}
                        />

                        <Button variant="text" color="secondary" onClick={async()=>{
                            sendFormLog()
                        }}>
                            Enviar
                        </Button>
                    </form>
            </div>
        </>
    )
}