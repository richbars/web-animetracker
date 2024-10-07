import { FiSearch } from 'react-icons/fi';
import '../animetracker/style.css';
import React, { useState, useEffect } from 'react';
import { getMangaByName, getAnimeByName } from '../services/jikan';

function AnimeTracker() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState([]);
    const [type, setType] = useState('manga');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedManga, setSelectedManga] = useState(null);

    const handleSearch = async () => {
        try {
            let data;
            if (type === 'manga') {
                data = await getMangaByName(input);
            } else {
                data = await getAnimeByName(input);
            }
            console.log(data);
            setResponse(data.data || []); // Certifique-se de que a resposta é um array
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const handleKeyDownModal = (event) => {
        // Verifica se a tecla pressionada é "Escape"
        if (event.key === 'Escape') {
            closeModal(); // Chama a função para fechar o modal
        }
    };

    const openModal = (manga) => {
        setSelectedManga(manga);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedManga(null);
    };

    useEffect(() => {
        // Adiciona o listener de teclado apenas quando o modal está aberto
        if (isModalOpen) {
            window.addEventListener('keydown', handleKeyDownModal);
        }

        // Remove o listener quando o modal é fechado
        return () => {
            window.removeEventListener('keydown', handleKeyDownModal);
        };
    }, [isModalOpen, handleKeyDownModal]); // O efeito depende do estado isModalOpen

    return (
        <div className='container'>
            <div className="containerInput">
                <select 
                    value={type} 
                    onChange={(event) => setType(event.target.value)}
                    className="type-selector"
                >
                    <option value="manga">Manga</option>
                    <option value="anime">Anime</option>
                </select>

                <input
                    type="text"
                    placeholder="Search..."
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color='#fff' />
                </button>
            </div>

            {response.length > 0 ? (
                <div className='animelist'>
                    {response.map((manga) => (
                        <div key={manga.mal_id} className="manga-item">
                            <button onClick={() => openModal(manga)}>
                                <img src={manga.images.jpg.image_url} alt={manga.title_english} />
                            </button>

                            {/* <h3 className="manga-title">English: {manga.title_english}</h3> */}
                            <h3 className="manga-title">{manga.title}</h3>
                            <h3 className="manga-title">ID: {manga.mal_id}</h3>
                            
                        </div>
                    ))}
                </div>
            ) : (
                <p>No manga or anime found. Please search.</p>
            )}

            {isModalOpen && selectedManga && (
                <div id="myModal" className={`modal ${isModalOpen ? 'show' : ''}`}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img 
                            className="manga-image"
                            src={selectedManga.images.jpg.image_url} 
                            alt={selectedManga.title_english} 
                        />
                        <div className="modal-text">
                            <h2>{selectedManga.title}</h2>
                            <h4>{selectedManga.title_english}</h4>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AnimeTracker;
