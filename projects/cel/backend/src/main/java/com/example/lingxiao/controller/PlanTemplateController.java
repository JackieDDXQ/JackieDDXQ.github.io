
package com.example.lingxiao.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.example.lingxiao.dto.ResponseDTO;
import com.example.lingxiao.entity.PlanTemplateConfig;
import com.example.lingxiao.mapper.PlanTemplateConfigMapper;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/template")
public class PlanTemplateController {
    
    private final PlanTemplateConfigMapper planTemplateConfigMapper;
    
    public PlanTemplateController(PlanTemplateConfigMapper planTemplateConfigMapper) {
        this.planTemplateConfigMapper = planTemplateConfigMapper;
    }
    
    @GetMapping("/list")
    public ResponseDTO<IPage<PlanTemplateConfig>> list(@RequestParam(required = false) String name,
                                                      @RequestParam(defaultValue = "1") Integer pageNum,
                                                      @RequestParam(defaultValue = "10") Integer pageSize) {
        Page<PlanTemplateConfig> page = new Page<>(pageNum, pageSize);
        LambdaQueryWrapper<PlanTemplateConfig> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(PlanTemplateConfig::getIsDeleted, 0);
        
        if (StringUtils.isNotBlank(name)) {
            wrapper.like(PlanTemplateConfig::getName, name);
        }
        
        wrapper.orderByDesc(PlanTemplateConfig::getCreateAt);
        IPage<PlanTemplateConfig> result = planTemplateConfigMapper.selectPage(page, wrapper);
        return ResponseDTO.success(result);
    }
    
    @GetMapping("/{id}")
    public ResponseDTO<PlanTemplateConfig> getById(@PathVariable Long id) {
        PlanTemplateConfig template = planTemplateConfigMapper.selectById(id);
        return ResponseDTO.success(template);
    }
    
    @PostMapping
    public ResponseDTO<Boolean> save(@RequestBody PlanTemplateConfig template) {
        template.setIsDeleted(0);
        template.setCreateAt(LocalDateTime.now());
        template.setUpdateAt(LocalDateTime.now());
        return ResponseDTO.success(planTemplateConfigMapper.insert(template) > 0);
    }
    
    @PutMapping
    public ResponseDTO<Boolean> update(@RequestBody PlanTemplateConfig template) {
        template.setUpdateAt(LocalDateTime.now());
        return ResponseDTO.success(planTemplateConfigMapper.updateById(template) > 0);
    }
    
    @DeleteMapping("/{id}")
    public ResponseDTO<Boolean> delete(@PathVariable Long id) {
        PlanTemplateConfig template = planTemplateConfigMapper.selectById(id);
        if (template == null) {
            return ResponseDTO.success(false);
        }
        template.setIsDeleted(1);
        template.setUpdateAt(LocalDateTime.now());
        return ResponseDTO.success(planTemplateConfigMapper.updateById(template) > 0);
    }
}
