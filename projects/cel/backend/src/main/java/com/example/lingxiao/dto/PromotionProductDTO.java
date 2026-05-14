
package com.example.lingxiao.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PromotionProductDTO {
    private Long id;
    private Long channelId;
    private String code;
    private String name;
    private Long packageId;
    private Integer status;
    private String promoter;
    private String investor;
    private Integer cooperationType;
    private BigDecimal cooperationRatio;
}
