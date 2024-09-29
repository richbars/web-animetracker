import axios from "axios";

// Instância para buscar manga pelo ID
const mangaApi = axios.create({ 
    baseURL: "https://api.jikan.moe/v4/manga/"
});

// Instância para buscar anime pelo ID
const animeApi = axios.create({ 
    baseURL: "https://api.jikan.moe/v4/anime/" 
});

// Função para buscar manga pelo ID
const getMangaById = async (id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar manga por ID:", error);
        throw error; // Lança o erro para tratamento posterior
    }
};

// Função para buscar anime pelo ID
const getAnimeById = async (id) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar anime por ID:", error);
        throw error; // Lança o erro para tratamento posterior
    }
};

// Função para buscar manga pelo nome
const getMangaByName = async (name) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/manga?q=${name}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar manga pelo nome:", error);
        throw error; // Lança o erro para tratamento posterior
    }
};

// Função para buscar anime pelo nome
const getAnimeByName = async (name) => {
    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime?q=${name}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar anime pelo nome:", error);
        throw error; // Lança o erro para tratamento posterior
    }
};

// Exportando as funções
export { getMangaById, getAnimeById, getMangaByName, getAnimeByName };
