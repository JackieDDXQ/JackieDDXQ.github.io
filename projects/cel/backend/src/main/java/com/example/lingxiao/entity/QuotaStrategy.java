
package com.example.lingxiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@TableName("quota_strategy")
public class QuotaStrategy {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("name")
    private String name;
    
    @TableField("type")
    private Integer type;
    
    @TableField("level")
    private Integer level;
    
    @TableField("root_id")
    private Long rootId;
    
    @TableField("parent_id")
    private Long parentId;
    
    @TableField("ips_channel")
    private String ipsChannel;
    
    @TableField("plan_id")
    private Long planId;
    
    @TableField("plan_name")
    private String planName;
    
    @TableField("channel_id")
    private Long channelId;
    
    @TableField("channel_name")
    private String channelName;
    
    @TableField("effective_start")
    private LocalDate effectiveStart;
    
    @TableField("effective_end")
    private LocalDate effectiveEnd;
    
    @TableField("threshold")
    private Integer threshold;
    
    @TableField("period")
    private String period;
    
    @TableField("in_booking")
    private Integer inBooking;
    
    @TableField("enable")
    private Integer enable;
    
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
