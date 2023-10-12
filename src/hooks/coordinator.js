import { useEffect, useState } from "react";
import { destroy, mutate, query, update,upload } from "../utils/fetch"



export const useCreateCoordinator = ()=>{

    const createCoordinator = async (body)=>{
        const url = `coordinator/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createCoordinator;
}


export const useCoordinators = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [coordinators,setCoordinators] = useState([]);
    useEffect(()=>{
        const fetchCoordinators = async ()=>{
            setLoading(true);
            const url = `coordinator/get-all`;
            const {data} = await query(url);
            setCoordinators(data);
            setLoading(false);
        }
        fetchCoordinators();
    },[flag]);

    return {
        loading,coordinators
    }
}



export const useUpdateCoordinator = ()=>{
    const updateCoordinator = async (id,body)=>{
        const url = `coordinator/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateCoordinator;
}



export const useDeleteCoordinator = ()=>{
    const deleteCoordinator = async (id)=>{
        const url = `coordinator/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteCoordinator
}


export const useUploadProfilePicture = ()=>{
    const uploadImage = async (payload)=>{
        const url = `coordinator/image`;
        const {message}= await upload(url,true,payload);
        return message;
    };
    return uploadImage;
}