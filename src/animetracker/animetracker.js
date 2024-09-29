import { FiSearch } from 'react-icons/fi'
import '../animetracker/style.css';
import { useState } from 'react';
import { getMangaByName, getAnimeByName } from '../services/jikan';

function AnimeTracker() {

    const [input, setInput] = useState('');
    const [response, setResponse] = useState(''); // Inicialize como null
    const [type, setType] = useState('manga');

    const handleSearch = async () => {
        try {
            let data;
            if (type === 'manga') {
                data = await getMangaByName(input);
            } else {
                data = await getAnimeByName(input);
            }
            console.log(data);
            setResponse(data);
        } catch (error) {
            alert("Error: " + error);
        }
    };
    

    
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        handleSearch();
        }
    };

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
                placeholder="Pesquise..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color='#fff'/>
                </button>
                
            </div>

            {response && response.data && response.data.length > 0 ? (
                <div className='animelist'>
                    {response.data.map((manga) => (
                        <div key={manga.mal_id} className="manga-item">
                        <img src={manga.images.jpg.image_url} alt={manga.title_english} />
                        <h3 className="manga-title">English: {manga.title_english}</h3>
                        <br /> {/* Quebra de linha */}
                        <h3 className="manga-title">Original: {manga.title}</h3>
                        <br /> {/* Quebra de linha */}
                        <h3 className="manga-title">ID: {manga.mal_id}</h3>
                    </div>

                    ))}
                </div>
                ) : (
                <p>No manga found. Please search.</p>
                )}
            </div>
    );
  }
  
  export default AnimeTracker;
  