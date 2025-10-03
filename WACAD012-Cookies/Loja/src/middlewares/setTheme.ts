import {NextFunction, Request, Response} from 'express'

const defaultTheme = 'light'
export const setTheme = (req: Request, res: Response, next: NextFunction) => {
    if ( !('theme' in req.cookies) ) {
        res.cookie('theme', defaultTheme)
        res.locals.theme = defaultTheme
        res.locals.themeLight = true
    } else {
        res.locals.theme = req.cookies['theme']
        res.locals.themeLight = res.locals.theme == 'light' ? true : false
    }
    next()
}

export default setTheme