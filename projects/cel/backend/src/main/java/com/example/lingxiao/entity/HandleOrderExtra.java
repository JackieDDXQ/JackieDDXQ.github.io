
package com.example.lingxiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("handle_order_extra")
public class HandleOrderExtra {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("order_id")
    private String orderId;
    
    @TableField("channel_ss_key")
    private String channelSsKey;
    
    @TableField("product_ss_key")
    private String productSsKey;
    
    @TableField("offer_ss_key")
    private String offerSsKey;
    
    @TableField("ad_platform")
    private String adPlatform;
    
    @TableField("app_name")
    private String appName;
    
    @TableField("app_package")
    private String appPackage;
    
    @TableField("source_url")
    private String sourceUrl;
    
    @TableField("snapshot_url")
    private String snapshotUrl;
    
    @TableField("image_urls")
    private String imageUrls;
    
    @TableField("sms_key")
    private String smsKey;
    
    @TableField("sms_code")
    private String smsCode;
    
    @TableField("create_at")
    private LocalDateTime createAt;
    
    @TableField("update_at")
    private LocalDateTime updateAt;
}
