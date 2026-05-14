
package com.example.lingxiao.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.BlacklistPhoneDTO;
import com.example.lingxiao.entity.BlacklistPhone;

public interface BlacklistPhoneService {
    IPage<BlacklistPhone> list(Long strategyId, String phoneNumber, Integer pageNum, Integer pageSize);
    
    BlacklistPhone getById(Long id);
    
    boolean save(BlacklistPhoneDTO dto);
    
    boolean update(BlacklistPhoneDTO dto);
    
    boolean delete(Long id);
    
    boolean batchDelete(Long[] ids);
}
