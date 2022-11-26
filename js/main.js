let input = document.querySelector(".input");
let btn = document.querySelector(".button");
let showData = document.querySelector(".showData");
let noData = document.querySelector(".noData");
let tbody = document.querySelector('#tbody');

btn.addEventListener("click",function(){
    if(input.value == ""){
        showData.innerHTML = "<span>please enter a user name</span>"
    }else{
        fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => response.json())
        .then((repositories) => {
            console.log(repositories)
            tbody.innerHTML = '';
            input.onclick = function(){
                input.value = '';
            }

            if(repositories.length<1){
                noData.innerHTML = `No repos for ${input.value}`
            }else{
                noData.innerHTML = `This is repo of ${input.value}`
            }
            for(let i = 0; i <repositories.length; i++){

                tbody.innerHTML += 
                `<tr>
                    <th class="col">${i+1}</th>
                    <td class="col">${repositories[i].name}</td>
                    <td class="col"><a class="btn visit" target="_blank" href="${repositories[i].html_url}">visit</a></td>
                    <td class="col"><a class="btn visit" target="_blank" href="https://kerolos2000.github.io/${repositories[i].name}">visit</a></td>
                    <td class="col">${repositories[i].stargazers_count}</td>
                </tr>`;
            }
        })
        
    }
})
input.addEventListener('keydown', function(e) {
    if(e.keyCode === 13){
        btn.click();
    }});