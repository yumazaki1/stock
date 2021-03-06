/**
 * Copyright(c) Richard
 * Created by Richard on 17/6/25.
 * @author: Richard<xiaowei.hsueh@gmail.com>(https://www.gistop.com)
 * @description: 后台数据请求接口
 */

import { notification } from 'antd';
import { API_URL } from './constant';
import BO_RET from './error';

const getErrorMessage = (code) => {
    let v = '未知错误!'
    for (var key in BO_RET) {
        let item = BO_RET[key];
        if (item.code === code) {
            v = item.msg;
            break;
        }
    }
    return v;
};

const openNotificationWithIcon = ({type, message, description}) => {
    notification[type]({
        message,
        description
    });
};

/**
 * 预处理请求返回结果
 * @param res {Response} fetch 请求返回的结果
 */
const processResponse = (res) => {
    if (res.ok && res.status === 200) {
        return res.json().then((json) => {
            let code = json.code;
            switch (code) {
                case BO_RET.BO_RET_OK.code:
                    return json;
                default:
                    json.message = getErrorMessage(code);
                    openNotificationWithIcon({
                        type: 'error',
                        message: '出错了',
                        description: `${code}: ${json.message}`
                    });
                    return json;
            }
        });
    } else {
        let code = res.status;
        let message = `网络请求出错: ${res.status} ${res.statusText}`
        openNotificationWithIcon({
            type: 'error',
            message: '出错了',
            description: message
        });
        return {
            code,
            message
        };
    }
};

/**
 * 发起请求
 * @param url {String} 请求路径
 * @param params {Object} 请求参数
 * @param method {String} 请求方法
 * @param opts {Object} 请求设置
 * @returns {*} {Promise}
 */
export const request = (url, params = {}, method = 'POST', opts = {}) => {
    if (method === 'GET') {
        get(url, params, opts);
    } else if (method === 'POST') {
        post(url, params, opts);
    }
};

/**
 * 发起get请求
 * @param url {String}
 * @param params {Object}
 * @param opts {Object}s
 * @returns {*}
 */
export const get = (url, params = {}, opts = {}) => {
    let tmp = [];
    for (let key in params) {
        let value = params[key];
        if (value.constructor === Array) {
            value.forEach((item) => {
                tmp.push(`${key}=${item}`);
            })
        } else {
            tmp.push(`${key}=${value}`);
        }
    }
    let queryString = tmp.join('&');
    url = `${url}?${queryString}`;
    opts = Object.assign({}, opts,  {
        credentials: 'include',
        method: 'GET'
    });
    return fetch(url, opts).then(processResponse);
};

/**
 * 发起post请求
 * @param url
 * @param params
 * @param opts
 * @returns {*}
 */
export const post = (url, params = {}, opts = {}) => {
    let data = new FormData();
    for (let key in params) {
        data.append(key, params[key]);
    }
    opts = Object.assign({},  {
        credentials: 'include',
        method: 'POST',
        body: data
    }, opts);
    return fetch(url, opts).then(processResponse);
};

export const login = (params) => {
    return post(API_URL.LOGIN, params);
};

export const logout = (params) =>  {
    return post(API_URL.LOGOUT, params);
};

export const getServerInfo = (params) => {
    return post(API_URL.GET_SERVER_INFO, params);
};

export const getSymbolGroup = (params) => {
    return post(API_URL.SYMBOL_GROUP, params);
};

export const getOpenOrder = (params) => {
    return post(API_URL.GET_OPEN_ORDER, params);
};

export const getAccountDetails = (params)=> {
    return post(API_URL.ACCOUNT_DETAILS, params);
};

export const getHistoryOrder = (params) => {
    return post(API_URL.GET_HISTORY_ORDER, params);
};

export const getPrice = (params) => {
    return post(API_URL.PRICE_REQUEST, params)
};

export const getQuotesHistory = (params) => {
    return post(API_URL.QUOTES_HISTORY, params);
};

export const openOrder = (params) => {
    return post(API_URL.OPEN_ORDER, params);
};
