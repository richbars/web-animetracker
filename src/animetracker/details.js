// MangaDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMangaById, getAnimeById } from '../services/jikan'; // Certifique-se de que você tem esta função

function Details() {
    const { type, id } = useParams(); // Pegar o tipo e ID da URL
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getResponse = async () => {
            try {
                let data;
                if (type === 'manga') {
                    data = await getMangaById(id);
                } else if (type === 'anime') {
                    data = await getAnimeById(id);
                } else {
                    throw new Error("Tipo inválido");
                }
                setResponse(data.data);
            } catch (error) {
                setError("Error fetching details");
            } finally {
                setLoading(false);
            }
        };

        getResponse();
    }, [type, id]); // Dependências atualizadas para incluir 'type'

    // Efeito para mudar o título da página
    useEffect(() => {
        if (response) {
            document.title = response.title;
        }
    }, [response]); // Atualiza quando a resposta muda

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="manga-details">
            {response && (
                <>
                    <h1>{response.title}</h1>
                    <p>{response.synopsis}</p>
                    {/* Adicione mais informações que você quiser exibir */}
                </>
            )}
        </div>
    );
}

export default Details;
