
package com.example.lingxiao.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.PromotionProductDTO;
import com.example.lingxiao.entity.PromotionProduct;

public interface PromotionProductService {
    IPage<PromotionProduct> list(PromotionProductDTO dto, Integer pageNum, Integer pageSize);
    
    PromotionProduct getById(Long id);
    
    boolean save(PromotionProductDTO dto);
    
    boolean update(PromotionProductDTO dto);
    
    boolean delete(Long id);
}
