export const bibleData = {
  oldTestament: {
    name: "구약성경",
    description: "하나님의 구원 계획의 예비와 약속",
    totalBooks: 39,
    categories: {
      pentateuch: {
        name: "모세오경",
        description: "하나님의 창조와 선택된 백성의 출발",
        books: [
          { name: "창세기", chapters: 50, verses: 1533 },
          { name: "출애굽기", chapters: 40, verses: 1213 },
          { name: "레위기", chapters: 27, verses: 859 },
          { name: "민수기", chapters: 36, verses: 1288 },
          { name: "신명기", chapters: 34, verses: 959 }
        ]
      },
      historical: {
        name: "역사서",
        description: "이스라엘 민족의 약속의 땅 정착과 역사",
        books: [
          { name: "여호수아", chapters: 24, verses: 658 },
          { name: "사사기", chapters: 21, verses: 618 },
          { name: "룻기", chapters: 4, verses: 85 },
          { name: "사무엘상", chapters: 31, verses: 810 },
          { name: "사무엘하", chapters: 24, verses: 695 },
          { name: "열왕기상", chapters: 22, verses: 816 },
          { name: "열왕기하", chapters: 25, verses: 719 },
          { name: "역대상", chapters: 29, verses: 942 },
          { name: "역대하", chapters: 36, verses: 822 },
          { name: "에스라", chapters: 10, verses: 280 },
          { name: "느헤미야", chapters: 13, verses: 406 },
          { name: "에스더", chapters: 10, verses: 167 }
        ]
      },
      wisdom: {
        name: "시가서",
        description: "하나님을 향한 찬양과 지혜의 말씀",
        books: [
          { name: "욥기", chapters: 42, verses: 1070 },
          { name: "시편", chapters: 150, verses: 2461 },
          { name: "잠언", chapters: 31, verses: 915 },
          { name: "전도서", chapters: 12, verses: 222 },
          { name: "아가", chapters: 8, verses: 117 }
        ]
      },
      majorProphets: {
        name: "대선지서",
        description: "하나님의 크신 계획과 메시아 예언",
        books: [
          { name: "이사야", chapters: 66, verses: 1292 },
          { name: "예레미야", chapters: 52, verses: 1364 },
          { name: "예레미야애가", chapters: 5, verses: 154 },
          { name: "에스겔", chapters: 48, verses: 1273 },
          { name: "다니엘", chapters: 12, verses: 357 }
        ]
      },
      minorProphets: {
        name: "소선지서",
        description: "하나님의 사랑과 심판의 메시지",
        books: [
          { name: "호세아", chapters: 14, verses: 197 },
          { name: "요엘", chapters: 3, verses: 73 },
          { name: "아모스", chapters: 9, verses: 146 },
          { name: "오바댜", chapters: 1, verses: 21 },
          { name: "요나", chapters: 4, verses: 48 },
          { name: "미가", chapters: 7, verses: 105 },
          { name: "나훔", chapters: 3, verses: 47 },
          { name: "하박국", chapters: 3, verses: 56 },
          { name: "스바냐", chapters: 3, verses: 53 },
          { name: "학개", chapters: 2, verses: 38 },
          { name: "스가랴", chapters: 14, verses: 211 },
          { name: "말라기", chapters: 4, verses: 55 }
        ]
      }
    }
  },
  newTestament: {
    name: "신약성경",
    description: "예수 그리스도를 통한 하나님의 구원 성취",
    totalBooks: 27,
    categories: {
      gospels: {
        name: "복음서",
        description: "예수 그리스도의 생애와 가르침",
        books: [
          { name: "마태복음", chapters: 28, verses: 1071 },
          { name: "마가복음", chapters: 16, verses: 678 },
          { name: "누가복음", chapters: 24, verses: 1151 },
          { name: "요한복음", chapters: 21, verses: 879 }
        ]
      },
      acts: {
        name: "역사서",
        description: "초대 교회의 시작과 복음 전파",
        books: [
          { name: "사도행전", chapters: 28, verses: 1007 }
        ]
      },
      paulineEpistles: {
        name: "바울서신",
        description: "사도 바울의 교회와 개인에게 보낸 편지",
        books: [
          { name: "로마서", chapters: 16, verses: 433 },
          { name: "고린도전서", chapters: 16, verses: 437 },
          { name: "고린도후서", chapters: 13, verses: 257 },
          { name: "갈라디아서", chapters: 6, verses: 149 },
          { name: "에베소서", chapters: 6, verses: 155 },
          { name: "빌립보서", chapters: 4, verses: 104 },
          { name: "골로새서", chapters: 4, verses: 95 },
          { name: "데살로니가전서", chapters: 5, verses: 89 },
          { name: "데살로니가후서", chapters: 3, verses: 47 },
          { name: "디모데전서", chapters: 6, verses: 113 },
          { name: "디모데후서", chapters: 4, verses: 83 },
          { name: "디도서", chapters: 3, verses: 46 },
          { name: "빌레몬서", chapters: 1, verses: 25 }
        ]
      },
      generalEpistles: {
        name: "일반서신",
        description: "다른 사도들이 보낸 편지들",
        books: [
          { name: "히브리서", chapters: 13, verses: 303 },
          { name: "야고보서", chapters: 5, verses: 108 },
          { name: "베드로전서", chapters: 5, verses: 105 },
          { name: "베드로후서", chapters: 3, verses: 61 },
          { name: "요한일서", chapters: 5, verses: 105 },
          { name: "요한이서", chapters: 1, verses: 13 },
          { name: "요한삼서", chapters: 1, verses: 14 },
          { name: "유다서", chapters: 1, verses: 25 }
        ]
      },
      revelation: {
        name: "예언서",
        description: "마지막 때와 하나님 나라의 완성",
        books: [
          { name: "요한계시록", chapters: 22, verses: 404 }
        ]
      }
    }
  }
}

export const getTotalVerses = (testament) => {
  let total = 0
  Object.values(testament.categories).forEach(category => {
    category.books.forEach(book => {
      total += book.verses
    })
  })
  return total
}

export const getTotalChapters = (testament) => {
  let total = 0
  Object.values(testament.categories).forEach(category => {
    category.books.forEach(book => {
      total += book.chapters
    })
  })
  return total
}

export const getCategoryStats = (category) => {
  const totalBooks = category.books.length
  const totalChapters = category.books.reduce((sum, book) => sum + book.chapters, 0)
  const totalVerses = category.books.reduce((sum, book) => sum + book.verses, 0)
  return { totalBooks, totalChapters, totalVerses }
}