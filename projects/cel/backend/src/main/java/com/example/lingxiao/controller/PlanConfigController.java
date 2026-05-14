
package com.example.lingxiao.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.example.lingxiao.dto.PlanConfigDTO;
import com.example.lingxiao.dto.ResponseDTO;
import com.example.lingxiao.entity.PlanConfig;
import com.example.lingxiao.service.PlanConfigService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/plan")
public class PlanConfigController {
    
    private final PlanConfigService planConfigService;
    
    public PlanConfigController(PlanConfigService planConfigService) {
        this.planConfigService = planConfigService;
    }
    
    @GetMapping("/list")
    public ResponseDTO<IPage<PlanConfig>> list(PlanConfigDTO dto, 
                                               @RequestParam(defaultValue = "1") Integer pageNum,
                                               @RequestParam(defaultValue = "10") Integer pageSize) {
        IPage<PlanConfig> page = planConfigService.list(dto, pageNum, pageSize);
        return ResponseDTO.success(page);
    }
    
    @GetMapping("/{id}")
    public ResponseDTO<PlanConfig> getById(@PathVariable Long id) {
        PlanConfig planConfig = planConfigService.getById(id);
        return ResponseDTO.success(planConfig);
    }
    
    @PostMapping
    public ResponseDTO<Boolean> save(@RequestBody PlanConfigDTO dto) {
        boolean success = planConfigService.save(dto);
        return ResponseDTO.success(success);
    }
    
    @PutMapping
    public ResponseDTO<Boolean> update(@RequestBody PlanConfigDTO dto) {
        boolean success = planConfigService.update(dto);
        return ResponseDTO.success(success);
    }
    
    @DeleteMapping("/{id}")
    public ResponseDTO<Boolean> delete(@PathVariable Long id) {
        try {
            boolean success = planConfigService.delete(id);
            return ResponseDTO.success(success);
        } catch (RuntimeException e) {
            return ResponseDTO.error(e.getMessage());
        }
    }
}
