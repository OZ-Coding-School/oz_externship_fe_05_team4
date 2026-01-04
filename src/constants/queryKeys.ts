export const queryKeys = {
  // 질문 관련 모든 것
  all: ['questions'] as const,

  // 질문 목록
  list: () => [...queryKeys.all, 'list'] as const,

  // 질문 상세
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (questionId: number) => [...queryKeys.details(), questionId] as const,

  // 답변
  // answers: (questionId: number) =>
  //   [...queryKeys.detail(questionId), 'answers'] as const,
  // answer: (questionId: number, answerId: number) =>
  //   [...queryKeys.answers(questionId), answerId] as const,

  // 댓글
  // comments: (questionId: number, answerId: number) =>
  //   [...queryKeys.answers(questionId), answerId, 'comments'] as const,
  // comment: (questionId: number, answerId: number, commentId: number) =>
  //   [...queryKeys.comments(questionId, answerId), commentId] as const,

  // TODO: 아직 API 없음. 구현할건지, 하게되면 이 데이터가 질문 상세에도 오는지, 따로 페칭해야하는지 확인하기
  // AI 답변 (질문당 1개)
  aiAnswer: (questionId: number) =>
    [...queryKeys.detail(questionId), 'ai-answer'] as const,

  // AI 챗봇 세션 목록
  aiChatsList: (questionId: number) =>
    [...queryKeys.detail(questionId), 'ai-chats'] as const,

  // AI 챗봇 세션의 메시지 상세
  aiChatMessage: (questionId: number, sessionId: number) =>
    [...queryKeys.aiChatsList(questionId), sessionId] as const,
}

// 현재 질문당 1개의 세션만 생성 가능하지만, 여전히 세션 id는 필요하므로 이 구조를 그대로 따릅니다!

// 현재 답변과 댓글의 목록이나 상세조회를 하지 않으므로, 일단 주석처리
// 나중에 사용하게 될 경우에 주석 해제하여 사용

// (참고) 쿼리 키 구조 시각화
// ['questions']
//   └── 'detail'
//        └── {questionId}  (질문 상세)
//             │
//             ├── 'answers' (답변 목록)
//             │    └── {answerId} (특정 답변)
//             │         └── 'comments' (그 답변의 댓글들)
//             │
//             ├── 'ai-answer' (단일 AI 답변)
//             │
//             └── 'ai-chats' (채팅 세션 목록)
//                  └── {sessionId} (특정 세션)
//                       └── 'messages' (그 세션의 대화 내용)
