import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlbumType } from '../types';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

function Search() {
  const [name, setName] = useState<string>('');
  const [clearedName, setClearedName] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [album, setAlbum] = useState<AlbumType[]>([]);

  function handleClick() {
    setLoading(true);
    setClearedName('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setName(value);
    setClearedName(value);
  }

  useEffect(() => {
    async function newAlbum() {
      const albData = await searchAlbumsAPI(name);
      setAlbum(albData);
      setLoading(false);
    }
    if (loading) {
      newAlbum();
    }
  }, [name, loading]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <>
      { loading && (<Loading />) }
      <form className="seach-form">
        <div>
          <label htmlFor="search-artist-input">Artista</label>
          <input
            type="text"
            name="search-artist-input"
            data-testid="search-artist-input"
            placeholder="Nome do artista"
            value={ clearedName }
            onChange={ handleChange }
          />
          <button
            data-testid="search-artist-button"
            onClick={ handleClick }
            disabled={ name.length < 2 }
          >
            Pesquisar
          </button>
        </div>
        <div>
          {(album.length > 0) && (`Resultado de álbuns de: ${name}`)}
          {(album.length === 0) && ('Nenhum álbum foi encontrado')}
          {album.map((alb) => (
            <div key={ alb.artistId } className="album">
              <img src={ alb.artworkUrl100 } alt={ alb.artistName } />
              <p>{ alb.artistName }</p>
              <Link
                to={ `/album/${alb.collectionId}` }
                data-testid={ `link-to-album-${alb.collectionId}` }
              >
                { alb.collectionName }
              </Link>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}

export default Search;
