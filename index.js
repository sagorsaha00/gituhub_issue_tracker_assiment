/**
 *  <div class=" w-[350px] bg-white rounded-lg shadow-md p-4 space-y-3 border-t-4 border-indigo-500">
            <div class="flex justify-end">
                <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                    HIGH
                </span>
            </div>
            <h2 class="text-gray-900 font-semibold text-lg">
                Fix Navigation Menu On Mobile Devices
            </h2>
            <p class="text-gray-500 text-sm">
                The navigation menu doesn't collapse properly on mobile devices.
            </p>

            <div class="flex gap-2">
                <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                    BUG
                </span>
                <span class="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                    HELP WANTED
                </span>
            </div>

            <!-- Author & Date -->
            <p class="text-gray-400 text-xs">
                #1 by <span class="font-medium text-gray-700">john_doe</span> · 1/15/2024
            </p>
        </div>
        <div class=" w-[350px] bg-white rounded-lg shadow-md p-4 space-y-3 border-t-4 border-indigo-500">
            <div class="flex justify-end">
                <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                    HIGH
                </span>
            </div>
            <h2 class="text-gray-900 font-semibold text-lg">
                Fix Navigation Menu On Mobile Devices
            </h2>
            <p class="text-gray-500 text-sm">
                The navigation menu doesn't collapse properly on mobile devices.
            </p>

            <div class="flex gap-2">
                <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                    BUG
                </span>
                <span class="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                    HELP WANTED
                </span>
            </div>

            <!-- Author & Date -->
            <p class="text-gray-400 text-xs">
                #1 by <span class="font-medium text-gray-700">john_doe</span> · 1/15/2024
            </p>
        </div>
        <div class=" w-[350px] bg-white rounded-lg shadow-md p-4 space-y-3 border-t-4 border-indigo-500">
            <div class="flex justify-end">
                <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                    HIGH
                </span>
            </div>
            <h2 class="text-gray-900 font-semibold text-lg">
                Fix Navigation Menu On Mobile Devices
            </h2>
            <p class="text-gray-500 text-sm">
                The navigation menu doesn't collapse properly on mobile devices.
            </p>

            <div class="flex gap-2">
                <span class="px-2 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                    BUG
                </span>
                <span class="px-2 py-1 text-xs font-semibold text-yellow-600 bg-yellow-100 rounded-full">
                    HELP WANTED
                </span>
            </div>

            <!-- Author & Date -->
            <p class="text-gray-400 text-xs">
                #1 by <span class="font-medium text-gray-700">john_doe</span> · 1/15/2024
            </p>
        </div>
*/




//''
let allissueData = [];
let openData = [];
let closedData = [];



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





function renderDisplayAllDataByGrid(allData) {
    const allissueGrid = document.querySelector(".alldataGirdBox");
    const renderData = allData.map((data) => {
        const date = data.updatedAt
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
        return ` <div class=" w-5/6  bg-white rounded-lg shadow-md p-2 ${data.status === 'open' ? 'border-t-4 border-indigo-500' : 'border-t-4 border-green-500'}   mb-2">
            
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
     
}

main();
