// 后台登录鉴权（localStorage 模拟，不涉及真实网络）
const AUTH_KEY = 'ee-lab-admin-auth'
const PASSWORD_KEY = 'ee-lab-admin-password'
const DEFAULT_PASSWORD = 'admin123'

export function getStoredPassword(): string {
  try {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD
  } catch {
    return DEFAULT_PASSWORD
  }
}

export function isLoggedIn(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === '1'
  } catch {
    return false
  }
}

export function login(password: string): boolean {
  if (password === getStoredPassword()) {
    try {
      localStorage.setItem(AUTH_KEY, '1')
    } catch {
      // ignore
    }
    return true
  }
  return false
}

export function logout(): void {
  try {
    localStorage.removeItem(AUTH_KEY)
  } catch {
    // ignore
  }
}

export function changePassword(oldPwd: string, newPwd: string): boolean {
  if (oldPwd !== getStoredPassword()) return false
  if (!newPwd || newPwd.length < 4) return false
  try {
    localStorage.setItem(PASSWORD_KEY, newPwd)
  } catch {
    return false
  }
  return true
}
