// 다국어 지원 시스템
import { useState } from 'react'

export const languages = {
  ko: {
    name: '한국어',
    flag: '🇰🇷'
  },
  en: {
    name: 'English',
    flag: '🇺🇸'
  }
}

export const translations = {
  ko: {
    // 헤더 및 네비게이션
    title: 'BIBLE SCHOOL',
    nav: {
      home: '홈',
      word: '말씀',
      doctrine: '교리',
      sop: '예언의 신',
      sanctuary: '성소',
      meditation: '묵상',
      resources: '자료실'
    },
    
    // 메인 페이지
    home: {
      timeline: {
        title: '성경 시간선 탐험',
        subtitle: '성경의 주요 인물들을 시간순으로 만나보세요'
      },
      characters: {
        adam: '아담',
        noah: '노아',
        abraham: '아브라함',
        joseph: '요셉',
        moses: '모세',
        david: '다윗',
        daniel: '다니엘'
      },
      charactersDetails: {
        adam: {
          name: '아담',
          period: '약 4000년 전',
          description: '인류의 시조. 에덴동산에서 창조됨.',
          verse: '창세기 2:7-8',
          difficulty: '하'
        },
        noah: {
          name: '노아',
          period: '약 3000년 전',
          description: '방주를 만들어 대홍수에서 구원받음.',
          verse: '창세기 6-9장',
          difficulty: '하'
        },
        abraham: {
          name: '아브라함',
          period: '약 2000년 전',
          description: '믿음의 조상. 하나님의 부르심을 받음.',
          verse: '창세기 12장',
          difficulty: '중'
        },
        joseph: {
          name: '요셉',
          period: '약 1800년 전',
          description: '꿈을 해석하고 이집트의 총리가 됨.',
          verse: '창세기 37-50장',
          difficulty: '중'
        },
        moses: {
          name: '모세',
          period: '약 1500년 전',
          description: '이스라엘 백성을 이집트에서 인도함.',
          verse: '출애굽기',
          difficulty: '중'
        },
        david: {
          name: '다윗',
          period: '약 1000년 전',
          description: '골리앗을 물리치고 이스라엘의 왕이 됨.',
          verse: '사무엘상 17장',
          difficulty: '중'
        },
        daniel: {
          name: '다니엘',
          period: '약 500년 전',
          description: '바벨론에서 하나님께 충성함.',
          verse: '다니엘서',
          difficulty: '상'
        }
      },
      videos: {
        title: '최신 영상'
      },
      slides: {
        title: '최신 슬라이드'
      },
      commandments: {
        title: '하나님의 십계명',
        subtitle: '시내산에서 모세에게 주신 하나님의 말씀',
        firstTablet: '첫 번째 돌비',
        firstTabletSubtitle: '하나님과의 관계 (1-4계명)',
        secondTablet: '두 번째 돌비',
        secondTabletSubtitle: '이웃과의 관계 (5-10계명)',
        commandment1: {
          title: '나 외에는 다른 신들을 네게 있게 하지 말라',
          description: '하나님만을 섬기고 다른 신을 섬기지 말라'
        },
        commandment2: {
          title: '너를 위하여 새긴 우상을 만들지 말라',
          description: '우상을 만들거나 섬기지 말라'
        },
        commandment3: {
          title: '너의 하나님 여호와의 이름을 망령되이 일컫지 말라',
          description: '하나님의 이름을 함부로 사용하지 말라'
        },
        commandment4: {
          title: '안식일을 기억하여 거룩하게 지키라',
          description: '일곱째 날을 거룩하게 지켜라'
        },
        commandment5: {
          title: '네 부모를 공경하라',
          description: '부모를 존경하고 순종하라'
        },
        commandment6: {
          title: '살인하지 말라',
          description: '사람의 생명을 해치지 말라'
        },
        commandment7: {
          title: '간음하지 말라',
          description: '순결한 삶을 살라'
        },
        commandment8: {
          title: '도적질하지 말라',
          description: '남의 것을 훔치지 말라'
        },
        commandment9: {
          title: '네 이웃에 대하여 거짓 증거하지 말라',
          description: '거짓말하지 말라'
        },
        commandment10: {
          title: '네 이웃의 것을 탐내지 말라',
          description: '남의 것을 부러워하지 말라'
        },
        reference: '출애굽기 20:1-17 | 시내산에서 모세에게 주신 하나님의 말씀'
      }
    },
    
    // 푸터
    footer: {
      description: '초중학생을 위한 성경 교육 플랫폼으로, 하나님의 말씀을 재미있고 쉽게 배울 수 있도록 도와드립니다.',
      menu: '메뉴',
      contact: '연락처',
      email: '이메일: info@biblechildren.com',
      phone: '전화: 02-1234-5678',
      withLove: '하나님의 사랑으로',
      copyright: '© 2025 BIBLE SCHOOL. 모든 권리 보유.'
    },
    
    // 공통
    common: {
      selectCharacter: '인물을 선택하세요',
      difficulty: '난이도'
    },
    
    // 슬라이더 및 미디어
    slider: {
      noSlides: '업로드된 슬라이드가 없습니다',
      noSlidesDescription: '자료실에서 PPT 파일을 업로드하거나 구글 슬라이드를 연결해주세요',
      slidesCount: '개 슬라이드',
      googleSlide: '구글 슬라이드',
      ppt: 'PPT',
      slideNumber: '슬라이드',
      of: '/',
      bibleEducationSlide: '성경 교육 슬라이드'
    },

    // 자료실
    resources: {
      title: '자료실',
      description: '성경 교육 자료를 업로드하고 관리하세요',
      uploadSlides: '슬라이드 업로드',
      uploadVideos: '영상 업로드',
      googleSlideUrl: '구글 슬라이드 URL',
      youtubeUrl: '유튜브 URL',
      add: '추가',
      delete: '삭제',
      noSlides: '등록된 슬라이드가 없습니다',
      noVideos: '등록된 영상이 없습니다',
      slidesList: '슬라이드 목록',
      videosList: '영상 목록'
    }
  },
  
  en: {
    // Header and Navigation
    title: 'BIBLE SCHOOL',
    nav: {
      home: 'Home',
      word: 'Word',
      doctrine: 'Doctrine',
      sop: 'Spirit of Prophecy',
      sanctuary: 'Sanctuary',
      meditation: 'Meditation',
      resources: 'Resources'
    },
    
    // Main Page
    home: {
      timeline: {
        title: 'Biblical Timeline Explorer',
        subtitle: 'Meet key biblical figures in chronological order'
      },
      characters: {
        adam: 'Adam',
        noah: 'Noah',
        abraham: 'Abraham',
        joseph: 'Joseph',
        moses: 'Moses',
        david: 'David',
        daniel: 'Daniel'
      },
      charactersDetails: {
        adam: {
          name: 'Adam',
          period: 'About 4000 BC',
          description: 'The first man, created in the Garden of Eden.',
          verse: 'Genesis 2:7-8',
          difficulty: 'Basic'
        },
        noah: {
          name: 'Noah',
          period: 'About 3000 BC',
          description: 'Built the ark and was saved from the great flood.',
          verse: 'Genesis 6-9',
          difficulty: 'Basic'
        },
        abraham: {
          name: 'Abraham',
          period: 'About 2000 BC',
          description: 'Father of faith, called by God.',
          verse: 'Genesis 12',
          difficulty: 'Intermediate'
        },
        joseph: {
          name: 'Joseph',
          period: 'About 1800 BC',
          description: 'Interpreted dreams and became prime minister of Egypt.',
          verse: 'Genesis 37-50',
          difficulty: 'Intermediate'
        },
        moses: {
          name: 'Moses',
          period: 'About 1500 BC',
          description: 'Led the Israelites out of Egypt.',
          verse: 'Exodus',
          difficulty: 'Intermediate'
        },
        david: {
          name: 'David',
          period: 'About 1000 BC',
          description: 'Defeated Goliath and became king of Israel.',
          verse: '1 Samuel 17',
          difficulty: 'Intermediate'
        },
        daniel: {
          name: 'Daniel',
          period: 'About 500 BC',
          description: 'Remained faithful to God in Babylon.',
          verse: 'Book of Daniel',
          difficulty: 'Advanced'
        }
      },
      videos: {
        title: 'Latest Videos'
      },
      slides: {
        title: 'Latest Slides'
      },
      commandments: {
        title: 'God\'s Ten Commandments',
        subtitle: 'God\'s word given to Moses on Mount Sinai',
        firstTablet: 'First Tablet',
        firstTabletSubtitle: 'Relationship with God (1-4)',
        secondTablet: 'Second Tablet',
        secondTabletSubtitle: 'Relationship with Others (5-10)',
        commandment1: {
          title: 'You shall have no other gods before Me',
          description: 'Worship God alone and no other gods'
        },
        commandment2: {
          title: 'You shall not make idols',
          description: 'Do not make or worship idols'
        },
        commandment3: {
          title: 'You shall not take the name of the Lord your God in vain',
          description: 'Do not misuse God\'s name'
        },
        commandment4: {
          title: 'Remember the Sabbath day, to keep it holy',
          description: 'Keep the seventh day holy'
        },
        commandment5: {
          title: 'Honor your father and your mother',
          description: 'Respect and obey your parents'
        },
        commandment6: {
          title: 'You shall not murder',
          description: 'Do not harm human life'
        },
        commandment7: {
          title: 'You shall not commit adultery',
          description: 'Live a pure life'
        },
        commandment8: {
          title: 'You shall not steal',
          description: 'Do not take what belongs to others'
        },
        commandment9: {
          title: 'You shall not bear false witness',
          description: 'Do not lie'
        },
        commandment10: {
          title: 'You shall not covet',
          description: 'Do not envy what others have'
        },
        reference: 'Exodus 20:1-17 | God\'s word given to Moses on Mount Sinai'
      }
    },
    
    // Footer
    footer: {
      description: 'A Bible education platform for elementary and middle school students, helping them learn God\'s word in a fun and easy way.',
      menu: 'Menu',
      contact: 'Contact',
      email: 'Email: info@biblechildren.com',
      phone: 'Phone: 02-1234-5678',
      withLove: 'With God\'s Love',
      copyright: '© 2025 BIBLE SCHOOL. All rights reserved.'
    },
    
    // Common
    common: {
      selectCharacter: 'Select a character',
      difficulty: 'Difficulty'
    },
    
    // Slider and Media
    slider: {
      noSlides: 'No slides uploaded',
      noSlidesDescription: 'Please upload PPT files or connect Google Slides in the resources section',
      slidesCount: ' slides',
      googleSlide: 'Google Slide',
      ppt: 'PPT',
      slideNumber: 'Slide',
      of: ' / ',
      bibleEducationSlide: 'Bible Education Slide'
    },

    // Resources
    resources: {
      title: 'Resources',
      description: 'Upload and manage Bible education materials',
      uploadSlides: 'Upload Slides',
      uploadVideos: 'Upload Videos',
      googleSlideUrl: 'Google Slides URL',
      youtubeUrl: 'YouTube URL',
      add: 'Add',
      delete: 'Delete',
      noSlides: 'No slides registered',
      noVideos: 'No videos registered',
      slidesList: 'Slides List',
      videosList: 'Videos List'
    }
  }
}

