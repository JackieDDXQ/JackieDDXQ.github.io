
package com.example.lingxiao.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.QuotaStrategyDTO;
import com.example.lingxiao.dto.ResponseDTO;
import com.example.lingxiao.entity.QuotaStrategy;
import com.example.lingxiao.service.QuotaStrategyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quota")
public class QuotaStrategyController {
    
    private final QuotaStrategyService quotaStrategyService;
    
    public QuotaStrategyController(QuotaStrategyService quotaStrategyService) {
        this.quotaStrategyService = quotaStrategyService;
    }
    
    @GetMapping("/list")
    public ResponseDTO<IPage<QuotaStrategy>> list(QuotaStrategyDTO dto, 
                                                  @RequestParam(defaultValue = "1") Integer pageNum,
                                                  @RequestParam(defaultValue = "10") Integer pageSize) {
        IPage<QuotaStrategy> page = quotaStrategyService.list(dto, pageNum, pageSize);
        return ResponseDTO.success(page);
    }
    
    @GetMapping("/{id}")
    public ResponseDTO<QuotaStrategy> getById(@PathVariable Long id) {
        QuotaStrategy strategy = quotaStrategyService.getById(id);
        return ResponseDTO.success(strategy);
    }
    
    @PostMapping
    public ResponseDTO<Boolean> save(@RequestBody QuotaStrategyDTO dto) {
        boolean success = quotaStrategyService.save(dto);
        return ResponseDTO.success(success);
    }
    
    @PutMapping
    public ResponseDTO<Boolean> update(@RequestBody QuotaStrategyDTO dto) {
        boolean success = quotaStrategyService.update(dto);
        return ResponseDTO.success(success);
    }
    
    @DeleteMapping("/{id}")
    public ResponseDTO<Boolean> delete(@PathVariable Long id) {
        try {
            boolean success = quotaStrategyService.delete(id);
            return ResponseDTO.success(success);
        } catch (RuntimeException e) {
            return ResponseDTO.error(e.getMessage());
        }
    }
}
