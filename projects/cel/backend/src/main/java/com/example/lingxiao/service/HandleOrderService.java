
package com.example.lingxiao.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.entity.HandleOrder;

import java.util.Map;

public interface HandleOrderService {
    IPage<HandleOrder> list(Map<String, Object> params, Integer pageNum, Integer pageSize);
    
    HandleOrder getById(Long id);
    
    HandleOrder getByOrderId(String orderId);
}
