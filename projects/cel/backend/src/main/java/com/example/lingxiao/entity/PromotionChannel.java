
package com.example.lingxiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("promotion_channel")
public class PromotionChannel {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("name")
    private String name;
    
    @TableField("type")
    private Integer type;
    
    @TableField("status")
    private Integer status;
    
    @TableField("app_id")
    private String appId;
    
    @TableField("public_key")
    private String publicKey;
    
    @TableField("private_key")
    private String privateKey;
    
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
