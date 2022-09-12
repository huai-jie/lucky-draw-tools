export const play = async(e: string): Promise<boolean> => {
  const audio = document.getElementById(e) as HTMLAudioElement;
  if (audio && audio.paused) {
    audio.play();
  }
  return true;
};
export const pause = async(e: string): Promise<boolean> => {
  const audio = document.getElementById(e) as HTMLAudioElement;
  audio.pause();
  audio.currentTime = 0;
  return true;
};
