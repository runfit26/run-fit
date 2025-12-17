import { http, HttpResponse } from 'msw';
import { CreateSessionRequestBody } from '@/api/fetch/sessions';
import { AuthMode, requireAuth } from '../core/auth';
import { type PathFn } from '../core/path';
import {
  memberships,
  sessionLikes,
  sessionParticipants,
  sessions,
  users,
} from '../data';
import { errorResponse, successResponse } from '../utils';

export function createSessionHandlers(p: PathFn, authMode: AuthMode) {
  return [
    // 세션 생성
    http.post(
      p('/api/sessions'),
      requireAuth(authMode, async ({ request }) => {
        const {
          crewId,
          name,
          description,
          image,
          city,
          location,
          district,
          coords,
          sessionAt,
          registerBy,
          level,
          pace,
          maxParticipantCount,
        } = (await request.json()) as CreateSessionRequestBody;

        const resBody = {
          crewId: crewId,
          name: name,
          description: description,
          image: image || null,
          city: city,
          district: district,
          location: location,
          coords: coords,
          sessionAt: sessionAt,
          registerBy: registerBy,
          level: level,
          maxParticipantCount: maxParticipantCount,
          pace: pace,
        };

        return HttpResponse.json(successResponse(resBody), { status: 201 });
      })
    ),

    // 세션 목록 조회  @TODO
    http.get('/api/sessions', ({ request }) => {
      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get('page') || '0', 10);
      const size = parseInt(url.searchParams.get('size') || '20', 10);
      const city = url.searchParams.get('city'); // 복수 선택 가능
      const district = url.searchParams.get('district'); // 복수 선택 가능
      const crewId = parseInt(url.searchParams.get('crewId') || '', 10);
      const level = url.searchParams.get('level'); // BEGINNER, INTERMEDIATE, ADVANCED
      const dateFrom = url.searchParams.get('dateFrom'); // 2025-12-01
      const dateTo = url.searchParams.get('dateTo'); // 2025-12-08
      const timeFrom = url.searchParams.get('timeFrom'); // 12:00
      const timeTo = url.searchParams.get('timeTo'); // 14:30
      const sort = url.searchParams.get('sort') || 'createdAtDesc'; // createdAtDesc, sessionAtAsc, registerByAsc

      let filteredSessions = sessions;

      if (city) {
        filteredSessions = filteredSessions.filter((s) => s.city === city);
      }

      if (district) {
        filteredSessions = filteredSessions.filter(
          (s) => s.district === district
        );
      }

      if (crewId) {
        filteredSessions = filteredSessions.filter((s) => s.crewId === crewId);
      }

      if (level) {
        filteredSessions = filteredSessions.filter((s) => s.level === level);
      }

      if (dateFrom) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionDate = s.sessionAt.split('T')[0];
          return sessionDate >= dateFrom;
        });
      }

      if (dateTo) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionDate = s.sessionAt.split('T')[0];
          return sessionDate <= dateTo;
        });
      }

      if (timeFrom) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionTime = s.sessionAt.split('T')[1].slice(0, 5); // "HH:MM"
          return sessionTime >= timeFrom;
        });
      }

      if (timeTo) {
        filteredSessions = filteredSessions.filter((s) => {
          const sessionTime = s.sessionAt.split('T')[1].slice(0, 5); // "HH:MM"
          return sessionTime <= timeTo;
        });
      }

      // 정렬
      if (sort === 'createdAtDesc') {
        filteredSessions.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sort === 'sessionAtAsc') {
        filteredSessions.sort(
          (a, b) =>
            new Date(a.sessionAt).getTime() - new Date(b.sessionAt).getTime()
        );
      } else if (sort === 'registerByAsc') {
        // 마감 임박순 (registerBy 오름차순)
        filteredSessions.sort(
          (a, b) =>
            new Date(a.registerBy).getTime() - new Date(b.registerBy).getTime()
        );
      }

      // 무한스크롤
      const startIndex = page * size;
      const endIndex = startIndex + size;
      const paginatedSessions = filteredSessions.slice(startIndex, endIndex);
      const hasNext = endIndex < filteredSessions.length;

      const data = paginatedSessions.map((session) => ({
        id: session.id,
        crewId: session.crewId,
        hostUserId: session.hostUserId,
        name: session.name,
        description: session.description,
        image: session.image,
        location: session.location,
        sessionAt: session.sessionAt,
        registerBy: session.registerBy,
        level: session.level,
        status: session.status,
        pace: session.pace,
        maxParticipantCount: session.maxParticipantCount,
        currentParticipantCount: 0,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      }));

      return HttpResponse.json(
        successResponse({
          data: data,
          hasNext: hasNext,
        }),
        { status: 200 }
      );
    }),

    // 세션 상세 조회 @TODO
    http.get(p('/api/sessions/:id'), ({ params }) => {
      const sessionId = Number(params.id);

      return HttpResponse.json(successResponse(1), { status: 200 });
    }),

    // 세션 참가 신청  @TODO
    http.post(p('/api/sessions/:id/join'), async ({ request, params }) => {
      return HttpResponse.json(successResponse(1), { status: 200 });
    }),

    // 세션 참가 취소  @TODO
    http.delete(p('/api/sessions/:id/leave'), ({ request, params }) => {
      return HttpResponse.json(successResponse(1), { status: 200 });
    }),

    // 세션 찜(좋아요) 추가  @TODO
    http.post(p('/api/sessions/:id/like'), async ({ request, params }) => {
      return HttpResponse.json(successResponse(1), { status: 200 });
    }),

    // 세션 찜(좋아요) 취소  @TODO
    http.delete(p('/api/sessions/:id/like'), ({ request, params }) => {
      return HttpResponse.json(successResponse(1), { status: 200 });
    }),

    // 세션 참가자 목록 조회  @TODO
    http.get(p('/api/sessions/:id/participants'), ({ params }) => {
      return HttpResponse.json(successResponse(1), { status: 200 });
    }),

    // 세션 정보 수정 @TODO
    http.put(p('/api/sessions/:id'), async ({ request, params }) => {
      return HttpResponse.json(successResponse(1), { status: 200 });
    }),
  ];
}
