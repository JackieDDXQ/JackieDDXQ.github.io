
package com.example.lingxiao.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.QuotaStrategyDTO;
import com.example.lingxiao.entity.QuotaStrategy;

public interface QuotaStrategyService {
    IPage<QuotaStrategy> list(QuotaStrategyDTO dto, Integer pageNum, Integer pageSize);
    
    QuotaStrategy getById(Long id);
    
    boolean save(QuotaStrategyDTO dto);
    
    boolean update(QuotaStrategyDTO dto);
    
    boolean delete(Long id);
}
