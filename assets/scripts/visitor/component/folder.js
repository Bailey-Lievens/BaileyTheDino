let folderContainer = document.querySelector('.folders-container');

if (folderContainer) {
    let folders = folderContainer.querySelectorAll('.folder-info');

    for (let i = 0; i < folders.length; i++) {
        let folder = folders[i];

        folder.addEventListener("click", function() {toggleOpenState(folder)}, false);
    }
}

function toggleOpenState(folder) {
    let postWrapper = folder.parentElement.querySelector('.posts-wrapper');
    let mapClosedIcon = folder.querySelector('.folder-closed');
    let mapOpenIcon = folder.querySelector('.folder-open');

    if (postWrapper.style.display === 'flex') {
        mapClosedIcon.style.display = 'block';
        mapOpenIcon.style.display = 'none';
        postWrapper.style.display = 'none';
        return;
    }

    mapClosedIcon.style.display = 'none';
    mapOpenIcon.style.display = 'block';
    postWrapper.style.display = 'flex';
}