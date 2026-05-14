
package com.example.lingxiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@TableName("blacklist_phone")
public class BlacklistPhone {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("strategy_id")
    private Long strategyId;
    
    @TableField("phone_number")
    private String phoneNumber;
    
    @TableField("effective_start")
    private LocalDate effectiveStart;
    
    @TableField("effective_end")
    private LocalDate effectiveEnd;
    
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
