
package com.example.lingxiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.dto.QuotaStrategyDTO;
import com.example.lingxiao.entity.QuotaStrategy;
import com.example.lingxiao.mapper.QuotaStrategyMapper;
import com.example.lingxiao.service.QuotaStrategyService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class QuotaStrategyServiceImpl implements QuotaStrategyService {
    
    private final QuotaStrategyMapper quotaStrategyMapper;
    
    public QuotaStrategyServiceImpl(QuotaStrategyMapper quotaStrategyMapper) {
        this.quotaStrategyMapper = quotaStrategyMapper;
    }
    
    @Override
    public IPage<QuotaStrategy> list(QuotaStrategyDTO dto, Integer pageNum, Integer pageSize) {
        Page<QuotaStrategy> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<QuotaStrategy> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(QuotaStrategy::getIsDeleted, 0);
        
        if (StringUtils.isNotBlank(dto.getName())) {
            wrapper.like(QuotaStrategy::getName, dto.getName());
        }
        if (dto.getType() != null) {
            wrapper.eq(QuotaStrategy::getType, dto.getType());
        }
        if (dto.getLevel() != null) {
            wrapper.eq(QuotaStrategy::getLevel, dto.getLevel());
        }
        
        wrapper.orderByDesc(QuotaStrategy::getCreateAt);
        return quotaStrategyMapper.selectPage(page, wrapper);
    }
    
    @Override
    public QuotaStrategy getById(Long id) {
        return quotaStrategyMapper.selectById(id);
    }
    
    @Override
    @Transactional
    public boolean save(QuotaStrategyDTO dto) {
        QuotaStrategy strategy = new QuotaStrategy();
        BeanUtils.copyProperties(dto, strategy);
        strategy.setIsDeleted(0);
        strategy.setEnable(dto.getEnable() != null ? dto.getEnable() : 1);
        return quotaStrategyMapper.insert(strategy) > 0;
    }
    
    @Override
    @Transactional
    public boolean update(QuotaStrategyDTO dto) {
        QuotaStrategy strategy = quotaStrategyMapper.selectById(dto.getId());
        if (strategy == null) {
            return false;
        }
        BeanUtils.copyProperties(dto, strategy);
        return quotaStrategyMapper.updateById(strategy) > 0;
    }
    
    @Override
    @Transactional
    public boolean delete(Long id) {
        QuotaStrategy strategy = quotaStrategyMapper.selectById(id);
        if (strategy == null) {
            return false;
        }
        strategy.setIsDeleted(1);
        return quotaStrategyMapper.updateById(strategy) > 0;
    }
}
