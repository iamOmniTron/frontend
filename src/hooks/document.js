import { useEffect, useState } from "react";
import { upload, mutate, query,destroy } from "../utils/fetch"



export const useCreateDocument = ()=>{

    const createDocument = async (body)=>{
        const url = `document/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createDocument;
}


export const useDocuments = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [documents,setDocuments] = useState([]);
    useEffect(()=>{
        const fetchDocuments = async ()=>{
            setLoading(true);
            const url = `document/get-all`;
            const {data} = await query(url);
            setDocuments(data);
            setLoading(false);
        }
        fetchDocuments();
    },[flag]);

    return {
        loading,documents
    }
}



export const useDepartmentDocuments = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [documents,setDocuments] = useState([]);
    useEffect(()=>{
        const fetchDocuments = async ()=>{
            setLoading(true);
            const url = `document/department`;
            const {data} = await query(url);
            setDocuments(data);
            setLoading(false);
        }
        fetchDocuments();
    },[flag]);

    return {
        loading,documents
    }

}


export const useUploadDocument = ()=>{
    const uploadDocument = async (payload)=>{
        const url = `document/create`;
        const {message}= await upload(url,true,payload);
        return message;
    };
    return uploadDocument;
}



export const useDeleteDocument = ()=>{
    const deleteDocument = async (id)=>{
        const url = `document/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteDocument
}
