export const useLocalStorage = () =>{
    return localStorage.getItem('USER')
}

export const setLocalStorage = (user) =>{
    localStorage.setItem('USER', user)
}