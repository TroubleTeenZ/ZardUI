import type {App,Plugin} from 'vue'
import { each } from "lodash-es"

type SFCWithInstall<T> = T & Plugin

/**
 * 接收插件数组 返回一个安装器函数 调用这个函数可以把数组中所有插件安装到Vue
 * @param components 
 * @returns 
 */
export function makeInstaller(components:Plugin[]){
	const installer = (app:App)=> each( components, c=> app.use(c))
	return installer
}

/**
 * 给组件添加一个install方法 这个方法会根据传入的组件对象的名称将其注册为 Vue 组件
 * @param component 
 * @returns 
 */
export const withInstall = <T>(component: T) => {
	(component as SFCWithInstall<T>).install = (app: App) => {
			const name = (component as any).name
			app.component(name, component as Plugin)
	}
	return component as SFCWithInstall<T>
}
