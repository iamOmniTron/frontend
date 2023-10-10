import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateMemo = ()=>{

    const createMemo = async (body)=>{
        const url = `memo/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createMemo;
}


export const useMemos = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [memos,setMemos] = useState([]);
    useEffect(()=>{
        const fetchMemos = async ()=>{
            setLoading(true);
            const url = `memo/get-all`;
            const {data} = await query(url);
            setMemos(data);
            setLoading(false);
        }
        fetchMemos();
    },[flag]);

    return {
        loading,memos
    }
}
export const useStudentMemos = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [memos,setMemos] = useState([]);
    useEffect(()=>{
        const fetchMemos = async ()=>{
            setLoading(true);
            const url = `memo/student`;
            const {data} = await query(url);
            setMemos(data);
            setLoading(false);
        }
        fetchMemos();
    },[flag]);

    return {
        loading,memos
    }
}



export const useUpdateMemo = ()=>{
    const updateMemo = async (id,body)=>{
        const url = `memo/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateMemo;
}



export const useDeleteMemo = ()=>{
    const deleteMemo = async (id)=>{
        const url = `memo/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteMemo
}