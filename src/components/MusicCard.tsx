import { useState } from 'react';
import { SongType } from '../types';

type MusicCardProps = {
  music: SongType;
};

function MusicCard({ music }: MusicCardProps) {
  const [favorite, setFavorite] = useState(false);

  const favMusic = () => {
    setFavorite(!favorite);
  };

  return (
    <div>
      <h3>{music.trackId}</h3>
      <p>{music.trackName}</p>
      <audio data-testid="audio-component" src={ music.previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
      <label data-testid={ `checkbox-music-${music.trackId}` }>
        <input
          type="checkbox"
          onClick={ favMusic }
          checked={ favorite }
        />
        <img
          src={ `/src/images/${favorite ? 'checked_' : 'empty_'}heart.png` }
          alt="favorite"
        />
      </label>
    </div>
  );
}

export default MusicCard;
