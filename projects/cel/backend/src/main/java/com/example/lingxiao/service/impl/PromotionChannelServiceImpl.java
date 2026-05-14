
package com.example.lingxiao.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.dto.PromotionChannelDTO;
import com.example.lingxiao.entity.PromotionChannel;
import com.example.lingxiao.entity.PromotionProduct;
import com.example.lingxiao.mapper.PromotionChannelMapper;
import com.example.lingxiao.mapper.PromotionProductMapper;
import com.example.lingxiao.service.PromotionChannelService;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PromotionChannelServiceImpl implements PromotionChannelService {
    
    private final PromotionChannelMapper promotionChannelMapper;
    private final PromotionProductMapper promotionProductMapper;
    
    public PromotionChannelServiceImpl(PromotionChannelMapper promotionChannelMapper, PromotionProductMapper promotionProductMapper) {
        this.promotionChannelMapper = promotionChannelMapper;
        this.promotionProductMapper = promotionProductMapper;
    }
    
    @Override
    public IPage<PromotionChannel> list(PromotionChannelDTO dto, Integer pageNum, Integer pageSize) {
        Page<PromotionChannel> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<PromotionChannel> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PromotionChannel::getIsDeleted, 0);
        
        if (StringUtils.isNotBlank(dto.getName())) {
            wrapper.like(PromotionChannel::getName, dto.getName());
        }
        if (dto.getType() != null) {
            wrapper.eq(PromotionChannel::getType, dto.getType());
        }
        if (dto.getStatus() != null) {
            wrapper.eq(PromotionChannel::getStatus, dto.getStatus());
        }
        
        wrapper.orderByDesc(PromotionChannel::getCreateAt);
        return promotionChannelMapper.selectPage(page, wrapper);
    }
    
    @Override
    public PromotionChannel getById(Long id) {
        return promotionChannelMapper.selectById(id);
    }
    
    @Override
    @Transactional
    public boolean save(PromotionChannelDTO dto) {
        PromotionChannel channel = new PromotionChannel();
        BeanUtils.copyProperties(dto, channel);
        channel.setIsDeleted(0);
        channel.setStatus(dto.getStatus() != null ? dto.getStatus() : 1);
        return promotionChannelMapper.insert(channel) > 0;
    }
    
    @Override
    @Transactional
    public boolean update(PromotionChannelDTO dto) {
        PromotionChannel channel = promotionChannelMapper.selectById(dto.getId());
        if (channel == null) {
            return false;
        }
        BeanUtils.copyProperties(dto, channel);
        return promotionChannelMapper.updateById(channel) > 0;
    }
    
    @Override
    @Transactional
    public boolean delete(Long id) {
        LambdaQueryWrapper<PromotionProduct> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PromotionProduct::getChannelId, id);
        wrapper.eq(PromotionProduct::getIsDeleted, 0);
        long count = promotionProductMapper.selectCount(wrapper);
        if (count > 0) {
            throw new RuntimeException("有关联的推广或订单数据，无法删除");
        }
        
        PromotionChannel channel = promotionChannelMapper.selectById(id);
        if (channel == null) {
            return false;
        }
        channel.setIsDeleted(1);
        return promotionChannelMapper.updateById(channel) > 0;
    }
}
