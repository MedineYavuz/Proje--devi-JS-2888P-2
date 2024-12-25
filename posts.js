const API_URL="https://jsonplaceholder.typicode.com/posts";

const fetchPosts= async () => {
    try {
    const response = await fetch(API_URL);

    // alınan veriyi json ile parse ediyoruz.
    const data = await response.json();
    return data;
    } catch (error) {
        console.log("Hata:",error);
        return [];
        
    }
    
};

const createPostsCard = (post) => {
    const col = document.createElement("div");

    col.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <p class="card-text"><strong>User Id:</strong> ${post.userId}</p>
                <p class="card-text"><strong>Id:</strong> ${post.id}</p>
                <p class="card-text"><strong>Title:</strong> ${post.title}</p>
                <p class="card-text"><strong>Body:</strong> ${post.body}</p>
            </div>
        </div>
    `;

    return col;
};

document.addEventListener("DOMContentLoaded", async() => {

    const characterPosts = document.getElementById("character-posts");

  
  

      // Kullanıcıdan geçerli bir userId iste
      let userId = null;
      while (userId === null || isNaN(userId) || userId < 1 || userId > 10) {
          const userInput = prompt("Lütfen 1 ile 10 arasında bir kullanıcı ID'si girin:");
          if (userInput === null) {
              alert("İşlem iptal edildi.");
              return; // Kullanıcı iptal ederse çıkış yap
          }
          userId = Number(userInput);
          if (isNaN(userId) || userId < 1 || userId > 10) {
              alert("Geçersiz giriş. Lütfen 1 ile 10 arasında bir sayı girin.");
          }
      }
  
      console.log("Kullanıcıdan alınan userId:", userId);

    // API'den tüm postları al
    const posts = await fetchPosts();
    console.log("Tüm postlar:", posts);

     // Seçilen userId'ye göre filtreleme
     const filteredPosts = posts.filter(post => post.userId === userId);
     console.log("Filtrelenmiş postlar:", filteredPosts);

        console.log("Filtrelenmiş postlar:", filteredPosts);

          // Postlar için kart oluştur ve ekle
    filteredPosts.forEach((post) => {
        const card = createPostsCard(post);
        characterPosts.appendChild(card);
    })

    if (filteredPosts.length === 0) {
        const noPostsMessage = document.createElement("p");
        noPostsMessage.textContent = "Bu kullanıcı için gönderi bulunamadı.";
        characterPosts.appendChild(noPostsMessage);
    }
    
})




