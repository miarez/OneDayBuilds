

const fetchData = (url, label) => {
  
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
      
    const saved = localStorage.getItem(label);
    if(saved){
        return JSON.parse(saved);
    }




    return fetch(url, requestOptions)
    .then((response) => { 
        return response.json().then((data) => {
            localStorage.setItem(label, JSON.stringify(data));
            return data;
        }).catch((err) => {
            console.log(err);
        }) 
    });

}

export default fetchData