// 기본 언어
export const DEFAULT_LANGUAGE = 'ko'

// 현재 언어 상태 관리
let currentLanguage = DEFAULT_LANGUAGE

export const getCurrentLanguage = () => currentLanguage

export const setCurrentLanguage = (lang) => {
  if (languages[lang]) {
    currentLanguage = lang
    localStorage.setItem('selectedLanguage', lang)
  }
}

// localStorage에서 언어 설정 불러오기
export const loadLanguageFromStorage = () => {
  const savedLang = localStorage.getItem('selectedLanguage')
  if (savedLang && languages[savedLang]) {
    currentLanguage = savedLang
  }
  return currentLanguage
}

// 번역 함수
export const t = (path, lang = currentLanguage) => {
  const keys = path.split('.')
  let result = translations[lang]
  
  for (const key of keys) {
    if (result && typeof result === 'object') {
      result = result[key]
    } else {
      return path // 번역을 찾을 수 없으면 키를 반환
    }
  }
  
  return result || path
}

// React Hook
export const useTranslation = (initialLang = null) => {
  const [language, setLanguage] = useState(initialLang || loadLanguageFromStorage())
  
  const changeLanguage = (newLang) => {
    setCurrentLanguage(newLang)
    setLanguage(newLang)
  }
  
  const translate = (path) => t(path, language)
  
  return { language, changeLanguage, t: translate, languages }
}