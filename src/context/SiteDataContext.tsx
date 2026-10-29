import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import {
  loadSiteData,
  saveSiteData,
  resetSiteData,
  defaultData,
  type SiteData,
} from '../api/siteData'

interface SiteDataContextValue {
  data: SiteData
  /** 整体替换数据并持久化 */
  setData: (next: SiteData) => void
  /** 更新某个区块（profile/stats/...）并持久化 */
  updateSection: <K extends keyof SiteData>(key: K, value: SiteData[K]) => void
  /** 重置为默认数据 */
  reset: () => void
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setDataState] = useState<SiteData>(() => loadSiteData())

  const setData = useCallback((next: SiteData) => {
    setDataState(next)
    saveSiteData(next)
  }, [])

  const updateSection = useCallback(
    <K extends keyof SiteData>(key: K, value: SiteData[K]) => {
      setDataState((prev) => {
        const next = { ...prev, [key]: value }
        saveSiteData(next)
        return next
      })
    },
    [],
  )

  const reset = useCallback(() => {
    resetSiteData()
    setDataState(defaultData)
  }, [])

  return (
    <SiteDataContext.Provider value={{ data, setData, updateSection, reset }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData(): SiteDataContextValue {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSiteData 必须在 SiteDataProvider 内使用')
  return ctx
}
