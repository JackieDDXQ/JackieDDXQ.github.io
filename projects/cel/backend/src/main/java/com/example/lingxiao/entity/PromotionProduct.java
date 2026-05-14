
package com.example.lingxiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("promotion_product")
public class PromotionProduct {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("channel_id")
    private Long channelId;
    
    @TableField("code")
    private String code;
    
    @TableField("name")
    private String name;
    
    @TableField("package_id")
    private Long packageId;
    
    @TableField("status")
    private Integer status;
    
    @TableField("promoter")
    private String promoter;
    
    @TableField("investor")
    private String investor;
    
    @TableField("cooperation_type")
    private Integer cooperationType;
    
    @TableField("cooperation_ratio")
    private BigDecimal cooperationRatio;
    
    @TableField("is_deleted")
    private Integer isDeleted;
    
    @TableField("creator_id")
    private String creatorId;
    
    @TableField("create_at")
    private LocalDateTime createAt;
    
    @TableField("editor_id")
    private String editorId;
    
    @TableField("update_at")
    private LocalDateTime updateAt;
}
