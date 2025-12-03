export function formatSecondsToMinutes(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const formattedSeconds = String(seconds).padStart(2, '0');
  return seconds === 0 ? `${minutes}분` : `${minutes}분 ${formattedSeconds}초`;
}
