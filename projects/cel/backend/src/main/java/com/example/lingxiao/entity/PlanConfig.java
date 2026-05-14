
package com.example.lingxiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("plan_config")
public class PlanConfig {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("ips_channel")
    private String ipsChannel;
    
    @TableField("offer_id")
    private String offerId;
    
    @TableField("offer_name")
    private String offerName;
    
    @TableField("service_hand")
    private String serviceHand;
    
    @TableField("type")
    private Integer type;
    
    @TableField("equity_code")
    private String equityCode;
    
    @TableField("equity_name")
    private String equityName;
    
    @TableField("extra_json")
    private String extraJson;
    
    @TableField("enable")
    private Integer enable;
    
    @TableField("remark")
    private String remark;
    
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
