import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateDepartment = ()=>{

    const createDepartment = async (body)=>{
        const url = `department/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createDepartment;
}


export const useDepartments = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [departments,setDepartments] = useState([]);
    useEffect(()=>{
        const fetchDepartments = async ()=>{
            setLoading(true);
            const url = `department/get-all`;
            const {data} = await query(url);
            setDepartments(data);
            setLoading(false);
        }
        fetchDepartments();
    },[flag]);

    return {
        loading,departments
    }
}



export const useUpdateDepartment = ()=>{
    const updateDepartment = async (id,body)=>{
        const url = `department/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateDepartment;
}



export const useDeleteDepartment = ()=>{
    const deleteDepartment = async (id)=>{
        const url = `department/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteDepartment
}