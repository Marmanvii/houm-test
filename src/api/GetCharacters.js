import ENV_CONFIG from '../environment/env-config';
import ERRORS from '../constants/errors';

const getCharacters = async (page, status, gender, name) => {
    try {
        const response = await fetch(`${ENV_CONFIG.rickMortyApiUrl}?page=${page}&status=${status}&gender=${gender}&name=${name}`)
        if (!response.ok) {
            if (response.status !== 404) throw new Error(ERRORS.notLoaded);
            else throw new Error(ERRORS.noData);
        }

        const data = await response.json();

        const tranformedCharacters = data.results.map((characterData) => {
            return {
                id: characterData.id,
                name: characterData.name,
                image: characterData.image,
                origin: characterData.origin.name,
                location: characterData.location.name,
                species: characterData.species,
                status: characterData.status,
            };
        });

        return Promise.resolve({
            data: tranformedCharacters,
            info: data.info,
        });
    } catch (error) {
        return Promise.reject(error);
    }
}

export default getCharacters;
