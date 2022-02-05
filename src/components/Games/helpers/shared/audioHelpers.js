export default function playSound(
  file,
  type = 'sfx',
  { sfxPlayer, musicPlayer },
) {
  const player =
    type === 'sfx'
      ? sfxPlayer.current.audioEl.current
      : musicPlayer.current.audioEl.current;
  player.src = file;
  player.play().catch((err) => {
    console.log(err);
  });
}

export function stopAllSounds({ sfxPlayer, musicPlayer }) {
  if (sfxPlayer.current) {
    sfxPlayer.current.audioEl.current.pause();
    sfxPlayer.current.audioEl.current.load();
  }
  if (musicPlayer.current) {
    musicPlayer.current.audioEl.current.pause();
    musicPlayer.current.audioEl.current.load();
  }
}
