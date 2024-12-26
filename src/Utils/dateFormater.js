export const formatDateToYYYYMMDD = (date) => {
    if (!date) return "Invalid Date"; 
    const d = new Date(date);
    if (isNaN(d)) return "Invalid Date"; 
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); 
    const day = String(d.getDate()).padStart(2, "0"); 
    return `${month}/${day}/${year}`;
};