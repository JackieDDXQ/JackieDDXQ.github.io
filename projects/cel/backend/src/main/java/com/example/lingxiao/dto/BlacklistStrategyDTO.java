
package com.example.lingxiao.dto;

import lombok.Data;

@Data
public class BlacklistStrategyDTO {
    private Long id;
    private String name;
    private Integer type;
    private String ipsChannel;
    private Long planId;
    private String planName;
}
