import React from 'react'
import { Button } from '@/components/ui/button.jsx'
import { languages } from '@/lib/i18n.js'
import { ChevronDown } from 'lucide-react'

const LanguageSelector = ({ currentLanguage, onLanguageChange, isDarkMode }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectLanguage = (langCode) => {
    onLanguageChange(langCode)
    setIsOpen(false)
  }

  const currentLangData = languages[currentLanguage]

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleDropdown}
        className={`flex items-center space-x-2 ${
          isDarkMode 
            ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
            : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
        }`}
      >
        <span className="text-lg">{currentLangData?.flag}</span>
        <span className="text-sm font-medium">{currentLangData?.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <>
          {/* 오버레이 */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* 드롭다운 메뉴 */}
          <div className={`absolute right-0 top-full mt-2 w-40 rounded-lg shadow-lg border z-20 ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="py-2">
              {Object.entries(languages).map(([code, data]) => (
                <button
                  key={code}
                  onClick={() => selectLanguage(code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors ${
                    currentLanguage === code
                      ? isDarkMode 
                        ? 'bg-slate-700 text-white' 
                        : 'bg-blue-50 text-blue-700'
                      : isDarkMode
                        ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        : 'text-slate-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{data.flag}</span>
                  <span className="font-medium">{data.name}</span>
                  {currentLanguage === code && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSelector