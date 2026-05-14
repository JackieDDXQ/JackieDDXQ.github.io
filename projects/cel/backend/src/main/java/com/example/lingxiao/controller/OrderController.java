
package com.example.lingxiao.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.ResponseDTO;
import com.example.lingxiao.entity.HandleOrder;
import com.example.lingxiao.service.HandleOrderService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    
    private final HandleOrderService handleOrderService;
    
    public OrderController(HandleOrderService handleOrderService) {
        this.handleOrderService = handleOrderService;
    }
    
    @GetMapping("/list")
    public ResponseDTO<IPage<HandleOrder>> list(@RequestParam(required = false) Map<String, Object> params,
                                                @RequestParam(defaultValue = "1") Integer pageNum,
                                                @RequestParam(defaultValue = "10") Integer pageSize) {
        IPage<HandleOrder> page = handleOrderService.list(params, pageNum, pageSize);
        return ResponseDTO.success(page);
    }
    
    @GetMapping("/{id}")
    public ResponseDTO<HandleOrder> getById(@PathVariable Long id) {
        HandleOrder order = handleOrderService.getById(id);
        return ResponseDTO.success(order);
    }
    
    @GetMapping("/detail")
    public ResponseDTO<HandleOrder> getByOrderId(@RequestParam String orderId) {
        HandleOrder order = handleOrderService.getByOrderId(orderId);
        return ResponseDTO.success(order);
    }
}
