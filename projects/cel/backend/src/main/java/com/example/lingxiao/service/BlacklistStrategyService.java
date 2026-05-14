
package com.example.lingxiao.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.BlacklistStrategyDTO;
import com.example.lingxiao.entity.BlacklistStrategy;

public interface BlacklistStrategyService {
    IPage<BlacklistStrategy> list(BlacklistStrategyDTO dto, Integer pageNum, Integer pageSize);
    
    BlacklistStrategy getById(Long id);
    
    boolean save(BlacklistStrategyDTO dto);
    
    boolean update(BlacklistStrategyDTO dto);
    
    boolean delete(Long id);
}
