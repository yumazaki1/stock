module.exports = {
    "type": "GETOPENORDER",
    "code": 0,
    "data": {
        "orders": [
            {
                "position": "12341434333", // 订单号
                "symbol": "EURCHFbo", // 货币
                "type": 1, //-1代表看跌DOWN，1代表看涨 UP
                "open_price": 5, /// 开仓价
                "open_time": 1498258796, //开仓时间
                "investment": 100, //投资金额
                "expiration": 5, //过期时间（分钟）。
                "win": 50, //盈利百分比
                "digits": 2 //报价的精度
            }
        ]
    }
};
