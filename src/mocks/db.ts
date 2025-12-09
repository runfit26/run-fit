import { Collection } from '@msw/data';
import z from 'zod';

// ===== Schemas =====

const userSchema = z.object({
  userId: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  image: z.string().nullable(),
  introduction: z.string().nullable(),
  city: z.string().nullable(),
  pace: z.number().nullable(),
  styles: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  get memberships() {
    return z.array(membershipSchema);
  },
  get hostedSessions() {
    return z.array(sessionSchema);
  },
  get participatedSessions() {
    return z.array(sessionParticipantSchema);
  },
  get likedSessions() {
    return z.array(sessionLikeSchema);
  },
  get reviews() {
    return z.array(reviewSchema);
  },
});

const crewSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  city: z.string(),
  image: z.string(),
  memberCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  get memberships() {
    return z.array(membershipSchema);
  },
  get sessions() {
    return z.array(sessionSchema);
  },
});

const membershipSchema = z.object({
  id: z.number(),
  userId: z.number(),
  crewId: z.number(),
  role: z.enum(['LEADER', 'STAFF', 'MEMBER']),
  joinedAt: z.string(),
  get user() {
    return userSchema;
  },
  get crew() {
    return crewSchema;
  },
});

const sessionSchema = z.object({
  id: z.number(),
  crewId: z.number(),
  hostUserId: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  location: z.string().nullable(),
  sessionAt: z.string(),
  registerBy: z.string(),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  status: z.enum(['OPEN', 'CLOSED']),
  pace: z.number().nullable(),
  maxParticipantCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
  get crew() {
    return crewSchema;
  },
  get hostUser() {
    return userSchema;
  },
  get participants() {
    return z.array(sessionParticipantSchema);
  },
  get likes() {
    return z.array(sessionLikeSchema);
  },
  get reviews() {
    return z.array(reviewSchema);
  },
});

const sessionParticipantSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  joinedAt: z.string(),
  get user() {
    return userSchema;
  },
  get session() {
    return sessionSchema;
  },
});

const sessionLikeSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  likedAt: z.string(),
  get user() {
    return userSchema;
  },
  get session() {
    return sessionSchema;
  },
});

const reviewSchema = z.object({
  id: z.number(),
  sessionId: z.number(),
  userId: z.number(),
  description: z.string(),
  ranks: z.number(),
  image: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  get user() {
    return userSchema;
  },
  get session() {
    return sessionSchema;
  },
});

// ===== Collections =====

export const users = new Collection({ schema: userSchema });
export const crews = new Collection({ schema: crewSchema });
export const memberships = new Collection({ schema: membershipSchema });
export const sessions = new Collection({ schema: sessionSchema });
export const sessionParticipants = new Collection({
  schema: sessionParticipantSchema,
});
export const sessionLikes = new Collection({ schema: sessionLikeSchema });
export const reviews = new Collection({ schema: reviewSchema });

// ===== Relations =====

// User Relations
users.defineRelations(({ many }) => ({
  memberships: many(memberships),
  hostedSessions: many(sessions, { role: 'host' }),
  participatedSessions: many(sessionParticipants),
  likedSessions: many(sessionLikes),
  reviews: many(reviews),
}));

// Crew Relations
crews.defineRelations(({ many }) => ({
  memberships: many(memberships),
  sessions: many(sessions),
}));

// Membership Relations (User ↔ Crew)
memberships.defineRelations(({ one }) => ({
  user: one(users),
  crew: one(crews),
}));

// Session Relations
sessions.defineRelations(({ one, many }) => ({
  crew: one(crews),
  hostUser: one(users, { role: 'host' }),
  participants: many(sessionParticipants),
  likes: many(sessionLikes),
  reviews: many(reviews),
}));

// SessionParticipant Relations
sessionParticipants.defineRelations(({ one }) => ({
  user: one(users),
  session: one(sessions),
}));

// SessionLike Relations
sessionLikes.defineRelations(({ one }) => ({
  user: one(users),
  session: one(sessions),
}));

// Review Relations
reviews.defineRelations(({ one }) => ({
  user: one(users),
  session: one(sessions),
}));

// ===== 초기 더미 데이터 =====

// 더미 유저들
const user1 = await users.create({
  userId: 1,
  name: '김러너',
  email: 'runner1@example.com',
  password: 'hashed_password',
  image: 'https://example.com/user1.jpg',
  introduction: '매일 아침 러닝하는 것을 좋아합니다!',
  city: '서울특별시',
  pace: 360,
  styles: ['아침 러닝', '장거리'],
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  memberships: [],
  hostedSessions: [],
  participatedSessions: [],
  likedSessions: [],
  reviews: [],
});

const user2 = await users.create({
  userId: 2,
  name: '이달리기',
  email: 'runner2@example.com',
  password: 'hashed_password',
  image: 'https://example.com/user2.jpg',
  introduction: '주말 러닝 모임을 즐깁니다.',
  city: '서울특별시',
  pace: 420,
  styles: ['주말 러닝', '단거리'],
  createdAt: new Date('2024-02-01').toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  memberships: [],
  hostedSessions: [],
  participatedSessions: [],
  likedSessions: [],
  reviews: [],
});

