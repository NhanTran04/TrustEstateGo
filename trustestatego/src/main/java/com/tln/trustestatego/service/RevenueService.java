package com.tln.trustestatego.service;

import com.tln.trustestatego.dto.response.RevenueResponse;

import java.util.List;
import java.util.Map;

public interface RevenueService {
    List<RevenueResponse> getRevenueByMonth(int year);
    List<RevenueResponse> getRevenueByQuarter(int year);
    List<RevenueResponse> getRevenueByYear(int year);
}
