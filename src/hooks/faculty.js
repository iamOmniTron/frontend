import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateFaculty = ()=>{

    const createFaculty = async (body)=>{
        const url = `faculty/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createFaculty;
}


export const useFaculties = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [faculties,setFaculties] = useState([]);
    useEffect(()=>{
        const fetchFaculties = async ()=>{
            setLoading(true);
            const url = `faculty/get-all`;
            const {data} = await query(url);
            setFaculties(data);
            setLoading(false);
        }
        fetchFaculties();
    },[flag]);

    return {
        loading,faculties
    }
}



export const useUpdateFaculty = ()=>{
    const updateFaculty = async (id,body)=>{
        const url = `faculty/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateFaculty;
}



export const useDeleteFaculty = ()=>{
    const deleteFaculty = async (id)=>{
        const url = `faculty/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteFaculty
}