const user3 = await users.create({
  userId: 3,
  name: '박조깅',
  email: 'runner3@example.com',
  password: 'hashed_password',
  image: 'https://example.com/user3.jpg',
  introduction: '천천히 즐기는 러닝!',
  city: '부산광역시',
  pace: 480,
  styles: ['야간 러닝', '중거리'],
  createdAt: new Date('2024-03-01').toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  memberships: [],
  hostedSessions: [],
  participatedSessions: [],
  likedSessions: [],
  reviews: [],
});

// 더미 크루들
const crew1 = await crews.create({
  id: 1,
  name: '서울 모닝 러너스',
  description: '매일 아침 한강에서 함께 달리는 크루입니다.',
  city: '서울특별시',
  image: 'https://example.com/crew1.jpg',
  memberCount: 25,
  createdAt: new Date('2024-01-01').toISOString(),
  updatedAt: new Date().toISOString(),
  memberships: [],
  sessions: [],
});

const crew2 = await crews.create({
  id: 2,
  name: '부산 해운대 러닝클럽',
  description: '해운대 해변을 달리는 즐거움!',
  city: '부산광역시',
  image: 'https://example.com/crew2.jpg',
  memberCount: 18,
  createdAt: new Date('2024-02-01').toISOString(),
  updatedAt: new Date().toISOString(),
  memberships: [],
  sessions: [],
});

// 더미 멤버십들
const membership1 = await memberships.create({
  id: 1,
  userId: user1.userId,
  crewId: crew1.id,
  role: 'LEADER',
  joinedAt: new Date('2024-01-01').toISOString(),
  user: user1,
  crew: crew1,
});

const membership2 = await memberships.create({
  id: 2,
  userId: user2.userId,
  crewId: crew1.id,
  role: 'MEMBER',
  joinedAt: new Date('2024-02-01').toISOString(),
  user: user2,
  crew: crew1,
});

const membership3 = await memberships.create({
  id: 3,
  userId: user3.userId,
  crewId: crew2.id,
  role: 'LEADER',
  joinedAt: new Date('2024-02-01').toISOString(),
  user: user3,
  crew: crew2,
});

// 더미 세션들
const session1 = await sessions.create({
  id: 1,
  crewId: crew1.id,
  hostUserId: user1.userId,
  name: '주말 한강 10km 러닝',
  description: '주말 아침 한강에서 10km 함께 달려요!',
  image: 'https://example.com/session1.jpg',
  location: '한강공원 뚝섬지구',
  sessionAt: new Date('2024-12-15T07:00:00').toISOString(),
  registerBy: new Date('2024-12-14T23:59:59').toISOString(),
  level: 'INTERMEDIATE',
  status: 'OPEN',
  pace: 360,
  maxParticipantCount: 20,
  createdAt: new Date('2024-12-01').toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  crew: crew1,
  hostUser: user1,
  participants: [],
  likes: [],
  reviews: [],
});

const session2 = await sessions.create({
  id: 2,
  crewId: crew1.id,
  hostUserId: user2.userId,
  name: '평일 저녁 5km 가볍게',
  description: '퇴근 후 가볍게 5km 조깅해요',
  image: 'https://example.com/session2.jpg',
  location: '올림픽공원',
  sessionAt: new Date('2024-12-12T19:00:00').toISOString(),
  registerBy: new Date('2024-12-11T23:59:59').toISOString(),
  level: 'BEGINNER',
  status: 'OPEN',
  pace: 420,
  maxParticipantCount: 15,
  createdAt: new Date('2024-12-05').toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  crew: crew1,
  hostUser: user2,
  participants: [],
  likes: [],
  reviews: [],
});

// 더미 세션 참가자들
const sessionParticipant1 = await sessionParticipants.create({
  id: 1,
  sessionId: session1.id,
  userId: user1.userId,
  joinedAt: new Date('2024-12-01').toISOString(),
  user: user1,
  session: session1,
});

const sessionParticipant2 = await sessionParticipants.create({
  id: 2,
  sessionId: session1.id,
  userId: user2.userId,
  joinedAt: new Date('2024-12-02').toISOString(),
  user: user2,
  session: session1,
});

// 더미 세션 좋아요들
await sessionLikes.create({
  id: 1,
  sessionId: session1.id,
  userId: user1.userId,
  likedAt: new Date('2024-12-01').toISOString(),
  user: user1,
  session: session1,
});

await sessionLikes.create({
  id: 2,
  sessionId: session1.id,
  userId: user2.userId,
  likedAt: new Date('2024-12-02').toISOString(),
  user: user2,
  session: session1,
});

// 더미 리뷰들
await reviews.create({
  id: 1,
  sessionId: session1.id,
  userId: user1.userId,
  description: '정말 즐거운 러닝이었습니다! 다음에도 참여하고 싶어요.',
  ranks: 5,
  image: 'https://example.com/review1.jpg',
  createdAt: new Date('2024-12-01').toISOString(),
  updatedAt: new Date().toISOString(),
  user: user1,
  session: session1,
});

await reviews.create({
  id: 2,
  sessionId: session1.id,
  userId: user2.userId,
  description: '날씨도 좋고 코스도 좋았어요. 추천합니다!',
  ranks: 4,
  image: null,
  createdAt: new Date('2024-12-02').toISOString(),
  updatedAt: new Date().toISOString(),
  user: user2,
  session: session1,
});
