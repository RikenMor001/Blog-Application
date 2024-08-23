import { Auth } from "../components/Auth"
import { Quotes } from "../components/Quotes"

export const Signup = () => {
    return <div>
        <div className="grid grid-cols-2">
            <div className="invisible lg:visible">
                <Auth type={"signup"}/>
            </div>
            <div className="invisible lg:visible" >
                <Quotes/>
            </div>
           
        </div>
    </div>
    
}