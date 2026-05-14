
package com.example.lingxiao.dto;

import lombok.Data;

@Data
public class PromotionChannelDTO {
    private Long id;
    private String name;
    private Integer type;
    private Integer status;
    private String appId;
    private String publicKey;
    private String privateKey;
}
