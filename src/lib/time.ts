import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function utcMidnightTime(d: Date) {
  return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
}

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

/**
 * target: 목표 일시(ISO string 또는 Date)
 * base: 기준 일시(기본값: 현재)
 *
 * diff > 0 : D-남은일
 * diff = 0 : D-Day
 * diff < 0 : D+지난일
 */
export function formatDDay(target: string, base: Date = new Date()) {
  const t = new Date(target);
  if (Number.isNaN(t.getTime())) throw new Error(`Invalid date: ${target}`);

  const diffDays = Math.floor(
    (utcMidnightTime(t) - utcMidnightTime(base)) / MS_PER_DAY
  );

  if (diffDays === 0) return 'D-Day';
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
}

/** "2025-12-17T09:39:44.324" -> "12월 17일 • 오전 9:39" */
export function formatKoMonthDayTime(input: string | Date) {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid date: ${input}`);

  const monthDay = format(d, 'M월 d일', { locale: ko });
  const ampm = format(d, 'a', { locale: ko });
  const time = format(d, 'h:mm');

  return `${monthDay} • ${ampm} ${time}`;
}

/**
 * "2025-12-17T09:39:44.324" -> "2025년 12월 17일"
 */
export function formatKoYearMonthDay(input: string | Date) {
  const d = typeof input === 'string' ? parseISO(input) : input;
  if (Number.isNaN(d.getTime())) throw new Error(`Invalid date: ${input}`);

  return format(d, 'yyyy년 M월 d일', { locale: ko });
}
