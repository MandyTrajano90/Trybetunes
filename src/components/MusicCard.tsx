import { SongType } from '../types';

type MusicCardProps = {
  music: SongType;
};

function MusicCard({ music }: MusicCardProps) {
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
    </div>
  );
}

export default MusicCard;