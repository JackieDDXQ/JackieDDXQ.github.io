
package com.example.lingxiao.dto;

import lombok.Data;

@Data
public class PlanConfigDTO {
    private Long id;
    private String ipsChannel;
    private String offerId;
    private String offerName;
    private String serviceHand;
    private Integer type;
    private String equityCode;
    private String equityName;
    private String extraJson;
    private Integer enable;
    private String remark;
}
