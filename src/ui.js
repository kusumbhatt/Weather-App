class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.title = document.querySelector('#post-title');
        this.body = document.querySelector('#post-value');
    }
    showPosts(posts) {
        let output = '';
        posts.forEach((post) => {
            output += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${post.title}</h4>
                        <p class="card-text">${post.body} </p>
                        <a href="#" class="edit card-link" data-id="${post.id}">
                            <i class="fa fa-pencil"></i>
                        </a>
                        <a href="#" class="delete card-link" data-id="${post.id}">
                            <i class="fa fa-remove"></i>
                        </a>
                    </div>  
                </div>
            `
            this.post.innerHTML = output;
        })
    } 
    showAlert(msg, className) {
        this.clearAlert();
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(msg));
        this.post.insertAdjacentElement('beforebegin', div);
        setTimeout(clearAlert, 3000);
    }
    clearInput() {
        this.title.value = "";
        this.body.value = "";
    }
};
export const ui = new UI();