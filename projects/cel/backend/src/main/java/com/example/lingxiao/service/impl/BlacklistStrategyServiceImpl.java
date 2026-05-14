
package com.example.lingxiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.dto.BlacklistStrategyDTO;
import com.example.lingxiao.entity.BlacklistStrategy;
import com.example.lingxiao.entity.BlacklistPhone;
import com.example.lingxiao.mapper.BlacklistPhoneMapper;
import com.example.lingxiao.mapper.BlacklistStrategyMapper;
import com.example.lingxiao.service.BlacklistStrategyService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BlacklistStrategyServiceImpl implements BlacklistStrategyService {
    
    private final BlacklistStrategyMapper blacklistStrategyMapper;
    private final BlacklistPhoneMapper blacklistPhoneMapper;
    
    public BlacklistStrategyServiceImpl(BlacklistStrategyMapper blacklistStrategyMapper, BlacklistPhoneMapper blacklistPhoneMapper) {
        this.blacklistStrategyMapper = blacklistStrategyMapper;
        this.blacklistPhoneMapper = blacklistPhoneMapper;
    }
    
    @Override
    public IPage<BlacklistStrategy> list(BlacklistStrategyDTO dto, Integer pageNum, Integer pageSize) {
        Page<BlacklistStrategy> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<BlacklistStrategy> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(BlacklistStrategy::getIsDeleted, 0);
        
        if (StringUtils.isNotBlank(dto.getName())) {
            wrapper.like(BlacklistStrategy::getName, dto.getName());
        }
        if (dto.getType() != null) {
            wrapper.eq(BlacklistStrategy::getType, dto.getType());
        }
        
        wrapper.orderByDesc(BlacklistStrategy::getCreateAt);
        return blacklistStrategyMapper.selectPage(page, wrapper);
    }
    
    @Override
    public BlacklistStrategy getById(Long id) {
        return blacklistStrategyMapper.selectById(id);
    }
    
    @Override
    @Transactional
    public boolean save(BlacklistStrategyDTO dto) {
        BlacklistStrategy strategy = new BlacklistStrategy();
        BeanUtils.copyProperties(dto, strategy);
        strategy.setIsDeleted(0);
        return blacklistStrategyMapper.insert(strategy) > 0;
    }
    
    @Override
    @Transactional
    public boolean update(BlacklistStrategyDTO dto) {
        BlacklistStrategy strategy = blacklistStrategyMapper.selectById(dto.getId());
        if (strategy == null) {
            return false;
        }
        BeanUtils.copyProperties(dto, strategy);
        return blacklistStrategyMapper.updateById(strategy) > 0;
    }
    
    @Override
    @Transactional
    public boolean delete(Long id) {
        LambdaQueryWrapper<BlacklistPhone> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(BlacklistPhone::getStrategyId, id);
        wrapper.eq(BlacklistPhone::getIsDeleted, 0);
        long count = blacklistPhoneMapper.selectCount(wrapper);
        if (count > 0) {
            throw new RuntimeException("有关联的手机号，无法删除");
        }
        
        BlacklistStrategy strategy = blacklistStrategyMapper.selectById(id);
        if (strategy == null) {
            return false;
        }
        strategy.setIsDeleted(1);
        return blacklistStrategyMapper.updateById(strategy) > 0;
    }
}
