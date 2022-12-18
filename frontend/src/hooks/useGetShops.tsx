import { useState } from "react";
import axiosInstance from "../requests/axiosInstance";

const useGetShops = async () => {
    const [data, setData] = useState([]);
    await axiosInstance.get('shop')
        .then(res => setData(res.data.data));
    
    return data;
}

export default useGetShops();
