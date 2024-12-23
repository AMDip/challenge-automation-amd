export function getDateAndTime(): string {
    const currentdate = new Date(); 
    const currentDateAndTime = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
    return currentDateAndTime;
}