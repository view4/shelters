export const saveToken = (token) => localStorage.setItem('token', token)
export const getToken = () => localStorage.getItem('token');
export const  deleteToken = () => localStorage.removeItem("token")

