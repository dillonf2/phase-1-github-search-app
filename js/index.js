document.addEventListener(`DOMContentLoaded`, ()=>{
document.querySelector(`#github-form`).addEventListener(`submit`, (e)=>{
    e.preventDefault()
    submitValue=e.target.search.value
    fetch(`https://api.github.com/search/users?q=${submitValue}`,{
        Accept: `application/vnd.github.v3+json`,
        body: JSON.stringify(),
})
    .then((res)=>{return res.json()})
    .then((data)=>{
        console.log(data.items)
        setTimeout(()=>{
            for(const id in data.items){
                list=document.createElement(`li`)
                let userName=data.items[id].login
                list.innerText=`${data.items[id].login},  ${data.items[id].id}, ${data.items[id].url}`
                document.querySelector('#user-list').append(list)
                list.addEventListener(`click`,()=>{
                    fetch(`https://api.github.com/users/${userName}/repos`, {
                        accept: `application/vnd.github.v3+json`,
                        body:JSON.stringify()
                    })
                    .then((res)=>{return res.json()})
                    .then((data)=>{
                        console.log(data[id].name)
                        for (const id in data){
                        newData=document.createElement(`li`)
                        newData.innerText=data[id].name
                        console.log(data[id].name)
                        document.querySelector(`#repos-list`).append(newData)
                        }
                    })
                }
                )}
    })
})})})
