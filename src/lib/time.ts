import { format } from 'date-fns';

/**
 * 분 단위를 한국어 시간 형식으로 변환합니다.
 * @param {number} totalMinutes 총 분 (0-1439)
 * @returns {string} "오전/오후 HH:mm" 형식의 시간 문자열
 */
export function formatMinutesToKoreanTime(totalMinutes: number): string {
  totalMinutes = totalMinutes % (24 * 60);

  const hour24 = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return formatTimeToKorean(hour24, minute);
}

/**
 * 24시간 형식의 시각을 한국어 시간 형식으로 변환합니다.
 * @param {number} hour 0-23
 * @param {number} minute 0-59
 * @returns {string} "오전/오후 HH:mm" 형식의 시간 문자열
 */
export function formatTimeToKorean(hour: number, minute: number): string {
  const isAM = hour < 12;
  const ampm = isAM ? '오전' : '오후';

  const hour12 = isAM || hour === 12 ? hour : hour - 12;

  const paddedHour = hour12.toString().padStart(2, '0');
  const paddedMinute = minute.toString().padStart(2, '0');

  return `${ampm} ${paddedHour}:${paddedMinute}`;
}

/**
 * 분 단위를 "HH:mm" 형식의 문자열로 변환합니다.
 * 서버 API와의 통신에 사용됩니다.
 * @param minutes
 * @returns {string} "HH:mm" 형식의 시간 문자열
 */
export function formatMinutesToHHmm(minutes: number) {
  const date = new Date(0, 0, 0, 0, minutes);
  return format(date, 'HH:mm');
}
