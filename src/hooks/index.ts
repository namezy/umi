import { useRef } from 'react'

export const usePage = (page = 1) => {
  const pageRef = useRef(page)
  const setPage = (val: number) => {
    pageRef.current = val
  }
  return [pageRef, setPage]
}
