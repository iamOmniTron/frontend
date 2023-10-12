import { useEffect, useState } from "react";
import { destroy, mutate, query, update,upload } from "../utils/fetch"



export const useCreateUser = ()=>{

    const createUser = async (body)=>{
        const url = `user/create`;
        const {data} = mutate(url,true,body);
        return data;
    }
    return createUser;
}


export const useUsers = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const fetchUsers = async ()=>{
            setLoading(true);
            const url = `user/get-all`;
            const {data} = await query(url);
            setUsers(data);
            setLoading(false);
        }
        fetchUsers();
    },[flag]);

    return {
        loading,users
    }
}


export const useDepartmentalUsers = (flag)=>{
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    useEffect(()=>{
        const fetchUsers = async ()=>{
            setLoading(true);
            const url = `user/department`;
            const {data} = await query(url);
            setUsers(data);
            setLoading(false);
        }
        fetchUsers();
    },[flag]);

    return {
        loading,users
    }
}
export const useSearchUsers = (flag)=>{
    const searchUser = async (matric)=>{
        const url = `user/find/${matric}`
        const {data} = await query(url);
        return data;
    }
    return searchUser;
}



export const useUpdateUser = ()=>{
    const updateUser = async (id,body)=>{
        const url = `user/update/${id}`;
        const response = await update(url,body);
        return response;
    }
    return updateUser;
}



export const useDeleteUser = ()=>{
    const deleteUser = async (id)=>{
        const url = `user/delete/${id}`;
        const response = await destroy(url);
        return response;
    }
    return deleteUser
}



export const useUploadProfilePicture = ()=>{
    const uploadImage = async (payload)=>{
        const url = `user/image`;
        const {message}= await upload(url,true,payload);
        return message;
    };
    return uploadImage;
}