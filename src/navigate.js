// Where the app is and how to move. Pages call navigate() for moves that aren't plain links
// (after requesting a chat, say); Site listens for popstate and swaps the page in place.
export const clean = (pathname) => pathname.replace(/\/+$/, '') || '/'

export const currentPath = () => clean(window.location.pathname)

export function navigate(to) {
  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

// The path a same-site link points at, or null for in-page anchors.
export const linkPath = (link) =>
  link.getAttribute('href').startsWith('#') ? null : clean(link.pathname)
