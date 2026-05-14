
package com.example.lingxiao.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.PromotionProductDTO;
import com.example.lingxiao.dto.ResponseDTO;
import com.example.lingxiao.entity.PromotionProduct;
import com.example.lingxiao.service.PromotionProductService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class PromotionProductController {
    
    private final PromotionProductService promotionProductService;
    
    public PromotionProductController(PromotionProductService promotionProductService) {
        this.promotionProductService = promotionProductService;
    }
    
    @GetMapping("/list")
    public ResponseDTO<IPage<PromotionProduct>> list(PromotionProductDTO dto, 
                                                     @RequestParam(defaultValue = "1") Integer pageNum,
                                                     @RequestParam(defaultValue = "10") Integer pageSize) {
        IPage<PromotionProduct> page = promotionProductService.list(dto, pageNum, pageSize);
        return ResponseDTO.success(page);
    }
    
    @GetMapping("/{id}")
    public ResponseDTO<PromotionProduct> getById(@PathVariable Long id) {
        PromotionProduct product = promotionProductService.getById(id);
        return ResponseDTO.success(product);
    }
    
    @PostMapping
    public ResponseDTO<Boolean> save(@RequestBody PromotionProductDTO dto) {
        boolean success = promotionProductService.save(dto);
        return ResponseDTO.success(success);
    }
    
    @PutMapping
    public ResponseDTO<Boolean> update(@RequestBody PromotionProductDTO dto) {
        boolean success = promotionProductService.update(dto);
        return ResponseDTO.success(success);
    }
    
    @DeleteMapping("/{id}")
    public ResponseDTO<Boolean> delete(@PathVariable Long id) {
        try {
            boolean success = promotionProductService.delete(id);
            return ResponseDTO.success(success);
        } catch (RuntimeException e) {
            return ResponseDTO.error(e.getMessage());
        }
    }
}
