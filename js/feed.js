function loadPosts() {
    return axios.get("js/posts.json");
}

setTimeout(function(){
    loadPosts()
    .then(function(response){
        var posts = response.data;
        var feed = document.querySelector(".feed");
        feed.innerHTML = "";

        for(post of posts){
            var article = document.createElement("article");
            article.id = post.post_id;

            //Header do post
            var header = document.createElement("header");
            header.innerHTML = 
            `<a class="user avatar" href="#${post.user.name}">
                <img src="${post.user.image}" alt="${post.user.name}">
                <span><strong>${post.user.name}</strong></span>
            </a>
            <div class="more-options">
                <a href="#more">
                <img src="svg/more.svg" alt="More options">
                </a>
            </div>`;

            var img = document.createElement("img");
            img.className = "article-image";
            img.src = post.post_image;
            img.alt = post.post_text;

            article.appendChild(header);
            article.appendChild(img);

            feed.appendChild(article);

            //Footer do post
            var articleHashtags = document.createElement("span");
            articleHashtags.className = "hashtags";

            for(postHashtag of post.hashtags){
                var a = document.createElement("a");
                a.href = postHashtag;
                a.innerHTML = `<span>${postHashtag}</span>`;
                articleHashtags.appendChild(a);
            }

            var strongUser = document.createElement("strong");
            strongUser.innerText = post.user.name;

            var spanPostText = document.createElement("span");
            spanPostText.innerText = post.post_text;

            var p = document.createElement("p");
            p.appendChild(strongUser);
            p.appendChild(spanPostText);
            p.appendChild(articleHashtags);

            var articleText = document.createElement("div");
            articleText.className = "article-text";
            articleText.appendChild(p);

            //article.innerHTML = 
            //     `   
            //     <footer>
            //         <div class="padding">
    
            //             <div class="article-actions">
            //                 <div class="user-reactions">
            //                     <a href="#like"><img id="like01" class="like" src="svg/like.svg" alt="Curtir"></a>
            //                     <a href="#comment"><img src="svg/comment.svg" alt="Comentar"></a>
            //                     <a href="#send"><img src="svg/messages.svg" alt="Enviar"></a>
            //             </div>
    
            //             <div class="user-save">
            //                 <img src="svg/save.svg" alt="Salvar">
            //             </div>
            //         </div>
    
            //         <div class="likes-count">
            //             <p>
            //                 <strong><span id="likes-${post.post_id}">${post.likes}</span> likes</strong>
            //             </p>
            //         </div>
    
            //         <!-- article-text -->
    
            //         <div class="view-comments">
            //             <p>View all <span>9</span> comments</p>
            //         </div>
                    
            //         <div class="article-comments">
            //             <p>
            //                 <strong>outro_usuário</strong> <span>Texto do comentário</span> 
            //                 <span class="hashtags">
            //                    <a href="#hashtag1"><span>#hashtag1</span></a>
            //                    <a href="#hashtag2"><span>#hashtag2</span></a>
            //                 </span>
            //             </p>
            //             <div class="like-comment">
            //                 <img src="svg/like-comment.svg" alt="Curtir">
            //             </div>
            //         </div>
    
            //         <div class="article-date">
            //             <p>1 hour ago</p>
            //         </div>
    
            //         </div>
            //         <form class="comment">
            //         <textarea name="comment" id="comment" placeholder="Add a comment..."></textarea>
            //         <button type="submit"><strong>Post</strong></button>
            //         </form>
            //     </footer>`;
            // feed.appendChild(article);
        }
    })
    .catch(function(error){
        console.log(error);
    });
}, 2000);