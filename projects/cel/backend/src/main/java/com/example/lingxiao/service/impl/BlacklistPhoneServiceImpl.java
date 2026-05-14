
package com.example.lingxiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.dto.BlacklistPhoneDTO;
import com.example.lingxiao.entity.BlacklistPhone;
import com.example.lingxiao.mapper.BlacklistPhoneMapper;
import com.example.lingxiao.service.BlacklistPhoneService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BlacklistPhoneServiceImpl implements BlacklistPhoneService {
    
    private final BlacklistPhoneMapper blacklistPhoneMapper;
    
    public BlacklistPhoneServiceImpl(BlacklistPhoneMapper blacklistPhoneMapper) {
        this.blacklistPhoneMapper = blacklistPhoneMapper;
    }
    
    @Override
    public IPage<BlacklistPhone> list(Long strategyId, String phoneNumber, Integer pageNum, Integer pageSize) {
        Page<BlacklistPhone> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<BlacklistPhone> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(BlacklistPhone::getIsDeleted, 0);
        
        if (strategyId != null) {
            wrapper.eq(BlacklistPhone::getStrategyId, strategyId);
        }
        if (StringUtils.isNotBlank(phoneNumber)) {
            wrapper.like(BlacklistPhone::getPhoneNumber, phoneNumber);
        }
        
        wrapper.orderByDesc(BlacklistPhone::getCreateAt);
        return blacklistPhoneMapper.selectPage(page, wrapper);
    }
    
    @Override
    public BlacklistPhone getById(Long id) {
        return blacklistPhoneMapper.selectById(id);
    }
    
    @Override
    @Transactional
    public boolean save(BlacklistPhoneDTO dto) {
        BlacklistPhone phone = new BlacklistPhone();
        BeanUtils.copyProperties(dto, phone);
        phone.setIsDeleted(0);
        return blacklistPhoneMapper.insert(phone) > 0;
    }
    
    @Override
    @Transactional
    public boolean update(BlacklistPhoneDTO dto) {
        BlacklistPhone phone = blacklistPhoneMapper.selectById(dto.getId());
        if (phone == null) {
            return false;
        }
        BeanUtils.copyProperties(dto, phone);
        return blacklistPhoneMapper.updateById(phone) > 0;
    }
    
    @Override
    @Transactional
    public boolean delete(Long id) {
        BlacklistPhone phone = blacklistPhoneMapper.selectById(id);
        if (phone == null) {
            return false;
        }
        phone.setIsDeleted(1);
        return blacklistPhoneMapper.updateById(phone) > 0;
    }
    
    @Override
    @Transactional
    public boolean batchDelete(Long[] ids) {
        for (Long id : ids) {
            delete(id);
        }
        return true;
    }
}
