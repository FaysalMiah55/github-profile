const url = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function userProfile(userName){
  try{
    const {data} = await axios(url + userName)

    createUser(data);
    getRepos(userName)
  }catch(err){
    if(err.response.status == 404){
      createError("No user found");
    }
  } 
}

async function getRepos(userName){
  try{
    const {data} = await axios(url + userName + "/repos?sort=created")

    addRepos(data);
  }catch(err){
    createError("Problem fetching repo");
  } 
}

function createUser(user){
  const cardUser = `
    <div class="card">
      <div>
        <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
      </div>
      <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        
        <ul>
          <li>${user.followers} <strong>Followers</strong></li>
          <li>${user.following} <strong>Following</strong></li>
          <li>${user.public_repos} <strong>Repository</strong></li>
        </ul>

        <div id="repos"></div>
      </div>
    </div>  
  `
  main.innerHTML = cardUser; 
}

function createError(msg){
  const error = `
    <div class="card">
      <h1>${msg}</h1>
    </div>
  `
  main.innerHTML = error;
}

function addRepos(repos){
  const reposEl = document.getElementById("repos");

  repos
    .slice(0, 5)
    .forEach(repo => {
      const repoEl = document.createElement("a")
      repoEl.classList.add("repo")
      repoEl.href = repo.html_url
      repoEl.target = "_blank"
      repoEl.innerText = repo.name

      reposEl.appendChild(repoEl)
    });
}

form.addEventListener("submit", (e)=>{
  e.preventDefault()

  const user = search.value;

  if(user){
    userProfile(user);

    search.value = '';
  }
})