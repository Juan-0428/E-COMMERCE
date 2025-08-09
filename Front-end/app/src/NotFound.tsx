import { useLocation } from "react-router-dom"

export default function NotFound(){
    const URI= useLocation().search.toString()
    return (
        <div>
            <h1>
                The URI = {URI} doesnt appear on seerver.
            </h1>
        </div>
    )
}