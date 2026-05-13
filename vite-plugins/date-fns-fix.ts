import { Plugin } from 'vite'

export default function dateFnsFix(): Plugin {
  return {
    name: 'date-fns-fix',
    transform(code, id) {
      if (id.includes('date-fns/esm/') && id.endsWith('/index.js')) {
        try {
          const match = code.match(/export default function (\w+)/)
          if (match && !code.includes('export {')) {
            const fnName = match[1]
            const modifiedCode = code + `\nexport { ${fnName} }`
            return modifiedCode
          }
        } catch (e) {
          console.warn('date-fns-fix: Error transforming', id, e)
        }
      }
      return code
    }
  }
}
