import { useEffect, useState } from "react";
import { destroy, mutate, query, update } from "../utils/fetch"



export const useCreateApplication = ()=>{

    const createApplication = async (body)=>{
        const url = `application/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createApplication;
}


export const useApplications = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [applications,setApplications] = useState([]);
    useEffect(()=>{
        const fetchApplications = async ()=>{
            setLoading(true);
            const url = `application/get-all`;
            const {data} = await query(url);
            setApplications(data);
            setLoading(false);
        }
        fetchApplications();
    },[flag]);

    return {
        loading,applications
    }
}


export const useDepartmentalApplication = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [applications,setApplications] = useState([]);
    useEffect(()=>{
        const fetchApplications = async ()=>{
            setLoading(true);
            const url = `application/department`;
            const {data} = await query(url);
            setApplications(data);
            setLoading(false);
        }
        fetchApplications();
    },[flag]);

    return {
        loading,applications
    }
}
export const useMyApplication = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [application,setApplication] = useState(null);
    useEffect(()=>{
        const fetchApplications = async ()=>{
            setLoading(true);
            const url = `application/me`;
            const {data} = await query(url);
            setApplication(data);
            setLoading(false);
        }
        fetchApplications();
    },[flag]);

    return {
        loading,application
    }
}


export const useApproveApplication = ()=>{
    const updateApplication = async (id,body)=>{
        const url = `application/approve/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateApplication;
}


export const useRejectApplication = ()=>{
    const updateApplication = async (id,body)=>{
        const url = `application/reject/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateApplication;
}