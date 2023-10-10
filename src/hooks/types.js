import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateDocumentType = ()=>{

    const createDocumentType = async (body)=>{
        const url = `doc-type/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createDocumentType;
}


export const useDocumentTypes = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [documentTypes,setDocumentTypes] = useState([]);
    useEffect(()=>{
        const fetchDocumentTypes = async ()=>{
            setLoading(true);
            const url = `doc-type/get-all`;
            const {data} = await query(url);
            setDocumentTypes(data);
            setLoading(false);
        }
        fetchDocumentTypes();
    },[flag]);

    return {
        loading,documentTypes
    }
}



export const useUpdateDocumentType = ()=>{
    const updateDocumentType = async (id,body)=>{
        const url = `doc-type/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateDocumentType;
}



export const useDeleteDocumentType = ()=>{
    const deleteDocumentType = async (id)=>{
        const url = `doc-type/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteDocumentType
}