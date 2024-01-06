const input = document.getElementById("input");
const grid = document.getElementsByClassName('grid')[0];

input.addEventListener('keydown', function(event){
    if(event.key === 'Enter') 
        loadImg();
});

function loadImg(){
    removeImg();
    const url = 'https://api.unsplash.com/search/photos/?query='+input.value+'&per_page=10&client_id=bCq6NrSybxqzjq75z1XOZt2b0xXxrJGrlspp-znHYt4';
    
    fetch(url)
        .then(response => {
            if (response.ok) 
                return response.json();
            else
                throw new Error('Network response was not ok.');
        })
        .then(data => {
            const imageNode = [];
            for(let i = 0; i < data.results.length; i++){
                imageNode[i] = document.createElement('div');
                imageNode[i].className = 'img';
                imageNode[i].style.backgroundImage = 'url('+data.results[i].urls.raw+')';
                imageNode[i].addEventListener('dblclick', function(){
                    window.open(data.results[i].links.download, '_blank');
                });
                grid.appendChild(imageNode[i]);
            }
        })
        .catch(error => {
            alert('Error fetching data:', error);
        });
}

function removeImg(){
    grid.innerHTML = '';
}
