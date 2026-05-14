
package com.example.lingxiao.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.PromotionChannelDTO;
import com.example.lingxiao.dto.ResponseDTO;
import com.example.lingxiao.entity.PromotionChannel;
import com.example.lingxiao.service.PromotionChannelService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/channel")
public class PromotionChannelController {
    
    private final PromotionChannelService promotionChannelService;
    
    public PromotionChannelController(PromotionChannelService promotionChannelService) {
        this.promotionChannelService = promotionChannelService;
    }
    
    @GetMapping("/list")
    public ResponseDTO<IPage<PromotionChannel>> list(PromotionChannelDTO dto, 
                                                     @RequestParam(defaultValue = "1") Integer pageNum,
                                                     @RequestParam(defaultValue = "10") Integer pageSize) {
        IPage<PromotionChannel> page = promotionChannelService.list(dto, pageNum, pageSize);
        return ResponseDTO.success(page);
    }
    
    @GetMapping("/{id}")
    public ResponseDTO<PromotionChannel> getById(@PathVariable Long id) {
        PromotionChannel channel = promotionChannelService.getById(id);
        return ResponseDTO.success(channel);
    }
    
    @PostMapping
    public ResponseDTO<Boolean> save(@RequestBody PromotionChannelDTO dto) {
        boolean success = promotionChannelService.save(dto);
        return ResponseDTO.success(success);
    }
    
    @PutMapping
    public ResponseDTO<Boolean> update(@RequestBody PromotionChannelDTO dto) {
        boolean success = promotionChannelService.update(dto);
        return ResponseDTO.success(success);
    }
    
    @DeleteMapping("/{id}")
    public ResponseDTO<Boolean> delete(@PathVariable Long id) {
        try {
            boolean success = promotionChannelService.delete(id);
            return ResponseDTO.success(success);
        } catch (RuntimeException e) {
            return ResponseDTO.error(e.getMessage());
        }
    }
}
