
const status = (response) => {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

export class Http {
    get(url) {
        return fetch(url)
            .then(status);
    }
}
