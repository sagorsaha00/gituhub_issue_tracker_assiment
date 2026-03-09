 
 
let allissueData = [];
let openData = [];
let closedData = [];
let searchData = []
let loginUserData = []

async function dataLoad() {
    try {
        const response = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await response.json();
        allissueData = data.data;
        console.log("allissueData", allissueData)
        openData = allissueData.filter(issue => issue.status === "open");
        closedData = allissueData.filter(issue => issue.status === "closed");
        console.log("openData", openData);
        console.log("closedData", closedData);

    } catch (error) {
        console.error("Error loading data:", error);
    }
}


const allGirdBox = document.getElementsByClassName('.alldataGirdBox')
const allBtn = document.getElementById('all-btn')
const closebtn = document.getElementById('close-btn')
const openbtn = document.getElementById('open-btn')
const inputValue = document.getElementById('searchInput')
const issuelength = document.getElementById('issuelength')



const logininputValue = document.getElementById('inputValue');
const passwordValue = document.getElementById('passwordValue');
const loginFromFull = document.getElementById('loginFromFull')
const fullDatabody = document.getElementById('fulldataloadbody')

function loginFunc() {
    const loginvalue = logininputValue.value;
    const passvalue = passwordValue.value;

    if (!loginvalue || !passvalue) {
        logininputValue.value = '';
        passwordValue.value = '';
        alert("please pass your username or password");
        return;
    }

    if (loginvalue === 'admin' && passvalue === 'admin123') {
        loginUserData.push({
            username: loginvalue,
            password: passvalue
        });
        loginFromFull.classList.add("hidden");
        fullDatabody.classList.remove("hidden")
        console.log("loginUserData", loginUserData);
        alert("Login successful");


    } else {
        alert("Invalid username or password");
    }

    console.log('pass', loginvalue, passvalue);
}


function renderDisplayAllDataByGrid(allData) {
    const allissueGrid = document.querySelector(".alldataGirdBox");
    issuelength.innerText = allissueData.length
    const renderData = allData.map((data) => {
        const date = data.updatedAt
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        return ` <div id="openModal" onclick="showIssueDetails('${data.id}')" class=" w-5/6 cursor-pointer bg-white rounded-lg shadow-md p-2 ${data.status === 'open' ? 'border-t-4 border-indigo-500' : 'border-t-4 border-green-500'}   mb-2">
            
            <div class="flex justify-end">
               <span class="px-2 py-1 text-xs font-semibold rounded-full
     ${data.priority === 'high'
                ? 'text-red-600 bg-red-100'
                : data.priority === 'medium'
                    ? 'text-yellow-600 bg-yellow-100'
                    : 'text-gray-600 bg-gray-100'
            }">
      ${data.priority.toUpperCase()}
     </span>
            </div>

            <h2 class="text-gray-900 font-semibold text-lg">
                ${data.title}
            </h2>

            <p class="text-gray-500 text-sm">
                ${data.description}
            </p>
<div class="flex gap-2 ">
${data.labels.map((label) => {
                return `
    <span class="px-2 py-1 text-xs font-semibold rounded-full
    ${label === 'bug'
                        ? 'text-red-600 bg-red-100'
                        : label === 'help wanted'
                            ? 'text-yellow-600 bg-yellow-100'
                            : 'text-green-600 bg-green-100'
                    }">
        ${label.toUpperCase()}
    </span>
    `
            })}
</div>

            <p class="text-gray-400 text-xs">
                #${data.id} by 
                <span class="font-medium text-gray-700">${data.author}</span>
            </p>
<span class="flex">
      <span>${formattedDate
            }</span>
      <span>·</span>
      <span>2025</span>
    </span>
        </div>`;
    });

    allissueGrid.innerHTML = renderData.join("");
}




function searchIssues() {
    const searchValue = inputValue.value;
    console.log("inputValue", searchValue)
    const filteredData = allissueData.filter((issue) => {
        return issue.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    renderDisplayAllDataByGrid(filteredData);
}


async function showIssueDetails(id) {

    const fethdata = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    const data = await fethdata.json()
    const issue = data.data
    console.log("issue", issue)
    const date = issue.updatedAt
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
    const modal = document.getElementById("issueModal")
    const content = document.getElementById("modalContent")

    modal.classList.remove("hidden")
    content.innerHTML = `
        <div class="w-100% mx-auto   ">

        <h1 class="text-[28px] font-bold text-gray-800 mb-3">
            ${issue.title}
        </h1>

        <div class="flex items-center gap-3 text-gray-500 mb-6">

            <span class="bg-green-100 text-green-700 bg-green-500 px-4 py-1 rounded-full text-sm font-medium">
                ${issue.status}
            </span>

            <span>•</span>

            <span>Opened by <b class="text-black-600">${issue.author}</b></span>

            <span>•</span>

            <span>${formattedDate}</span>

        </div>


        <div class="flex gap-2 ">
${issue.labels.map((label) => {
        return `
    <span class="px-2 py-1 text-xs font-semibold rounded-full
    ${label === 'bug'
                ? 'text-red-600 bg-red-100'
                : label === 'help wanted'
                    ? 'text-yellow-600 bg-yellow-100'
                    : 'text-green-600 bg-green-100'
            }">
        ${label.toUpperCase()}
    </span>
    `
    })}
</div>


        <p class="text-gray-500 mb-6 leading-relaxed">
            ${issue.description}
        </p>


        <div class="bg-gray-100 w-50% rounded-xl p-6 flex justify-between items-center mt-6">

            <div>
                <p class="text-gray-500">Assignee:</p>
                <p class="font-semibold text-gray-800">${issue.assignee
        }</p>
            </div>

            <div>
                <p class="text-gray-500">Priority:</p>
                      <span class="px-2 py-1 text-xs font-semibold rounded-full
     ${issue.priority === 'high'
            ? 'text-red-600 bg-red-100'
            : issue.priority === 'medium'
                ? 'text-yellow-600 bg-yellow-100'
                : 'text-gray-600 bg-gray-100'
        }">
      ${issue.priority.toUpperCase()}
     </span>
            </div>

        </div>

        

    </div>
    `
}


document.addEventListener('DOMContentLoaded', () => {
    allBtn.addEventListener('click', () => {
        console.log("clicked all")
        renderDisplayAllDataByGrid(allissueData)
    })

    closebtn.addEventListener('click', () => {
        console.log("clicked close")
        renderDisplayAllDataByGrid(closedData)
    })

    openbtn.addEventListener('click', () => {
        console.log("clicked open")
        renderDisplayAllDataByGrid(openData)
    })

})
function closeModal() {
    document.getElementById("issueModal")
        .classList.add("hidden")
}




window.onload = () => {
    allBtn.classList.add('bg-indigo-600', 'text-white')
    renderDisplayAllDataByGrid(allissueData)
  

}
function showTabByData(event) {

    const tabs = document.querySelectorAll('.header-btn');
    tabs.forEach(tab => {
        tab.classList.remove('bg-indigo-600', 'text-white');
        tab.classList.add('text-gray-600');
    });
    const headerbutton = event.target;
    headerbutton.classList.add('bg-indigo-600', 'text-white');
}
async function main() {
    await dataLoad();
    renderDisplayAllDataByGrid(allissueData)
    loginFunc()

}

main();
