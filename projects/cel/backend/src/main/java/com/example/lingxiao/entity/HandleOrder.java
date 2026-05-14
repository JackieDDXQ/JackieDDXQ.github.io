
package com.example.lingxiao.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@TableName("handle_order")
public class HandleOrder {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    @TableField("phone_number")
    private String phoneNumber;
    
    @TableField("order_id")
    private String orderId;
    
    @TableField("status")
    private String status;
    
    @TableField("handle_at")
    private LocalDate handleAt;
    
    @TableField("subscribe_at")
    private LocalDate subscribeAt;
    
    @TableField("unsubscribe_at")
    private LocalDate unsubscribeAt;
    
    @TableField("ips_channel")
    private String ipsChannel;
    
    @TableField("ips_tx_id")
    private String ipsTxId;
    
    @TableField("product_code")
    private String productCode;
    
    @TableField("product_name")
    private String productName;
    
    @TableField("offer_id")
    private String offerId;
    
    @TableField("offer_name")
    private String offerName;
    
    @TableField("equity_code")
    private String equityCode;
    
    @TableField("equity_name")
    private String equityName;
    
    @TableField("channel_id")
    private Long channelId;
    
    @TableField("channel_name")
    private String channelName;
    
    @TableField("channel_tx_id")
    private String channelTxId;
    
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
