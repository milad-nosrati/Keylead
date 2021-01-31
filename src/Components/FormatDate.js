formatDate = (taskDate) => {
    const today = new Date();
    if ((taskDate.year === today.getFullYear())&& 
        (taskDate.month === Number(today.getMonth())+1) &&
        (taskDate.day === today.getDate())){
          return true
        }else{
          return false
        }     
  }