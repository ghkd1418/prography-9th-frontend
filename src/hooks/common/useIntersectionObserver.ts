import { useRef } from 'react'

type IntersectionObserverCallback = () => void

export default function useIntersectionObserver(
  callback: IntersectionObserverCallback
): [(element: Element) => void, (element: Element) => void] {
  const observer = useRef<IntersectionObserver>(
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback()
          }
        })
      },
      { threshold: 1 }
    )
  )

  const observe = (element: Element) => {
    observer.current.observe(element)
  }

  const unobserve = (element: Element) => {
    observer.current.unobserve(element)
  }

  return [observe, unobserve]
}
