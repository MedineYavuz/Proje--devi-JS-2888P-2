// apiden veri çekiyoruz.

const API_URL="https://jsonplaceholder.typicode.com/users";

const fetchCharacters= async () => {
    try {
    const response = await fetch(API_URL);

    // alınan veriyi json ile parse ediyoruz.
    const data = await response.json();
    return data;
    } catch (error) {
        console.log("Hata:",error);
        
    }
    
};

const createCharacterCard = (character) => {
    const col = document.createElement("div");

    col.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <p class="card-text"><strong>Kullanıcı adı:</strong> ${character.name}</p>
                <p class="card-text"><strong>Adres:</strong> ${character.address.city}</p>
                <p class="card-text"><strong>Şirket adı:</strong> ${character.company.name}</p>
                <p class="card-text"><strong>Email:</strong> ${character.email}</p>
            </div>
        </div>
    `;

    return col;
}


document.addEventListener("DOMContentLoaded", async() => {

    const characterGrid = document.getElementById("character-grid")

    const characters = await fetchCharacters();
    console.log(characters);

    characters.forEach((character) => {
        const card = createCharacterCard(character);
        characterGrid.appendChild(card);
    })
    
})
