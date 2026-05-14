
package com.example.lingxiao.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.PlanConfigDTO;
import com.example.lingxiao.entity.PlanConfig;

public interface PlanConfigService {
    IPage<PlanConfig> list(PlanConfigDTO dto, Integer pageNum, Integer pageSize);
    
    PlanConfig getById(Long id);
    
    boolean save(PlanConfigDTO dto);
    
    boolean update(PlanConfigDTO dto);
    
    boolean delete(Long id);
}
