import { ApiResult,ServeRequestResult } from "./interfaces";

/**
 * 接口成功响应返回数据
 * @param data 成功返回数据
 * @param tip 提示内容
 * @param code 状态码
 */
export function apiSuccess(data: object, tip?: string, code = 200): ApiResult {
    return {
        message: tip || "success",
        code: code,
        result: data
    }
}

/**
 * 服务端错误响应返回数据
 * @param tip 提示内容
 * @param code 错误码
 * @param error 错误信息
 */
export function apiFail(tip: string, code = 400, error: any = null): ApiResult {
    return {
        message: tip || "fail",
        code: code,
        result: error
    }
}

/**
 * 服务端错误响应返回数据2
 * @param tip 提示内容
 * @param code 错误码
 * @param error 错误信息
 */
 export function apiFails(tip: string, code = 400, error: any = null): ServeRequestResult {
    return {
        msg: tip || "fail",
        state: code,
        result: error
    }
}