
package com.example.lingxiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.dto.PromotionProductDTO;
import com.example.lingxiao.entity.PromotionProduct;
import com.example.lingxiao.mapper.PromotionProductMapper;
import com.example.lingxiao.service.PromotionProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PromotionProductServiceImpl implements PromotionProductService {
    
    private final PromotionProductMapper promotionProductMapper;
    
    public PromotionProductServiceImpl(PromotionProductMapper promotionProductMapper) {
        this.promotionProductMapper = promotionProductMapper;
    }
    
    @Override
    public IPage<PromotionProduct> list(PromotionProductDTO dto, Integer pageNum, Integer pageSize) {
        Page<PromotionProduct> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<PromotionProduct> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PromotionProduct::getIsDeleted, 0);
        
        if (StringUtils.isNotBlank(dto.getName())) {
            wrapper.like(PromotionProduct::getName, dto.getName());
        }
        if (dto.getChannelId() != null) {
            wrapper.eq(PromotionProduct::getChannelId, dto.getChannelId());
        }
        if (dto.getStatus() != null) {
            wrapper.eq(PromotionProduct::getStatus, dto.getStatus());
        }
        
        wrapper.orderByDesc(PromotionProduct::getCreateAt);
        return promotionProductMapper.selectPage(page, wrapper);
    }
    
    @Override
    public PromotionProduct getById(Long id) {
        return promotionProductMapper.selectById(id);
    }
    
    @Override
    @Transactional
    public boolean save(PromotionProductDTO dto) {
        PromotionProduct product = new PromotionProduct();
        BeanUtils.copyProperties(dto, product);
        product.setIsDeleted(0);
        product.setStatus(dto.getStatus() != null ? dto.getStatus() : 1);
        return promotionProductMapper.insert(product) > 0;
    }
    
    @Override
    @Transactional
    public boolean update(PromotionProductDTO dto) {
        PromotionProduct product = promotionProductMapper.selectById(dto.getId());
        if (product == null) {
            return false;
        }
        BeanUtils.copyProperties(dto, product);
        return promotionProductMapper.updateById(product) > 0;
    }
    
    @Override
    @Transactional
    public boolean delete(Long id) {
        PromotionProduct product = promotionProductMapper.selectById(id);
        if (product == null) {
            return false;
        }
        product.setIsDeleted(1);
        return promotionProductMapper.updateById(product) > 0;
    }
}
