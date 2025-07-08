import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, AxiosError } from 'axios'

// 定义接口响应数据结构
interface ResponseData<T = any> {
    code: number
    data: T
    msg: string
}

// 定义请求配置的扩展接口
interface RequestOptions extends AxiosRequestConfig {
    // 是否显示错误信息
    showError?: boolean
    // 是否显示加载状态
    showLoading?: boolean
    // 自定义错误处理
    customErrorHandler?: (error: any) => void
    // 是否直接返回响应数据中的data字段
    directReturnData?: boolean
}

// 创建HTTP请求类
class HttpRequest {
    // axios实例
    private instance: AxiosInstance
    // 基础配置
    private readonly baseConfig: AxiosRequestConfig = {
        baseURL: 'http://127.0.0.1:8081',
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        withCredentials: true, // 允许携带cookie
    }

    constructor(config: AxiosRequestConfig = {}) {
        // 创建axios实例
        this.instance = axios.create({
            ...this.baseConfig,
            ...config,
        })

        // 初始化拦截器
        this.initInterceptors()
    }

    // 初始化拦截器
    private initInterceptors() {
        // 请求拦截器
        this.instance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token')
                if (token) {
                    config.headers['Authorization'] = '546cbd53-d947-45be-9ca3-a2634d34b05f'
                }
                config.headers['Authorization'] = '546cbd53-d947-45be-9ca3-a2634d34b05f'

                const requestOptions = config as RequestOptions
                if (requestOptions.showLoading) {
                }

                return config
            },
            (error) => {
                return Promise.reject(error)
            },
        )

        // 响应拦截器
        this.instance.interceptors.response.use(
            (response: AxiosResponse<ResponseData>) => {
                const requestOptions = response.config as RequestOptions
                if (requestOptions.showLoading) {
                }

                // 根据业务状态码处理
                const { code, msg, data } = response.data
                if (code !== 200) {
                    if (requestOptions.showError) {
                        console.error(msg)
                    }
                    return Promise.reject(msg)
                }
                // 根据配置决定返回数据结构
                return data
            },
            (error: AxiosError<ResponseData>) => {
                const requestOptions = error.config as RequestOptions
                if (requestOptions?.showLoading) {
                }

                // 处理HTTP错误状态码
                let errorMessage = '网络请求错误'
                const status = error.response?.status

                switch (status) {
                    case 400:
                        errorMessage = '请求参数错误'
                        break
                    case 401:
                        errorMessage = '未授权，请重新登录'
                        // 可以在这里处理登出逻辑
                        // logout();
                        break
                    case 403:
                        errorMessage = '拒绝访问'
                        break
                    case 404:
                        errorMessage = '请求资源不存在'
                        break
                    case 500:
                        errorMessage = '服务器错误'
                        break
                    default:
                        if (error.message.includes('timeout')) {
                            errorMessage = '请求超时'
                        } else if (error.message.includes('Network')) {
                            errorMessage = '网络连接错误'
                        }
                        break
                }

                // 显示错误信息
                if (requestOptions?.showError !== false) {
                    console.error(errorMessage)
                }

                return Promise.reject(error)
            },
        )
    }

    // 通用请求方法
    public request<T = any>(config: RequestOptions): Promise<T> {
        return this.instance.request(config)
    }

    // GET请求
    public get<T = any>(url: string, params?: any, options?: RequestOptions): Promise<T> {
        return this.instance.get(url, { params, ...options })
    }

    // POST请求
    public post<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
        return this.instance.post(url, data, options)
    }

    // PUT请求
    public put<T = any>(url: string, data?: any, options?: RequestOptions): Promise<T> {
        return this.instance.put(url, data, options)
    }

    // DELETE请求
    public delete<T = any>(url: string, params?: any, options?: RequestOptions): Promise<T> {
        return this.instance.delete(url, { params, ...options })
    }

    // 上传文件
    public upload<T = any>(url: string, formData: FormData, options?: RequestOptions): Promise<T> {
        return this.instance.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            ...options,
        })
    }
    // 下载文件
    public download(url: string, params?: any, options?: RequestOptions): Promise<Blob> {
        return this.instance.get(url, {
            params,
            responseType: 'blob',
            ...options,
        })
    }
}
// 创建请求实例
const request = new HttpRequest()
export default request
