import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AlbumType, SongType } from '../types';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

function Album() {
  const [songs, setSongs] = useState<SongType[]>([]);
  const [album, setAlbum] = useState<AlbumType | null>(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function songsOfAlbum() {
      setLoading(true);
      if (id) {
        const [albData, ...albSongs] = await getMusics(id);
        setAlbum(albData);
        setSongs(albSongs);
        setLoading(false);
      }
    }
    songsOfAlbum();
  }, [id]);

  return (
    <div className="musics-container">
      {loading && <Loading />}
      <img src={ album?.artworkUrl100 } alt="imagem do album" />
      <h4 data-testid="artist-name">{album?.artistName}</h4>
      <p data-testid="album-name">{album?.collectionName}</p>
      {songs.map((music) => (
        <MusicCard
          key={ (music as SongType).trackId }
          music={ (music as SongType) }
        />
      ))}
    </div>
  );
}

export default Album;
