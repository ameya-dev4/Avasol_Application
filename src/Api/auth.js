export const GetToken=()=>{
    const cookies=document.cookie.split(';')
    const tookenCookie=cookies.find((cookie)=>cookie.trim().startsWith('access_token='));
    if (tookenCookie){
        return tookenCookie.split('=')[1]; 
    }
    return null;

};

export const getItem=()=>{
    
}