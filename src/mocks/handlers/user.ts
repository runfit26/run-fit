import { http, HttpResponse } from 'msw';
import { UpdateMyProfileRequestBody } from '@/api/fetch/user';
import { AuthMode, requireAuth } from '../core/auth';
import { type PathFn } from '../core/path';
import { faker, users } from '../data';
import { parseIdParam, successResponse } from '../utils';

// SliceData 구조 생성
const createSliceData = <T>(items: T[], page: number, size: number) => {
  const start = page * size;
  const end = start + size;

  return {
    content: items.slice(start, end),
    page,
    size,
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    hasNext: end < items.length,
    hasPrevious: page > 0,
  };
};

// 실제 Session 타입에 맞춘 mock 생성
const generateMockSession = (id: number) => {
  const sido = faker.helpers.arrayElement([
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '세종',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
  ]);

  const districtsByCity = {
    서울: ['강남구', '서초구', '관악구', '마포구', '송파구'],
    부산: ['해운대구', '수영구', '부산진구'],
    대구: ['중구', '달서구'],
    인천: ['남동구', '부평구'],
    광주: ['북구', '광산구'],
    대전: ['유성구', '서구'],
    울산: ['남구', '동구'],
    세종: ['세종시'],
    경기: ['성남시', '수원시'],
    강원: ['춘천시', '원주시'],
    충북: ['청주시'],
    충남: ['천안시'],
    전북: ['전주시'],
    전남: ['목포시'],
    경북: ['포항시'],
    경남: ['창원시'],
    제주: ['제주시'],
  };

  const districtList = districtsByCity[
    sido as keyof typeof districtsByCity
  ] ?? ['기타'];
  const district =
    districtList[faker.number.int({ min: 0, max: districtList.length - 1 })];

  return {
    id,
    crewId: faker.number.int({ min: 1, max: 50 }),
    hostUserId: faker.number.int({ min: 1, max: 100 }),

    name: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    image: faker.image.urlPicsumPhotos(),

    city: sido,
    district,
    location: faker.location.streetAddress(),

    coords: {
      lat: Number(faker.location.latitude()),
      lng: Number(faker.location.longitude()),
    },

    sessionAt: faker.date.future().toISOString(),
    registerBy: faker.date.soon().toISOString(),

    level: faker.helpers.arrayElement(['초급', '중급', '고급']),
    status: faker.helpers.arrayElement(['OPEN', 'CLOSED', 'COMPLETED']),
    pace: faker.number.int({ min: 300, max: 600 }),

    maxParticipantCount: faker.number.int({ min: 10, max: 30 }),
    currentParticipantCount: faker.number.int({ min: 1, max: 30 }),

    createdAt: faker.date.past().toISOString(),

    liked: faker.datatype.boolean(),

    participants: Array.from({
      length: faker.number.int({ min: 5, max: 20 }),
    }).map((_, idx) => ({
      id: idx + 1,
      userId: faker.number.int({ min: 1, max: 100 }),
      name: faker.person.fullName(),
      profileImage: faker.image.avatar(),
      joinedAt: faker.date.past().toISOString(),
    })),
  };
};

// 크루 mock
const generateMockCrew = (id: number) => ({
  id,
  name: faker.company.name(),
  region: faker.helpers.arrayElement(['서울', '부산', '대구']),
  memberCount: faker.number.int({ min: 10, max: 200 }),
  image: faker.image.avatar(),
});

export function createUserHandlers(p: PathFn, authMode: AuthMode) {
  const myCrews = Array.from({ length: 10 * 4 }).map((_, i) =>
    generateMockCrew(i + 1)
  );
  const likedSessions = Array.from({ length: 18 * 4 }).map((_, i) =>
    generateMockSession(i + 1)
  );
  const myCreatedSessions = Array.from({ length: 18 * 4 }).map((_, i) =>
    generateMockSession(i + 1)
  );
  const myParticipatingSessions = Array.from({ length: 18 * 4 }).map((_, i) =>
    generateMockSession(i + 1)
  );

  return [
    // 내 정보 조회
    http.get(
      p('/api/user'),
      requireAuth(authMode, () => {
        const user = users[1];

        return HttpResponse.json(successResponse(user), { status: 200 });
      })
    ),

    // 내 정보 수정
    http.patch(
      p('/api/user'),
      requireAuth(authMode, async ({ request }) => {
        const { name, image, introduction, city, pace, styles } =
          (await request.json()) as UpdateMyProfileRequestBody;
        const user = users[1];

        const data = {
          id: 1,
          email: user.email,
          name: name || user.name,
          image: image || user.image,
          introduction: introduction || user.introduction,
          city: city || user.city,
          pace: pace || user.pace,
          styles: styles || user.styles || [],
          createdAt: '2025-12-17T02:07:53.249Z',
          updatedAt: '2025-12-17T02:07:53.249Z',
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 특정 유저 정보 조회
    http.get(
      p('/api/users/:id'),
      requireAuth(authMode, ({ params }) => {
        const userId = parseIdParam(params.id);

        const data = {
          id: userId,
          name: faker.person.fullName(),
          image: faker.image.avatar(),
          introduction: faker.lorem.sentence(),
          city: '서울',
          pace: 400,
          styles: ['조깅', '러닝크루'],
          createdAt: new Date().toISOString(),
        };

        return HttpResponse.json(successResponse(data), { status: 200 });
      })
    ),

    // 내가 속한 크루
    http.get(
      p('/api/user/me/crews'),
      requireAuth(authMode, async ({ request }) => {
        const url = new URL(request.url);
        return HttpResponse.json(
          successResponse(
            createSliceData(
              myCrews,
              Number(url.searchParams.get('page') ?? 0),
              Number(url.searchParams.get('size') ?? 10)
            )
          )
        );
      })
    ),

    // 내가 찜한 세션
    http.get(
      p('/api/user/me/likes'),
      requireAuth(authMode, async ({ request }) => {
        const url = new URL(request.url);
        return HttpResponse.json(
          successResponse(
            createSliceData(
              likedSessions,
              Number(url.searchParams.get('page') ?? 0),
              Number(url.searchParams.get('size') ?? 10)
            )
          )
        );
      })
    ),

    // 내가 만든 세션
    http.get(
      p('/api/user/me/sessions'),
      requireAuth(authMode, async ({ request }) => {
        const url = new URL(request.url);
        return HttpResponse.json(
          successResponse(
            createSliceData(
              myCreatedSessions,
              Number(url.searchParams.get('page') ?? 0),
              Number(url.searchParams.get('size') ?? 10)
            )
          )
        );
      })
    ),

    // 내 참여 세션
    http.get(
      p('/api/user/me/sessions/participating'),
      requireAuth(authMode, async ({ request }) => {
        const url = new URL(request.url);
        return HttpResponse.json(
          successResponse(
            createSliceData(
              myParticipatingSessions,
              Number(url.searchParams.get('page') ?? 0),
              Number(url.searchParams.get('size') ?? 10)
            )
          )
        );
      })
    ),
  ];
}
