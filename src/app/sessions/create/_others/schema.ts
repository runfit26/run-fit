import { z } from 'zod';
import { SIDO_LIST, SIGUNGU_MAP } from '@/types/region';
import { Level } from '@/types/session';

export const citySchema = z.enum(SIDO_LIST);
export type City = z.infer<typeof citySchema>; // == Sido

const ALL_SIGUNGU = Array.from(new Set(Object.values(SIGUNGU_MAP).flat())) as [
  string,
  ...string[],
];

export const districtSchema = z.enum(ALL_SIGUNGU);
export type District = z.infer<typeof districtSchema>;

export const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;

export type Level = (typeof LEVELS)[number];

export const levelSchema = z.enum(LEVELS);

export const formSchema = z.object({
  crewId: z.number().int(),
  name: z
    .string()
    .min(1, '세션 이름을 입력해주세요')
    .max(50, '세션 이름은 최대 50자입니다'),
  description: z
    .string()
    .min(1, '세션 설명을 입력해주세요')
    .max(500, '세션 설명은 최대 500자입니다'),
  image: z.url('유효한 이미지 URL을 입력해주세요'),
  city: citySchema,
  district: districtSchema,
  location: z.string().min(1, '주소를 입력해주세요'),
  coords: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  sessionAt: z.iso.datetime({ offset: true }),
  registerBy: z.iso.datetime({ offset: true }),
  level: levelSchema,
  maxParticipants: z
    .number()
    .int()
    .min(1, '최소 1명 이상의 참가자가 필요합니다'),
  pace: z.number().int().min(1, '유효한 페이스를 입력해주세요'),
});

export type SessionCreateFormValues = z.infer<typeof formSchema>;
