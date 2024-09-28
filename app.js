document.getElementById('load-btn').addEventListener('click', () => {
    const url = document.getElementById('url-input').value;
    // TODO: Load files from the given URL and display them
    loadFiles(url);
});

function loadFiles(url) {
    // This is where the file loading logic would go.
    // For this tutorial, we simulate data.
    const files = [
        { name: 'Document.pdf', type: 'File', size: 1200, isFile: true },
        { name: 'Pictures', type: 'Folder', size: 5000, isFile: false },
        { name: 'Video.mp4', type: 'File', size: 25000, isFile: true }
    ];
    
    displayFileList(files);
    drawChart(files);
}

function displayFileList(files) {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // Clear previous entries

    files.forEach(file => {
        const row = document.createElement('tr');

        // Icon
        const iconCell = document.createElement('td');
        iconCell.textContent = file.isFile ? '📄' : '📁'; // Apple emoji style icons for file and folder

        // Name, Type, Size
        const nameCell = document.createElement('td');
        nameCell.textContent = file.name;
        
        const typeCell = document.createElement('td');
        typeCell.textContent = file.type;
        
        const sizeCell = document.createElement('td');
        sizeCell.textContent = formatSize(file.size);

        row.appendChild(iconCell);
        row.appendChild(nameCell);
        row.appendChild(typeCell);
        row.appendChild(sizeCell);

        fileList.appendChild(row);
    });
}

function formatSize(size) {
    if (size < 1024) return `${size} B`;
    if (size < 1048576) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / 1048576).toFixed(2)} MB`;
}

function drawChart(files) {
    const ctx = document.getElementById('fileChart').getContext('2d');
    const fileSizes = files.map(file => file.size);
    const labels = files.map(file => file.name);

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'File Size',
                data: fileSizes,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
    });
}
