
package com.example.lingxiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.dto.PlanConfigDTO;
import com.example.lingxiao.entity.PlanConfig;
import com.example.lingxiao.entity.PlanTemplateConfig;
import com.example.lingxiao.mapper.PlanConfigMapper;
import com.example.lingxiao.mapper.PlanTemplateConfigMapper;
import com.example.lingxiao.service.PlanConfigService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PlanConfigServiceImpl implements PlanConfigService {
    
    private final PlanConfigMapper planConfigMapper;
    private final PlanTemplateConfigMapper planTemplateConfigMapper;
    
    public PlanConfigServiceImpl(PlanConfigMapper planConfigMapper, PlanTemplateConfigMapper planTemplateConfigMapper) {
        this.planConfigMapper = planConfigMapper;
        this.planTemplateConfigMapper = planTemplateConfigMapper;
    }
    
    @Override
    public IPage<PlanConfig> list(PlanConfigDTO dto, Integer pageNum, Integer pageSize) {
        Page<PlanConfig> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<PlanConfig> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PlanConfig::getIsDeleted, 0);
        
        if (StringUtils.isNotBlank(dto.getOfferName())) {
            wrapper.like(PlanConfig::getOfferName, dto.getOfferName());
        }
        if (StringUtils.isNotBlank(dto.getIpsChannel())) {
            wrapper.eq(PlanConfig::getIpsChannel, dto.getIpsChannel());
        }
        if (dto.getType() != null) {
            wrapper.eq(PlanConfig::getType, dto.getType());
        }
        
        wrapper.orderByDesc(PlanConfig::getCreateAt);
        return planConfigMapper.selectPage(page, wrapper);
    }
    
    @Override
    public PlanConfig getById(Long id) {
        return planConfigMapper.selectById(id);
    }
    
    @Override
    @Transactional
    public boolean save(PlanConfigDTO dto) {
        PlanConfig planConfig = new PlanConfig();
        BeanUtils.copyProperties(dto, planConfig);
        planConfig.setIsDeleted(0);
        planConfig.setEnable(dto.getEnable() != null ? dto.getEnable() : 1);
        return planConfigMapper.insert(planConfig) > 0;
    }
    
    @Override
    @Transactional
    public boolean update(PlanConfigDTO dto) {
        PlanConfig planConfig = planConfigMapper.selectById(dto.getId());
        if (planConfig == null) {
            return false;
        }
        BeanUtils.copyProperties(dto, planConfig);
        return planConfigMapper.updateById(planConfig) > 0;
    }
    
    @Override
    @Transactional
    public boolean delete(Long id) {
        LambdaQueryWrapper<PlanTemplateConfig> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PlanTemplateConfig::getPlanId, id);
        wrapper.eq(PlanTemplateConfig::getIsDeleted, 0);
        long count = planTemplateConfigMapper.selectCount(wrapper);
        if (count > 0) {
            throw new RuntimeException("有关联的套餐模板，无法删除");
        }
        
        PlanConfig planConfig = planConfigMapper.selectById(id);
        if (planConfig == null) {
            return false;
        }
        planConfig.setIsDeleted(1);
        return planConfigMapper.updateById(planConfig) > 0;
    }
}
