
package com.example.lingxiao.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.BlacklistPhoneDTO;
import com.example.lingxiao.dto.BlacklistStrategyDTO;
import com.example.lingxiao.dto.ResponseDTO;
import com.example.lingxiao.entity.BlacklistPhone;
import com.example.lingxiao.entity.BlacklistStrategy;
import com.example.lingxiao.service.BlacklistPhoneService;
import com.example.lingxiao.service.BlacklistStrategyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blacklist")
public class BlacklistController {
    
    private final BlacklistStrategyService blacklistStrategyService;
    private final BlacklistPhoneService blacklistPhoneService;
    
    public BlacklistController(BlacklistStrategyService blacklistStrategyService, BlacklistPhoneService blacklistPhoneService) {
        this.blacklistStrategyService = blacklistStrategyService;
        this.blacklistPhoneService = blacklistPhoneService;
    }
    
    @GetMapping("/strategy/list")
    public ResponseDTO<IPage<BlacklistStrategy>> strategyList(BlacklistStrategyDTO dto,
                                                              @RequestParam(defaultValue = "1") Integer pageNum,
                                                              @RequestParam(defaultValue = "10") Integer pageSize) {
        IPage<BlacklistStrategy> page = blacklistStrategyService.list(dto, pageNum, pageSize);
        return ResponseDTO.success(page);
    }
    
    @GetMapping("/strategy/{id}")
    public ResponseDTO<BlacklistStrategy> getStrategyById(@PathVariable Long id) {
        BlacklistStrategy strategy = blacklistStrategyService.getById(id);
        return ResponseDTO.success(strategy);
    }
    
    @PostMapping("/strategy")
    public ResponseDTO<Boolean> saveStrategy(@RequestBody BlacklistStrategyDTO dto) {
        boolean success = blacklistStrategyService.save(dto);
        return ResponseDTO.success(success);
    }
    
    @PutMapping("/strategy")
    public ResponseDTO<Boolean> updateStrategy(@RequestBody BlacklistStrategyDTO dto) {
        boolean success = blacklistStrategyService.update(dto);
        return ResponseDTO.success(success);
    }
    
    @DeleteMapping("/strategy/{id}")
    public ResponseDTO<Boolean> deleteStrategy(@PathVariable Long id) {
        try {
            boolean success = blacklistStrategyService.delete(id);
            return ResponseDTO.success(success);
        } catch (RuntimeException e) {
            return ResponseDTO.error(e.getMessage());
        }
    }
    
    @GetMapping("/phone/list")
    public ResponseDTO<IPage<BlacklistPhone>> phoneList(@RequestParam(required = false) Long strategyId,
                                                        @RequestParam(required = false) String phoneNumber,
                                                        @RequestParam(defaultValue = "1") Integer pageNum,
                                                        @RequestParam(defaultValue = "10") Integer pageSize) {
        IPage<BlacklistPhone> page = blacklistPhoneService.list(strategyId, phoneNumber, pageNum, pageSize);
        return ResponseDTO.success(page);
    }
    
    @GetMapping("/phone/{id}")
    public ResponseDTO<BlacklistPhone> getPhoneById(@PathVariable Long id) {
        BlacklistPhone phone = blacklistPhoneService.getById(id);
        return ResponseDTO.success(phone);
    }
    
    @PostMapping("/phone")
    public ResponseDTO<Boolean> savePhone(@RequestBody BlacklistPhoneDTO dto) {
        boolean success = blacklistPhoneService.save(dto);
        return ResponseDTO.success(success);
    }
    
    @PutMapping("/phone")
    public ResponseDTO<Boolean> updatePhone(@RequestBody BlacklistPhoneDTO dto) {
        boolean success = blacklistPhoneService.update(dto);
        return ResponseDTO.success(success);
    }
    
    @DeleteMapping("/phone/{id}")
    public ResponseDTO<Boolean> deletePhone(@PathVariable Long id) {
        boolean success = blacklistPhoneService.delete(id);
        return ResponseDTO.success(success);
    }
    
    @DeleteMapping("/phone/batch")
    public ResponseDTO<Boolean> batchDeletePhone(@RequestBody Long[] ids) {
        boolean success = blacklistPhoneService.batchDelete(ids);
        return ResponseDTO.success(success);
    }
}
