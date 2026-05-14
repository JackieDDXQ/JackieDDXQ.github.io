
package com.example.lingxiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.entity.HandleOrder;
import com.example.lingxiao.mapper.HandleOrderMapper;
import com.example.lingxiao.service.HandleOrderService;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HandleOrderServiceImpl implements HandleOrderService {
    
    private final HandleOrderMapper handleOrderMapper;
    
    public HandleOrderServiceImpl(HandleOrderMapper handleOrderMapper) {
        this.handleOrderMapper = handleOrderMapper;
    }
    
    @Override
    public IPage<HandleOrder> list(Map<String, Object> params, Integer pageNum, Integer pageSize) {
        Page<HandleOrder> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<HandleOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HandleOrder::getIsDeleted, 0);
        
        if (params.containsKey("phoneNumber") && StringUtils.isNotBlank((String) params.get("phoneNumber"))) {
            wrapper.like(HandleOrder::getPhoneNumber, params.get("phoneNumber"));
        }
        if (params.containsKey("orderId") && StringUtils.isNotBlank((String) params.get("orderId"))) {
            wrapper.like(HandleOrder::getOrderId, params.get("orderId"));
        }
        if (params.containsKey("status") && StringUtils.isNotBlank((String) params.get("status"))) {
            wrapper.eq(HandleOrder::getStatus, params.get("status"));
        }
        if (params.containsKey("ipsChannel") && StringUtils.isNotBlank((String) params.get("ipsChannel"))) {
            wrapper.eq(HandleOrder::getIpsChannel, params.get("ipsChannel"));
        }
        
        wrapper.orderByDesc(HandleOrder::getCreateAt);
        return handleOrderMapper.selectPage(page, wrapper);
    }
    
    @Override
    public HandleOrder getById(Long id) {
        return handleOrderMapper.selectById(id);
    }
    
    @Override
    public HandleOrder getByOrderId(String orderId) {
        LambdaQueryWrapper<HandleOrder> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(HandleOrder::getOrderId, orderId);
        wrapper.eq(HandleOrder::getIsDeleted, 0);
        return handleOrderMapper.selectOne(wrapper);
    }
}
