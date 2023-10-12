import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateComment = ()=>{

    const createComment = async (body)=>{
        const url = `comment/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createComment;
}


export const useStudentsComments = (studentId,flag)=>{
    const [loading,setLoading] = useState(false);
    const [comments,setComments] = useState([]);
    useEffect(()=>{
        const fetchComments = async ()=>{
            setLoading(true);
            const url = `comment/student/${studentId}`;
            const {data} = await query(url);
            setComments(data);
            setLoading(false);
        }
        fetchComments();
    },[flag]);

    return {
        loading,comments
    }
}

export const useDocumentComments = (documentId,flag)=>{
    const [loading,setLoading] = useState(false);
    const [comments,setComments] = useState([]);
    useEffect(()=>{
        const fetchComments = async ()=>{
            setLoading(true);
            const url = `comment/document/${documentId}`;
            const {data} = await query(url);
            setComments(data);
            setLoading(false);
        }
        fetchComments();
    },[flag]);

    return {
        loading,comments
    }
}



export const useUpdateComment = ()=>{
    const updateComment = async (id,body)=>{
        const url = `comment/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateComment;
}



export const useDeleteComment = ()=>{
    const deleteComment = async (id)=>{
        const url = `comment/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteComment
}