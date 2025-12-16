export const CATEGORY = {
  frontend: {
    label: '프론트엔드',
    mid: {
      language: {
        label: '프로그래밍 언어',
        sub: [
          { value: 'javascript', label: 'JavaScript' },
          { value: 'python', label: 'Python' },
        ],
      },
      framework: {
        label: '웹프레임워크',
        sub: [{ value: 'react', label: 'React / Next.js' }],
      },
      library: {
        label: '라이브러리',
        sub: [{ value: 'nginx', label: 'Nginx' }],
      },
    },
  },

  backend: {
    label: '백엔드',
    mid: {
      language: {
        label: '프로그래밍 언어',
        sub: [{ value: 'python', label: 'Python' }],
      },
      framework: {
        label: '웹프레임워크',
        sub: [
          { value: 'django', label: 'Django' },
          { value: 'fastapi', label: 'FastAPI' },
        ],
      },
      library: {
        label: '라이브러리',
        sub: [{ value: 'nginx', label: 'Nginx' }],
      },
    },
  },
}
