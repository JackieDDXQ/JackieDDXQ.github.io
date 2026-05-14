
package com.example.lingxiao.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.PromotionChannelDTO;
import com.example.lingxiao.entity.PromotionChannel;

public interface PromotionChannelService {
    IPage<PromotionChannel> list(PromotionChannelDTO dto, Integer pageNum, Integer pageSize);
    
    PromotionChannel getById(Long id);
    
    boolean save(PromotionChannelDTO dto);
    
    boolean update(PromotionChannelDTO dto);
    
    boolean delete(Long id);
}
