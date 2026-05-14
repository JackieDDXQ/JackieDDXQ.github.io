
package com.example.lingxiao.controller;

import com.example.lingxiao.dto.ResponseDTO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    
    @GetMapping("/overview")
    public ResponseDTO<Map<String, Object>> getOverview() {
        Map<String, Object> overview = new HashMap<>();
        overview.put("totalOrders", 12580);
        overview.put("totalAmount", 2568000.00);
        overview.put("totalPromotionCost", 385200.00);
        overview.put("activeChannels", 24);
        overview.put("activePlans", 156);
        overview.put("newOrdersToday", 385);
        return ResponseDTO.success(overview);
    }
    
    @GetMapping("/settlementAmount")
    public ResponseDTO<List<Map<String, Object>>> getSettlementAmount(@RequestParam(required = false) String timeRange) {
        List<Map<String, Object>> data = new ArrayList<>();
        String[] dates = {"04-24", "04-25", "04-26", "04-27", "04-28", "04-29", "04-30"};
        int[] amounts = {320000, 385000, 420000, 356000, 412000, 398000, 456000};
        
        for (int i = 0; i < dates.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("date", dates[i]);
            item.put("amount", amounts[i]);
            data.add(item);
        }
        return ResponseDTO.success(data);
    }
    
    @GetMapping("/promotionCost")
    public ResponseDTO<List<Map<String, Object>>> getPromotionCost(@RequestParam(required = false) String timeRange) {
        List<Map<String, Object>> data = new ArrayList<>();
        String[] dates = {"04-24", "04-25", "04-26", "04-27", "04-28", "04-29", "04-30"};
        int[] costs = {48000, 57800, 63000, 53400, 61800, 59700, 68400};
        
        for (int i = 0; i < dates.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("date", dates[i]);
            item.put("cost", costs[i]);
            data.add(item);
        }
        return ResponseDTO.success(data);
    }
    
    @GetMapping("/orderOverview")
    public ResponseDTO<List<Map<String, Object>>> getOrderOverview(@RequestParam(required = false) String timeRange) {
        List<Map<String, Object>> data = new ArrayList<>();
        String[] dates = {"04-24", "04-25", "04-26", "04-27", "04-28", "04-29", "04-30"};
        int[] orders = {1850, 2100, 2400, 1980, 2250, 2150, 2650};
        
        for (int i = 0; i < dates.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("date", dates[i]);
            item.put("orders", orders[i]);
            data.add(item);
        }
        return ResponseDTO.success(data);
    }
    
    @GetMapping("/salesRank")
    public ResponseDTO<List<Map<String, Object>>> getSalesRank() {
        List<Map<String, Object>> data = new ArrayList<>();
        String[] names = {"腾讯视频会员", "爱奇艺会员", "优酷视频会员", "芒果TV会员", "网易云音乐"};
        int[] orders = {2850, 2420, 1980, 1650, 1420};
        
        for (int i = 0; i < names.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", names[i]);
            item.put("orders", orders[i]);
            data.add(item);
        }
        return ResponseDTO.success(data);
    }
    
    @GetMapping("/promotionRank")
    public ResponseDTO<List<Map<String, Object>>> getPromotionRank() {
        List<Map<String, Object>> data = new ArrayList<>();
        String[] names = {"抖音推广", "快手推广", "微信推广", "微博推广", "小红书推广"};
        int[] orders = {3520, 2890, 2450, 1980, 1650};
        
        for (int i = 0; i < names.length; i++) {
            Map<String, Object> item = new HashMap<>();
            item.put("name", names[i]);
            item.put("orders", orders[i]);
            data.add(item);
        }
        return ResponseDTO.success(data);
    }
}
