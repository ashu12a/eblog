import axios from "axios";
import { GetPrimaryMenuUri } from "../utils/constant";

export const GetPrimaryMenu = async () => {
    try{
        const response = await axios.get(GetPrimaryMenuUri);
        return response?.data;
    }catch(e){
        return [];
    }
}