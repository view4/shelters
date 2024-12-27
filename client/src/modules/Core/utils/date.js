
export const formatDate = (ms) => {
    if (!ms) return null 
    const date = new Date(parseInt(ms));
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
 }
 