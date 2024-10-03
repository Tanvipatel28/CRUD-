let addBtn = document.getElementById("add_btn");
addBtn.addEventListener('click', addChapter);
let parentList = document.getElementById('parentList');

function addChapter(e) {
    if (parentList.children[0] && parentList.children[0].className === "emptyMsg") {
        parentList.children[0].remove();
    }

    let currentBtn = e.currentTarget;
    let currentInput = currentBtn.previousElementSibling;
    let currentChapterName = currentInput.value;

    let newLi = document.createElement('li');
    newLi.className = 'list-group-item d-flex justify-content-between';
    newLi.innerHTML = `
        <h3 class="flex-grow-1">${currentChapterName}</h3>
        <button class="btn btn-warning mx-2">Edit</button>
        <button class="btn btn-danger" onclick="removeChapter(this)">Remove</button>
    `;

    // Add event listener for the Edit button
    const editBtn = newLi.querySelector('.btn-warning');
    editBtn.addEventListener('click', function() {
        editChapter(this);
    });

    parentList.appendChild(newLi);
}

function removeChapter(currentElement) {
    currentElement.parentElement.remove();
    let parentList = document.getElementById('parentList');
    if (parentList.children.length <= 0) {
        let newEmptyMsg = document.createElement("h3");
        newEmptyMsg.classList.add("emptyMsg");
        newEmptyMsg.textContent = 'Nothing is here. Please enter a chapter';
        parentList.append(newEmptyMsg);
    }
}

function editChapter(currentElement) {
    if (currentElement.textContent === "Done") {
        currentElement.textContent = "Edit";
        let currentChapterName = currentElement.previousElementSibling.value;
        let currentHeading = document.createElement('h3');
        currentHeading.className = "flex-grow-1";
        currentHeading.textContent = currentChapterName;
        currentElement.parentElement.replaceChild(currentHeading, currentElement.previousElementSibling);
    } else {
        currentElement.textContent = "Done";
        let currentChapterName = currentElement.previousElementSibling.textContent;
        let currentInput = document.createElement('input');
        currentInput.type = "text";
        currentInput.placeholder = "Chapter Name";
        currentInput.className = "form-control";
        currentInput.value = currentChapterName;

        currentElement.parentElement.replaceChild(currentInput, currentElement.previousElementSibling);
    }
}
