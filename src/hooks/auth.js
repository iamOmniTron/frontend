import { mutate } from "../utils/fetch"


export const useLogin = ()=>{
    const login = async (body)=>{
        const url =`auth/student/login`;
        const {data} = await mutate(url,false,body);
        return data;
    }
    return login;
}


export const useCoordinatorLogin = ()=>{
    const login = async (body)=>{
        const url =`auth/coordinator/login`;
        const {data} = await mutate(url,false,body);
        return data;
    }
    return login;
}


export const usePgAdminLogin = ()=>{
    const login = async (body)=>{
        const url =`auth/pg/login`;
        const {data} = await mutate(url,false,body);
        return data;
    }
    return login;
}


export const useAdminLogin =()=>{
    const loginAdmin = async (body)=>{
        const url = `admin/login`;
        const {data} = await mutate(url,false,body);
        return data;
    };
    return loginAdmin;
}
