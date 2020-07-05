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
            spanPostText.className = "post-text";
            spanPostText.innerText = post.post_text;

            var p = document.createElement("p");
            p.appendChild(strongUser);
            p.appendChild(spanPostText);
            p.appendChild(articleHashtags);

            var articleText = document.createElement("div");
            articleText.className = "article-text";
            articleText.appendChild(p);

            var articleActions = document.createElement("div");
            articleActions.className = "article-actions";
            articleActions.innerHTML = `
            <div class="user-reactions">
                <a href="#like"><img id="like01" class="like" src="svg/like.svg" alt="Curtir"></a>
                <a href="#comment"><img src="svg/comment.svg" alt="Comentar"></a>
                <a href="#send"><img src="svg/messages.svg" alt="Enviar"></a>
            </div>
            <div class="user-save">
                <img src="svg/save.svg" alt="Salvar">
            </div>
            `;

            var likesCount = document.createElement("div");
            likesCount.className = "likes-count";
            likesCount.innerHTML = `
            <p>
                <strong><span id="likes-${post.post_id}">${post.likes}</span> likes</strong>
            </p>
            `;

            var viewComments = document.createElement("div");
            viewComments.className = "view-comments";
            viewComments.innerHTML = `
            <p>View all <span>${post.comments.length}</span> comments</p>
            `;

            var articleComments = document.createElement("div");
            articleComments.className = "article-comments";

            for(comment of post.comments){
                var commentDiv = document.createElement("div");
                commentDiv.className = "comment";

                var spanCommentHashtags = document.createElement("span");
                spanCommentHashtags.className = "hashtags";

                for(hashtag of comment.comment_hashtags){
                    var aHashtags = document.createElement("a");
                    aHashtags.href = hashtag;
                    aHashtags.innerHTML = `<span>${hashtag}</span>`;
                    spanCommentHashtags.appendChild(aHashtags);
                }

                var pComment = document.createElement("p");
                var strongComment = document.createElement("strong");
                var spanComment = document.createElement("span");
                spanComment.className = "comment-text";

                strongComment.innerText = comment.comment_user;
                spanComment.innerText = comment.comment_text;

                pComment.appendChild(strongComment);
                pComment.appendChild(spanComment);
                pComment.appendChild(spanCommentHashtags);

                commentDiv.appendChild(pComment);

                var likeComment = document.createElement("div");
                likeComment.className = "like-comment";
                likeComment.innerHTML = `<img src="svg/like-comment.svg" alt="Curtir"/>`;

                commentDiv.appendChild(likeComment);
                articleComments.appendChild(commentDiv);
            }

            var articleDate = document.createElement("div");
            articleDate.className = "article-date";
            articleDate.innerHTML = `<p>${post.post_date}</p>`;

            var padding = document.createElement("div");
            padding.className = "padding";

            padding.appendChild(articleActions);
            padding.appendChild(likesCount);
            padding.appendChild(articleText);
            padding.appendChild(viewComments);
            padding.appendChild(articleComments);
            padding.appendChild(articleDate);

            var form = document.createElement("form");
            form.className = "comment";
            form.innerHTML = `
            <textarea name="comment" id="comment-${post.post_id}" placeholder="Add a comment..."></textarea>
            <button type="submit"><strong>Post</strong></button>
            `;

            var footer = document.createElement("footer");
            footer.appendChild(padding);
            footer.appendChild(form);

            article.appendChild(footer);

            feed.appendChild(article);
        }
    })
    .catch(function(error){
        console.log(error);
    });
}, 2000);