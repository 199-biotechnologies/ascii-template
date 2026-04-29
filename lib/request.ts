export function getClientIp(request: Request) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

export function getVisitorHint(request: Request) {
  return [getClientIp(request), request.headers.get('user-agent') || 'unknown'].join('|')
}
